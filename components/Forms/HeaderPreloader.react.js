import React from 'react';
import NProgress from 'nprogress';
import Router from "next/router";
import PropTypes from 'prop-types';


class HeaderPreloader extends React.Component {
    static defaultProps = {
        startPosition: 0.5,
        stopDelayMs: 200,
    };
    timer = null;

    routeChangeStart = () => {
        NProgress.set(this.props.startPosition);
        NProgress.start();
    };

    routeChangeEnd = () => {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            NProgress.done(true);
        }, this.props.stopDelayMs);
    };

    render() {
        return null;
    }

    componentDidMount() {
        const { options } = this.props;

        if (options) {
            NProgress.configure(options);
        }

        Router.events.on('routeChangeStart', this.routeChangeStart);
        Router.events.on('routeChangeComplete', this.routeChangeEnd);
        Router.events.on('routeChangeError', this.routeChangeEnd);
    }
}

HeaderPreloader.propTypes = {
    startPosition: PropTypes.number,
    stopDelayMs: PropTypes.number,
    options: PropTypes.object,
};

export default HeaderPreloader;