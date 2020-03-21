import React from 'react';
import styled from 'styled-components';

import Tag from '../tag.react';
import {BACKEND_URL} from '../../tools/constants';

const CardBox = styled.div`
  max-width: 413px;
  height: 464px;
  border-radius: 16px;
  margin: 0 auto;
  display: block;
  position: relative;

  background-image: 
    linear-gradient(to top, rgba(34, 34, 34, 0.72), rgba(255, 255, 255, 0)),
    url(${props=>props.img});

  background-size: cover;
  box-shadow: 0 0 16px 0 rgba(94, 16, 16, 0.56);
  transition: all .2s ease-in-out;

  :hover{
    box-shadow: none;
    transform: scale(0.95);
  }
`

const CardText = styled.p`
  font-family: Helvetica;
  font-size: 28px;
  font-weight: bold;
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
            <a href={`/post/${post.id}`}>
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
        );
    }

}

/**/


export default TopCard;