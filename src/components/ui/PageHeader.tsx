import React from 'react';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    children?: React.ReactNode; // Para ações extras (botões, filtros, etc.)
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, children }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-3">
                <h2 className="text-[40px] font-bold text-white tracking-tighter leading-none">
                    {title}
                </h2>
                {subtitle && (
                    <p className="text-slate-400 font-medium max-w-xl">
                        {subtitle}
                    </p>
                )}
            </div>
            {children && (
                <div className="flex items-center gap-4">
                    {children}
                </div>
            )}
        </div>
    );
};

export default PageHeader;
