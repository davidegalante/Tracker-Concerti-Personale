
import React from 'react';

interface StatsCardProps {
    stats: {
        totalConcerts: number;
        totalSpent: number;
        totalArtists: number;
        uniqueArtistsCount: number;
        avgCost: number;
        topBands: [string, number][];
    };
}

const StatItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="flex justify-between items-baseline">
        <span className="text-light-subtext dark:text-dark-subtext">{label}:</span>
        <span className="font-semibold text-light-text dark:text-dark-text">{value}</span>
    </div>
);


const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
    return (
        <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-md border border-light-border dark:border-dark-border">
            <h2 className="text-xl font-bold mb-4 text-accent">Statistiche</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                <div className="space-y-2">
                    <StatItem label="Totale concerti" value={stats.totalConcerts} />
                    <StatItem label="Totale speso" value={`€${stats.totalSpent.toFixed(2)}`} />
                    <StatItem label="Totale artisti" value={stats.totalArtists} />
                    <StatItem label="Artisti unici" value={stats.uniqueArtistsCount} />
                    <StatItem label="Media costo" value={`€${stats.avgCost.toFixed(2)}`} />
                </div>
                <div className="space-y-2">
                    <h3 className="font-semibold text-light-text dark:text-dark-text">Top 3 artisti visti:</h3>
                     {stats.topBands.length > 0 ? (
                        <ul className="list-disc list-inside text-light-subtext dark:text-dark-subtext">
                            {stats.topBands.map(([band, count]) => (
                                <li key={band}>
                                    <span className="text-light-text dark:text-dark-text">{band}</span> ({count}x)
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-light-subtext dark:text-dark-subtext">Nessun artista da mostrare.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
