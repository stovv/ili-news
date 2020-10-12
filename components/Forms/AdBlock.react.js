import React from 'react';
import PropTypes from 'prop-types';

import { Heading } from '../Typography';
import { Box } from 'reflexbox';


class YandexRTB extends React.Component {
    componentDidMount(){
        const {id, uid, infinity, preview} = this.props;

        if (typeof window !== "undefined" && !preview){
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
            `;
            document.head.appendChild(yaScript);
        }
    }

    render(){
        const { id, infinity, uid, width, height, preview } = this.props;
        if (typeof window !== "undefined"){
            return(
                <Box  width={width} height={height} sx={{position: 'relative'}}
                      bg={preview ? "var(--backgroundInvert)" : undefined}>
                    {
                        preview
                            ? <Box sx={{
                                    top: "50%", left: "50%", marginRight: "-50%", position: 'absolute',
                                    transform: "translate(-50%, -50%)", zIndex: 1
                                }}>
                                    <Heading margin={`10px 0`} level={1} color={"var(--text-onPrimary)"}>
                                        РЕК<br/>
                                        ЛАМА
                                    </Heading>
                                </Box>
                                : <div id={infinity ? `yandex_rtb_${id}_${uid}` : `yandex_rtb_${id}`} style={{
                                    position: 'relative',
                                    overflow: 'hidden',
                                    width: '100%',
                                    height: '100%'
                                }}>
                            </div>
                    }

                </Box>
            );
        }else{
            return (<></>);
        }

    }
}

YandexRTB.propTypes = {
    id: PropTypes.string.isRequired,
    infinity: PropTypes.bool,
    uid: PropTypes.number,
    preview: PropTypes.bool,
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

export default YandexRTB;