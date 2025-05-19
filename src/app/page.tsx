'use client';

import { useState } from 'react';
import SermonForm from '@/components/SermonForm';
import SermonResult from '@/components/SermonResult';
import { SermonResponse, SermonFormData } from '@/types';
import { useSermon } from '@/context/SermonContext';
import { SparklesIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const [sermon, setSermon] = useState<SermonResponse | null>(null);
  const [formData, setFormData] = useState<SermonFormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { addToHistory } = useSermon();

  const handleSermonGenerated = (data: SermonFormData, result: SermonResponse) => {
    setSermon(result);
    setFormData(data);

    // Add to history if there's no error
    if (!result.error) {
      addToHistory(data, result);
    }
  };

  const handleReset = () => {
    setSermon(null);
    setFormData(null);
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] flex flex-col items-center p-4 md:p-8 animate-fadeIn">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 h-[70vh]">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-4 border-t-indigo-600"></div>
            <SparklesIcon className="h-6 w-6 text-indigo-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="mt-6 text-gray-600 dark:text-gray-400 text-center max-w-md">
            <span className="font-medium text-indigo-600 dark:text-indigo-400">Sedang membuat outline kotbah...</span>
            <br />
            <span className="text-sm">Proses ini membutuhkan waktu sekitar 15-30 detik untuk menghasilkan outline berkualitas tinggi.</span>
          </p>
        </div>
      ) : sermon ? (
        <SermonResult sermon={sermon} onReset={handleReset} />
      ) : (
        <div className="w-full animate-slideIn">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Generator Outline Kotbah
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Buat outline kotbah berkualitas tinggi dengan bantuan AI. Masukkan topik, ayat, dan preferensi Anda untuk menghasilkan outline yang terstruktur dan inspiratif.
            </p>
          </div>

          <SermonForm onSermonGenerated={handleSermonGenerated} setIsLoading={setIsLoading} />

          
        </div>
      )}
    </main>
  );
}
