import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from "styled-components";
import { Flex, Box } from 'rebass';

import { Icons } from '../../assets';
import { CardText } from '../Typography';
import {Typography} from "../index";
import {Public} from "../../api";


class LikeBar extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            likes: props.rating.likes,
            dislikes: props.rating.dislikes,
        }
        this.likeUp = this.likeUp.bind(this);
        this.dislikeUp = this.dislikeUp.bind(this);
    }
    iconStyle = {
        margin: "auto 9px auto 0",
        transition: "all 0.4s ease 0s",
        cursor: "pointer"
    }

    likeUp(){
        Public.likeUp(this.props.rating.id, this.props.clientId)
            .then(response=>{
                this.setState({
                    likes: response.data.likes,
                    dislikes: response.data.dislikes
                });
            })
            .catch(reason=>{
                console.log(reason);
            })
    }

    dislikeUp(){
        Public.dislikeUp(this.props.rating.id, this.props.clientId)
            .then(response=>{
                this.setState({
                    likes: response.data.likes,
                    dislikes: response.data.dislikes
                });
            })
            .catch(reason=>{
                console.log(reason);
            })
    }

    render(){
        const { theme } = this.props;
        return(
            <Flex>
                <Box display="flex" mr="14px">
                    <Icons.LikeIcon style={this.iconStyle} onClick={()=>this.likeUp()}/>
                    {
                        this.state.likes > 0 &&
                        <CardText type="normal" margin="0" color={theme.text.secondary}>{this.state.likes}</CardText>
                    }
                </Box>
                <Box display="flex">
                    <Icons.DisLikeIcon style={this.iconStyle} onClick={()=>this.dislikeUp()}/>
                    {
                        this.state.dislikes > 0 &&
                        <CardText type="normal" margin="0" color={theme.text.secondary}>{this.state.dislikes}</CardText>
                    }
                </Box>
            </Flex>
        );
    }
}

LikeBar.propTypes = {
    rating: PropTypes.object.isRequired,
    clientId: PropTypes.string.isRequired,
}

export default withTheme(LikeBar);