const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
// eslint-disable-next-line no-undef
const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  ...require('node-libs-react-native'),
  crypto: require.resolve('crypto-browserify'),
  stream: require.resolve('stream-browserify'),
};

module.exports = withNativeWind(config, { input: './global.css' });
