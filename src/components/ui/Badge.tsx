import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'purple' | 'emerald' | 'blue' | 'cyan' | 'default';
    size?: 'sm' | 'md';
    className?: string;
}

const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'default',
    size = 'sm',
    className = ''
}) => {
    const variantClasses = {
        purple: 'bg-[#7C3AED]/10 border-[#7C3AED]/20 text-[#A855F7]',
        emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500',
        blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
        cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
        default: 'bg-white/5 border-white/10 text-gray-400'
    };

    const sizeClasses = {
        sm: 'px-2 py-0.5 text-[9px]',
        md: 'px-2.5 py-1 text-[10px]'
    };

    return (
        <span
            className={`
        inline-flex items-center gap-1.5
        border rounded-md
        font-black uppercase tracking-widest
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
        >
            {children}
        </span>
    );
};

export default Badge;
