// next.config.js
const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
//const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
});

module.exports = withPlugins(
    [ withImages, withBundleAnalyzer ],
    {
        webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
            //config.plugins.push(new DuplicatePackageCheckerPlugin())
            config.plugins.push(new MomentLocalesPlugin({
                localesToKeep: ['es-us', 'ru'],
            }))
            return config
        }
    }
);