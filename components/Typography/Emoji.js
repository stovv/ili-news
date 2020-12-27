import { Component } from 'react';
import dynamic from "next/dynamic";

const EmojiImage = dynamic(() => import('react-apple-emojis'));

class Emoji extends Component{
    constructor(props) {
        super(props);
        const emojis = props.emojis.split(',');
        this.state = {
            index: 0,
            emojis,
            className: 'emoji-in',
            stop: false
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.emojis !== this.props.emojis) {
            const emojis = this.props.emojis.split(',');
            this.setState({
                index: 0,
                reload: true,
                className: 'emoji-in',
                emojis
            });
        }
    }

    render(){

        if (this.state.reload){
            this.setState({reload: false});
            return(<></>)
        }

        return (
            <EmojiImage
                style={this.props.style}
                className={this.state.className}
                onAnimationEnd={() => {
                    if (this.state.className === 'emoji-out'){
                        const { index, emojis } = this.state;
                        this.setState({className: 'emoji-in', index: index + 1 >= emojis.length ? 0 : index + 1});
                    }else{
                        setTimeout(()=>this.setState({className: 'emoji-out'}), 4000);
                    }
                }}
                name={this.state.emojis[this.state.index]} width={46} heigth={46}
            />
        )

    }
}

export default Emoji;