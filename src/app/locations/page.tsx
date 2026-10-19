'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import LocationsSection from '../../components/LocationsSection';
import Footer from '../../components/Footer';
import AuthModal from '../../components/AuthModal';

export default function LocationsPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar onOpenAuthModal={() => setAuthModalOpen(true)} />
      <main className="flex-1">
        <LocationsSection />
      </main>
      <Footer />
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}
