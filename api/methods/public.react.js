import api from "../connector.react";

export async function getPost(slug){
    return api.get(`/posts/?slug=${slug}`);
}

export async function getReadMore(rubricId, postId){
    return api.ql(`
        query{
          posts(sort: "publish_at:DESC", limit: 3, where: { rubric : ${rubricId}, id_ne: ${postId} }){
              id,
              slug,
              title,
              cover{
                url
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
          ... on ComponentLinksSocial{
            socialUrl:url,
            icon{
              url
            }
          },
           ... on ComponentLinksItem {
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
            },
            url
          },
        }
      }
    }
    `);
}

export async function getPopularDuringWeek(){
    return api.get(`/popular-posts`);
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

export async function fetchPosts(fields = ['id', 'slug', 'updated_at'], start, limit){
    return api.ql(`
        query{
            posts${start !== undefined || limit !== undefined ? `(${(start !== undefined ? `start:${start},` : '')}${(limit !== undefined ? `limit:${limit}` : '')})`: ''}{
                ${fields.join(',\n')}
            }
        }
    `);
}

export async function loadPosts(rubric, category, start, limit, skipPostIds ){
    return api.ql(`
    query{
        posts(sort: "publish_at:DESC", where: {${Array.isArray(skipPostIds) ? `id_nin: [${skipPostIds.join(",")}], ` : ""}${rubric !== null ? `rubric: ${rubric}` : (category != null ? `rubric:{ category: ${category} }` : "")}}, limit: ${limit}, start: ${start}) {
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

export async function fetchIndexPage(){
    return api.get('/index-page');
}

// export async function fetchTopPosts(){
//     return api.ql(`
//         query{
//             tops{
//                 post{
//                     id,
//                     title,
//                     description,
//                     slug,
//                     cover{
//                         caption,
//                         alternativeText,
//                         formats,
//                         width,
//                         height,
//                         url,
//                         mime
//                     },
//                     rubric{
//                        title
//                     },
//                     publish_at
//                 }
//             }
//         }
//         `);
// }

export async function fetchTheme(id){
    return api.ql(`
    query{
      theme(id: ${id}){
        id,
        title,
        posts{
          id,
          slug,
          publish_at,
          title,
          rubric{
            title
          },
          cover{
            caption,
            alternativeText,
            url,
            width,
            mime,
            height,
            formats
          }
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

export async function fetchNews(limit = 6) {
    return api.ql(`
          query{
            posts(sort: "publish_at:DESC", limit: ${limit}, where: {rubric: 2}){
                id,
                slug,
                title,
                publish_at
          }
        }
    `);
}

export async function fetchPostsCount(skipRubricIds){
    if ( skipRubricIds !== undefined ){
        if ( Array.isArray(skipRubricIds) ){
            skipRubricIds = skipRubricIds.join(",");
        }
        return api.get(`/posts/countWithParams/?rubricIds=${skipRubricIds}&type=nin`);
    }
    return api.get(`/posts/count`)
}

export async function fetchPostsCountInCategory(categoryId){
    return api.get(`/posts/countWithParams/?categoryIds=${categoryId}&type=in`);
}

export async function fetchPostsCountInRubric(rubricId){
    return api.get(`/posts/countWithParams/?rubricIds=${rubricId}&type=in`);
}

export async function fetchSimplePosts(skipPostIds = [], skipRubricIds = [2], skipCategorieIds = [], limit = 2) {
    return api.ql(`
        query{
            posts(sort: "publish_at:DESC", limit: ${limit}, 
              where: {
                id_nin: [${skipPostIds.join(",")}],
                rubric_nin: [${skipRubricIds.join(",")}],
                rubric: { category_nin: [${skipCategorieIds.join(",")}] }
              }){
            id,
            title,
            slug,
            publish_at,
            description,
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
                rubric:{ category: ${category} }
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
            categories(where: {rubrics: {id_nin: [2, 3]}}){
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

export async function search(query, by = "title"){
    return api.ql(`
    query{
        posts(where: { ${ by === "title" ? `title_contains: "${query}"` : `description_contains: "${query}"` } }){
          id,
          title,
          slug,
          rubric{
            title
          },
          cover{
            formats
          }
        }
    }
    `);
}

export async function getWordFormats(word){
    return api.get(`/morph?word=${word}`);
}