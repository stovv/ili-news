import React from 'react';
import Head from "next/head";
import { connect } from 'react-redux';
import { Flex, Box } from 'rebass';

import {
    Cards,
    Containers,
    Form,
    Images,
    Links,
    Menus,
    PostComponents,
    Typography,
    UniversalBlock
} from '../../components';
import {Icons} from "../../assets";
import {getFormatedDate} from "../../tools";
import {withTheme} from "styled-components";


const RegularPost = ({data}) => {
    const { width, title, publishedDate, authors, theme,
        blocks , cover, rubric } = data;

    return (
        <Containers.Default>
            {
                width > 1023
                    ?
                    <>
                        {
                            rubric
                                ? <Typography.Heading level={4} color={theme.text.hover} textTransform="lowercase"
                                                      margin={`32px 0 ${theme.spacing.m} 0`}>{rubric.title}</Typography.Heading>
                                : <Typography.Heading level={4} color={theme.text.hover} textTransform="lowercase"
                                                      margin={`32px 0 ${theme.spacing.m} 0`}>без рубрики</Typography.Heading>
                        }
                        <Typography.Heading level={1} breakWord maxWidth="80%"
                                            margin={`${theme.spacing.m} 0`}>{title}</Typography.Heading>
                    </>
                    :
                    <>
                        <Typography.Heading level={5} color={theme.text.hover} textTransform="lowercase"
                                            margin={`32px 0 ${theme.spacing.m} 0`}>{rubric.title}</Typography.Heading>
                        <Typography.Heading level={3} breakWord margin={`${theme.spacing.m} 0`}>{title}</Typography.Heading>
                    </>
            }
            <Flex mb={theme.spacing.m}>
                <Typography.Heading margin={`auto 0 auto 0`} level={4} color={theme.text.secondary}>{publishedDate}</Typography.Heading>
                {
                    authors && <Form.AuthorList authors={authors}/>
                }
            </Flex>
            {
                rubric ? (rubric.cover && <Images.Lazy cover={cover} width="100%" height={width > 1023 ? "560px" : "229px"}/>)
                    : (cover && <Images.Lazy cover={cover} width="100%" height={width > 1023 ? "560px" : "229px"}/>)
            }
            <Flex mt={["64px"]}>
                <Box width={width > 1023 ? [9/12] : '100%' } pr={width > 1023 ? ["10%"] : '0'}>
                    {
                        blocks &&
                        blocks.blocks.map((item, index)=>
                            <React.Fragment key={index}>
                                <UniversalBlock block={item}/>
                            </React.Fragment>
                        )
                    }
                </Box>
                {
                    width > 1023
                    && <Box width={[3/12]} pl={["2%"]}>
                        <Form.AdBlock width={["100%"]} height={["584px"]} preview/>
                    </Box>
                }
            </Flex>

        </Containers.Default>
    );

};



class Preview extends React.Component {

    componentDidMount() {
        if (typeof window !== "undefined"){
            if (!this.props.isLoggedIn){
                Router.push('/login');
            }
            if (this.props.draft == null ){
                Router.push('/smisl/drafts');
            }
        }
    }

    render(){

        const { draft } = this.props;

        if (draft == null){
            return (<></>);
        }

        const today = new Date();
        const data = {
            ...this.props,
            ...draft,
            publishedDate: getFormatedDate(today.getUTCDate())
        };

        console.log("DRAFT", draft);

        return (
            <>
                <Head>
                    <title>Смысл | Предпросмотр</title>
                </Head>
                <Menus.HeaderRedactor type="preview"/>
                <RegularPost data={data}/>
            </>
        );
    }
}



function mapStateToProps(state){
    return {
        width: state.common.pageSize.width,
        draft: state.smisol.draft,
        isLoggedIn: state.auth.isLoggedIn
    };
}

export default connect(mapStateToProps)(withTheme(Preview));