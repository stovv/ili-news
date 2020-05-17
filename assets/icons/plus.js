import * as React from "react"


/*
render(){
    const {theme, ...props} = this.props;
    return (
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}

            <path
                d="M17 2h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17m-7 2v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z"
                stroke={this.state.hover ? theme.text.hover : theme.text.secondary}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}*/
class Plus extends React.Component {
    state ={
        hover: false,
    }

    render(){
        return (
            <div style={{width:"100%", height:"100%"}} onMouseEnter={()=>this.setState({hover:true})}
                 onMouseLeave={()=>this.setState({hover:false})}>
                <svg width={32} height={32} fill="none" viewBox="0 0 32 32" {...this.props}>
                    <path
                        fill={this.state.hover ? "#fff" : "#4A4A4A"}
                        d="M25.333 14.667h-8v-8h-2.666v8h-8v2.666h8v8h2.666v-8h8v-2.666z"
                    />
                </svg>
            </div>
        )
    }

}

export default Plus
