import React from 'react';
import EditorJs from 'react-editor-js';
import {connect} from 'react-redux';
import Head from 'next/head';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import toaster from 'toasted-notes';
import {Flex, Box} from 'rebass';

import tools from './tools';
import initial_data from './initial_data';


import {
    Toasts,
    Form,
    Images
} from '../components';
import { File } from '../api';

import {RedactorTypogrphy, RedactorEmojiPicker} from './style';

import { updateDraft } from '../store/smisolActions.react';
import {BACKEND_URL} from "../constants";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);


class Redactor extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            in_save: false,
            in_editor_save: false,
            files: [],
            label: props.draft ? props.draft.title : undefined,
            initial_content: props.draft ? props.draft.blocks : initial_data
        }
        this.autosave = this.autosave.bind(this);
        this.handleSave = this.handleSave.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
        //this.onSubmit = this.onSubmit.bind(this);
        this.editorInstance;
    }

    autosave(){
        setTimeout(function () {
            if (this.state.in_editor_save && this.editorInstance){
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
        //document.addEventListener("keydown", this.handleKeyDown.bind(this));
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

    onImageChange = event => {
        console.log(event.target.files);
        const formData = new FormData();

        Array.from(event.target.files).forEach(image => {
            formData.append('files', image);
        });
        File.uploadByFormData(formData)
            .then(response => {
                this.props.dispatch(updateDraft(this.props.draft.id, {
                    cover: response.data[0].id
                }));
            })
            .catch(reason => console.log(reason));
    };

    componentWillUnmount(){
        //document.removeEventListener("keydown", this.handleKeyDown.bind(this));
    }

    /*
        handleSubmit(fileItems){
            let files = fileItems.map(fileItem => fileItem.file);

            const data = new FormData();
            data.append('name', this.state.name)
            data.append('files', files)

            File.uploadByFormData(data)
                .then(response => console.log(response))
                .catch(reason => console.log(reason));
        }


        * <FilePond
            files={temp_cover ? temp_cover : []}
            allowMultiple={false}
            onupdatefiles={this.handleSubmit}
            labelIdle='Drag & Drop your cover or <span class="filepond--label-action">Browse</span>'
        />
        * */

    render() {
        const { cover } = this.props.draft;
        console.log(cover);
        return (
            <>
            <RedactorTypogrphy/>
            <RedactorEmojiPicker/>
            <Box maxWidth={900} mx="auto">
                <Form.Inputs.TitleArea fixed
                                       placeholder="Заголовок"
                                       onChange={event => this.setState({in_save: true, label: event.target.value})}
                                       defaultValue={this.state.label}
                />
            </Box>
            <Box mx={'auto'} mt={'50px'} maxWidth={'750px'} px={3}>
                <Box mb="20px">
                    {
                        cover && <Box width="100%" height="200px">
                                <Images.Lazy cover={cover}/>
                            </Box>
                    }
                    <input
                        type="file"
                        name="files"
                        onChange={this.onImageChange}
                        alt="image"/>
                </Box>
                <EditorJs
                    placeholder="Так уж и быть. «Егоркорка вас приветствует!»"
                    data={this.state.initial_content}
                    tools={tools}
                    instanceRef={instance => this.editorInstance = instance}
                    hideToolbar={false}
                    onChange={()=>this.setState({in_editor_save: true})}
                />
            </Box>
            </>
        );
    }
}

function mapStateToProps(state){
    return {
        draft: state.smisol.draft,
        temp_cover: state.smisol.temp_cover,
        isLoggedIn: state.auth.isLoggedIn
    };
}

export default connect(mapStateToProps)(Redactor);
