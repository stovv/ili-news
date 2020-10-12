import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Flex, Box } from 'reflexbox';
import styles from './styles/eventBanner.module.css';

class EventBanner extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            text: props.data ? props.data.text: null
        }
    }

    render(){
        const { data, width } = this.props;

        return (
            width > 1023
                ? <Flex height={"320px"} justifyContent={"center"}
                        bg={"var(--backgroundSecondary)"} sx={{position: "relative"}}>
                    <Box my={"auto"} >
                        <Flex justifyContent={"space-between"}  mx={"auto"}>
                            <Box width={1/2}>
                                <span className={styles.titleText}>где</span>
                            </Box>
                            <Box width={1/2}>
                                <span className={styles.contentText}>{data.eventLocation}</span>
                            </Box>
                        </Flex>
                        <Flex justifyContent={"space-between"}  mx={"auto"} mt={"32px"}>
                            <Box width={1/2}>
                                <span className={styles.titleText}>когда</span>
                            </Box>
                            <Box width={1/2}>
                                <span className={styles.contentText}>
                                    {typeof data.eventDate === "object" ? data.eventDate.full : data.eventDate}
                                </span>
                            </Box>
                        </Flex>
                        <Flex justifyContent={"space-between"}  mx={"auto"} mt={"32px"}>
                            <Box width={1/2}>
                                <span className={styles.titleText}>сколько</span>
                            </Box>
                            <Box width={1/2}>
                                <span className={styles.contentText}>{data.eventPrice}</span>
                            </Box>
                        </Flex>
                        <Flex justifyContent={"space-between"}  mx={"auto"} mt={"32px"}>
                            <Box width={1/2}>
                                <span className={styles.titleText}>ссылка</span>
                            </Box>
                            <Box width={1/2}>
                                <a className={styles.contentLink} href={data.eventLink}>{data.eventLink}</a>
                            </Box>
                        </Flex>
                    </Box>
                </Flex>
                : <Flex height={"200px"} justifyContent={"center"}
                        bg={"var(--backgroundSecondary)"} sx={{position: "relative"}}>
                    {
                        width >= 725
                            ? <Box my={"auto"} >
                                <Flex justifyContent={"space-between"}  mx={"auto"}>
                                    <Box width={1/2}>
                                        <span className={styles.titleText}>где</span>
                                    </Box>
                                    <Box width={1/2}>
                                        <span className={styles.contentText}>{data.eventLocation}</span>
                                    </Box>
                                </Flex>
                                <Flex justifyContent={"space-between"}  mx={"auto"} mt={"10px"}>
                                    <Box width={1/2}>
                                        <span className={styles.titleText}>когда</span>
                                    </Box>
                                    <Box width={1/2}>
                                        <span className={styles.contentText}>
                                            {typeof data.eventDate === "object" ? data.eventDate.full : data.eventDate}
                                        </span>
                                    </Box>
                                </Flex>
                                <Flex justifyContent={"space-between"}  mx={"auto"} mt={"10px"}>
                                    <Box width={1/2}>
                                        <span className={styles.titleText}>сколько</span>
                                    </Box>
                                    <Box width={1/2}>
                                        <span className={styles.contentText}>{data.eventPrice}</span>
                                    </Box>
                                </Flex>
                                <Flex justifyContent={"space-between"}  mx={"auto"} mt={"10px"}>
                                    <Box width={1/2}>
                                        <span className={styles.titleText}>ссылка</span>
                                    </Box>
                                    <Box width={1/2}>
                                        <a className={styles.contentLink} href={data.eventLink}>{data.eventLink}</a>
                                    </Box>
                                </Flex>
                            </Box>
                            : <Box my={"auto"} width={"90%"}>
                                <Flex width={"100%"} justifyContent={"space-between"}  mx={"auto"}>
                                    <Box width={1/2}>
                                        <span className={styles.titleText}>где</span>
                                    </Box>
                                    <Box width={1/2}>
                                        <span className={styles.contentText}>{data.eventLocation}</span>
                                    </Box>
                                </Flex>
                                <Flex justifyContent={"space-between"}  mx={"auto"} mt={"10px"}>
                                    <Box width={1/2}>
                                        <span className={styles.titleText}>когда</span>
                                    </Box>
                                    <Box width={1/2}>
                                        <span className={styles.contentText}>
                                            {typeof data.eventDate === "object" ? data.eventDate.full : data.eventDate}
                                        </span>
                                    </Box>
                                </Flex>
                                <Flex justifyContent={"space-between"}  mx={"auto"} mt={"10px"}>
                                    <Box width={1/2}>
                                        <span className={styles.titleText}>сколько</span>
                                    </Box>
                                    <Box width={1/2}>
                                        <span className={styles.contentText}>{data.eventPrice}</span>
                                    </Box>
                                </Flex>
                                <Flex justifyContent={"space-between"}  mx={"auto"} mt={"10px"}>
                                    <Box width={1/2}>
                                        <span className={styles.titleText}>ссылка</span>
                                    </Box>
                                    <Box width={1/2}>
                                        {
                                            width > 600
                                             ? <a className={styles.contentLink} href={data.eventLink}>{data.eventLink}</a>
                                             : <a className={styles.contentLink} href={data.eventLink}>здесь</a>
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

export default connect(mapStateToProps)(EventBanner);