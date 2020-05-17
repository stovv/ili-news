import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'rebass';
import { withTheme } from 'styled-components';
import { connect } from "react-redux";
import Moment from 'react-moment';

import { Lazy } from "../Images";
import { CardText, TagLabel } from "../Typography";
import { Icons } from '../../assets';
import { emptyCover } from "../../constants";
import {createNewDraft, openDraft} from "../../store/smisolActions.react";
import Router from "next/router";
import toaster from "toasted-notes";
import {Toasts} from "../index";


class DraftCard extends React.Component {

    constructor(props) {
        super(props);
        this.handleNewDraft = this.handleNewDraft.bind(this);
        this.handleRemoveDraft = this.handleRemoveDraft.bind(this);
    }

    handleNewDraft(){
        const { draft, dispatch } = this.props;
        if (typeof window !== "undefined"){
            dispatch(openDraft(draft.id))
                .then(()=>{
                    Router.push("/smisl/create");
                })
                .catch(reason=>{
                    console.log("REASON", reason);
                });
        }
    }

    handleRemoveDraft(){
        toaster.notify(({ onClose }) => (
                <Toasts.Emoji onClose={onClose}>
                    Удаление пока не работает
                </Toasts.Emoji>
            ), { position: "bottom-left"}
        );
    }

    render() {
        const { theme } = this.props;
        const { cover, title, rubric, updated_at } = this.props.draft;

        return (
            <Box height="100%" width="100%" maxWidth={["350px"]} mx="auto" px="10px"
                 onClick={this.handleNewDraft}>
                <Lazy cover={cover || emptyCover} overflow="visible" hover style={{
                    borderRadius: "6px",
                    overflow: "hidden"
                }}>
                    <Box bg={theme.colors.primary} width="30px" height="30px"
                         sx={{
                             borderRadius: "50%",
                             position: "absolute",
                             padding: "6px 10px",
                             top: "-5px",
                             right: "-5px"
                         }} onClick={this.handleRemoveDraft}>
                        <Icons.CloseIcon width="10px" height="10px"/>
                    </Box>
                    <Box bg={theme.colors.backgroundPrimary} width="100%"  px={[theme.spacing.xs]}
                         sx={{
                             position: "absolute",
                             bottom: 0,
                             left: 0
                         }}>
                        {
                            rubric &&
                            <TagLabel type="normal" color={theme.text.hover}
                                      textTransform="lowercase" margin={`${theme.spacing.xs} 0`}>
                                {rubric.title}
                            </TagLabel>
                        }
                        <CardText type="normal" maxWidth={["240px"]} margin="0" hideOwerflow maxLines={2}
                                  color={(title && title.length > 0)
                                            ? theme.text.secondarySecondary
                                            : theme.text.secondary}>
                            { (title && title.length > 0)
                                ? title
                                : "Без заголовка"
                            }
                        </CardText>
                        <TagLabel type="small" color={theme.text.editorSecondary} margin={`${theme.spacing.xs} 0`}>
                            <Moment fromNow locale="ru">{updated_at}</Moment>
                        </TagLabel>
                    </Box>
                </Lazy>
            </Box>
        );
    }
}

DraftCard.propTypes = {
    draft: PropTypes.object.isRequired,
}

export default connect()(withTheme(DraftCard));