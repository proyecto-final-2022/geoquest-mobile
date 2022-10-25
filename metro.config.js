// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const defaultResolver = defaultConfig.resolver;
const defaultAssetExts = defaultConfig.resolver.assetExts;

module.exports = {
  ...defaultConfig,
  resolver: {
    ...defaultResolver,
    assetExts: [
      ...defaultAssetExts,
      "obj", "mtl", "vrx"
    ]
  }
};
