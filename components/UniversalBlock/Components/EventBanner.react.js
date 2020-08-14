import React from 'react';
import { Flex, Box } from "rebass";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import Moment from "react-moment";

const TitleText = styled.span`
  font-family: ${props => props.theme.fontFamily};
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: 1.92px;
  text-transform:  uppercase;
  margin: 0;
  color: ${props=> props.theme.text.secondary};
`;

const ContentText = styled.p`
  font-family: ${props => props.theme.fontFamily};
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  margin: 0;
  letter-spacing: 1.92px;
  color: ${props=> props.theme.text.secondary};
`;

const ContentLink = styled.a`
  font-family: ${props => props.theme.fontFamily};
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  margin: 0;
  letter-spacing: 1.92px;
  color: ${props=> props.theme.text.hover};
  :hover{
    color: ${props=> props.theme.text.secondarySecondary};
  }
`;


class EventBanner extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            text: props.data ? props.data.text: null
        }
    }

    render(){
        const { data, width, theme } = this.props;

        return (
            width > 1023
                ? <Flex height={"320px"} justifyContent={"center"}
                        bg={theme.colors.backgroundSecondary} sx={{position: "relative"}}>
                    <Box my={"auto"} >
                        <Flex justifyContent={"space-between"}  mx={"auto"}>
                            <Box width={1/2}>
                                <TitleText>где</TitleText>
                            </Box>
                            <Box width={1/2}>
                                <ContentText>{data.eventLocation}</ContentText>
                            </Box>
                        </Flex>
                        <Flex justifyContent={"space-between"}  mx={"auto"} mt={"32px"}>
                            <Box width={1/2}>
                                <TitleText>когда</TitleText>
                            </Box>
                            <Box width={1/2}>
                                <ContentText>
                                    <Moment locale="ru" format="DD MMMM YYYY">{data.eventDate}</Moment>
                                </ContentText>
                            </Box>
                        </Flex>
                        <Flex justifyContent={"space-between"}  mx={"auto"} mt={"32px"}>
                            <Box width={1/2}>
                                <TitleText>сколько</TitleText>
                            </Box>
                            <Box width={1/2}>
                                <ContentText>{data.eventPrice}</ContentText>
                            </Box>
                        </Flex>
                        <Flex justifyContent={"space-between"}  mx={"auto"} mt={"32px"}>
                            <Box width={1/2}>
                                <TitleText>ссылка</TitleText>
                            </Box>
                            <Box width={1/2}>
                                <ContentLink href={data.eventLink}>{data.eventLink}</ContentLink>
                            </Box>
                        </Flex>
                    </Box>
                </Flex>
                : <Flex height={"200px"} justifyContent={"center"}
                        bg={theme.colors.backgroundSecondary} sx={{position: "relative"}}>
                    {
                        width >= 725
                            ? <Box my={"auto"} >
                                <Flex justifyContent={"space-between"}  mx={"auto"}>
                                    <Box width={1/2}>
                                        <TitleText>где</TitleText>
                                    </Box>
                                    <Box width={1/2}>
                                        <ContentText>{data.eventLocation}</ContentText>
                                    </Box>
                                </Flex>
                                <Flex justifyContent={"space-between"}  mx={"auto"} mt={"10px"}>
                                    <Box width={1/2}>
                                        <TitleText>когда</TitleText>
                                    </Box>
                                    <Box width={1/2}>
                                        <ContentText>
                                            <Moment locale="ru" format="DD MMMM YYYY">{data.eventDate}</Moment>
                                        </ContentText>
                                    </Box>
                                </Flex>
                                <Flex justifyContent={"space-between"}  mx={"auto"} mt={"10px"}>
                                    <Box width={1/2}>
                                        <TitleText>сколько</TitleText>
                                    </Box>
                                    <Box width={1/2}>
                                        <ContentText>{data.eventPrice}</ContentText>
                                    </Box>
                                </Flex>
                                <Flex justifyContent={"space-between"}  mx={"auto"} mt={"10px"}>
                                    <Box width={1/2}>
                                        <TitleText>ссылка</TitleText>
                                    </Box>
                                    <Box width={1/2}>
                                        <ContentLink href={data.eventLink}>{data.eventLink}</ContentLink>
                                    </Box>
                                </Flex>
                            </Box>
                            : <Box my={"auto"} width={"90%"}>
                                <Flex width={"100%"} justifyContent={"space-between"}  mx={"auto"}>
                                    <Box width={1/2}>
                                        <TitleText>где</TitleText>
                                    </Box>
                                    <Box width={1/2}>
                                        <ContentText>{data.eventLocation}</ContentText>
                                    </Box>
                                </Flex>
                                <Flex justifyContent={"space-between"}  mx={"auto"} mt={"10px"}>
                                    <Box width={1/2}>
                                        <TitleText>когда</TitleText>
                                    </Box>
                                    <Box width={1/2}>
                                        <ContentText>
                                            <Moment locale="ru" format="DD MMMM YYYY">{data.eventDate}</Moment>
                                        </ContentText>
                                    </Box>
                                </Flex>
                                <Flex justifyContent={"space-between"}  mx={"auto"} mt={"10px"}>
                                    <Box width={1/2}>
                                        <TitleText>сколько</TitleText>
                                    </Box>
                                    <Box width={1/2}>
                                        <ContentText>{data.eventPrice}</ContentText>
                                    </Box>
                                </Flex>
                                <Flex justifyContent={"space-between"}  mx={"auto"} mt={"10px"}>
                                    <Box width={1/2}>
                                        <TitleText>ссылка</TitleText>
                                    </Box>
                                    <Box width={1/2}>
                                        {
                                            width > 600
                                             ? <ContentLink href={data.eventLink}>{data.eventLink}</ContentLink>
                                             : <ContentLink href={data.eventLink}>здесь</ContentLink>
                                        }
                                    </Box>
                                </Flex>
                            </Box>
                    }
                </Flex>
        );
    }
}


EventBanner.propTypes = {
    data: PropTypes.object,
}

function mapStateToProps(state){
    return {
        width: state.common.pageSize.width
    }
}

export default connect(mapStateToProps)(withTheme(EventBanner));