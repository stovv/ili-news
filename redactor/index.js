import React from 'react';
import EditorJs from 'react-editor-js';
import {connect} from 'react-redux';
import Head from 'next/head';

import tools from './tools';
import initial_data from './initial_data';
import toaster from 'toasted-notes';
import {Flex, Box} from 'rebass';

import {
    Toasts,
    Form
} from '../components';

import {RedactorTypogrphy} from './style';

import {updateDraft} from '../store/smisolActions.react';


class Redactor extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            in_save: false,
            in_editor_save: false,
            label: props.draft.title ? props.draft.title : undefined,
            initial_content: props.draft.blocks ? props.draft.blocks : initial_data
        }
        this.autosave = this.autosave.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.editorInstance;
    }

    autosave(){
        setTimeout(function () {
            if (this.state.in_editor_save){
                this.editorInstance.save()
                    .then(outputData => {
                        this.props.dispatch(updateDraft(this.props.draft.id, {
                            blocks: outputData
                        })).then(response=>{
                            this.setState({in_editor_save: false});
                            })
                            .catch(reason=>{
                                console.log("REASON", reason);
                                this.setState({in_editor_save: false});
                            });
                    }).catch(reason=>{
                        console.log('Error saving:', reason);
                    });
            }
            if (this.state.in_save){
                this.props.dispatch(updateDraft(this.props.draft.id, {
                    title: this.state.label
                }
                )).then(response=>{
                        this.setState({in_save: false});
                    })
                    .catch(reason=>{
                        console.log("REASON", reason);
                        this.setState({in_save: false});
                    })
            }
            this.autosave();
        }.bind(this), 3000);
    }

    async handleSave() {
        this.state.in_save = true;
    }
      
    componentDidMount() {
        this.autosave();
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
    }

    handleKeyDown(event) {
        if (event.ctrlKey && event.which === 83) {
            event.preventDefault();
            toaster.notify(({ onClose }) => (
                <Toasts.Emoji onClose={onClose}>
                    🚀 Все сохраняется автоматически 
                </Toasts.Emoji>
              ), { position: "bottom"}
            );
        }
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.handleKeyDown.bind(this));
    }

    render() {
        return (
            <>
            <RedactorTypogrphy/>
            <Box mx='auto' sx={{
                maxWidth: 1440,
                mx: 'auto',
                px: 3,
            }}>
                <Flex>
                    <Box width={[5/6, 5/9, 8/10]}>
                        
                    </Box>
                    <Box width={[1/6, 4/9, 2/10]} py="1%" ml={20}>
                        <Form.Buttons.SimpleButton outline>Предосмотр</Form.Buttons.SimpleButton>
                    </Box>
                </Flex>
            </Box>
            <Box maxWidth={900} mx="auto">
                <Form.Inputs.TitleArea fixed
                                       placeholder="Заголовок"
                                       onChange={event => this.setState({in_save: true, label: event.target.value})}
                                       defaultValue={this.state.label}
                />
            </Box>
            <Box sx={{
                    maxWidth: 860,
                    mx: 'auto',
                    px: 3,
                }}>
                <EditorJs 
                    data={this.state.initial_content}
                    tools={tools}
                    instanceRef={instance => this.editorInstance = instance}
                    hideToolbar={false}
                    onChange={()=>this.setState({in_editor_save : true})}
                />
            </Box>
            </>
        );
    }
}

function mapStateToProps(state){
    return {
        draft: state.smisol.draft,
        isLoggedIn: state.auth.isLoggedIn
    };
}

export default connect(mapStateToProps)(Redactor);
