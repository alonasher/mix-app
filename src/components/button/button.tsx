import "./button.css";
import React from 'react';

interface ButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
}

const Button = (props:ButtonProps) => {
    const { label, onClick, disabled = false, className = '' } = props;
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`btn ${className}`}
        >
            {label}
        </button>
    );
};

export default Button;