const { createWriteStream, existsSync, mkdirSync, writeFile } = require('fs');
const { resolve } = require('path');
const {
    SitemapAndIndexStream,
    SitemapStream,
    EnumChangefreq
} = require('sitemap');

const {
    fetchPosts,
    fetchCategories,
    fetchRubrics
} = require('./api');


const robotsTXT = ( sitemap = "", disallow = [], allow = [] ) => `# Robots.txt generated at ${new Date().toString()}
User-agent: *
${allow.map(link => `Allow: ${link}`).join('\n')}
${disallow.map(link => `Disallow: ${link}`).join('\n')}
Sitemap: ${sitemap}
`;


module.exports = {
    generate: async (hostname = "http://localhost:3000",
        sitemapsFolder = 'sitemaps',
        realFolder = './public',
        disallow = ['/api/'],
        allow = []) => {
        console.log("Generate sitemap...");

        const smStream = new SitemapAndIndexStream({
            limit: 10000, // defaults to 45k
            getSitemapStream: (i) => {
                const sitemapStream = new SitemapStream({hostname});
                const sitemapXml = `sitemap-${i}.xml`;
                const fullPath = resolve(realFolder, sitemapsFolder);
                if ( !existsSync(fullPath) ){
                    mkdirSync(fullPath, { recursive: true });
                }
                sitemapStream.pipe(createWriteStream(resolve(fullPath, sitemapXml)));

                console.log("Generate robots.txt file...")
                const robotsContent = robotsTXT(`${hostname}/sitemap.xml`, disallow, allow);
                writeFile(resolve(realFolder, 'robots.txt'), robotsContent, function (err,data) {
                    if (err) {
                        console.log("Generate robots.txt file Failed!", err);
                        throw err;
                    }
                    console.log("Generate robots.txt file Done!");
                });

                return [
                    new URL(sitemapXml, `${hostname}/${sitemapsFolder}/`).toString(),
                    sitemapStream,
                ];
            }
        });
        smStream.pipe(createWriteStream(resolve(realFolder, 'sitemap.xml')));

        const arciveLastmod = await fetchPosts(['published_at'], 0, 1)
            .then(response=>{
                let last = response.data.posts[0];
                return new Date(last.published_at);
            })
            .catch(reason=>{
                console.log("Something wrong with getting last post for sitemap -> ", reason);
                throw reason;
            });

        // static pages
        smStream.write({
            url: '/',
            lastmod: arciveLastmod,
            changefreq:
            EnumChangefreq.HOURLY
        });
        smStream.write({
            url: '/archive',
            lastmod: arciveLastmod,
            changefreq: EnumChangefreq.HOURLY
        });

        await fetchCategories()
            .then(response=>{
                let categories = response.data.categories;
                categories.map(category => {
                    smStream.write({
                        url: `/category/${category.slug}`,
                        lastmod: category.updated_at,
                        changefreq: category.change_freq ? category.change_freq : EnumChangefreq.DAILY,
                    });
                });
            })
            .catch(reason=>{
                console.log("Something wrong with getting categories for sitemap -> ", reason);
                throw reason;
            });

        await fetchPosts()
            .then(response=>{
                let posts = response.data.posts;

                posts.map(post => {
                    if (post.slug){
                        smStream.write({
                            url: `/${post.slug}`,
                            lastmod: post.updated_at,
                            changefreq: post.change_freq ? post.change_freq : EnumChangefreq.WEEKLY,
                        });
                    }
                });

            })
            .catch(reason=>{
                console.log("Something wrong with getting posts for sitemap -> ", reason);
                throw reason;
            });

        await fetchRubrics()
            .then(response=>{
                let rubrics = response.data.rubrics;

                rubrics.map(rubric => {
                    if (rubric.slug){
                        smStream.write({
                            url: `/rubric/${rubric.slug}`,
                            lastmod: rubric.updated_at,
                            changefreq: rubric.change_freq ? rubric.change_freq : EnumChangefreq.DAILY,
                        });
                    }
                });
            })
            .catch(reason=>{
                console.log("Something wrong with getting rubrics for sitemap -> ", reason);
                throw reason;
            });

        smStream.end();
        console.log("Generate sitemap Done!");
    }
}