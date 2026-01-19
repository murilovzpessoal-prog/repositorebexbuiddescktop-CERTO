import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    hover?: boolean;
    padding?: 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
    children,
    className = '',
    onClick,
    hover = false,
    padding = 'lg'
}) => {
    const paddingClasses = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
    };

    return (
        <div
            onClick={onClick}
            className={`
        bg-[#0F0F12] 
        border border-white/5 
        rounded-[24px] 
        ${paddingClasses[padding]}
        shadow-xl
        ${hover ? 'hover:border-[#7C3AED]/40 transition-all duration-300 cursor-pointer' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
        >
            {children}
        </div>
    );
};

export default Card;
