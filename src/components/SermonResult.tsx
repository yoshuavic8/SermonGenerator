'use client';

import { SermonResponse } from '@/types';
import { ArrowLeftIcon, ShareIcon, BookOpenIcon, LightBulbIcon, UserGroupIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from 'react';

interface SermonResultProps {
  sermon: SermonResponse;
  onReset: () => void;
}

// Custom renderer components for ReactMarkdown
const HeadingRenderer = ({ level, children, ...props }: { level: number; children: React.ReactNode; [key: string]: any }) => {
  const getHeadingClass = () => {
    switch (level) {
      case 1:
        return 'text-2xl font-bold text-indigo-700 dark:text-indigo-400 mt-6 mb-4';
      case 2:
        return 'text-xl font-semibold text-indigo-600 dark:text-indigo-500 mt-5 mb-3';
      case 3:
        return 'text-lg font-medium text-gray-800 dark:text-gray-200 mt-4 mb-2';
      case 4:
        return 'text-base font-medium text-gray-700 dark:text-gray-300 mt-3 mb-2';
      default:
        return 'font-medium text-gray-700 dark:text-gray-300 mt-2 mb-1';
    }
  };

  return (
    <div className={getHeadingClass()}>
      {level === 1 && <div className="w-20 h-1 bg-indigo-500 mb-2 rounded-full"></div>}
      {children}
    </div>
  );
};

const ListItemRenderer = ({ children }: { children: React.ReactNode }) => {
  return (
    <li className="flex items-start mb-2">
      <span className="inline-block w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
      <span>{children}</span>
    </li>
  );
};

const BlockquoteRenderer = ({ children }: { children: React.ReactNode }) => {
  return (
    <blockquote className="pl-4 border-l-4 border-indigo-500 italic my-4 text-gray-700 dark:text-gray-300 bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-r-md">
      {children}
    </blockquote>
  );
};

export default function SermonResult({ sermon, onReset }: SermonResultProps) {
  const [copied, setCopied] = useState(false);
  const [processedContent, setProcessedContent] = useState(sermon.content);

  // State for extracted title
  const [sermonTitle, setSermonTitle] = useState<string>('');

  // Process content to improve formatting and extract title
  useEffect(() => {
    if (sermon.content) {
      // Replace multiple consecutive newlines with just two
      let content = sermon.content.replace(/\n{3,}/g, '\n\n');

      // Add a line break before headings if there isn't one already
      content = content.replace(/([^\n])(\n#{1,6} )/g, '$1\n\n$2');

      // Try to extract the title (first h1 or h2)
      const titleMatch = content.match(/^#\s+(.+)$|^##\s+(.+)$/m);
      if (titleMatch) {
        const extractedTitle = titleMatch[1] || titleMatch[2];
        setSermonTitle(extractedTitle);

        // Remove the title from the content to avoid duplication
        content = content.replace(/^#\s+(.+)$|^##\s+(.+)$/m, '');
      }

      setProcessedContent(content);
    }
  }, [sermon.content]);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(sermon.content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (sermon.error) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-red-800 dark:text-red-300">Error</h3>
          <p className="mt-2 text-red-700 dark:text-red-400">{sermon.error}</p>
          <button
            onClick={onReset}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mb-16">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Outline Kotbah</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Outline ini dapat digunakan sebagai dasar untuk mengembangkan kotbah lengkap
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleCopyToClipboard}
            className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ShareIcon className="mr-2 h-4 w-4" />
            {copied ? 'Tersalin!' : 'Salin'}
          </button>
          <button
            onClick={onReset}
            className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Kembali
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:p-6 max-w-none">
          {sermonTitle && (
            <div className="mb-6 text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-indigo-700 dark:text-indigo-400 mb-2">
                {sermonTitle}
              </h1>
              <div className="w-24 h-1 bg-indigo-500 mx-auto rounded-full"></div>
            </div>
          )}

          <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Outline kotbah ini mencakup:
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                <LightBulbIcon className="h-3 w-3 mr-1" />
                Teknik Retorika
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                Pertanyaan Inspiratif
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                Transisi Efektif
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                <BookOpenIcon className="h-3 w-3 mr-1" />
                Pendalaman Alkitab
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                <UserGroupIcon className="h-3 w-3 mr-1" />
                Aplikasi Praktis
              </span>
            </div>
          </div>

          <div className="sermon-content">
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => <HeadingRenderer level={1} {...props}>{props.children}</HeadingRenderer>,
                h2: ({ node, ...props }) => <HeadingRenderer level={2} {...props}>{props.children}</HeadingRenderer>,
                h3: ({ node, ...props }) => <HeadingRenderer level={3} {...props}>{props.children}</HeadingRenderer>,
                h4: ({ node, ...props }) => <HeadingRenderer level={4} {...props}>{props.children}</HeadingRenderer>,
                h5: ({ node, ...props }) => <HeadingRenderer level={5} {...props}>{props.children}</HeadingRenderer>,
                h6: ({ node, ...props }) => <HeadingRenderer level={6} {...props}>{props.children}</HeadingRenderer>,
                li: ({ node, ...props }) => <ListItemRenderer {...props}>{props.children}</ListItemRenderer>,
                blockquote: ({ node, ...props }) => <BlockquoteRenderer {...props}>{props.children}</BlockquoteRenderer>,
                p: ({ children }) => {
                  // Check if this paragraph contains a Bible verse reference
                  const childrenStr = String(children);
                  const isBibleVerse = /^[A-Za-z0-9\s]+\s\d+:\d+(-\d+)?/.test(childrenStr) ||
                                      /^[A-Za-z0-9\s]+ \d+:\d+(-\d+)?/.test(childrenStr);

                  if (isBibleVerse) {
                    return (
                      <p className="my-3 text-indigo-700 dark:text-indigo-400 font-medium bg-indigo-50 dark:bg-indigo-900/20 p-2 rounded border-l-4 border-indigo-500">
                        <BookOpenIcon className="inline-block h-4 w-4 mr-1 mb-1" />
                        {children}
                      </p>
                    );
                  }

                  return <p className="my-3 text-gray-700 dark:text-gray-300 leading-relaxed">{children}</p>;
                },
                strong: ({ children }) => <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>,
                em: ({ children }) => <em className="text-gray-800 dark:text-gray-200 italic">{children}</em>,
                a: ({ href, children }) => (
                  <a href={href} className="text-indigo-600 dark:text-indigo-400 hover:underline" target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
                ul: ({ children }) => <ul className="my-3 pl-2 space-y-1">{children}</ul>,
                ol: ({ children }) => <ol className="my-3 pl-6 list-decimal space-y-1">{children}</ol>,
                hr: () => <hr className="my-6 border-gray-200 dark:border-gray-700" />,
              }}
            >
              {processedContent}
            </ReactMarkdown>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <span>Outline ini dibuat dengan bantuan AI</span>
              </div>

              <div className="flex items-center">
                <button
                  onClick={handleCopyToClipboard}
                  className="inline-flex items-center px-3 py-1.5 text-xs border border-gray-300 dark:border-gray-700 rounded-md shadow-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <ShareIcon className="mr-1 h-3 w-3" />
                  {copied ? 'Tersalin!' : 'Salin Teks'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
