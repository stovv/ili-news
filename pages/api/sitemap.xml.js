// Import built-in types for API routes
import { SitemapStream, streamToPromise, EnumChangefreq } from 'sitemap';
import { createGzip } from 'zlib';
import {fetchPosts, fetchCategories} from '../../api';

export default async (req, res) => {
    if (!res) return {};
    try {
        // Set response header 
        res.setHeader('content-type', 'application/xml');
        res.setHeader('Content-Encoding', 'gzip');

        // A Transform for turning a Readable stream of either SitemapItemOptions or url strings into a Sitemap.
        // The readable stream it transforms must be in object mode.
        const smStream = new SitemapStream({
            hostname: process.env.SITE_ROOT || 'http://localhost:3000',
        });

        const pipeline = smStream.pipe(createGzip());
        
        // Add any static entries here
        smStream.write({ url: '/', lastmod: new Date(), changefreq: EnumChangefreq.HOURLY });
        //smStream.write({ url: '/contact', lastmod: process.env.siteUpdatedAt, changefreq: EnumChangefreq.MONTHLY });
        
        // We create a sitemap.xml for categories
        await fetchCategories()
            .then(response=>{
                var categories = response.data.data.categories;
                categories.map(category => {
                    smStream.write({
                        url: category.slug ? `/categories/${category.slug}` : `/categories/${category.id}`,
                        lastmod: category.updated_at,
                        changefreq: category.change_freq ? category.change_freq :EnumChangefreq.WEEKLY,
                    });
                });
            })
            .catch(reason=>{
                throw reason;
            });

        // We create a sitemap.xml for posts
        await fetchPosts()
            .then(response=>{
                var posts = response.data.data.posts;

                // map old posts
                posts.map(post => {
                    if (post.slug){
                        smStream.write({
                            url: `/${post.slug}`,
                            lastmod: post.updated_at,
                            changefreq: post.change_freq ? post.change_freq : EnumChangefreq.HOURLY,
                        });
                    }
                });

                // map all posts by id
                posts.map(post => {
                    smStream.write({
                        url: `/post/${post.id}`,
                        lastmod: post.updated_at,
                        changefreq: post.change_freq ? post.change_freq : EnumChangefreq.HOURLY,
                    });
                });
            })
            .catch(reason=>{
                throw reason;
            });
        
        smStream.end();

        // cache the response
        // streamToPromise.then(sm => sitemap = sm)
        streamToPromise(pipeline);
        // stream the response
        pipeline.pipe(res).on('error', e => {
            throw e;
        });
    } catch (e) {
        res.statusCode = 521;
        console.log(e);
        res.end();
    }
};