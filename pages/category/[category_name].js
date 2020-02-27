import React from 'react';
import { withRouter } from 'next/router';


class Category extends React.Component {
    static async getInitialProps({ query: { category_name } }) {
        return { category_name: category_name };
    }

    render() {
        return ( <h1>Comment: {this.props.category_name}</h1> );
    }
}

export default withRouter(Category);