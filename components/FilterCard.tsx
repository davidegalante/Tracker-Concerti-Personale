
import React, { useMemo } from 'react';
import { Concert } from '../types';

interface FilterCardProps {
    concerts: Concert[];
    filters: {
        year: string;
        city: string;
        event: string;
        artist: string;
        search: string;
        sort: string;
    };
    setFilters: React.Dispatch<React.SetStateAction<FilterCardProps['filters']>>;
}

const FilterControl: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div>
        <label className="block text-sm font-medium text-light-subtext dark:text-dark-subtext mb-1">{label}</label>
        {children}
    </div>
);

const FilterCard: React.FC<FilterCardProps> = ({ concerts, filters, setFilters }) => {

    const filterOptions = useMemo(() => {
        const years = ["Tutti", ...Array.from(new Set(concerts.map(c => c.year.toString()))).sort((a, b) => parseInt(b) - parseInt(a))];
        const cities = ["Tutte", ...Array.from(new Set(concerts.map(c => c.city))).sort()];
        const events = ["Tutti", ...Array.from(new Set(concerts.map(c => c.event))).sort()];
        const artists = ["Tutti", ...Array.from(new Set(concerts.flatMap(c => c.band.split(',').map(b => b.trim())))).sort()];
        const sortOptions = ["Data (recente)", "Data (vecchia)", "Costo (alto)", "Costo (basso)", "Band (A-Z)", "Band (Z-A)"];
        return { years, cities, events, artists, sortOptions };
    }, [concerts]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const resetFilters = () => {
        setFilters({
            year: 'Tutti',
            city: 'Tutte',
            event: 'Tutti',
            artist: 'Tutti',
            search: '',
            sort: 'Data (recente)',
        });
    };
    
    const commonSelectClasses = "w-full p-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-md focus:ring-2 focus:ring-accent focus:border-accent transition-colors";
    const commonInputClasses = "w-full p-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-md focus:ring-2 focus:ring-accent focus:border-accent transition-colors";

    return (
        <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-md border border-light-border dark:border-dark-border">
            <h2 className="text-xl font-bold mb-4 text-light-text dark:text-dark-text">Filtri</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <FilterControl label="Anno">
                    <select name="year" value={filters.year} onChange={handleFilterChange} className={commonSelectClasses}>
                        {filterOptions.years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                </FilterControl>
                <FilterControl label="Città">
                    <select name="city" value={filters.city} onChange={handleFilterChange} className={commonSelectClasses}>
                        {filterOptions.cities.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </FilterControl>
                <FilterControl label="Evento">
                    <select name="event" value={filters.event} onChange={handleFilterChange} className={commonSelectClasses}>
                        {filterOptions.events.map(e => <option key={e} value={e}>{e}</option>)}
                    </select>
                </FilterControl>
                <FilterControl label="Artista">
                    <select name="artist" value={filters.artist} onChange={handleFilterChange} className={commonSelectClasses}>
                        {filterOptions.artists.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                </FilterControl>
                <FilterControl label="Ordina per">
                     <select name="sort" value={filters.sort} onChange={handleFilterChange} className={commonSelectClasses}>
                        {filterOptions.sortOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </FilterControl>
                <FilterControl label="Cerca Band">
                     <input type="text" name="search" value={filters.search} onChange={handleFilterChange} placeholder="Nome band..." className={commonInputClasses} />
                </FilterControl>
            </div>
            <div className="mt-6 flex justify-end">
                <button
                    onClick={resetFilters}
                    className="bg-light-border dark:bg-dark-border text-light-text dark:text-dark-text font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                    Reset Filtri
                </button>
            </div>
        </div>
    );
};

export default FilterCard;
