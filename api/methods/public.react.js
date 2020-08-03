import api from "../connector.react";

export async function getPost(slug){
    return api.get(`/posts/?slug=${slug}`);
}

export async function getReadMore(rubricId, postId){

    console.log(`
        query{
          ratings(sort: "views:DESC,likes:DESC,dislikes:DESC", limit: 3, where: { post: { id_ne: ${postId} , rubric: { id: ${rubricId} } } }){
            post{
              slug,
              title
            }
          }
        }
    `);

    return api.ql(`
        query{
          ratings(sort: "views:DESC,likes:DESC,dislikes:DESC", limit: 3, where: { post: { id_ne: ${postId} , rubric: { id: ${rubricId} } } }){
            post{
              id,
              slug,
              title
            }
          }
        }
    `)
}

export async function getMenu(type){
    return api.ql(`
    query{
      menus(where: {type: "${type}"}){
        id,
        item{
         ... on ComponentLinksItem{
          post{
            id,
            slug,
            title
          },
          category{
            id,
            slug,
            title
          },
          rubric{
            id,
            slug,
            title
          }
         }
        }
      }
    }
    `);
}

export async function getPopularDuringWeek(){

    let today = new Date();
    today.setHours(0,0,0,0);
    let day = today.getDay();
    let diff = today.getDate() - day + (day === 0 ? -6:1);
    let start = new Date(today.setDate(diff))
    let end = new Date(today.setDate(start.getDate() + 7))


    return api.ql(`
       query{
          ratings(sort: "views:DESC,likes:DESC,dislikes:DESC", where:{post: {publish_at_gte: "${start.toISOString()}", publish_at_lt: "${end.toISOString()}"}}){
            post{
              id,
              title,
              slug,
              rubric{
                slug
              },
              cover{
              url,
              width,
              mime,
              height,
              formats
            },
            }
          }
        }
    `);

}

export async function getCategory(id){
    return api.get(`/categories/${id}`)
}


export async function getRubrics(){
    return api.ql(`
        query{
          rubrics{
            id,
            title
          }
        }
    `);
}

export async function fetchPosts(fields = ['id', 'slug', 'updated_at']){
    return api.ql(`
        query{
            posts{
                ${fields.join(',\n')}
            }
        }
    `);
}

export async function loadPosts(rubric, category, start, limit, skipPostIds ){
    return api.ql(`
        query{
            posts(sort: "publish_at:DESC", where: { 
                id_nin: [${skipPostIds && skipPostIds.join(",")}], 
                rubric: { ${rubric != null ? `id: ${rubric},` : ''}
                        ${category != null ? `category:{ id: ${category}},` : ''} } 
                    }, 
                    limit: ${limit}, start: ${start}
                ){
                id,
                eventDate,
                slug,
                rubric{
                  id,
                  slug,
                  title,
                  infinityScroll,
                  withEventDate,
                  cover
                },
                title,
                description,
                publish_at,
                authors(limit: 4){
                  id,
                  name,
                  secondName
                },
                cover{
                  caption, 
                  alternativeText,
                  url,
                  width,
                  mime,
                  height,
                  formats
                },
                blocks,
                commentThread{
                    id
                },
                rating{
                  id,
                  likes,
                  dislikes,
                  views
                },
                updated_at
            }
        }
    `);
}

export async function getPostIdBySlug(slug){
    return api.ql(`
       query{
          posts(where: {slug: "${slug}"}){
            slug,
            id
          }
       }
    `);
}

export async function fetchCategories(fields = ['id', 'slug', 'updated_at']){
    return api.ql(`
        query{
            categories{
                ${fields.join(',\n')}
            }
        }
        `);
}

export async function fetchRubrics(fields = ['id', 'slug', 'updated_at']){
    return api.ql(`
        query{
            rubrics{
                ${fields.join(',\n')}
            }
        }
        `);
}

export async function getRubric(slug){
    return api.get(`/rubrics/?slug=${slug}`)
}

export async function getPostCountInRubric(rubricId){
    return api.get(`/rubrics/${rubricId}/postCount`);
}

export async function fetchTopPosts(){
    return api.ql(`
        query{
            tops{
                post{
                    id,
                    title,
                    description,
                    slug,
                    cover{
                        caption, 
                        alternativeText,
                        formats,
                        width,
                        height,
                        url,
                        mime
                    },
                    rubric{
                       title
                    },
                    publish_at
                }
            }
        }
        `);
}

export async function viewPost(raitingId, clientId){
    return api.put(`/ratings/view/${raitingId}`, {
        clientIp: clientId
    });
}

export async function likeUp(raitingId, clientId){
    return api.put(`/ratings/likeup/${raitingId}`, {
        clientIp: clientId
    })
}

export async function dislikeUp(raitingId, clientId){
    return api.put(`/ratings/dislikeup/${raitingId}`, {
        clientIp: clientId
    })
}

export async function fetchTheme(start = 0){
    return api.ql(`
        query{
            themes(sort: "created_at:DESC", limit: 1, where: {published: true}, start: ${start}){
              id,
              title,
              posts{
                id,
                slug,
                publish_at,
                title,
                rubric{
                    title,
                },
                cover{
                  caption, 
                  alternativeText,
                  url,
                  width,
                  mime,
                  height,
                  formats
                },
            }
          }
        }
    `);
}

export async function fetchNews(limit = 6) {
    return api.ql(`
          query{
            posts(sort: "publish_at:DESC", limit: ${limit}, where: {rubric:{id: 17}}){
            id,
            slug,
            title,
            publish_at
          }
        }
    `);
}

export async function fetchSimplePosts(skipPostIds = [], skipRubricIds = [17], skipCategorieIds = [], limit = 2) {
    return api.ql(`
        query{
            posts(sort: "publish_at:DESC", limit: ${limit}, 
              where: {
                id_nin: [${skipPostIds.join(",")}],
                rubric:{
                  id_nin: [${skipRubricIds.join(",")}], 
                  category:{
                    id_nin: [${skipCategorieIds.join(",")}]
                  }
                }
              }){
            id,
            title,
            slug,
            publish_at,
            cover{
              caption, 
              alternativeText,
              url,
              width,
              mime,
              height,
              formats
            },
            rubric{
              slug,
              title
            },
          }
        }
        `);
}

export async function fetchCatPosts(limit = 4, category, skipPostIds = [], start = 0){
    return api.ql(`
        query{
            posts(sort: "publish_at:DESC", limit: ${limit}, start: ${start},
              where: {
                id_nin: [${skipPostIds.join(",")}],
                rubric:{ 
                  category:{
                    id: ${category}
                  }
                }
              }){
            id,
            title,
            publish_at,
            slug,
            cover{
              caption, 
              alternativeText,
              url,
              width,
              mime,
              height,
              formats
            },
            rubric{
              slug,
              title
            },
          }
        }
    `);
}

export async function fetchFrontPageCategories() {
    return api.ql(`
        query{
            categories(where: {rubrics: {id_nin: [13, 17]}}){
              id,
              slug,
              title
            }
        }
    `);
}

export async function randomUnsplashImage(){
    return api.simple_get(`https://source.unsplash.com/1600x900/?write`)
}

export async function findImage(hash){
    return api.ql(`
    query{
      files(where: {hash: "${hash}"}){
        id,
        name,
        formats
      }
    }
    `);
}