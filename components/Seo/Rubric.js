import React from "react";
import PropTypes from 'prop-types';
import { NextSeo } from "next-seo";

import { BACKEND_URL, SITE_URL, SITE_INFO } from "../../constants";


class RubricSeo extends React.Component{
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false;
    }

    render(){
        const { rubric } = this.props;

        return (
            <NextSeo title={rubric.title}
                     description={rubric.subtitle}
                     canonical={`${SITE_URL}/rubric/${rubric.slug}`}
                     openGraph={{
                         url: `${SITE_URL}/rubric/${rubric.slug}`,
                         locale: 'ru_RU',
                         type: "website",
                         title: rubric.title,
                         description: rubric.subtitle,
                         site_name: SITE_INFO.TITLE
                     }}
                     twitter={{
                         handle: '@handle',
                         site: '@site',
                         cardType: 'summary_large_image',
                     }}/>
        );
    }
}

RubricSeo.propTypes = {
    rubric: PropTypes.object.isRequired
}

export default RubricSeo;