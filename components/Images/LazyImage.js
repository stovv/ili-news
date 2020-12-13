import dynamic from "next/dynamic";
import { Component, Fragment } from 'react';
import { oneOfType, oneOf, string, object, bool } from 'prop-types';

import { getImageLink } from '../../tools';
const Skeleton = dynamic(() => import("react-loading-skeleton"));

class LazyImage extends Component {
    constructor(props) {
        super(props);
        this.state = { loaded: false }
        this.Thumb = null;
        this.Cover = props.cover;

        if ( typeof props.cover === 'object' && props.typeFull === 'min'){
            this.Cover = getImageLink(props.cover, 'min')['url'];
        } else if (typeof props.cover === "object"){
            this.Thumb = getImageLink(props.cover, 'min')['url'];
            this.Cover = getImageLink(props.cover, props.typeFull)['url'];
        }
    }

    componentDidMount() {
        const img = new Image();
        img.onload = () => this.setState({loaded: true});
        img.src = `${this.Cover}`;
    }

    render(){
        const { children: Component = Fragment, skeleton } = this.props;
        const { loaded } = this.state;
        if ( this.Thumb === null && !skeleton) return <Component url={this.Cover}/>;

        if ( loaded ){
            return <Component url={this.Cover}/>
        }
        return skeleton
            ? <Component><Skeleton width={"100%"} height={"100%"}/></Component>
            : <Component url={this.Thumb}/>

    }
}

LazyImage.propTypes = {
    cover: oneOfType([
        string, object
    ]).isRequired,
    typeFull: oneOf([
        "min", "medium", "full"
    ]),
    skeleton: bool
};

LazyImage.defaultProps = {
    typeFull: "full",
    skeleton: false
};

export default LazyImage;