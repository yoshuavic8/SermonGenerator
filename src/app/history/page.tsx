'use client';

import { useState } from 'react';
import { useSermon } from '@/context/SermonContext';
import { TrashIcon } from '@heroicons/react/24/outline';
import ReactMarkdown from 'react-markdown';
import { SermonHistoryItem } from '@/types';

export default function HistoryPage() {
  const { sermonHistory, clearHistory, removeFromHistory } = useSermon();
  const [selectedSermon, setSelectedSermon] = useState<SermonHistoryItem | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStructureName = (structure: string) => {
    const structureMap: Record<string, string> = {
      'topical': 'Topikal',
      'exegesis': 'Eksegesis',
      'textual': 'Tekstual',
      'expository': 'Ekspositori',
      'narrative': 'Naratif'
    };
    return structureMap[structure] || structure;
  };

  const getAudienceName = (audience: string) => {
    const audienceMap: Record<string, string> = {
      'general': 'Umum',
      'youth': 'Pemuda'
    };
    return audienceMap[audience] || audience;
  };

  if (sermonHistory.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Riwayat Kotbah</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Anda belum memiliki riwayat kotbah yang di-generate.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Buat Kotbah Baru
          </a>
        </div>
      </div>
    );
  }

  if (selectedSermon) {
    return (
      <div className="flex flex-col min-h-[calc(100vh-4rem)] p-4">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setSelectedSermon(null)}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            &larr; Kembali
          </button>
          <button
            onClick={() => {
              removeFromHistory(selectedSermon.id);
              setSelectedSermon(null);
            }}
            className="inline-flex items-center px-3 py-1.5 border border-red-300 dark:border-red-700 rounded-md shadow-sm text-sm font-medium text-red-700 dark:text-red-400 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <TrashIcon className="h-4 w-4 mr-1" />
            Hapus
          </button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden mb-16">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {selectedSermon.topic}
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {formatDate(selectedSermon.date)}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
                {getStructureName(selectedSermon.structure)}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                {getAudienceName(selectedSermon.audience)}
              </span>
              {selectedSermon.bibleVerse && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  {selectedSermon.bibleVerse}
                </span>
              )}
            </div>
          </div>
          <div className="px-4 py-5 sm:p-6 prose dark:prose-invert max-w-none">
            <ReactMarkdown>{selectedSermon.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Riwayat Kotbah</h1>
        <button
          onClick={clearHistory}
          className="inline-flex items-center px-3 py-1.5 border border-red-300 dark:border-red-700 rounded-md shadow-sm text-sm font-medium text-red-700 dark:text-red-400 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <TrashIcon className="h-4 w-4 mr-1" />
          Hapus Semua
        </button>
      </div>
      
      <div className="grid gap-4 mb-16">
        {sermonHistory.map((sermon) => (
          <div 
            key={sermon.id}
            className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedSermon(sermon)}
          >
            <div className="px-4 py-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                {sermon.topic}
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {formatDate(sermon.date)}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
                  {getStructureName(sermon.structure)}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  {getAudienceName(sermon.audience)}
                </span>
                {sermon.bibleVerse && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                    {sermon.bibleVerse}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
