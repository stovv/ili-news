import React from 'react';
import PropTypes from 'prop-types';

import { Icons } from '../../assets';
import { CardText } from '../Typography';
import {Public} from "../../api";
import {connect} from "react-redux";
import { Flex, Box } from 'reflexbox';


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

    likeUp(){
        Public.likeUp(this.props.rating.id, this.props.clientId)
            .then(response=>{
                this.setState({
                    likes: response.data.likes,
                    dislikes: response.data.dislikes
                });
            })
            .catch(reason=>{
                //console.log(reason);
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
                //console.log(reason);
            })
    }

    render(){
        const { width } = this.props;

        return(
            <Flex>
                <Box display="flex" mr={"14px"}>
                    <Icons.LikeIcon style={{
                        margin: width > 1023 ? "auto 9px auto 0" : "auto 4px auto 0",
                        transition: "all 0.4s ease 0s",
                        cursor: "pointer"
                    }} onClick={()=>this.likeUp()}/>
                    {
                        this.state.likes > 0 &&
                        <CardText type="normal" margin="0" color={"var(--text-secondary)"}>{this.state.likes}</CardText>
                    }
                </Box>
                <Box display="flex">
                    <Icons.DisLikeIcon style={{
                        margin: width > 1023 ? "auto 9px auto 0" : "auto 4px auto 0",
                        transition: "all 0.4s ease 0s",
                        cursor: "pointer"
                    }} onClick={()=>this.dislikeUp()}/>
                    {
                        this.state.dislikes > 0 &&
                        <CardText type="normal" margin="0" color={"var(--text-secondary)"}>{this.state.dislikes}</CardText>
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


function mapStateToProps(state){
    return{
        width: state.common.pageSize.width
    }
}


export default connect(mapStateToProps)(LikeBar);