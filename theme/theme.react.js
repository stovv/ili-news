import React from "react";

const light = {
    colors: {
      primary: '#eb5757',
      backgroundSecondary: '#f6f6f6',
      backgroundPrimary: '#ffffff',
      backgroundInvert: '#4a4a4a',
      backgroundInverted: '#0e0e0e',
      hover: "#050505",
    },
    text: {
      primary: '#050505',
      hover: '#eb5757',
      secondary: '#4a4a4a',
      secondarySecondary: '#0e0e0e',
      onPrimary: '#ffffff',
      editorSecondary: "#707684",
      disabled: "#d2d2d2"
    },
  }
  
  const dark = {
    colors: {
      primary: '#eb5757',
      secondary: '#111111',
      inset: '#111111',
      input: 'rgba(191,193,201,0.12)'
    },
    text: {
      primary: '#fbfbfc',
      hover: '#eb5757',
      secondary: '#e3e4e8',
      tertiary: '#a9abb6',
      quarternary: '#6c6f7e',
      placeholder: 'rgba(145,148,161,0.5)',
      onPrimary: '#050505'
    },
  }
  
  const defaultTheme = {
    fontSizes: [
      '14px', // 0
      '16px', // 1
      '18px', // 2
      '20px', // 3
      '22px', // 4
      '24px', // 5
      '28px', // 6
      '30px', // 7
      '40px', // 8
      '56px'  // 9
    ],
    fontWeights: {
      body: 400,
      medium: 500,
      link: 600,
      bold: 700,
      heading: 800,
    },
    fontFamily: "Lato, sans-serif",
    lineHeights: {
      body: 1.5,
      heading: 1.3,
      code: 1.6,
    },
    spacing: {
      xxs: '4px',
      xs: '8px',
      s: '12px',
      m: '16px',
      block: '20px'
    },
    breakpoints: [ '32em', '48em', '64em' ]
    // ...
  };
  
  export const lightTheme = { ...defaultTheme, ...light }
  export const darkTheme = { ...defaultTheme, ...dark }