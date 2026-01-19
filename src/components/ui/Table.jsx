import React from 'react';

const Table = ({ headers, children }) => {
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                    <tr>
                        {headers.map((header, idx) => (
                            <th key={idx} className="px-6 py-3 uppercase tracking-wider text-xs">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                    {children}
                </tbody>
            </table>
        </div>
    );
};

export const TableRow = ({ children }) => (
    <tr className="hover:bg-gray-50 transition-colors">
        {children}
    </tr>
);

export const TableCell = ({ children, className = "" }) => (
    <td className={`px-6 py-4 whitespace-nowrap ${className}`}>
        {children}
    </td>
);

export default Table;
