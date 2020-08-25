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
          fontFamily: "'Lato', serif",
          lineHeight: 1.12,
          fontWeight: "bold",
          fontSize: {
            s: "18px",
            m: "20px",
            l: "32px",
            tablet: "40px",
            laptop: "48px",
          },
          margin: {
            s: `0 0 ${theme.spacing.s} 0`,
            m: `0 0 ${theme.spacing.s} 0`,
            l: `0 0 ${theme.spacing.s} 0`,
            tablet: `0 0 ${theme.spacing.s} 0`,
            laptop: `0 0 ${theme.spacing.s} 0`
          },
          color: theme.text.primary
        },
        rubric: {
          fontFamily: "'Lato', serif",
          lineHeight: 1.2,
          fontWeight: "bold",
          fontSize: {
            s: "20px",
            m: "20px",
            l: "20px",
            tablet: "20px",
            laptop: "20px",
          },
          margin: {
            s: `32px 0 ${theme.spacing.m} 0`,
            m: `32px 0 ${theme.spacing.m} 0`,
            l: `32px 0 ${theme.spacing.m} 0`,
            tablet: `32px 0 ${theme.spacing.m} 0`,
            laptop: `32px 0 ${theme.spacing.m} 0`
          },
          color: theme.colors.primary
        },
        date: {
          fontFamily: "'Lato', serif",
          lineHeight: 1.2,
          fontWeight: "bold",
          fontSize: {
            s: "20px",
            m: "20px",
            l: "20px",
            tablet: "20px",
            laptop: "20px",
          },
          margin: {
            s: `auto 0`,
            m: `auto 0`,
            l: `auto 0`,
            tablet: `auto 0`,
            laptop: `auto 0`
          },
          color: theme.text.secondary
        },
        authors: {
          fontFamily: "'Lato', serif",
          lineHeight: 1.2,
          fontWeight: "bold",
          fontSize: {
            s: "20px",
            m: "20px",
            l: "20px",
            tablet: "20px",
            laptop: "20px",
          },
          margin: {
            s: `auto 0 auto 5px`,
            m: `auto 0 auto 5px`,
            l: `auto 0 auto 5px`,
            tablet: `auto 0 auto 5px`,
            laptop: `auto 0 auto 5px`
          },
          color: theme.colors.primary
        },
        eventDate: {
          day: {
            fontFamily: "'Lato', serif",
            lineHeight: 1.02,
            fontWeight: "bold",
            fontSize: {
              s: "20px",
              m: "40px",
              l: "42px",
              tablet: "50px",
              laptop: "64px",
            },
            margin: {
              s: '0 12px 0 0',
              m: '0 14px 0 0',
              l: '0 20px 0 0',
              tablet: '0 24px 0 0',
              laptop: '0 24px 0 0'
            },
            color: theme.colors.primary
          },
          mouth: {
            fontFamily: "'Lato', serif",
            lineHeight: 1.2,
            fontWeight: "bold",
            fontSize: {
              s: "16px",
              m: "18px",
              l: "20px",
              tablet: "24px",
              laptop: "28px",
            },
            margin: {
              s: '0 12px 0 0',
              m: '0 14px 0 0',
              l: '0 20px 0 0',
              tablet: '0 24px 0 0',
              laptop: '0 24px 0 0'
            },
            color: theme.colors.primary
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
          },
          fontFamily: "'Lato', serif",
          lineHeight: 1.33,
          fontWeight: "normal",
          fontSize: {
            s: "16px",
            m: "16px",
            l: "18px",
            tablet: "20px",
            laptop: "20px",
          },
          margin: {
            s: 'auto 0',
            m: 'auto 0',
            l: 'auto 0',
            tablet: 'auto 0',
            laptop: 'auto 0'
          },
          color: theme.text.secondary
        }
      }
    }
  }

  
  export const lightTheme = { ...defaultTheme, ...light, ...typoTheme({...defaultTheme, ...light})}
  export const darkTheme = { ...defaultTheme, ...dark, ...typoTheme({...defaultTheme, ...dark})}