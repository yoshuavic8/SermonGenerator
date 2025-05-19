'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

interface AdvancedOptionsProps {
  onChange: (options: {
    includePurpose: boolean;
    includeBibleResearch: boolean;
    includeApplications: boolean;
    includeCallToAction: boolean;
    customInstructions: string;
  }) => void;
}

export default function AdvancedOptions({ onChange }: AdvancedOptionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState({
    includePurpose: true,
    includeBibleResearch: true,
    includeApplications: true,
    includeCallToAction: true,
    customInstructions: '',
  });

  const handleChange = (field: string, value: boolean | string) => {
    const newOptions = { ...options, [field]: value };
    setOptions(newOptions);
    onChange(newOptions);
  };

  return (
    <div className="mt-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
      >
        <div className="flex items-center">
          <AdjustmentsHorizontalIcon className="h-5 w-5 text-indigo-500 mr-2" />
          <span>Opsi Lanjutan</span>
        </div>
        {isOpen ? (
          <ChevronUpIcon className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-gray-500" />
        )}
      </button>

      {isOpen && (
        <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 animate-fadeIn">
          <div className="space-y-4">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Sesuaikan komponen yang akan disertakan dalam outline kotbah:
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  id="includePurpose"
                  type="checkbox"
                  checked={options.includePurpose}
                  onChange={(e) => handleChange('includePurpose', e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="includePurpose" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Sertakan tujuan kotbah
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="includeBibleResearch"
                  type="checkbox"
                  checked={options.includeBibleResearch}
                  onChange={(e) => handleChange('includeBibleResearch', e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="includeBibleResearch" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Sertakan penelitian Alkitab
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="includeApplications"
                  type="checkbox"
                  checked={options.includeApplications}
                  onChange={(e) => handleChange('includeApplications', e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="includeApplications" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Sertakan aplikasi praktis
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="includeCallToAction"
                  type="checkbox"
                  checked={options.includeCallToAction}
                  onChange={(e) => handleChange('includeCallToAction', e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="includeCallToAction" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Sertakan panggilan untuk respons
                </label>
              </div>
            </div>
            
            <div className="pt-3">
              <label htmlFor="customInstructions" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Instruksi Tambahan (opsional)
              </label>
              <textarea
                id="customInstructions"
                value={options.customInstructions}
                onChange={(e) => handleChange('customInstructions', e.target.value)}
                rows={3}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white py-2 px-3 text-sm"
                placeholder="Tambahkan instruksi khusus untuk AI, misalnya: 'Gunakan lebih banyak ilustrasi kontemporer' atau 'Fokus pada aspek teologis'"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
