import * as React from "react"
import {withTheme} from 'styled-components';

class LikeIcon extends React.Component {

    state ={
        hover: false,
    }
    render(){
        const {theme, ...props} = this.props;
        return (
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}
                 onMouseEnter={()=>this.setState({hover:true})}
                 onMouseLeave={()=>this.setState({hover:false})}>
                <path
                    d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3m7-2V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a1.999 1.999 0 00-2-2.3H14z"
                    stroke={this.state.hover ? theme.text.hover : theme.text.secondary}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        )
    }
}

export default withTheme(LikeIcon);
