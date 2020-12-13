import { Component } from 'react';
import { number } from 'prop-types';
import styles from './styles/TagBar.module.css';

import Ticker from 'react-ticker';
import TagLabel from "../Typography/Tag";
import UniversalLink from "../Links/Universal";


const TagItem = ({children, linkItem = {} }) => (
    <UniversalLink item={linkItem} covered Component={
        ()=>(
            <div className={styles.tagWrapper}>
                <div className={styles.tagTextLarge}>
                    <TagLabel type="large" weight="400" width={"max-content"}
                              color={"var(--text-onPrimary)"} margin={0}>
                        {children}
                    </TagLabel>
                </div>
                <div className={styles.tagTextMini}>
                    <TagLabel type="mlarge" weight="400" width={"max-content"}
                              color={"var(--text-onPrimary)"} margin={0}>
                        {children}
                    </TagLabel>
                </div>
            </div>
        )
    }/>
);

class TagBar extends Component {
    constructor(props) {//width
        super(props);
        this.stop = this.stop.bind(this);
        this.start = this.start.bind(this);
    }

    state = {
        speed: 10,
        hover: false,
        reload: false
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.tags[0] !== this.props.tags[0]){
            this.setState({reload: true})
        }
    }

    stop(){
        let timeout = 200;
        let timerId = setTimeout(function speedDown() {
            if (this.state === undefined){
                timerId = setTimeout(speedDown.bind(this), timeout); // (*)
            }
            else if (this.state.speed > 0 && this.state.hover){
                this.setState({speed: this.state.speed - 1})
                if (timeout > 20){
                    timeout -= 5;
                }
                timerId = setTimeout(speedDown.bind(this), timeout); // (*)
            }
        }.bind(this), timeout);
    }

    start(){
        const { defaultSpeed = 10 } = this.props;
        let timeout = 100;
        let timerId = setTimeout(function speedUp() {
            if (this.state === undefined){
                timerId = setTimeout(speedUp.bind(this), timeout); // (*)
            }
            else if (this.state.speed < defaultSpeed && ! this.state.hover){
                this.setState({speed: this.state.speed + 1})
                if (timeout > 20){
                    timeout -= 10;
                }
                timerId = setTimeout(speedUp.bind(this), timeout); // (*)
            }
        }.bind(this), timeout);
    }

    render(){
        const { tags } = this.props;
        const { speed, reload } = this.state;
        let tagIndex = 0;

        if ( reload ){
            this.setState({reload: false})
            return null
        }

        return (
            <div onMouseOver={()=>{
                this.setState({hover: true});
                this.stop();
            }} onMouseLeave={()=>{
                this.setState({hover: false});
                this.start();
            }}>
                {
                    tags && tags.length > 0
                        ? <Ticker move={speed > 0} speed={speed}>
                            {({ /*index*/ }) => {
                                tagIndex += 1;
                                if (tags[tagIndex] === undefined){
                                    tagIndex = 0;
                                }
                                return ( <TagItem linkItem={tags[tagIndex].link}>{tags[tagIndex].text}</TagItem> );
                            }}
                        </Ticker>
                        : null
                }
            </div>
        );
    }
}

TagBar.propTypes = {
    defaultSpeed: number
}

export default TagBar;