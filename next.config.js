// next.config.js
const withPlugins = require('next-compose-plugins');
//const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
//const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',

});

module.exports = withPlugins(
    [ withBundleAnalyzer ],
    {
        webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
            //config.plugins.push(new DuplicatePackageCheckerPlugin())
            // config.plugins.push(new MomentLocalesPlugin({
            //     localesToKeep: ['es-us', 'ru'],
            // }))
            if (isServer){
                require('./scripts/generate-sitemap');
            }
            config.plugins.push(new FilterWarningsPlugin({
                exclude: /.+/
            }))
            return config;
        }
    }
);