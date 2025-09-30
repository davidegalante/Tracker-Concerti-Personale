
import React from 'react';
import { Concert } from '../types';
import { PencilIcon } from './icons/PencilIcon';
import { TrashIcon } from './icons/TrashIcon';

interface ConcertTableProps {
    concerts: Concert[];
    onEdit: (concert: Concert) => void;
    onDelete: (id: string) => void;
}

const ConcertTable: React.FC<ConcertTableProps> = ({ concerts, onEdit, onDelete }) => {
    const tableHeadings = ["Band", "Data", "Città", "Evento", "Artisti", "Costo", "Azioni"];

    return (
        <div className="bg-light-card dark:bg-dark-card rounded-xl shadow-md border border-light-border dark:border-dark-border overflow-x-auto">
            <table className="w-full text-left">
                <thead className="border-b border-light-border dark:border-dark-border">
                    <tr>
                        {tableHeadings.map(heading => (
                            <th key={heading} className="p-4 text-sm font-semibold text-light-subtext dark:text-dark-subtext uppercase tracking-wider">
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-light-border dark:divide-dark-border">
                    {concerts.length > 0 ? (
                        concerts.map(concert => (
                            <tr key={concert.id} className="hover:bg-light-bg dark:hover:bg-dark-bg transition-colors">
                                <td className="p-4 align-top max-w-xs">
                                    <div className="group relative">
                                        <p className="font-semibold truncate">{concert.band}</p>
                                        <div className="absolute z-10 hidden group-hover:block bg-dark-card dark:bg-light-card text-dark-text dark:text-light-text p-2 rounded-md shadow-lg text-sm w-max max-w-md">
                                            {concert.band}
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 align-top whitespace-nowrap">{concert.date}</td>
                                <td className="p-4 align-top max-w-xs truncate">{concert.city}</td>
                                <td className="p-4 align-top max-w-xs truncate">{concert.event}</td>
                                <td className="p-4 align-top text-center">{concert.artists}</td>
                                <td className="p-4 align-top whitespace-nowrap">{`€${concert.cost.toFixed(2)}`}</td>
                                <td className="p-4 align-top">
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => onEdit(concert)} className="p-2 text-light-subtext dark:text-dark-subtext hover:text-accent dark:hover:text-accent transition-colors" aria-label="Edit concert">
                                            <PencilIcon />
                                        </button>
                                        <button onClick={() => onDelete(concert.id)} className="p-2 text-light-subtext dark:text-dark-subtext hover:text-red-500 transition-colors" aria-label="Delete concert">
                                            <TrashIcon />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={tableHeadings.length} className="text-center p-8 text-light-subtext dark:text-dark-subtext">
                                Nessun concerto trovato. Prova a modificare i filtri.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ConcertTable;
