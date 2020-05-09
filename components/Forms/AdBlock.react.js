import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'rebass';
import { Emoji } from "emoji-mart";
import { withTheme } from "styled-components";
import { Typography } from "../index";


class YandexRTB extends React.Component {
    componentDidMount(){

        const {id, uid, infinity} = this.props;

        const yaScript = document.createElement('script')
        yaScript.setAttribute('type', 'text/javascript')
        yaScript.innerHTML = `(function(w, d, n, s, t) {
            w[n] = w[n] || [];
            w[n].push(function() {
                Ya.Context.AdvManager.render({
                    blockId: "${id}",
                    async: true,
                    ${infinity ? `renderTo: "yandex_rtb_${id}_${uid}"` : `renderTo: "yandex_rtb_${id}"`},
                    ${infinity && `pageNumber: ${uid}`}
                });
            });
            t = d.getElementsByTagName("script")[0];
            s = d.createElement("script");
            s.type = "text/javascript";
            s.src = "//an.yandex.ru/system/context.js";
            s.async = true;
            t.parentNode.insertBefore(s, t);
        })(this, this.document, "yandexContextAsyncCallbacks");
        `
        document.head.appendChild(yaScript);
    }

    render(){
        const { id, infinity, uid, width, height, theme } = this.props;
        return(
            <Box  width={width} height={height} bg={theme.colors.backgroundInvert} sx={{position: 'relative'}}>
                <Box style={{top: "50%", left: "50%", marginRight: "-50%", position: 'absolute',
                    transform: "translate(-50%, -50%)", zIndex: 1}}>
                    <Emoji emoji='money_mouth_face' set='apple' size={50}/>
                    <Typography.Heading margin={`10px 0`} level={1} color={theme.text.onPrimary}>
                        РЕК<br/>
                        ЛАМА
                    </Typography.Heading>
                    <Emoji emoji='money_with_wings' set='apple' size={50} />
                </Box>
                <div id={infinity ? `yandex_rtb_${id}_${uid}` : `yandex_rtb_${id}`} style={{
                    position: 'relative',
                    overflow: 'hidden',
                    width: '100%',
                    height: '100%'
                }}>
                </div>
            </Box>
        );
    }
}

YandexRTB.propTypes = {
    id: PropTypes.string.isRequired,
    infinity: PropTypes.bool,
    uid: PropTypes.number,
    height: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.array
    ]).isRequired,
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.array
    ]).isRequired,
}

export default withTheme(YandexRTB);