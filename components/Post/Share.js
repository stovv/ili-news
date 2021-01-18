import React from "react";
import dynamic from 'next/dynamic';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {BACKEND_URL, SITE_URL} from "../../constants";
// const YandexShare = dynamic(import("react-yandex-share"));



class Share extends React.Component{
    state={
        refresh: false
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return this.props.slug !== nextProps.slug || nextState.refresh !== this.state.refresh
    //         || nextProps.width !== this.props.width;
    // }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ( !this.state.refresh && prevState.refresh === this.state.refresh ){
            this.setState({refresh: true})
        }
    }

    render(){
        const { children: title, cover, slug, width } = this.props;

        if ( this.state.refresh ){
            this.setState({refresh: false});
            return null;
        }
        return null;
        // return (
        //     <YandexShare
        //         content={{ title, image: `${BACKEND_URL}${cover.url}`, url: `${SITE_URL}/${slug}` }}
        //         theme={{ lang: 'ru', limit: width > 600 ? 3 : 0, size: "m", popupPosition: "outer",
        //             services: 'vkontakte,facebook,odnoklassniki,twitter,viber,whatsapp,telegram' }}
        //     />
        // );
    }
}

function mapStateToProps(state){
    return {
        width: state.common.pageSize.width
    }
}

Share.propTypes = {
    slug: PropTypes.string,
    cover: PropTypes.object
}


export default connect(mapStateToProps)(Share);