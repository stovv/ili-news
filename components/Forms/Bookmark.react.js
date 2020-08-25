import React from 'react';
import { withTheme } from "styled-components";

import { Icons } from '../../assets';


class Bookmark extends React.Component {

    render(){
        const { theme } = this.props;
        return(
            <Icons.BookmarkIcon style={theme.post.footer.iconSpacing.bookmark}/>
        );
    }
}

export default withTheme(Bookmark);