import * as React from "react"

function HelpIcon(props) {
    return (
        <svg width={56} height={56} viewBox="0 0 56 56" fill="none" {...props}>
            <path
                d="M28 51.333c12.887 0 23.334-10.446 23.334-23.333C51.334 15.113 40.887 4.667 28 4.667 15.114 4.667 4.667 15.113 4.667 28c0 12.887 10.447 23.333 23.333 23.333z"
                stroke="#fff"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M21.21 21a7 7 0 0113.603 2.333c0 4.667-7 7-7 7M28 39.667h.023"
                stroke="#fff"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default HelpIcon;
