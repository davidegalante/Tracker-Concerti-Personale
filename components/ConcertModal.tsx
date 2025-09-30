import React, { useState, useEffect } from 'react';
import { Concert } from '../types';

interface ConcertModalProps {
    concert: Concert | null;
    onClose: () => void;
    onSave: (concert: Concert) => void;
}

const ConcertModal: React.FC<ConcertModalProps> = ({ concert, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        band: '',
        date: '',
        city: '',
        event: '',
        cost: '0',
    });

    const parseAndFormatDate = (dateStr: string): { formattedDate: string; year: number } | null => {
        if (!dateStr) return null;
        
        const italianMonths: { [key: string]: string } = {
            'gennaio': '01', 'gen': '01',
            'febbraio': '02', 'feb': '02',
            'marzo': '03', 'mar': '03',
            'aprile': '04', 'apr': '04',
            'maggio': '05', 'mag': '05',
            'giugno': '06', 'giu': '06',
            'luglio': '07', 'lug': '07',
            'agosto': '08', 'ago': '08',
            'settembre': '09', 'set': '09',
            'ottobre': '10', 'ott': '10',
            'novembre': '11', 'nov': '11',
            'dicembre': '12', 'dic': '12'
        };

        const italianMonthsAbbr: { [key: string]: string } = {
            '01': 'gen', '02': 'feb', '03': 'mar', '04': 'apr',
            '05': 'mag', '06': 'giu', '07': 'lug', '08': 'ago',
            '09': 'set', '10': 'ott', '11': 'nov', '12': 'dic'
        };

        const str = dateStr.trim().toLowerCase().replace(/\./g, '');

        // Try format: "25 febbraio 2025" or "25 feb 2025"
        let match = str.match(/^(\d{1,2})\s+([a-zàèéìòù]+)\s+(\d{4})$/);
        if (match) {
            const day = match[1];
            const monthStr = match[2];
            const year = match[3];
            const monthNumber = italianMonths[monthStr];
            if (monthNumber) {
                const monthAbbr = italianMonthsAbbr[monthNumber];
                return {
                    formattedDate: `${day}-${monthAbbr}-${year}`,
                    year: parseInt(year, 10)
                };
            }
        }

        // Try format: "dd/mm/yyyy" or "dd-mm-yyyy"
        match = str.match(/^(\d{1,2})[/\-](\d{1,2})[/\-](\d{4})$/);
        if (match) {
            const day = match[1];
            const monthNumber = match[2].padStart(2, '0');
            const year = match[3];
            const monthAbbr = italianMonthsAbbr[monthNumber];
            if (monthAbbr) {
                return {
                    formattedDate: `${day}-${monthAbbr}-${year}`,
                    year: parseInt(year, 10)
                };
            }
        }

        // Try format: "dd-mon-yyyy" (existing format)
        match = str.match(/^(\d{1,2})-([a-z]{3})-(\d{4})$/);
        if (match) {
            const day = match[1];
            const monthAbbr = match[2];
            const year = match[3];
            if (Object.values(italianMonthsAbbr).includes(monthAbbr)) {
                 return {
                    formattedDate: `${day}-${monthAbbr}-${year}`,
                    year: parseInt(year, 10)
                };
            }
        }
        
        return null;
    };


    useEffect(() => {
        if (concert) {
            setFormData({
                band: concert.band,
                date: concert.date,
                city: concert.city,
                event: concert.event,
                cost: concert.cost.toString(),
            });
        }
    }, [concert]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { band, date, city, cost } = formData;
        if (!band || !date || !city) {
            alert("I campi Band, Data e Città sono obbligatori!");
            return;
        }

        const parsedDateInfo = parseAndFormatDate(date);
        if (!parsedDateInfo) {
            alert("Formato data non valido. Prova con '25 feb 2025', '25/02/2025', o '25 febbraio 2025'.");
            return;
        }

        const costNumber = parseFloat(cost.replace(',', '.') || '0');
        
        if (isNaN(costNumber)) {
            alert("Verifica che Costo sia un valore numerico valido!");
            return;
        }

        const artists = band.split(',').filter(b => b.trim()).length;

        onSave({
            id: concert?.id || '',
            band: formData.band,
            date: parsedDateInfo.formattedDate,
            city: formData.city,
            event: formData.event,
            cost: costNumber,
            year: parsedDateInfo.year,
            artists: artists
        });
    };
    
    const inputClasses = "w-full p-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-md focus:ring-2 focus:ring-accent focus:border-accent transition-colors";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity">
            <div className="bg-light-card dark:bg-dark-card rounded-xl shadow-2xl p-8 w-full max-w-md m-4 transform transition-all">
                <h2 className="text-2xl font-bold mb-6 text-light-text dark:text-dark-text">
                    {concert ? 'Modifica Concerto' : 'Aggiungi Concerto'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-light-subtext dark:text-dark-subtext mb-1">Band/Artista (separati da virgola)</label>
                        <input type="text" name="band" value={formData.band} onChange={handleChange} className={inputClasses} required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-light-subtext dark:text-dark-subtext mb-1">Data (es. 25 feb 2025)</label>
                        <input type="text" name="date" value={formData.date} onChange={handleChange} className={inputClasses} required />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-light-subtext dark:text-dark-subtext mb-1">Città</label>
                        <input type="text" name="city" value={formData.city} onChange={handleChange} className={inputClasses} required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-light-subtext dark:text-dark-subtext mb-1">Evento</label>
                        <input type="text" name="event" value={formData.event} onChange={handleChange} className={inputClasses} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-light-subtext dark:text-dark-subtext mb-1">Costo (€)</label>
                        <input type="text" name="cost" value={formData.cost} onChange={handleChange} className={inputClasses} />
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="bg-light-border dark:bg-dark-border text-light-text dark:text-dark-text font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                            Annulla
                        </button>
                        <button type="submit" className="bg-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-accent-hover transition-colors">
                            Salva
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ConcertModal;