import * as React from "react"

class DislikeIcon extends React.Component {

    state ={
        hover: false,
    }
    render(){
        const {...props} = this.props;
        return (
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}
                 onMouseEnter={()=>this.setState({hover:true})}
                 onMouseLeave={()=>this.setState({hover:false})}>
                <path
                    d="M17 2h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17m-7 2v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z"
                    stroke={this.state.hover ? "var(--text-hover)" : "var(--text-secondary)"}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        )
    }
}

export default DislikeIcon;
