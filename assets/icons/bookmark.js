import * as React from "react"

function BookmarkIcon(props) {
    return (
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
            <path
                d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"
                stroke={props.fill ? props.fill : "#4A4A4A"}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default BookmarkIcon;
