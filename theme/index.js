// import React from 'react';
// import {connect} from 'react-redux';
// import {ThemeProvider} from 'styled-components';
//
// import { lightTheme, darkTheme } from "./theme.react";
//
//
// class IliThemeProvider extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { mounted : false };
//     }
//
//     componentDidMount() {
//         this.setState({ mounted: true });
//     }
//
//     render() {
//         const theme = this.props.mod === 'dark' ? darkTheme : lightTheme;
//         const body = (
//             <ThemeProvider theme={theme}>{this.props.children}</ThemeProvider>
//         );
//
//         // prevents ssr flash for mismatched dark mode
//         if (!this.state.mounted) {
//             return <div style={{ visibility: "hidden" }}>{body}</div>;
//         }
//
//         return body;
//     }
// }
//
// function mapStateToProps(state) {
//     return{
//         mod: state.common.mod
//     }
// }
//
// export default connect(mapStateToProps)(IliThemeProvider)
