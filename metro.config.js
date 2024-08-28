/** @type {import('expo/metro-config').MetroConfig} */
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname, {
  // Disable CSS support.
  isCSSEnabled: false,
});

module.exports = config;
