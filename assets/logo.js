import React from 'react';

const Logo = ({primary, background}) =>
        <svg viewBox="0 0 160 160" fill="none" vectorEffect="non-scaling-stroke" >
            <path d="M0 0H160V160H0V0Z" fill={background}/>
            <path d="M26 26.4248C26 25.6379 26.6404 25 27.4305 25H34.2252C35.0152 25 35.6556 25.6379 35.6556 26.4248V70.7257C35.6556 71.6777 36.8112 72.1545 37.4871 71.4813L45.7123 63.2885C45.9135 63.0881 46.0265 62.8163 46.0265 62.5329V26.4248C46.0265 25.6379 46.6669 25 47.457 25H54.9669C55.7569 25 56.3974 25.6379 56.3974 26.4248V132.575C56.3974 133.362 55.7569 134 54.9669 134H47.457C46.6669 134 46.0265 133.362 46.0265 132.575V78.1493C46.0265 77.1973 44.8709 76.7205 44.195 77.3937L35.9699 85.5865C35.7687 85.7869 35.6556 86.0587 35.6556 86.3421V132.575C35.6556 133.362 35.0152 134 34.2252 134H27.4305C26.6404 134 26 133.362 26 132.575V26.4248Z" fill={primary}/>
            <path d="M103.96 26.4248C103.96 25.6379 104.601 25 105.391 25H112.185C112.975 25 113.616 25.6379 113.616 26.4248V70.7257C113.616 71.6777 114.771 72.1545 115.447 71.4813L124.03 62.9323C124.231 62.7319 124.344 62.4601 124.344 62.1767V26.4248C124.344 25.6379 124.985 25 125.775 25H132.57C133.36 25 134 25.6379 134 26.4248V132.575C134 133.362 133.36 134 132.57 134H125.775C124.985 134 124.344 133.362 124.344 132.575V77.7931C124.344 76.8411 123.189 76.3643 122.513 77.0375L113.93 85.5865C113.729 85.7869 113.616 86.0587 113.616 86.3421V132.575C113.616 133.362 112.975 134 112.185 134H105.391C104.601 134 103.96 133.362 103.96 132.575V26.4248Z" fill={primary}/>
            <path d="M84.2914 34.6176C84.8839 34.6176 85.3642 35.0961 85.3642 35.6863V132.575C85.3642 133.362 86.0047 134 86.7947 134H93.5894C94.3794 134 95.0199 133.362 95.0199 132.575V26.4248C95.0199 25.6379 94.3794 25 93.5894 25H65.2662C64.4762 25 63.8358 25.6379 63.8358 26.4248L63.8488 119.789C63.8489 120.705 63.7154 121.645 63.1743 122.387C62.1343 123.812 60.4473 124.739 58.543 124.739C58.148 124.739 57.8278 125.058 57.8278 125.451V133.288C57.8278 133.681 58.148 134 58.543 134C65.7232 134 71.7992 128.982 73.2909 122.274C73.4521 121.549 73.4914 120.804 73.4914 120.061V35.6863C73.4914 35.0961 73.9717 34.6176 74.5642 34.6176L84.2914 34.6176Z" fill={primary}/>
        </svg>;

export default Logo;