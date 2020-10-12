import React from 'react';
import PropTypes from 'prop-types';


import { Heading } from "../../Typography";
import { PostLink } from '../../Links.react';
import Emoji from "../../Emoji";
import { Flex, Box } from 'reflexbox';


class ReadMore extends React.Component {

    shouldComponentUpdate() {
        return !this.props.post;
    }

    render(){
        const { post, data } = this.props;

        if (data == null || data.length === 0){
            return null;
        }
        return (
            <Box bg={"var(--backgroundSecondary)"} px={"var(--spacing-block)"} py={"24px"} mb={"46px"}>
                <Flex mb={"31px"}>
                    <Heading level={3} color={"var(--text-primary)"} margin="0 10px 0 0">
                        {
                            post
                                ? "Читать также"
                                : "Похожие статьи"
                        }
                    </Heading>
                    <Emoji emoji={"🤔"} size={36}/>
                </Flex>
                {
                    // TODO Add Link
                    data.map((item, index) =>{
                        if ( item.post != null ){
                            item = item.post;
                        }
                        return(
                            <React.Fragment key={index}>
                                <PostLink postSlug={item.slug}>
                                    <Heading level={4} margin={`0 0 var(--spacing-m) 0`} hover
                                             color={"var(--text-secondary)"}>{item.title}</Heading>
                                </PostLink>
                            </React.Fragment>
                        );
                    })
                }
            </Box>
        );
    }
}

ReadMore.propTypes = {
    post: PropTypes.bool,
    data: PropTypes.array.isRequired,
}

export default ReadMore;