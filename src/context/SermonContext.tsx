'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SermonHistoryItem, SermonFormData, SermonResponse } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface SermonContextType {
  sermonHistory: SermonHistoryItem[];
  addToHistory: (formData: SermonFormData, response: SermonResponse) => void;
  clearHistory: () => void;
  removeFromHistory: (id: string) => void;
}

const SermonContext = createContext<SermonContextType | undefined>(undefined);

export function SermonProvider({ children }: { children: ReactNode }) {
  const [sermonHistory, setSermonHistory] = useState<SermonHistoryItem[]>([]);

  // Load sermon history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('sermonHistory');
    if (savedHistory) {
      try {
        setSermonHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Failed to parse sermon history:', error);
      }
    }
  }, []);

  // Save sermon history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sermonHistory', JSON.stringify(sermonHistory));
  }, [sermonHistory]);

  const addToHistory = (formData: SermonFormData, response: SermonResponse) => {
    if (response.error || !response.content) return;

    const newHistoryItem: SermonHistoryItem = {
      id: uuidv4(),
      date: new Date().toISOString(),
      topic: formData.topic,
      bibleVerse: formData.bibleVerse,
      structure: formData.structure,
      audience: formData.audience,
      content: response.content
    };

    setSermonHistory(prev => [newHistoryItem, ...prev]);
  };

  const clearHistory = () => {
    setSermonHistory([]);
  };

  const removeFromHistory = (id: string) => {
    setSermonHistory(prev => prev.filter(item => item.id !== id));
  };

  return (
    <SermonContext.Provider value={{ sermonHistory, addToHistory, clearHistory, removeFromHistory }}>
      {children}
    </SermonContext.Provider>
  );
}

export function useSermon() {
  const context = useContext(SermonContext);
  if (context === undefined) {
    throw new Error('useSermon must be used within a SermonProvider');
  }
  return context;
}
