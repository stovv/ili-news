import api from "../connector.react";

export async function getPost(id){
    return api.get(`/posts/${id}`)
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
                        url
                    },
                    rubric{
                       slug
                    }
                    created_at
                }
            }
        }
        `);
}
