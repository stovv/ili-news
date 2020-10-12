import React from 'react';
import PropTypes from 'prop-types';
import Ticker from 'react-ticker';
import {TagLabel} from "../../components/Typography";
import {connect} from "react-redux";
import styles from './styles/tagBar.module.css'

const Tag = ({children, mini}) =>(
    <div className={mini ? styles.tagWrapperMini : styles.tagWrapper}>
        {
            mini
                ? <TagLabel type="normal" color={"var(--text-onPrimary)"} margin={0}>{children}</TagLabel>
                : <TagLabel type="large" weight="400" color={"var(--text-onPrimary)"} margin={0}>{children}</TagLabel>
        }
    </div>
);


class TagBar extends React.Component {
    static defaultProps = {
        defaultSpeed: 10
    };

    constructor(props) {//width
        super(props);
        this.stop = this.stop.bind(this);
        this.start = this.start.bind(this);
    }

    state = {
        tagIndex: -1,
        hover: false,
        speed: this.props.defaultSpeed,
        reload: false
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.hover !== this.state.hover
            || nextProps.speed !== this.state.speed
            || nextProps.tagIndex !== this.state.tagIndex
            || JSON.stringify(nextProps.tags) !== JSON.stringify(this.props.tags);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (JSON.stringify(prevProps.tags) !== JSON.stringify(this.props.tags)){
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
        let timeout = 100;
        let timerId = setTimeout(function speedUp() {
            if (this.state === undefined){
                timerId = setTimeout(speedUp.bind(this), timeout); // (*)
            }
            else if (this.state.speed < this.props.defaultSpeed && ! this.state.hover){
                this.setState({speed: this.state.speed + 1})
                if (timeout > 20){
                    timeout -= 10;
                }
                timerId = setTimeout(speedUp.bind(this), timeout); // (*)
            }
        }.bind(this), timeout);
    }

    render(){
        const { tags, width } = this.props;

        if (this.state.reload){
            this.setState({reload: false})
            return null
        }
        return(
            <div style={{margin: width > 1023 ? "64px 0 52px 0" : "20px 0 20px 0"}}
                onMouseOver={()=>{
                this.setState({hover: true});
                this.stop();
            }} onMouseLeave={()=>{
                this.setState({hover: false});
                this.start();
            }}>
                <Ticker move={this.state.speed > 0} speed={this.state.speed}>
                    {({ index }) => {
                        this.state.tagIndex += 1;
                        if (tags[this.state.tagIndex] === undefined){
                            this.state.tagIndex = 0;
                        }
                        const Link = tags[this.state.tagIndex].link;
                        return(
                            <Link {...tags[this.state.tagIndex].linkProps}>
                                <Tag mini={width <= 1023}>{tags[this.state.tagIndex].text}</Tag>
                            </Link>
                        )
                    }}
                </Ticker>
            </div>
        );
    }
}

TagBar.propTypes = {
    defaultSpeed: PropTypes.number,
    tags: PropTypes.object.isRequired
}



function mapStateToProps(state){
    return{
        width: state.common.pageSize.width
    }
}


export default connect(mapStateToProps)(TagBar);