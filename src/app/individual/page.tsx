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
  const [bookingFee, setBookingFee] = useState<number>(240);
  const [bookingLocation, setBookingLocation] = useState<string>('ვაზისუბანი');

  const handleBookCoach = (
    coach: Coach,
    date: string,
    timeSlot: string,
    fee: number,
    locationName: string
  ) => {
    setSelectedCoach(coach);
    setBookingDate(date);
    setBookingTimeSlot(timeSlot);
    setBookingFee(fee);
    setBookingLocation(locationName);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar onOpenAuthModal={() => setAuthModalOpen(true)} />
      <main className="flex-1 animate-page-enter">
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
        customFee={bookingFee}
        locationName={bookingLocation}
      />
    </div>
  );
}
