import * as React from "react"
import {withTheme} from "styled-components";


class HamburgerMenu extends React.Component {
    state ={
        hover: false,
    }
    style = {
        transition: "all 0.4s ease 0s",
    }

    render(){
        const {theme, ...props} = this.props;
        return(
            <div onMouseEnter={()=>this.setState({hover:true})}
                 onMouseLeave={()=>this.setState({hover:false})}>
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
                    <path style={this.style} d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" fill={this.state.hover ? theme.text.hover : theme.text.secondary} />
                </svg>
            </div>
        );

    }
}

export default withTheme(HamburgerMenu);
