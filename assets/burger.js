import React from 'react';

export default function BurgerIcon(props){
    return (
        <svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
            <path fill="#4A4A4A" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
        </svg>
    );
}