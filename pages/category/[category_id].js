import React from 'react';
import { withRouter } from 'next/router';
import {fetchCategories, getCategory} from '../../api';


class Category extends React.Component {
    static async getInitialProps({ query: { category_id } }) {
        var category = null;
        await getCategory(category_id)
            .then(response => {
                category = response.data;
            })
            .catch(reason=>{
                console.log(reason)
            });
        return { category: category };
    }

    render() {
        if (category === null){
            return <Error statusCode={404}/>
        }
        return ( <p>{this.props.category}</p> );
    }
}

export default withRouter(Category);