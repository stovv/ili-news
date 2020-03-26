import React from 'react';
import styled from 'styled-components';


const ListComponent = styled.ul``;
const ListItem = styled.li``;


class List extends React.Component{
    constructor(props){
        super(props);
        //props.data.style
        this.state={
            items: props.data.items,
            StyledList: ListComponent
        };
    }

    render(){
        const {items, StyledList} = this.state;
        return (
            <StyledList>{
                items.map((index,item)=><React.Fragment key={index}><ListItem>{item}</ListItem></React.Fragment>)
            }</StyledList>
        )
    }

}

export default List;