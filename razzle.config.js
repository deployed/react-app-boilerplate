const paths = require('razzle/config/paths');
const makeLoaderFinder = require('razzle-dev-utils/makeLoaderFinder');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const logger = require('razzle-dev-utils/logger');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const getBabelConfig = require('./internals/babel');

const packageJson = require('./package.json');


module.exports = {
  modify: (config, { target, dev }, webpack) => {
    let newConfig = config;

    if (!dev) {
      // razzle do not set public path in node environment
      // https://github.com/jaredpalmer/razzle/issues/654
      newConfig.output.publicPath = process.env.PUBLIC_PATH;

      // disable source maps for now
      newConfig.devtool = undefined;
    }

    // TODO: fix source maps support
    if (!newConfig.node) {
      newConfig.node = {};
    }
    // https://github.com/webpack-contrib/css-loader/issues/447
    newConfig.node = {
      ...newConfig.node,
      fs: 'empty',
    };

    // Add appSrc directory to modules
    // NOTE: it enables global imports for modules in `appSrc`
    newConfig.resolve.modules.unshift(paths.appSrc);

    // do something to config
    const fileLoader = newConfig.module.rules.find(makeLoaderFinder('file-loader'));
    fileLoader.exclude.push(/\.svg$/);
    const babelLoader = newConfig.module.rules.find(makeLoaderFinder('babel-loader'));

    babelLoader.use[0].options.presets = getBabelConfig(target, dev);

    newConfig = {
      ...newConfig,
      module: {
        ...newConfig.module,
        rules: [
          babelLoader,
          fileLoader,
          newConfig.module.rules.find(makeLoaderFinder('css-loader')),
          {
            test: /\.svg$/,
            exclude: [/graphql-mocks/, /images\/svg/],
            use: [{
              loader: '@svgr/webpack',
              options: {
                icon: true,
              },
            }],
          },
          {
            test: /\.svg$/,
            include: [/images\/svg/],
            use: [{
              loader: 'file-loader',
              options: {
                name: 'static/media/[name].[hash:8].[ext]',
                emitFile: true,
              },
            }],
          },
        ],
      },
    };

    // Create urlLoader
    const urlLoader = {
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]',
            emitFile: true,
          },
        },
      ],
    };

    if (!dev) {
      urlLoader.use.push({
        loader: require.resolve('image-webpack-loader'),
        options: {
          mozjpeg: {
            progressive: true,
          },
          gifsicle: {
            interlaced: false,
          },
          optipng: {
            optimizationLevel: 7,
          },
          pngquant: {
            quality: '65-90',
            speed: 4,
          },
        },
      });
    }

    // Add urlLoader to config
    newConfig.module.rules.push(urlLoader);

    // Compilation time environments
    // WARN: we do not use any razzle environment variables here
    const envVariables = {
      'process.env.IS_SERVER': JSON.stringify(target === 'node'),
      'process.env.IS_BROWSER': JSON.stringify(target === 'web'),
      'process.env.IS_DEV': JSON.stringify(dev),
      'process.env.IS_PRODUCTION': JSON.stringify(!dev),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VERSION': JSON.stringify(packageJson.version),
    };

    if (dev) {
      // Required by dev server
      envVariables['process.env.HOST'] = JSON.stringify(process.env.HOST);
      envVariables['process.env.PORT'] = JSON.stringify(process.env.PORT);
    }

    // Remove PORT from DefinePlugin definitions
    const definePluginIndex = newConfig.plugins.findIndex((plugin) => plugin.constructor.name === 'DefinePlugin');

    if (definePluginIndex >= 0) {
      // Override define plugin to remove some variables
      newConfig.plugins[definePluginIndex] = new webpack.DefinePlugin(envVariables);
    } else {
      newConfig.plugins.push(new webpack.DefinePlugin(envVariables));
    }

    newConfig.plugins.push(new webpack.ProvidePlugin({
      // make fetch available
      fetch: 'exports-loader?self.fetch!whatwg-fetch',
    }));

    if (target === 'web') {
      if (dev) {
        // Html-webpack-plugin do not work with HMR plugin with multiStep true option
        // https://github.com/jantimon/html-webpack-plugin/issues/716
        // https://github.com/webpack/webpack/issues/6693
        // Also with multiStep true server HOC is failing some times
        // find the HMR plugin
        const HMRPluginIndex = newConfig.plugins.findIndex(
          (plugin) => plugin.constructor.name === 'HotModuleReplacementPlugin',
        );
        if (HMRPluginIndex >= 0) {
          newConfig.plugins[HMRPluginIndex] = new webpack.HotModuleReplacementPlugin({
            multiStep: false,
          });
        }
      }
      newConfig.plugins = [
        ...newConfig.plugins,
        new ReactLoadablePlugin({
          filename: './build/react-loadable.json',
        }),
      ];

      newConfig.optimization.splitChunks = {
        chunks: 'async',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 2,
        maxInitialRequests: 3,
        name: true,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
            priority: -10,
          },
        },
      };
    }

    newConfig.plugins.push(new CircularDependencyPlugin());

    logger.debug(`Webpack config for ${target}`, newConfig);
    return newConfig;
  },
};
