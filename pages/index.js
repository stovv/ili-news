import React from 'react';
import Head from 'next/head';

class FrontPage extends React.Component {
  static async getInitialProps() {
    return {  };
  }

  render() { 
    return ( <p>Text</p> );
  }
}

export default FrontPage;