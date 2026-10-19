'use client';

import React from 'react';
import { LanguageProvider } from '../context/LanguageContext';
import { AcademyProvider } from '../context/AcademyContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AcademyProvider>
        {children}
      </AcademyProvider>
    </LanguageProvider>
  );
}
