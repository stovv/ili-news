import React from 'react';
import EditorJs from 'react-editor-js';
import tools from './tools';
import initial_data from './initial_data';

import {Container} from "react-bootstrap";
import {Inputs} from '../forms';



class Redactor extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            post_name: "",
            content : {},
        }
        this.handleSave = this.handleSave.bind(this);
    }

    handleSave() {
        this.editorInstance.save()
            .then(outputData => {
                this.setState({content: outputData})
            }).catch(reason=>{
                console.log('Error saving:', reason);
            })
    }
      
    componentDidMount() {
        this.editorInstance;
    }

    render() {
        return (
            <Container>
                <Inputs.WhiteListName 
                    placeholder="Великолепное название поста..."
                    onChange={event=>this.setState({post_name: event.target.value})}
                />
                <EditorJs 
                    data={initial_data} 
                    tools={tools}
                    instanceRef={instance => this.editorInstance = instance}
                    hideToolbar={false}
                    onChange={()=>this.handleSave()}
                />;
            </Container>
        );
    }
}

export default Redactor;
