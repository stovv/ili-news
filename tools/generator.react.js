import React from 'react';

import {
    Heading, 
    Paragraph,
    List
} from '../components';

class Test extends React.Component{
    render(){
        console.log(this.props);
        return(
            <p>test</p>
        );
    }
}

const tools = {
    'paragraph': Paragraph,
    'embed': Test,
    'header': Heading,
    'image': Test,
    'checklist': Test,
    'list': List,
};

function Component({type, data}){
    const Tool = tools[type];
    return <Tool data={data}/>;
}


export default function generate_jsx(blocks){
    var content = [];
    blocks.forEach((element, index) => {
        content.push(
            <React.Fragment key={index}>
                <Component type={element.type} data={element.data}/>
            </React.Fragment>
        );
    });

    return (
        <>
        {content.map(element=>element)}
        </>
    );
}

