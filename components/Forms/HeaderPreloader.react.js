import React from 'react';
import NProgress from 'nprogress';
import Router from "next/router";
import PropTypes from 'prop-types';
import {withTheme} from 'styled-components';


class HeaderPreloader extends React.Component {
    static defaultProps = {
        startPosition: 0.5,
        stopDelayMs: 200,
        height: 4,
        showSpinner: false
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
        const { height, theme } = this.props;

        return (
            <style jsx global>{`
        #nprogress {
          pointer-events: none;
        }
        #nprogress .bar {
          background: linear-gradient(90deg, ${theme.colors.primary} 0%, #e34211 100%);;
          position: fixed;
          z-index: 1031;
          top: 0;
          left: 0;
          width: 100%;
          height: ${height}px;
        }
        #nprogress .peg {
          display: block;
          position: absolute;
          right: 0;
          width: 100px;
          height: 100%;
          box-shadow: 0 0 10px ${theme.colors.primary}, 0 0 5px ${theme.colors.primary};
          opacity: 1;
          -webkit-transform: rotate(3deg) translate(0px, -4px);
          -ms-transform: rotate(3deg) translate(0px, -4px);
          transform: rotate(3deg) translate(0px, -4px);
        }
        #nprogress .spinner {
          display: block;
          position: fixed;
          z-index: 1031;
          top: 15px;
          right: 15px;
        }
        #nprogress .spinner-icon {
          width: 18px;
          height: 18px;
          box-sizing: border-box;
          border: solid 2px transparent;
          border-top-color: ${theme.colors.primary};
          border-left-color: ${theme.colors.primary};
          border-radius: 50%;
          -webkit-animation: nprogresss-spinner 400ms linear infinite;
          animation: nprogress-spinner 400ms linear infinite;
        }
        .nprogress-custom-parent {
          overflow: hidden;
          position: relative;
        }
        .nprogress-custom-parent #nprogress .spinner,
        .nprogress-custom-parent #nprogress .bar {
          position: absolute;
        }
        @-webkit-keyframes nprogress-spinner {
          0% {
            -webkit-transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
          }
        }
        @keyframes nprogress-spinner {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>);
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

export default withTheme(HeaderPreloader);