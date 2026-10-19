'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../../components/Navbar';
import GroupsAndSchedule from '../../components/GroupsAndSchedule';
import Footer from '../../components/Footer';
import AuthModal from '../../components/AuthModal';
import BookingModal from '../../components/BookingModal';
import { TeamGroup } from '../../data/mockData';

export default function GroupsPage() {
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
      <main className="flex-1 animate-page-enter">
        {/* Dedicated Back Navigation Strip */}
        <div className="bg-slate-50 border-b border-slate-200/80 py-2.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>მთავარ გვერდზე დაბრუნება</span>
            </Link>
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">ტფილისის აკადემია</span>
          </div>
        </div>
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
