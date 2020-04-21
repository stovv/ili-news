import React from 'react';
import { Flex, Box } from 'rebass';

import { TopPosts, NewsPostsComps } from '../compilations';
import { Containers } from '../components';
import { BACKEND_URL } from '../constants';
import { Public } from '../api';
import { Mocks } from '../assets';




class FrontPage extends React.Component {
  static async getInitialProps() {
    var topPosts = [];
    await Public.fetchTopPosts()
      .then(response=>{
        topPosts = response.data.tops ? response.data.tops : [];
      })
      .catch(reason=>{
        console.log("REASON", reason.response);
      });
    return { topPosts };
  }

  render() {
    const {topPosts} = this.props;
    console.log(JSON.stringify(topPosts[0]));
    return (
      <React.Fragment>
        <TopPosts posts={topPosts}/>
        <NewsPostsComps compilation={Mocks.testPosts} news={Mocks.testPosts} posts={Mocks.testPosts}/>
      </React.Fragment>
    );
  }
}

export default FrontPage;