import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';
import {Input, Label, Select, Textarea} from '@rebass/forms';
import { withTheme } from "styled-components";
import { CardText } from "../Typography";
import { Buttons } from '../Forms';
import { Icons } from "../../assets";

import DatePicker from "react-datepicker";
import {connect} from "react-redux";
import {draftToPost} from "../../store/smisolActions.react";



const MenuItem = ({ children, theme, selected }) =>(
    <Flex bg={selected && "#fff" } py="20px">
        <Flex maxWidth="200px" mx="auto">
            <Icons.DraftIcon style={{margin: "auto 0"}}/>
            <CardText type="small" margin="auto auto auto 30px" color={theme.text.secondary}>{children}</CardText>
        </Flex>
    </Flex>
);


class LeftMenu extends React.Component {

    constructor(props){
        super(props);
        if ( props.type === "create" ){
            this.state = {
                isEvent: "Нет",
                //author: props.draft.author ? props.draft.author : "нет",
                eventDate: props.draft.event_date != null ? new Date(props.draft.event_date) : new Date(),
                rubric: props.draft.rubric.title,
                oldAuthor: props.draft.old_authors ? props.draft.old_authors : ""
            }
        }
        this.handleSave = this.handleSave.bind(this);
    }

    handleSave(){
        const { isEvent, eventDate, rubric, oldAuthor } = this.state;
        const { data, dispatch } = this.props;
        console.log(this.state);
        console.log(this.props.draft);

        let newPost = {};
        if ( isEvent === "Да" ){
            console.log("DATE", eventDate);
            newPost.event_date = eventDate.toISOString();
        }
        if (rubric !== this.props.draft.rubric.title){
            data.rubrics.map(rubricExt => {
                if (rubricExt.title === rubric){
                    newPost.rubric = rubricExt.id;
                }
            })
        }
        if (oldAuthor.length > 0){
            newPost.old_authors = oldAuthor
        }
        newPost.cover = this.props.draft.cover.id;
        newPost.blocks = this.props.draft.blocks;
        newPost.title = this.props.draft.title;

        dispatch(draftToPost(this.props.draft.exists_post_id, this.props.draft.id, newPost));

    }

    render(){
        const { theme, type, data, draft } = this.props;

        if ( type === "create" ){

            return (
                <Flex flexDirection="column" bg={theme.colors.backgroundSecondary} width="100%" height="100%" sx={{display: 'hidden'}}>
                    <Box mt="50px" mb="30px" width="100%" px="10px">
                        <Label htmlFor='rubric'>Рубрика</Label>
                        <Select
                            id='rubric'
                            name='rubric'
                            onChange={(e)=>this.setState({rubric: e.target.value})}
                            defaultValue={draft.rubric.title}>
                            {data.rubrics.map((rubric, index) => (
                                <React.Fragment key={index}>
                                    <option key={rubric.id}>
                                        {rubric.title}
                                    </option>
                                </React.Fragment>
                            ))}
                        </Select>
                    </Box>
                    <Box mb="30px" width="80%" px="10px">
                        <Label >Это событие?</Label>
                        <Select
                            id='isevent'
                            name='isevent'
                            onChange={(e)=>this.setState({isEvent: e.target.value})}
                            defaultValue={this.state.isEvent}>
                            <option key={0}>
                                Нет
                            </option>
                            <option key={1}>
                                Да
                            </option>
                        </Select>
                        <Label>Дата события</Label>
                        <DatePicker
                            selected={this.state.eventDate}
                            onChange={(date)=>this.setState({
                                eventDate: date
                            })}
                        />
                    </Box>
                    <Box  mb="30px" width="100%" px="10px">
                        <Label >Авторы</Label>
                        <Textarea
                            m="10px 0 40px 0"
                            id='oldAuthor'
                            onChange={(e)=>this.setState({oldAuthor:e.target.value})}
                            placeholder="Автор1;Автор2;"
                            name='oldAuthor'
                        />
                    </Box>
                    <Box mb="30px" width="100%" px="10px">
                        <Buttons.SimpleButton onClick={this.handleSave}>Сохранить</Buttons.SimpleButton>
                    </Box>
                </Flex>
            )

        }
        return(
            <Flex flexDirecton="column" bg={theme.colors.backgroundSecondary} width="100%" height="100%" sx={{display: 'hidden'}}>
                <Box mt="50px" width="100%">
                    <MenuItem theme={theme} selected>Черновики</MenuItem>
                </Box>
            </Flex>
        );
    }
}

LeftMenu.propTypes = {
    type: PropTypes.oneOf([
        "create",
        "drafts"
    ]),
    data: PropTypes.object,
}

function mapStateToProps(state){
    return {
        draft: state.smisol.draft
    }
}

export default connect(mapStateToProps)(withTheme(LeftMenu))