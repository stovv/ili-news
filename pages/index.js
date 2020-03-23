import React from 'react';
import {Flex, Box} from 'rebass';
import {withTheme} from 'styled-components';

import {fetchTop} from '../api';
import {TopCard} from '../components';


class FrontPage extends React.Component {
  static async getInitialProps() {
    var top_posts = [];
    await fetchTop()
      .then(response=>{
        top_posts = response.data.data.tops ? response.data.data.tops : [];
      })
      .catch(reason=>{
        console.log("REASON", reason.response);
      });
    return { top: top_posts};
  }

  render() {
    const {top} = this.props;
    return (
      <Box py={64} bg={this.props.theme.colors.primary} >
        <Flex style={{maxWidth: '1700px'}} mx='auto'>
          {top.map((item, index)=>
            <React.Fragment key={index}>
              <Box width={1/3} mx={20}>
                <TopCard post={item.post}/>
              </Box>
            </React.Fragment>
          )}
        </Flex>
      </Box>
    );
  }
}

export default withTheme(FrontPage);