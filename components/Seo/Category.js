import React from "react";
import PropTypes from 'prop-types';
//import { NextSeo } from "next-seo";

import { BACKEND_URL, SITE_URL, SITE_INFO } from "../../constants";


class CategorySeo extends React.Component{
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.category.title !== nextProps.category.title;
    }

    render(){
        const { category } = this.props;

        return (
            <></>
            // <NextSeo title={category.title}
            //          canonical={`${SITE_URL}/category/${category.slug}`}
            //          openGraph={{
            //              url: `${SITE_URL}/category/${category.slug}`,
            //              locale: 'ru_RU',
            //              type: "website",
            //              title: category.title,
            //              site_name: SITE_INFO.TITLE
            //          }}
            //          twitter={{
            //              handle: '@handle',
            //              site: '@site',
            //              cardType: 'summary_large_image',
            //          }}/>
        );
    }
}

CategorySeo.propTypes = {
    category: PropTypes.object.isRequired
}

export default CategorySeo;