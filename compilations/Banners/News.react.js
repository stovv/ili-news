import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './styles/news.module.css';
import { Typography, Links } from '../../components';
import { Box } from 'reflexbox';


const Divider = () => <hr className={styles.divider}/>

const Block = ({title, createdDate, divider, slug, width})=>{
    let date = new Date(createdDate);
    const publishDate = date.toLocaleString("ru-RU", { year: 'numeric', month: 'long', day: 'numeric' }).replace('г.', '');

    if ( width > 1023 ){
        return(
            <>
                <Links.PostLink postSlug={slug}>
                    <Typography.CardText type="small"
                                         maxWidth="255px"
                                         maxHeight="38px"
                                         maxLines={2}
                                         hover
                                         color={"var(--text-secondarySecondary)"}
                                         margin={`0 0 var(--spacing-xs) 0`}>{title}</Typography.CardText>
                </Links.PostLink>
                <Typography.TagLabel type="small"
                                     color={"var(--text-secondary)"}
                                     margin={`var(--spacing-xs) 0 0 0`}>{publishDate}</Typography.TagLabel>
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
                                         maxLines={2}
                                         hover
                                         color={"var(--text-secondarySecondary)"}
                                         margin={`0 0 var(--spacing-xs) 0`}>{title}</Typography.CardText>
                </Links.PostLink>
                <Typography.TagLabel type="small"
                                     color={"var(--text-secondary)"}
                                     margin={`var(--spacing-xs) 0 0 0`}>{publishDate}</Typography.TagLabel>
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
        const { news, width } = this.props;

        if ( news.length === 0 ) return null;

        if ( width > 1023 ){
            return(
                <Box bg={"var(--backgroundSecondary)"} px={"var(--spacing-m)"} py={"24px"} maxWidth={"296px"}
                     sx={{float: "right"}}>
                    <Links.RubricLink rubricSlug="news">
                        <Typography.Heading level={4} margin="0 0 32px 0"
                                            color={"var(--text-hover)"}
                                            textTransform="uppercase">
                            Новости города
                        </Typography.Heading>
                    </Links.RubricLink>
                    {
                        news.slice(0,6).map((item, index) =>
                            <React.Fragment key={index}>
                                <Block title={item.title}
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
                <Box bg={"var(--backgroundSecondary)"} px={"var(--spacing-m)"} py={"24px"}>
                    <Links.RubricLink rubricSlug="news">
                        <Typography.Heading level={4} margin="0 0 32px 0"
                                            color={"var(--text-hover)"}
                                            textTransform="uppercase">
                            Новости города
                        </Typography.Heading>
                    </Links.RubricLink>
                    {
                        news.slice(0,6).map((item, index) =>
                            <React.Fragment key={index}>
                                <Block width={width}
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
};

export default connect(mapStateToProps)(NewsBlock);