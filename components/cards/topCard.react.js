import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import Tag from '../tag.react';
import {BACKEND_URL} from '../../tools/constants';

const CardBox = styled.div`
  height: 350px;
  border-radius: 24px;
  margin: 0 auto;
  display: block;
  position: relative;

  background-image: 
    linear-gradient(to top, rgba(34, 34, 34, 0.72), rgba(255, 255, 255, 0)),
    url(${props=>props.img});

  background-size: cover;
  box-shadow: 0 0 16px 0 rgba(94, 16, 16, 0.32);
  transition: all .2s ease-in-out;

  :hover{
    box-shadow: none;
    transform: scale(0.95);
  }
`

const CardText = styled.p`
  font-family: ${props=>props.theme.fontFamily};
  font-size: 24px;
  font-weight: ${props=> props.theme.fontWeights.link};
  color: #ffffff;
  margin-top: 2%;
`

const BottomBox = styled.div`
  position:absolute;
  bottom:0;
  padding: 0 32px;
`;

class TopCard extends React.Component{

    render(){
        const {post} = this.props;
        return(
          <Link href={`/post/${post.id}`}>
            <a>
              <CardBox img={`${BACKEND_URL}/${post.cover.url}`}>
                <BottomBox>
                  <Tag color={post.tag.color}>
                    {post.tag.name}
                  </Tag>
                  <CardText>
                    {post.title}
                  </CardText>
                </BottomBox>
              </CardBox>
            </a>
          </Link>
        );
    }

}

/**/


export default TopCard;