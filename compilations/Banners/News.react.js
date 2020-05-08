import React from 'react';
import PropTypes from 'prop-types';
import {Box} from 'rebass';
import styled, {withTheme} from 'styled-components';
import { Typography } from '../../components';
import {PostLink} from "../../components/Links.react";


const Divider = styled.hr`
    border-radius: 0;
    border: none;
    background-color: ${props=>props.theme.colors.backgroundInvert};
    color: ${props=>props.theme.colors.backgroundInvert};
    height: 1px;
    margin: ${props=> props.theme.spacing.block} 0;
`;


const Block = ({title, createdDate, divider, theme, id})=>{
    var date = new Date(createdDate);
    const publishDate = date.toLocaleString("ru-RU", { year: 'numeric', month: 'long', day: 'numeric' }).replace('г.', '');
    return(
        <>
            <PostLink postId={id}>
            <Typography.CardText type="small"
                                 maxWidth="255px"
                                 maxHeight="38px"
                                 hideOwerflow
                                 maxLines={2}
                                 hover
                                 color={theme.text.secondarySecondary}
                                 margin={`0 0 ${theme.spacing.xs} 0`}>{title}</Typography.CardText>
            </PostLink>
            <Typography.TagLabel type="small"
                                 color={theme.text.secondary}
                                 margin={`${theme.spacing.xs} 0 0 0`}>{publishDate}</Typography.TagLabel>
            {
                divider &&
                <Divider />
            }
        </>
    );
}


class NewsBlock extends React.Component
{
    render(){
        const { news, theme } = this.props;

        return(
            <Box bg={theme.colors.backgroundSecondary} px={theme.spacing.m} py={["24px"]} maxWidth={["296px"]}
            sx={{float: "right"}}>
                <Typography.Heading level={4} margin="0 0 32px 0"
                                    color={theme.text.hover}
                                    textTransform="uppercase">
                    Новости города
                </Typography.Heading>
                {
                    news.slice(0,6).map((item, index) =>
                        <React.Fragment>
                            <Block theme={theme}
                                   title={item.title}
                                   createdDate={item.publish_at}
                                   id={item.id}
                                   divider={index < news.slice(0,6).length-1}/>
                        </React.Fragment>
                    )
                }
            </Box>
        );
    };
}



NewsBlock.propTypes = {
    news: PropTypes.object.isRequired,
}

export default withTheme(NewsBlock);