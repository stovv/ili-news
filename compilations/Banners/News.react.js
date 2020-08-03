import React from 'react';
import PropTypes from 'prop-types';
import {Box} from 'rebass';
import { connect } from 'react-redux';
import styled, {withTheme} from 'styled-components';
import { Typography, Links } from '../../components';


const Divider = styled.hr`
    border-radius: 0;
    border: none;
    background-color: ${props=>props.theme.colors.backgroundInvert};
    color: ${props=>props.theme.colors.backgroundInvert};
    height: 1px;
    margin: ${props=> props.theme.spacing.block} 0;
`;


const Block = ({title, createdDate, divider, theme, slug, width})=>{
    var date = new Date(createdDate);
    const publishDate = date.toLocaleString("ru-RU", { year: 'numeric', month: 'long', day: 'numeric' }).replace('г.', '');

    if ( width > 1023 ){
        return(
            <>
                <Links.PostLink postSlug={slug}>
                    <Typography.CardText type="small"
                                         maxWidth="255px"
                                         maxHeight="38px"
                                         hideOwerflow
                                         maxLines={2}
                                         hover
                                         color={theme.text.secondarySecondary}
                                         margin={`0 0 ${theme.spacing.xs} 0`}>{title}</Typography.CardText>
                </Links.PostLink>
                <Typography.TagLabel type="small"
                                     color={theme.text.secondary}
                                     margin={`${theme.spacing.xs} 0 0 0`}>{publishDate}</Typography.TagLabel>
                {
                    divider &&
                    <Divider />
                }
            </>
        );
    }else{
        return(
            <>
                <Links.PostLink postSlug={slug}>
                    <Typography.CardText type="small"
                                         maxHeight="38px"
                                         hideOwerflow
                                         maxLines={2}
                                         hover
                                         color={theme.text.secondarySecondary}
                                         margin={`0 0 ${theme.spacing.xs} 0`}>{title}</Typography.CardText>
                </Links.PostLink>
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


}


class NewsBlock extends React.Component
{
    render(){
        const { news, theme, width } = this.props;

        if ( news.length === 0 ) return null;

        if ( width > 1023 ){
            return(
                <Box bg={theme.colors.backgroundSecondary} px={theme.spacing.m} py={["24px"]} maxWidth={["296px"]}
                     sx={{float: "right"}}>
                    <Links.RubricLink rubricSlug="news">
                        <Typography.Heading level={4} margin="0 0 32px 0"
                                            color={theme.text.hover}
                                            textTransform="uppercase">
                            Новости города
                        </Typography.Heading>
                    </Links.RubricLink>
                    {
                        news.slice(0,6).map((item, index) =>
                            <React.Fragment key={index}>
                                <Block theme={theme}
                                       title={item.title}
                                       createdDate={item.publish_at}
                                       slug={item.slug}
                                       divider={index < news.slice(0,6).length-1}/>
                            </React.Fragment>
                        )
                    }
                </Box>
            );
        }else{
            return(
                <Box bg={theme.colors.backgroundSecondary} px={theme.spacing.m} py={["24px"]}>
                    <Links.RubricLink rubricSlug="news">
                        <Typography.Heading level={4} margin="0 0 32px 0"
                                            color={theme.text.hover}
                                            textTransform="uppercase">
                            Новости города
                        </Typography.Heading>
                    </Links.RubricLink>
                    {
                        news.slice(0,6).map((item, index) =>
                            <React.Fragment key={index}>
                                <Block theme={theme}
                                       width={width}
                                       title={item.title}
                                       createdDate={item.publish_at}
                                       slug={item.slug}
                                       divider={index < news.slice(0,6).length-1}/>
                            </React.Fragment>
                        )
                    }
                </Box>
            );
        }
    };
}



NewsBlock.propTypes = {
    news: PropTypes.array.isRequired,
}

function mapStateToProps(state){
    return{
        width: state.common.pageSize.width
    }
}

export default  connect(mapStateToProps)(withTheme(NewsBlock));