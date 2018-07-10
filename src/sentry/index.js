// eslint-disable-next-line global-require
export default process.env.IS_SERVER ? require('./server').default : require('./client').default;
