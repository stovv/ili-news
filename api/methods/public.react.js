import api from "../connector.react";

export async function getPost(slug){
    return api.get(`/posts/?slug=${slug}`);
}

export async function getReadMore(rubricId, postId){
    return api.ql(`
        query{
          posts(sort: "published_at:DESC", limit: 3, where: { rubric : ${rubricId}, id_ne: ${postId} }){
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

export async function getHeader(){
    return api.get('/header');
}

export async function getFooter(){
    return api.get('/footer');
}

export async function getPopularDuringWeek(){
    return api.get(`/popular-posts`);
}

export async function getCategory(slug){
    return api.get(`/categories?slug=${slug}`)
}


export async function getRubrics(){
    return api.ql(`
        query{
          rubrics{
            id,
            slug,
            title
          }
        }
    `);
}

export async function fetchPosts(fields = ['id', 'slug', 'updated_at'], start, limit){
    return api.ql(`
        query{
            posts${start !== undefined || limit !== undefined ? `(${(start !== undefined ? `start:${start},` : '')}${(limit !== undefined ? `limit:${limit}` : '')}, sort: "published_at:DESC")`: ''}{
                ${fields.join(',\n')}
            }
        }
    `);
}

export async function loadPosts(rubric = null, category = null, start, limit, skipPostIds, additionalWhere = "" ){
    console.log(`
    query{
        posts(sort: "published_at:DESC", where: {${Array.isArray(skipPostIds) ? `id_nin: [${skipPostIds.join(",")}], ` : ""}${rubric !== null ? `rubric: ${rubric}` : (category != null ? `rubric:{ category: ${category} }` : "")}${additionalWhere} }, limit: ${limit}, start: ${start}) {
            id,
            event{
                date
            },
            slug,
            rubric{
              id,
              slug,
              title
            },
            title,
            description,
            published_at,
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
            content,
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
    return api.ql(`
    query{
        posts(sort: "published_at:DESC", where: {${Array.isArray(skipPostIds) ? `id_nin: [${skipPostIds.join(",")}], ` : ""}${rubric !== null ? `rubric: ${rubric}` : (category != null ? `rubric:{ category: ${category} }` : "")}${additionalWhere} }, limit: ${limit}, start: ${start}) {
            id,
            event{
                date
            },
            slug,
            rubric{
              id,
              slug,
              title
            },
            title,
            description,
            published_at,
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
            content,
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

export async function loadEvents(skipPostIds, rubric, category, dateGTE, dateLTE, start, limit){
    return api.ql(`
    query{
        posts(sort: "published_at:DESC", where: {
        event: {date_gte: "${dateGTE}", date_lte: "${dateLTE}"},
         ${Array.isArray(skipPostIds) ? `, id_nin: [${skipPostIds.join(",")}], ` : ""}${rubric !== null ? `rubric: ${rubric}` : (category != null ? `rubric:{ category: ${category} }` : "")}},
          limit: ${limit}, start: ${start}) {
            event{
                link,
                price,
                date,
                location
            },
            slug,
            title
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
    return api.get(`/posts/count/?rubric=${rubricId}`);
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
//                     published_at
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
          published_at,
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

export async function viewPost(ratingId, clientId){
    return api.put(`/ratings/view/${ratingId}`, {
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

export async function fetchNews(limit = 5) {
    return api.ql(`
          query{
            posts(sort: "published_at:DESC", limit: ${limit}, where: {rubric: {slug: "news" }}){
                id,
                slug,
                title,
                published_at
          }
        }
    `);
}

export async function fetchPostsCount(skipRubricIds = [], skipCategoryIds = []){
    const rubricQuery = skipRubricIds.length > 0 ? skipRubricIds.map(id => `rubric_nin=${id}`).join("&") : null;
    const categoryQuery = skipCategoryIds.length > 0 ? skipCategoryIds.map(id => `category_nin=${id}`).join("&") : null;

    const where_data = [rubricQuery, categoryQuery].filter(q => q !== null);
    const skipQuery = `?${where_data.join('&')}`;
    return api.get(`/posts/count${where_data.length > 0 ? skipQuery : ''}`)
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
            posts(sort: "published_at:DESC", limit: ${limit}, 
              where: {
                id_nin: [${skipPostIds.join(",")}],
                rubric_nin: [${skipRubricIds.join(",")}],
                rubric: { category_nin: [${skipCategorieIds.join(",")}] }
              }){
            id,
            title,
            slug,
            published_at,
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
            posts(sort: "published_at:DESC", limit: ${limit}, start: ${start},
              where: {
                id_nin: [${skipPostIds.join(",")}],
                rubric:{ category: ${category} }
              }){
            id,
            title,
            published_at,
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

export async function fetchFrontPageCategories(ignoreRubrics = [], ignoreCategories = []) {

    const rubricQuery = ignoreRubrics.length > 0 ? `rubrics_nin: [${ignoreRubrics.join(',')}]` : null;
    const categoryQuery = ignoreCategories.length > 0 ? `id_nin: [${ignoreCategories.join(',')}]` : null;
    const where_data = [rubricQuery, categoryQuery].filter(q => q !== null);
    let where = `(where: { ${where_data.join(',')} })`;

    return api.ql(`
        query{
            categories${where_data.length ? where : ''}{
              id,
              slug,
              title
            }
        }
    `);
}

export async function countPostsByCategory(categoryId){
    return api.get(`/posts/count?rubric.category=${categoryId}`)
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