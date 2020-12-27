// next.config.js
const withPlugins = require('next-compose-plugins');
//const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withPlugins(
    [ withBundleAnalyzer, {
        analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
        analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
        bundleAnalyzerConfig: {
            server: {
                analyzerMode: 'static',
            },
            browser: {
                analyzerMode: 'static',
            },
        }
    }],
    {
        webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
            //config.plugins.push(new DuplicatePackageCheckerPlugin())
            // config.plugins.push(new MomentLocalesPlugin({
            //     localesToKeep: ['es-us', 'ru'],
            // }))
            if (isServer){
                // Generate sitemaps and robots.txt
                const { generate } = require('./scripts/generate-sitemap');
                generate(process.env.NEXT_PUBLIC_HOST, 'sitemaps',
                    './public', ['/api/', '/login']
                );
            }
            config.plugins.push(new FilterWarningsPlugin({
                exclude: /.+/
            }))
            return config;
        }
    }
);