
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Concert } from './types';
import { useConcerts } from './hooks/useConcerts';
import Header from './components/Header';
import StatsCard from './components/StatsCard';
import FilterCard from './components/FilterCard';
import ConcertTable from './components/ConcertTable';
import ConcertModal from './components/ConcertModal';
import { PlusIcon } from './components/icons/PlusIcon';

const App: React.FC = () => {
    const { concerts, addConcert, updateConcert, deleteConcert } = useConcerts();
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        const savedTheme = localStorage.getItem('theme');
        return (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) ? 'dark' : 'light';
    });

    const [filters, setFilters] = useState({
        year: 'Tutti',
        city: 'Tutte',
        event: 'Tutti',
        artist: 'Tutti',
        search: '',
        sort: 'Data (recente)',
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingConcert, setEditingConcert] = useState<Concert | null>(null);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const parseDate = useCallback((dateStr: string | undefined): Date => {
        if (!dateStr || typeof dateStr !== 'string') return new Date(0);
        const italianMonths: { [key: string]: string } = { 'gen': '01', 'feb': '02', 'mar': '03', 'apr': '04', 'mag': '05', 'giu': '06', 'lug': '07', 'ago': '08', 'set': '09', 'ott': '10', 'nov': '11', 'dic': '12' };
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            const [day, month, year] = parts;
            const monthNumber = italianMonths[month.toLowerCase()];
            if (monthNumber) {
                return new Date(`${year}-${monthNumber}-${day}`);
            }
        }
        // Fallback for different formats
        try {
            return new Date(dateStr);
        } catch (e) {
            return new Date(0);
        }
    }, []);

    const filteredAndSortedConcerts = useMemo(() => {
        let filtered = [...concerts];

        if (filters.year !== 'Tutti') {
            filtered = filtered.filter(c => c.year === parseInt(filters.year, 10));
        }
        if (filters.city !== 'Tutte') {
            filtered = filtered.filter(c => c.city.toLowerCase() === filters.city.toLowerCase());
        }
        if (filters.event !== 'Tutti') {
            filtered = filtered.filter(c => c.event.toLowerCase() === filters.event.toLowerCase());
        }
        if (filters.artist !== 'Tutti') {
            filtered = filtered.filter(c => c.band.split(',').map(a => a.trim().toLowerCase()).includes(filters.artist.toLowerCase()));
        }
        if (filters.search) {
            filtered = filtered.filter(c => c.band.toLowerCase().includes(filters.search.toLowerCase()));
        }
        
        // Sorting
        switch (filters.sort) {
            case 'Data (recente)':
                filtered.sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());
                break;
            case 'Data (vecchia)':
                filtered.sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime());
                break;
            case 'Costo (alto)':
                filtered.sort((a, b) => (b.cost || 0) - (a.cost || 0));
                break;
            case 'Costo (basso)':
                filtered.sort((a, b) => (a.cost || 0) - (b.cost || 0));
                break;
            case 'Band (A-Z)':
                filtered.sort((a, b) => a.band.localeCompare(b.band));
                break;
            case 'Band (Z-A)':
                filtered.sort((a, b) => b.band.localeCompare(a.band));
                break;
        }

        return filtered;
    }, [concerts, filters, parseDate]);

    const stats = useMemo(() => {
        const concertsToAnalyze = filteredAndSortedConcerts;
        const totalConcerts = concertsToAnalyze.length;
        const totalSpent = concertsToAnalyze.reduce((acc, c) => acc + (c.cost || 0), 0);
        const totalArtists = concertsToAnalyze.reduce((acc, c) => acc + (c.artists || 0), 0);
        const allBands = concertsToAnalyze.flatMap(c => c.band.split(',').map(b => b.trim()));
        const uniqueArtistsCount = new Set(allBands).size;
        const bandCounts = allBands.reduce((acc, band) => {
            acc[band] = (acc[band] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        const topBands = Object.entries(bandCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);

        return {
            totalConcerts,
            totalSpent,
            totalArtists,
            uniqueArtistsCount,
            avgCost: totalConcerts > 0 ? totalSpent / totalConcerts : 0,
            topBands,
        };
    }, [filteredAndSortedConcerts]);

    const handleAddConcert = () => {
        setEditingConcert(null);
        setIsModalOpen(true);
    };

    const handleEditConcert = (concert: Concert) => {
        setEditingConcert(concert);
        setIsModalOpen(true);
    };

    const handleSaveConcert = (concert: Concert) => {
        if (editingConcert) {
            updateConcert(concert);
        } else {
            addConcert(concert);
        }
        setIsModalOpen(false);
        setEditingConcert(null);
    };


    return (
        <div className="bg-light-bg dark:bg-dark-bg min-h-screen text-light-text dark:text-dark-text transition-colors duration-300">
            <div className="container mx-auto p-4 md:p-8">
                <Header theme={theme} toggleTheme={toggleTheme} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
                    <StatsCard stats={stats} />
                    <FilterCard concerts={concerts} filters={filters} setFilters={setFilters} />
                </div>
                
                <div className="flex justify-end mb-4">
                    <button
                        onClick={handleAddConcert}
                        className="flex items-center gap-2 bg-accent text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-accent-hover transition-colors duration-200"
                    >
                        <PlusIcon />
                        Aggiungi Concerto
                    </button>
                </div>

                <ConcertTable
                    concerts={filteredAndSortedConcerts}
                    onEdit={handleEditConcert}
                    onDelete={deleteConcert}
                />
            </div>
            {isModalOpen && (
                <ConcertModal
                    concert={editingConcert}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveConcert}
                />
            )}
        </div>
    );
};

export default App;
