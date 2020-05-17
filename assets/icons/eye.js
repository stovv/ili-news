import * as React from "react"

function EyeIcon({stroke, ...props}) {
    return (
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
            <g
                opacity={0.8}
                stroke={stroke ? stroke : "#4A4A4A"}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
            </g>
        </svg>
    )
}

export default EyeIcon;