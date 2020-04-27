import React from 'react';
import { Icons } from '../../assets';

const iconSpacing = {
    margin: "auto 0"
}

class Bookmark extends React.Component {

    render(){
        return(
            <Icons.BookmarkIcon style={iconSpacing}/>
        );
    }
}

export default Bookmark;