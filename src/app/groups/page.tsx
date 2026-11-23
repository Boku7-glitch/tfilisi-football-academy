'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import GroupsAndSchedule from '../../components/GroupsAndSchedule';
import Footer from '../../components/Footer';
import AuthModal from '../../components/AuthModal';
import BookingModal from '../../components/BookingModal';
import { AcademyGroup } from '../../context/AcademyContext';

export default function GroupsPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<AcademyGroup | null>(null);

  const handleSelectGroup = (group: AcademyGroup) => {
    setSelectedGroup(group);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar onOpenAuthModal={() => setAuthModalOpen(true)} />
      <main className="flex-1 animate-page-enter">
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
