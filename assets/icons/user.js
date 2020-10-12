import * as React from "react"


class UserIcon extends React.Component {
    state ={
        hover: false,
    }
    style = {
        transition: "all 0.4s ease 0s",
    }
    render(){
        const {inverted, ...props} = this.props;
        return (
            <div onMouseEnter={()=>this.setState({hover:true})}
                 onMouseLeave={()=>this.setState({hover:false})}>
                <svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
                    <path
                        style={this.style}
                        stroke={inverted ? (this.state.hover ? "var(--text-hover)" : "var(--text-onPrimary)")
                            : (this.state.hover ? "var(--text-hover)" : "var(--text-secondary)")}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2m8-10c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
                    />
                </svg>
            </div>
        );
    }
};

export default UserIcon;
