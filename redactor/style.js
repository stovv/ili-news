import React from 'react';

export const RedactorTypogrphy = () =>(
    <style jsx>
    {`
        h1 {
          font-family: Lato,sans-serif;
          font-size: 40px;
          font-weight: bold;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.12;
          letter-spacing: normal;
        }
        h2 {
          font-family: Lato,sans-serif;
          font-size: 30px;
          font-weight: bold;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.12;
          letter-spacing: normal;
        }
        
        h3 {
          font-family: Lato,sans-serif;
          font-size: 20px;
          font-weight: bold;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.12;
          letter-spacing: normal;
        }
        
        h4 {
          font-family: Lato,sans-serif;
          font-size: 16px;
          font-weight: bold;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.12;
          letter-spacing: normal;
        }
        
        p, li {
          font-family: Lato,sans-serif;
          font-size: 18px;
          font-weight: 500;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.28;
          letter-spacing: normal;
        }
        
        span {
          text-transform: uppercase;
          color: #eb5757;
        }
        
        body {
          font-family: Lato,sans-serif;
          font-size: 18px;
          font-weight: 500;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.28;
          letter-spacing: normal;
        }
    `}
    </style>
)


export const RedactorEmojiPicker = () =>(
    <style jsx>
        {`
        .reactions {
            position: absolute;
            top: 60%;
            left: 5%;
            transform: translate(0, 50%);
        
        }
        .reactions .reactions-counter {
            display: flex;
        }
        
        .reactions .emoji-mart-anchors {
            display: none;
        }
        .reactions .emoji-mart-search {
            display: none;
        }
        
        .reactions .emoji-mart-bar {
            display: none;
        }
        .reactions .emoji-mart-scroll {
            overflow: auto;
            width: fit-content;
            margin: 0;
            padding: 0;
            height: auto;
        }
        
        
        .reactions .emoji-mart-category-label {
            display: none;
        }
    `}
    </style>
);
//span