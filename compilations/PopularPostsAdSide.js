import React from "react";


class AdWithPopularPosts extends React.Component{
    render() {
        return null;
    }
}

/*
* {
                        width > 1023
                        && <Box width={[3/12]} pl={["2%"]} >
                            <Box sx={{
                                position: "sticky",
                                top: "20px"
                            }}>
                                <Form.AdBlock id={'R-A-351229-6'} width={["100%"]} height={["584px"]}/>
                                {
                                    popularPosts.length > 0 &&
                                    <>
                                        <Typography.CardText type="large" weight="bold" margin="59px 0 30px 0">Лучшее за неделю</Typography.CardText>
                                        {
                                            popularPosts.slice(0, 4).map((item, index)=>
                                                <React.Fragment key={index}>
                                                    <Box mb="48px">
                                                        <Cards.Mini heading={item.post.rubric.title} cover={item.post.cover} slug={item.post.slug}>
                                                            {item.post.title}
                                                        </Cards.Mini>
                                                    </Box>
                                                </React.Fragment>
                                            )

                                        }
                                    </>
                                }
                            </Box>
                        </Box>
                    }
*
* */

export default AdWithPopularPosts;