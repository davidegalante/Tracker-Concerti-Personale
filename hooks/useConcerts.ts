import { useState, useEffect } from 'react';
import { Concert } from '../types';
import { initialConcertsData } from '../data/initialConcerts';

const LOCAL_STORAGE_KEY = 'concertTrackerData';

export const useConcerts = () => {
    const [concerts, setConcerts] = useState<Concert[]>(() => {
        try {
            const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (storedData) {
                return JSON.parse(storedData);
            }
        } catch (error) {
            console.error("Error reading from localStorage", error);
        }
        
        // Seed with initial data if localStorage is empty or fails
        const initialDataWithIds = initialConcertsData.map(c => ({
            ...c,
            id: crypto.randomUUID(),
        }));
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialDataWithIds));
        return initialDataWithIds;
    });

    useEffect(() => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(concerts));
        } catch (error) {
            console.error("Error writing to localStorage", error);
        }
    }, [concerts]);

    const addConcert = (concert: Omit<Concert, 'id'>) => {
        const newConcert = { ...concert, id: crypto.randomUUID() };
        setConcerts(prevConcerts => [...prevConcerts, newConcert]);
    };
    
    const updateConcert = (updatedConcert: Concert) => {
        setConcerts(prevConcerts =>
            prevConcerts.map(c => (c.id === updatedConcert.id ? updatedConcert : c))
        );
    };

    const deleteConcert = (id: string) => {
       // The confirmation dialog was causing issues, so it has been removed.
       // Deletion is now immediate.
       setConcerts(prevConcerts => prevConcerts.filter(c => c.id !== id));
    };

    return { concerts, addConcert, updateConcert, deleteConcert };
};
