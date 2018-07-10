/**
 * Return babel configuration based on compilation target and production/development value
 * @param {String} target 'web', 'node' or 'test'
 * @param {Boolean} dev
 * @return {{presets: *[], plugins: *[]}} Babel preset configuration
 */
module.exports = (target, dev) => {
  const preset = {
    presets: [
      require.resolve('babel-preset-react'),
      require.resolve('babel-preset-stage-0'),
    ],
    plugins: [
      // preval plugin
      require.resolve('babel-plugin-preval'),
      [
        require.resolve('babel-plugin-transform-decorators-legacy'),
      ],
      // class { handleThing = () => { } }
      require.resolve('babel-plugin-transform-class-properties'),
      [
        require.resolve('babel-plugin-styled-components'),
        {
          ssr: true,
          minify: true,
        },
      ],
      require.resolve('react-loadable/babel'),
    ],
  };


  if (target === 'node') {
    preset.presets.unshift(
      [
        require.resolve('babel-preset-env'),
        {
          targets: {
            node: '8',
          },
          modules: false,
        },
      ],
    );
  } else if (target === 'web') {
    preset.presets.unshift(
      [
        require.resolve('babel-preset-env'),
        {
          targets: {
            browsers: [
              '> 2%',
              'safari>=9',
              'ie>=11',
            ],
          },
          useBuiltIns: 'entry',
          modules: false,
        },
      ],
    );
  } else {
    preset.presets.unshift(
      [
        require.resolve('babel-preset-env'),
        {
          targets: {
            node: 'current',
          },
          useBuiltIns: 'entry',
          modules: false,
        },
      ],
    );
  }

  if (dev || target === 'test') {
    preset.plugins.push.apply(preset.plugins, [
      // Adds component stack to warning messages
      require.resolve('babel-plugin-transform-react-jsx-source'),
    ]);
  }

  if (target === 'test') {
    preset.plugins.push.apply(preset.plugins, [
      // Compiles import() to a deferred require()
      require.resolve('babel-plugin-dynamic-import-node'),
      // Transform ES modules to commonjs for Jest support
      [
        require.resolve('babel-plugin-transform-es2015-modules-commonjs'),
        { loose: true },
      ],
    ]);
  }

  if (!dev) {
    preset.plugins.push.apply(preset.plugins, [
      require.resolve('babel-plugin-transform-react-constant-elements'),
      require.resolve('babel-plugin-transform-react-inline-elements'),
      require.resolve('babel-plugin-transform-react-remove-prop-types'),
      [
        require.resolve('babel-plugin-styled-components'),
        {
          ssr: true,
          minify: true,
          displayName: false,
        },
      ],
    ]);
  }

  return preset;
};
