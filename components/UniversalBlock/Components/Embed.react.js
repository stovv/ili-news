import React from 'react';
import {Box} from "rebass";
import Iframe from 'react-iframe'
import PropTypes from 'prop-types';
import EmbedTool from 'react-embed';
import { connect } from 'react-redux';


class Embed extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            text: props.data ? props.data.text: null
        }
    }

    render(){
        const { data, width } = this.props;
        if (typeof window === "undefined"){
            return null;
        }
        // TODO Add Caption data.caption

        if (data.service.includes("yandex")){
            return(
                width > 1023
                    ?
                    <Box mt="35px" mb="40px">
                        <Iframe url={data.embed}
                                width={data.width}
                                height={data.height}
                                display="initial"
                                position="relative"/>
                    </Box>
                    :
                    <Box mt="50px" mb="50px">
                        <Iframe url={data.embed}
                                width="100%"
                                height={data.height}
                                display="initial"
                                position="relative"/>
                    </Box>
            )
        }

        return (
            width > 1023
                ?
                <Box mt="35px" mb="40px" className="embedBlock">
                    <style jsx global>{`
                        .instagram-media-rendered{
                            max-width: unset !important;
                        }
                        .embedBlock twitter-widget, iframe{
                            width: 100% !important;
                        }
                    `}</style>
                    <EmbedTool url={data.source} width="100%"/>
                </Box>
                :
                <Box mt="50px" mb="50px" mx="auto" className="embedBlock">
                    <style jsx global>{`
                        .instagram-media-rendered{
                            margin: 0 auto !important;
                        }
                        .embedBlock twitter-widget{
                            margin: 0 auto !important;
                        }
                    `}</style>
                    <EmbedTool url={data.source}/>
                </Box>
        );

    }
}


Embed.propTypes = {
    data: PropTypes.object,
}

function mapStateToProps(state){
    return {
        width: state.common.pageSize.width
    }
}


export default connect(mapStateToProps)(Embed);