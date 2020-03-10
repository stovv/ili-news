import React from 'react';
import EditorJs from 'react-editor-js';
import tools from './tools';
import initial_data from './initial_data';

import {Container} from "react-bootstrap";



class Redactor extends React.Component {
    render() {
        return (
            <Container>
                <h2>Use Redactor Tovarish!</h2>
                <EditorJs 
                    data={initial_data} 
                    tools={tools} 
                    hideToolbar={false}
                    enableReInitialize
                />;
            </Container>
        );
    }
}

export default Redactor;
