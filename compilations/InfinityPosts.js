import dynamic from "next/dynamic";
import { connect } from 'react-redux';
import { Fragment, Component as ReactComponent } from 'react';
import { node, arrayOf, shape, func, string, object } from 'prop-types';

import { shuffleChoice } from "../tools";
import { changeInfinityState } from '../actions/common';

const Loader = dynamic(() => import("../components/Forms/Loader"));
const InfiniteScroll = dynamic(() => import("react-infinite-scroll-component"));


class InfinityPosts extends ReactComponent {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            hasMore: true,
            previousBlocks: [],
            components: props.components || []
        };
        this.fetchMoreBlocks = this.fetchMoreBlocks.bind(this);
        this.props.dispatch(changeInfinityState(true));
    }

    componentWillUnmount() {
        this.props.dispatch(changeInfinityState(false));
    }

    async fetchMoreBlocks(){
        let { additionalProps, common, components: IncomComponents, ...props } = this.props;
        let { previousBlocks } = this.state;

        let errors = 0;

        while ( this.state.components.length > 0 &&
                this.state.components.length > errors &&
                this.state.components.some(component => component.required)){
            const item = shuffleChoice(this.state.components, previousBlocks, this.state.components.length);

            const { fetchMore, Component } = item;
            let data = await fetchMore({state: this.state, ...props, ...common });

            if ( data.error ){
                errors++;
                this.state.components = this.state.components.filter(component => component.id !== item.id);
                continue;
            }

            this.setState({
                items: [
                    ...this.state.items,
                    <Component {...data}/>
                ],
                previousBlocks: [
                    ...previousBlocks.slice(Math.max(previousBlocks.length - this.state.components.length - 1 , 0)),
                    item.id
                ]
            });
            return;
        }

        this.setState({ hasMore: false });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ( this.state.hasMore !== prevState.hasMore){
            this.props.dispatch(changeInfinityState(this.state.hasMore));
        }
    }

    render() {
        const { items, hasMore } = this.state;
        return (
            <InfiniteScroll dataLength={items.length} next={this.fetchMoreBlocks}
                            hasMore={hasMore} loader={<Loader/>}>
                {
                    items.map((item, index)=>
                        <Fragment key={index}>{item}</Fragment>
                    )
                }
            </InfiniteScroll>
        );
    }
}

InfinityPosts.propTypes = {
    additionalProps: object,
    components: arrayOf(
        shape({
            key: string,
            fetchMore: func,
            Component: node.isRequired
        })
    )
}

function mapStateToProps(state){
    return {
        common: state.common
    };
}

export default connect(mapStateToProps)(InfinityPosts);