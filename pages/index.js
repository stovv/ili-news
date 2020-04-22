import React from 'react';
import { Flex, Box } from 'rebass';

import {TopPosts, NewsPostsComps, CategoryLine, CompsBannerAd} from '../compilations';
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
s
  render() {
    const {topPosts} = this.props;

    return (
      <React.Fragment>
        <TopPosts posts={topPosts}/>
        <NewsPostsComps compilation={Mocks.testPosts} news={Mocks.testPosts} posts={Mocks.testPosts}/>
        <CategoryLine posts={Mocks.testPosts}/>
        <CompsBannerAd posts={Mocks.testPosts} bannerContent={{
            text: "Стань членом клуба 'ИЛИ ПРЕМИУМ' и получай подарки за чтение новостей",
            buttonText: "Присоеденится",
            buttonLink: "/test"
        }} bannerAdContent={{}} />
      </React.Fragment>
    );
  }
}

export default FrontPage;