'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { HomeIcon, ClockIcon } from '@heroicons/react/24/outline';
import { HomeIcon as HomeIconSolid, ClockIcon as ClockIconSolid } from '@heroicons/react/24/solid';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-around items-center h-16">
          <Link 
            href="/" 
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
              pathname === '/' 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
            }`}
          >
            {pathname === '/' ? (
              <HomeIconSolid className="h-6 w-6" />
            ) : (
              <HomeIcon className="h-6 w-6" />
            )}
            <span className="text-xs mt-1">Home</span>
          </Link>
          
          <Link 
            href="/history" 
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
              pathname === '/history' 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
            }`}
          >
            {pathname === '/history' ? (
              <ClockIconSolid className="h-6 w-6" />
            ) : (
              <ClockIcon className="h-6 w-6" />
            )}
            <span className="text-xs mt-1">History</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
