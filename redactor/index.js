import React from 'react';
import EditorJs from 'react-editor-js';
import {connect} from 'react-redux';
import Head from 'next/head';

import tools from './tools';
import initial_data from './initial_data';
import toaster from 'toasted-notes';

import {
    Containers,
    Inputs,
    Buttons,
    EmptyHeader,
    BlackToast
} from "../components";

import {updateDraft} from '../store/smisolActions.react';


class Redactor extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            in_save: false,
            in_editor_save: false,
            label: props.draft.label ? props.draft.label : undefined,
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
                        this.props.dispatch(updateDraft(this.props.jwt, this.props.draft.id, {
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
                this.props.dispatch(updateDraft(this.props.jwt, this.props.draft.id, {
                    label: this.state.label
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
    }

    handleKeyDown(event) {
        if (event.ctrlKey && event.which === 83) {
            event.preventDefault();
            toaster.notify(({ onClose }) => (
                <BlackToast onClose={onClose}>
                    🚀 Все сохраняется автоматически 😊
                </BlackToast>
              ), { position: "bottom"}
            );
        }
    }

    componentWillMount(){
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.handleKeyDown.bind(this));
    }

    render() {
        return (
            <>
            <Head>
               <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
                    integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
                    crossOrigin="anonymous"/>
           </Head>
            <EmptyHeader>
                <Inputs.BlankInput fixed
                        placeholder="Великолепное название..."
                        onChange={event => this.setState({in_save: true, label: event.target.value})}
                        defaultValue={this.state.label}
                />
                <Buttons.SimpleButton outline>Предосмотр</Buttons.SimpleButton>
            </EmptyHeader>
            <Containers.SimpleContainer>
                <EditorJs 
                    data={this.state.initial_content}
                    tools={tools}
                    instanceRef={instance => this.editorInstance = instance}
                    hideToolbar={false}
                    onChange={()=>this.setState({in_editor_save : true})}
                />
            </Containers.SimpleContainer>
            </>
        );
    }
}

function mapStateToProps(state){
    return {
        draft: state.smisol.draft,
        jwt: state.auth.jwt,
        isLoggedIn: state.auth.isLoggedIn
    };
}

export default connect(mapStateToProps)(Redactor);
