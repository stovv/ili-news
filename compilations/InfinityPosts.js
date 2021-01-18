import dynamic from "next/dynamic";
import { connect } from 'react-redux';
import { Fragment, Component as ReactComponent } from 'react';
import { node, shape, func, string, object, bool, number } from 'prop-types';

import { shuffle } from '../tools';
import { changeInfinityState } from '../actions/common';

const Loader = dynamic(() => import("../components/Forms/Loader"));
const InfiniteScroll = dynamic(() => import("react-infinite-scroll-component"));


class InfinityPosts extends ReactComponent {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            schema: [],
            previous: [],
            lock: false,
            blockCounter: {},
            hasMore: true
        };
        this.fetchMoreBlocks = this.fetchMoreBlocks.bind(this);
        this.getBlock = this.getBlock.bind(this);
    }

    async getBlock(id){
        let { additionalProps, common, blocks, ...props } = this.props;
        const { fetchMore, Component, required } = blocks[id];

        let data = await fetchMore({
            blockCounter: this.state.blockCounter,
            ...common,
            ...additionalProps,
            ...props
        });
        if ( data.error ){
            delete this.props.blocks[id];
            if ( required ) return {hasMore: false, error: true};
            return {error: true}
        }

        this.state.blockCounter[id] = this.state.blockCounter[id] !== undefined
            ? this.state.blockCounter[id] + 1
            : 1;

        return <Component {...data}/>;
    }

    async fetchMoreBlocks(){
        let { blocks } = this.props;
        let { previous } = this.state;

        let items = [];
        let prev = [];
        let hasMore = true;

        if (Object.keys(blocks).length === 1){
            const item = await this.getBlock(Object.keys(blocks)[0].id);
            if (item.error === undefined){
                items.push(item);
            }else if (item.hasMore !== undefined && !item.hasMore){
                hasMore = false
            }
        }else{
            let part = shuffle(Object.keys(blocks).filter(el => el !== previous[previous.length - 1]));
            for (let id of part){
                const item = await this.getBlock(id);
                if (item.error === undefined){
                    items.push(item);
                }else if (item.hasMore !== undefined && !item.hasMore){
                    hasMore = false
                }
            }
            prev.push.apply(prev, part);
        }

        this.setState({
            previous: [
                ...previous,
                ...prev
            ],
            items: [
                ...this.state.items,
                ...items
            ],
            hasMore
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.hasMore !== this.props.common.infinityActive ){
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
    blocks: shape({
        [string]: shape({
            required: bool,
            fetchMore: func,
            Component: node.isRequired
        })
    }),
    initialCount: number
}

function mapStateToProps(state){
    return {
        common: state.common
    };
}

export default connect(mapStateToProps)(InfinityPosts);