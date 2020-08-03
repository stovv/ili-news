// Import built-in types for API routes
import { SitemapStream, streamToPromise, EnumChangefreq,
    lineSeparatedURLsToSitemapOptions, SitemapAndIndexStream } from 'sitemap';
import { createGzip } from 'zlib';
import {Public} from '../../api';
import {SITE_URL}  from '../../constants';

let sitemap;

export default async (req, res) => {
    res.setHeader('content-type', 'application/xml');
    res.setHeader('Content-Encoding', 'gzip');
    if (!res) return {};
    if ( sitemap ){
        res.send(sitemap);
        return
    }

    try{
        const smStream = new SitemapStream({ hostname: SITE_URL })
        const pipeline = smStream.pipe(createGzip())

        smStream.write({ url: '/', lastmod: new Date(), changefreq: EnumChangefreq.HOURLY });
        smStream.write({ url: '/contact', lastmod: process.env.siteUpdatedAt, changefreq: EnumChangefreq.MONTHLY });

        await Public.fetchCategories()
            .then(response=>{
                var categories = response.data.categories;
                categories.map(category => {
                    smStream.write({
                        url: `/categories/${category.slug}`,
                        lastmod: category.updated_at,
                        changefreq: category.change_freq ? category.change_freq : EnumChangefreq.WEEKLY,
                    });
                });
            })
            .catch(reason=>{
                throw reason;
            });

            await Public.fetchPosts()
                .then(response=>{
                    var posts = response.data.posts;

                    posts.map(post => {
                        if (post.slug){
                            smStream.write({
                                url: `/${post.slug}`,
                                lastmod: post.updated_at,
                                changefreq: post.change_freq ? post.change_freq : EnumChangefreq.HOURLY,
                            });
                        }
                    });

                })
                .catch(reason=>{
                    throw reason;
                });


        // cache the response
        streamToPromise(pipeline).then(sm => sitemap = sm)
        // make sure to attach a write stream such as streamToPromise before ending
        smStream.end()
        // stream write the response
        pipeline.pipe(res).on('error', (e) => {throw e})
    }catch (e) {
        res.statusCode = 521;
        console.log(e);
        res.end();
    }
};