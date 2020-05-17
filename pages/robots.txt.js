import React from "react";
import {SITE_URL} from "../constants";

class Robots extends React.Component {
    static getInitialProps({ res }) {
        res.setHeader("Content-Type", "text/plain");
        res.write(`Sitemap: ${SITE_URL}/api/sitemap.xml

User-agent: *
Allow: /*
Allow: /post/*
Allow: /category/*

Disallow: /api/*
Disallow: /smisl
Disallow: /smisl/*`);
        res.end();
    }
}

export default Robots;