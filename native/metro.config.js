const { withNativeWind } = require("nativewind/metro");
const { getDefaultConfig } = require("tailwind-merge");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./app/global.css" });
