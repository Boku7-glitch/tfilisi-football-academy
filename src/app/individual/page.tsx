'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import IndividualTraining from '../../components/IndividualTraining';
import Footer from '../../components/Footer';
import AuthModal from '../../components/AuthModal';
import BookingModal from '../../components/BookingModal';
import { Coach } from '../../data/mockData';

export default function IndividualPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingTimeSlot, setBookingTimeSlot] = useState<string>('');

  const handleBookCoach = (coach: Coach, date: string, timeSlot: string) => {
    setSelectedCoach(coach);
    setBookingDate(date);
    setBookingTimeSlot(timeSlot);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar onOpenAuthModal={() => setAuthModalOpen(true)} />
      <main className="flex-1">
        <IndividualTraining onBookCoach={handleBookCoach} />
      </main>
      <Footer />
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        coach={selectedCoach}
        date={bookingDate}
        timeSlot={bookingTimeSlot}
      />
    </div>
  );
}
