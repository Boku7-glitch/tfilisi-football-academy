'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import ContactSection from '../../components/ContactSection';
import Footer from '../../components/Footer';
import AuthModal from '../../components/AuthModal';
import { LanguageProvider } from '../../context/LanguageContext';

function ContactPageContent() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar onOpenAuthModal={() => setAuthModalOpen(true)} />
      <main className="flex-1">
        <ContactSection />
      </main>
      <Footer />
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}

export default function ContactPage() {
  return (
    <LanguageProvider>
      <ContactPageContent />
    </LanguageProvider>
  );
}
