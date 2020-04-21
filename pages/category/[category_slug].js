import React from 'react';
import { withRouter } from 'next/router';
import {connect} from 'react-redux';
import Error from '../_error';
import {Public} from '../../api';


class Category extends React.Component {
    static async getInitialProps({ query: { category_slug } }) {
        var category_id = null;
        await Public.fetchCategories(['slug', 'id'])
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
                await Public.getCategory(category_id)
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
        // TODO Use this.props.user for head component
        if (this.props.category === null){
            return (<Error statusCode={404}/>);
        }
        return (
            <>
            <Head>
                <title>{this.props.category.title}</title>
                <meta name="description" content={this.props.category.description}/>
            </Head>
            <p>{this.props.category.title}</p>
            </>
        );
    }
}

function mapStateToProps(state){
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(withRouter(Category));