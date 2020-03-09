import React from 'react';
import EditorJs from 'react-editor-js';
import tools from './tools';
import inital_data from './inital_data';

import {Container, Row, Col} from "react-bootstrap";



class Redactor extends React.Component {
    render() {
        return (
            <Container>
                        <h2>Use Redactor Tovarish!</h2>
                        <EditorJs data={inital_data} tools={tools} />;
            </Container>
        );
    }
}

export default Redactor;
