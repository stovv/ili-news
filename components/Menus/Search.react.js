import React from "react";

import { connect } from "react-redux";
import StackGrid from "react-stack-grid";

import { Mini } from '../Cards';
import { Public } from '../../api';
import { Icons } from "../../assets";
import { Click } from "../Animations";
import { Heading } from '../Typography';
import { Inputs, Loader } from '../Forms';
import { Common } from "../../actions";
import Emoji from "../Emoji";
import { Flex, Box } from 'reflexbox';


const NotFound = ()=>(
    <Box width={"100%"} mt={"182px"}>
        <Flex justifyContent={"center"}>
            <Emoji emoji={"😢"} size={72}/>
        </Flex>
        <Heading level={2} color={"var(--text-disabled)"} textAlign={"center"}>
            Упс, по вашему запросу ничего не найдено
        </Heading>
    </Box>
);


class Search extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            typing: false,
            loading: false,
            query: "",
            prevQuery: "",
            items: [],
            topMath: [],
            notFoundTopMath: false,
            notFoundSuchMath: false,
            stopWaiting: true
        }
        this.waitForTypingComplete = this.waitForTypingComplete.bind(this);
        this.suchMatch = this.suchMatch.bind(this);
    }

    componentWillUnmount() {
        if (typeof window !== "undefined"){
            document.documentElement.removeAttribute("style");
            if ( this.props.width <= 1023 ){
                document.body.removeAttribute("style");
            }
        }
        this.setState({stopWaiting: true})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.activated){
            document.documentElement.removeAttribute("style");
            this.state.stopWaiting = true;
            if ( this.props.width <= 1023 ){
                document.body.removeAttribute("style");
            }
        }else{
            if (this.state.stopWaiting){
                this.state.stopWaiting = false;
                this.waitForTypingComplete()
            }
            document.documentElement.style = "width: calc(100% - 17px); position: fixed; top: 0px; overflow: hidden;";
            if ( this.props.width <= 1023 ){
                document.body.style = "overflow: hidden;";
            }
        }
    }

    async suchMatch(query){
        for (const word of query.split(" ")) {
            if ( word.length >= 3 ){
                let formats = [];
                await Public.getWordFormats(word)
                    .then(response=>{
                        if (response.data.words !== undefined){
                            formats = response.data.words.filter((item, i, ar) => {
                                if (word === item){
                                    return false
                                }
                                return ar.indexOf(item) === i;
                            })
                        }
                    })
                    .catch(reason=>console.log(reason));

                // this.setState({ loading: false, notFoundTopMath: notFound, topMath: matched });
                let matched = [];
                for (const forma of formats) {
                    await Public.search(forma)
                        .then(response=>{
                            matched = [...matched, ...response.data.posts.filter((post=>{
                                for (const extPost of [...matched, ...this.state.topMath]){
                                    if (extPost.id === post.id){
                                        return false;
                                    }
                                }
                                return true
                            }))];

                        })
                        .catch(reason=>console.log(reason));

                    await Public.search(forma, "description")
                        .then(response=>{
                            matched = [...matched, ...response.data.posts.filter((post=>{
                                for (const extPost of [...matched, ...this.state.topMath]){
                                    if (extPost.id === post.id){
                                        return false;
                                    }
                                }
                                return true
                            }))];
                        })
                        .catch(reason=>console.log(reason));
                }
                this.setState({ notFoundSuchMath: matched.length === 0, items: matched });
            }
        }

    }

    waitForTypingComplete(){
        setTimeout(function(){
            const { stopWaiting, query, prevQuery, loading, typing,
                items, topMath, notFoundSuchMath, notFoundTopMath } = this.state;
            if (stopWaiting){
                return
            }
            if ( query.length > 0 ){
                if (prevQuery !== query){
                    this.setState({ typing: true, loading: false, prevQuery: query, items: [], topMath: [],
                        notFoundTopMath: false, notFoundSuchMath: false});
                }else if (!loading && items.length === 0 && topMath.length === 0 &&
                    !notFoundSuchMath && !notFoundTopMath){
                    this.setState({ typing: false, loading: true });

                    Public.search(query)
                        .then(response=>{
                            let notFound = false;
                            let matched = [];
                            if ( response.data.posts.length === 0 ){
                                notFound = true;
                            }else{
                                matched = response.data.posts;
                            }

                            Public.search(query, "description")
                                .then(response=>{
                                    if (response.data.posts.length > 0) {
                                        notFound = false;
                                        matched = [...matched, ...response.data.posts.filter((post=>{
                                           for (const extPost of matched){
                                               if (extPost.id === post.id){
                                                   return false;
                                               }
                                           }
                                           return true
                                        }))];
                                    }
                                    this.setState({ loading: false, notFoundTopMath: notFound, topMath: matched });
                                });

                        })
                        .catch(reason=> console.log("Err searching"));

                    this.suchMatch(query);
                }
            }else{
                if (loading || typing || items.length > 0 || topMath.length > 0 || notFoundSuchMath || notFoundTopMath ) {
                    this.setState({ typing: false, loading: false, prevQuery: "", items: [], topMath: [],
                        notFoundTopMath: false, notFoundSuchMath: false});
                }
            }
            this.waitForTypingComplete()
        }.bind(this), 1000);
    }

    render(){
        const { activated, dispatch, width } = this.props;
        const { typing, loading, notFoundTopMath, notFoundSuchMath, topMath, items } = this.state;
        const searchItems = [...topMath, ...items];

        if (typeof window === "undefined"){
            return (<></>);
        }

        return (
            <div style={{
                position: 'fixed', transition: "all .4s cubic-bezier(.55,.08,.06,.97)",
                height: activated ? `${width > 1023 ? "calc(100vh - 72px)" : "100vh"}` : "0px",
                transform: activated ? "scale(1)" : "scale(0.9)",
                bottom: 0, left: 0, zIndex: 9999, overflow: 'hidden'
            }}>
                <Box id="searchContent" bg={"var(--backgroundInverted)"} width="100vw" sx={{
                    overflowY: 'scroll',
                    opacity: 0.98, height: "100%",
                    position: "relative", display: "inline-block"
                }}>
                    <Box sx={{position: "absolute", top: width > 768 ? "52px" : "24px" ,
                        right: width > 768 ? "92px" : "24px"}}>
                        <Click.SimpleClick style={{float: "right"}} onClick={()=>dispatch(Common.clickOnSearch())}>
                            <Icons.CloseIcon />
                        </Click.SimpleClick>
                    </Box>
                    <Flex justifyContent={"center"} mt={"85px"} width={"100%"} height={"60px"}>
                        <Inputs.SearchInput placeholder={"Введите поисковой запрос"} screenWidth={width}
                                            onChange={(e)=>this.setState({ query: e.target.value })}/>
                    </Flex>
                    { ((typing || loading) && !(notFoundTopMath && notFoundSuchMath)) && <Loader/> }
                    { (notFoundTopMath && notFoundSuchMath) && <NotFound /> }
                    <Box width={"100%"} margin={"64px auto 0 auto"}
                         px={width > 1023 ? "80px" : "0"} pb={"20px"}>
                        <StackGrid columnWidth={width > 340 ? 300 : 270} style={{
                            width: width > 340 ? "unset" : "320px"
                        }} gutterWidth={width > 340 ? 32 : 0} gutterHeight={width > 340 ? 48 : 10}>
                            {
                                searchItems.map((post, index)=>(
                                    <React.Fragment key={index}>
                                        <Mini cover={post.cover} slug={post.slug}
                                              onClick={()=>dispatch(Common.clickOnSearch())}
                                              heading={post.rubric ? post.rubric.title : ""}>
                                            {post.title}
                                        </Mini>
                                    </React.Fragment>
                                ))
                            }
                        </StackGrid>
                    </Box>
                </Box>
            </div>
        );
    }
}


function mapStateToProps(state){
    return{
        width: state.common.pageSize.width,
        activated: state.common.activeSearch
    }
}

export default connect(mapStateToProps)(Search);