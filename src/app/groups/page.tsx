'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import GroupsAndSchedule from '../../components/GroupsAndSchedule';
import Footer from '../../components/Footer';
import AuthModal from '../../components/AuthModal';
import BookingModal from '../../components/BookingModal';
import { TeamGroup } from '../../data/mockData';
import { LanguageProvider } from '../../context/LanguageContext';

function GroupsPageContent() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<TeamGroup | null>(null);

  const handleSelectGroup = (group: TeamGroup) => {
    setSelectedGroup(group);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar onOpenAuthModal={() => setAuthModalOpen(true)} />
      <main className="flex-1">
        <GroupsAndSchedule onSelectGroup={handleSelectGroup} />
      </main>
      <Footer />
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        group={selectedGroup}
      />
    </div>
  );
}

export default function GroupsPage() {
  return (
    <LanguageProvider>
      <GroupsPageContent />
    </LanguageProvider>
  );
}
