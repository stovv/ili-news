import React from 'react';
import { lightTheme, darkTheme } from "./theme.react";
import useDarkMode from 'use-dark-mode';
import {ThemeProvider} from 'styled-components';

export default class IliThemeProvider extends React.Component {
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
    const theme = true ? darkTheme : lightTheme;

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
