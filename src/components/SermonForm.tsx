'use client';


import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SermonFormData, SermonResponse } from '@/types';
import {
  BookOpenIcon,
  UserGroupIcon,
  DocumentTextIcon,
  SparklesIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import AdvancedOptions from './AdvancedOptions';

// Define the schema for form validation
const sermonFormSchema = z.object({
  topic: z.string().min(3, { message: 'Topik harus minimal 3 karakter' }).max(100, { message: 'Topik maksimal 100 karakter' }),
  bibleVerse: z.string().optional(),
  structure: z.enum(['topical', 'exegesis', 'textual', 'expository', 'narrative'] as const),
  audience: z.enum(['general', 'youth'] as const)
});

interface SermonFormProps {
  onSermonGenerated: (data: SermonFormData, sermon: SermonResponse) => void;
  setIsLoading: (loading: boolean) => void;
}

export default function SermonForm({ onSermonGenerated, setIsLoading }: SermonFormProps) {
  const [formStep, setFormStep] = useState(0);
  const [customPromptOptions, setCustomPromptOptions] = useState({
    includePurpose: true,
    includeBibleResearch: true,
    includeApplications: true,
    includeCallToAction: true,
    customInstructions: '',
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SermonFormData>({
    resolver: zodResolver(sermonFormSchema),
    defaultValues: {
      topic: '',
      bibleVerse: '',
      structure: 'topical',
      audience: 'general',
    },
    mode: 'onChange'
  });

  const watchTopic = watch('topic');
  const isFirstStepValid = watchTopic && watchTopic.length >= 3;

  const handleAdvancedOptionsChange = (options: any) => {
    setCustomPromptOptions(options);
  };

  const nextStep = () => {
    if (formStep < 1 && isFirstStepValid) {
      setFormStep(1);
    }
  };

  const prevStep = () => {
    if (formStep > 0) {
      setFormStep(0);
    }
  };

  const onSubmit = async (data: SermonFormData) => {
    try {
      // Menambahkan customPromptOptions ke data form
      const formDataWithOptions = {
        ...data,
        customPromptOptions: customPromptOptions
      };

      setIsLoading(true);
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithOptions),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate sermon');
      }

      onSermonGenerated(formDataWithOptions, { content: result.content });
    } catch (error) {
      console.error('Error generating sermon:', error);
      onSermonGenerated(data, {
        content: '',
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Generator Outline Kotbah</h2>
        <p className="text-indigo-100">
          Buat outline kotbah berkualitas tinggi dengan bantuan AI
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 rounded-b-xl shadow-xl overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Step indicator */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${formStep === 0 ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-600'} mr-2`}>
                <span className="text-sm font-medium">1</span>
              </div>
              <span className={`text-sm ${formStep === 0 ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                Informasi Dasar
              </span>
            </div>
            <div className="flex-grow mx-4 h-0.5 bg-gray-200 dark:bg-gray-700"></div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${formStep === 1 ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-600'} mr-2`}>
                <span className="text-sm font-medium">2</span>
              </div>
              <span className={`text-sm ${formStep === 1 ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                Struktur & Jemaat
              </span>
            </div>
          </div>

          {formStep === 0 ? (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border-l-4 border-indigo-500">
                <p className="text-sm text-indigo-700 dark:text-indigo-300">
                  Mulai dengan menentukan topik dan ayat Alkitab untuk kotbah Anda
                </p>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <DocumentTextIcon className="h-5 w-5 text-indigo-500 mr-2" />
                  <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Topik Kotbah <span className="text-red-500">*</span>
                  </label>
                </div>
                <input
                  id="topic"
                  type="text"
                  {...register('topic')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all duration-200 py-3 px-4 text-base"
                  placeholder="Masukkan topik kotbah"
                />
                {errors.topic && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.topic.message}</p>
                )}
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Contoh: Kasih, Pengampunan, Iman, Ketaatan, Kerendahan Hati, dll.
                </div>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <BookOpenIcon className="h-5 w-5 text-indigo-500 mr-2" />
                  <label htmlFor="bibleVerse" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Ayat Alkitab (Opsional)
                  </label>
                </div>
                <input
                  id="bibleVerse"
                  type="text"
                  {...register('bibleVerse')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all duration-200 py-3 px-4 text-base"
                  placeholder="contoh: Yohanes 3:16"
                />
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Sangat direkomendasikan untuk struktur Eksegesis, Tekstual, dan Ekspositori.
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setFormStep(1)}
                  disabled={!isFirstStepValid}
                  className={`flex items-center px-5 py-3 rounded-md text-sm font-medium ${
                    isFirstStepValid
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                  } transition-all duration-200`}
                >
                  Lanjutkan
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <div className="flex items-center mb-2">
                  <SparklesIcon className="h-5 w-5 text-indigo-500 mr-2" />
                  <label htmlFor="structure" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Struktur Kotbah <span className="text-red-500">*</span>
                  </label>
                </div>
                <select
                  id="structure"
                  {...register('structure')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all duration-200 py-3 px-4 text-base appearance-none bg-no-repeat bg-right"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundSize: "1.5em 1.5em", paddingRight: "2.5rem" }}
                >
                  <option value="topical">Topikal - Tema dengan multi-ayat</option>
                  <option value="exegesis">Eksegesis - Analisis mendalam satu teks</option>
                  <option value="textual">Tekstual - Pendalaman satu ayat kunci</option>
                  <option value="expository">Ekspositori - Penjelasan sistematis perikop</option>
                  <option value="narrative">Naratif - Bercerita dengan alur menarik</option>
                </select>
                {errors.structure && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.structure.message}</p>
                )}
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Setiap struktur memiliki pendekatan berbeda dalam penyampaian pesan. Outline yang dihasilkan akan mencakup teknik retorika, pertanyaan inspiratif, dan transisi yang efektif sesuai dengan struktur yang dipilih.
                </div>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <UserGroupIcon className="h-5 w-5 text-indigo-500 mr-2" />
                  <label htmlFor="audience" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Target Jemaat <span className="text-red-500">*</span>
                  </label>
                </div>
                <select
                  id="audience"
                  {...register('audience')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all duration-200 py-3 px-4 text-base appearance-none bg-no-repeat bg-right"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundSize: "1.5em 1.5em", paddingRight: "2.5rem" }}
                >
                  <option value="general">Umum (Semua Usia)</option>
                  <option value="youth">Pemuda (13-25 tahun)</option>
                </select>
                {errors.audience && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.audience.message}</p>
                )}
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Pilihan target jemaat akan mempengaruhi aplikasi praktis dan ilustrasi yang digunakan dalam kotbah.
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2 flex items-center">
                  <SparklesIcon className="h-4 w-4 mr-1" />
                  Fitur Tambahan dalam Outline
                </h3>
                <ul className="text-xs text-blue-700 dark:text-blue-400 grid grid-cols-1 md:grid-cols-2 gap-2">
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span>Teknik pertanyaan inspiratif</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span>Pola retorika efektif</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span>Transisi antar bagian</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span>Pendalaman Alkitab</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span>Aplikasi praktis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span>Ilustrasi relevan</span>
                  </li>
                </ul>
              </div>

              <AdvancedOptions onChange={handleAdvancedOptionsChange} />

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setFormStep(0)}
                  className="flex items-center px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Kembali
                </button>

                <button
                  type="submit"
                  className="flex items-center px-6 py-3 bg-indigo-600 rounded-md shadow-md text-sm font-medium text-white hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                >
                  <SparklesIcon className="h-4 w-4 mr-2" />
                  Buat Outline Kotbah
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-center text-gray-500 dark:text-gray-400">
            Proses pembuatan outline kotbah membutuhkan waktu sekitar 15-30 detik.
          </div>
        </div>
      </form>
    </div>
  );
}
