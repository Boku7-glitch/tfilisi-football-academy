'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import PortalHubGrid from '../components/PortalHubGrid';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';

export default function Home() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Header with Navigation and Search */}
      <Navbar onOpenAuthModal={() => setAuthModalOpen(true)} />

      {/* Main Content: ONLY the 6 Official Academy Blocks on Clean White Background */}
      <main className="flex-1 bg-white">
        <PortalHubGrid />
      </main>

      {/* Footer */}
      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
}
