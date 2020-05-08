import api from "../connector.react";

export async function getPost(id){
    return api.ql(`
    query{
      post(id:${id}){
        rubric{
          id,
          slug,
          title
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
        comment_thread{
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

export async function getReadMore(rubricId, postId){
    return api.ql(`
        query{
          ratings(limit: 3, sort: "views:DESC,likes:DESC,dislikes:DESC", where: { post: { id_ne: ${postId} , rubric: { id: ${rubricId} } } }){
            post{
              id,
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

    console.log("DATE", start, end);

    return api.ql(`
       query{
          ratings(sort: "views:DESC,likes:DESC,dislikes:DESC", where:{post: {publish_at_gte: "${start.getUTCDate()}", publish_at_lt: "${end.getUTCDate()}"}}){
            post{
              id,
              title,
              rubric{
                slug
              }
            }
          }
        }
    `);

}

export async function getCategory(id){
    return api.get(`/categories/${id}`)
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

export async function fetchTopPosts(){
    return api.ql(`
        query{
            tops{
                post{
                    id,
                    title,
                    description,
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
                title,
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