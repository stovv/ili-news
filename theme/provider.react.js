import React from 'react';
import { lightTheme, darkTheme } from "./theme.react";
import {ThemeProvider} from 'styled-components';
import {connect} from 'react-redux';

class IliThemeProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted : false
    };
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  render() {
    const theme = this.props.mode === 'dark' ? darkTheme : lightTheme;
    const body = (
      <ThemeProvider theme={theme}>{this.props.children}</ThemeProvider>
    );

    // prevents ssr flash for mismatched dark mode
    if (!this.state.mounted) {
      return <div style={{ visibility: "hidden" }}>{body}</div>;
    }

    return body;
  }
}

function mapStateToProps(state) {
  return{
    //mode: state.page.mode
  }
}

export default connect(mapStateToProps)(IliThemeProvider)
