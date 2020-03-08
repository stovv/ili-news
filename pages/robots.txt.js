import React from "react";

export default class Robots extends React.Component {
    static getInitialProps({ res }) {
        res.setHeader("Content-Type", "text/plain");
        res.write(`Sitemap: ${process.env.SITE_ROOT || 'http://localhost:3000'}/api/sitemap.xml

User-agent: *
Allow: /*
Allow: /post/*
Allow: /category/*

Disallow: /api/*`);
        res.end();
    }
}