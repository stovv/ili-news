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
  
const defaultTheme = {
  fontSizes:{
    xxxs: '14px',
    xxs: '16px',
    xs: '18px',
    s: '20px',
    m: '22px',
    l: '24px',
    xl: '28px',
    xxl: '30px',
    xxxl: '40px',
    xxxxl: '56px'
  },
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
  breakpoints: [ '32em', '48em', '64em' ],
};

const typoTheme = (theme) =>{
  return {
    post: {
      heading: {

      },
      rubric: {},
      date: {},
      authors: {},
      eventDate: {
        day: {},
        mouth: {}
      },
      typo: {
        h1: {},
        h2: {},
        h3: {},
        h4: {},
        h5: {},
        h6: {},
        paragraph: {
          lineHeight: 1.33,
          margin: {
            s: '0 0 12px 0',
            m: '0 0 14px 0',
            l: '0 0 20px 0',
            tablet: '0 0 24px 0',
            laptop: '0 0 24px 0'
          }
        },
        quote: {
          t1: {},
          t2: {},
          t3: {}
        }
      },
      footer: {
        iconSpacing: {
          comments: {
            margin: "auto 9px auto 77px"
          },
          bookmark: {
            margin: "auto 38px auto 0"
          },
          view: {
            margin: "auto 9px auto 0"
          }
        }
      }
    },
    journal: {
      heading: {
        title: {},
        subTitle: {}
      }
    }
  }
}

  
  export const lightTheme = { ...defaultTheme, ...light, ...typoTheme({...defaultTheme, ...light})}
  export const darkTheme = { ...defaultTheme, ...dark, ...typoTheme({...defaultTheme, ...dark})}