import React from 'react';

import { SITE_URL } from '../../constants';

// vk sometimes uses / amp / [post Slug] instead of amp = 1
class AmpPost extends React.Component{
    static async getInitialProps({ query: { postSlug, }, req, res }) {
        if (req) {
            res.writeHead(302, { Location: `${SITE_URL}/${postSlug}` });
            res.end();
        }
        return {}
    }

    render(){return <></>}
}

export default AmpPost;