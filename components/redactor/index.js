import React from 'react';
import EditorJs from 'react-editor-js';
import tools from './tools';
import initial_data from './initial_data';

import {Container} from "react-bootstrap";
import {WhiteListName} from '../forms/input.react';



class Redactor extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            post_name: "",
            content : {}
        }
        this.handleSave = this.handleSave.bind(this);
    }

    handleSave(event) {
        console.log(event);
    }
      

    render() {
        console.log(this.state);
        return (
            <Container>
                <WhiteListName 
                    placeholder="Великолепное название поста..."
                    onChange={event=>this.setState({post_name: event.target.value})}
                />
                <EditorJs 
                    data={initial_data} 
                    tools={tools} 
                    hideToolbar={false}
                    onChange={event => this.handleSave(event)}
                    enableReInitialize
                />;
            </Container>
        );
    }
}

export default Redactor;
