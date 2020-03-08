import React from 'react';
import { withRouter } from 'next/router';
import Error from '../_error';
import {fetchCategories, getCategory} from '../../api';


class Category extends React.Component {
    static async getInitialProps({ query: { category_slug } }) {
        var category_id = null;
        await fetchCategories(['slug', 'id'])
            .then(response => {
                response.data.data.categories.map(category =>{
                    if (category.slug === category_slug){
                        category_id = category.id;
                    }
                });
            })
            .catch(reason => {
                // TODO Add Reason processing
            });

            var cat = null;
            if (category_id != null){
                await getCategory(category_id)
                    .then(response => {
                        cat = response.data;
                    })
                    .catch(reason=>{
                        console.log(reason);
                        // TODO Add Reason processing
                    });
            }
        return { category: cat };
    }

    render() {
        if (this.props.category === null){
            return (<Error statusCode={404}/>);
        }
        return ( <p>{this.props.category.title}</p> );
    }
}

export default withRouter(Category);