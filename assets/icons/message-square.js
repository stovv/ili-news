import * as React from "react"

function CommentsIcon(props) {
    return (
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
            <path
                d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
                stroke={props.fill ? props.fill : "#4A4A4A"}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default CommentsIcon;