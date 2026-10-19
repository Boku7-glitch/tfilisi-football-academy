'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'coach' | 'parent' | 'guest';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  assignedGroupId?: string;
  assignedPlayerId?: string;
}

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  birthYear: number;
  age: number;
  position: string;
  jerseyNumber: number;
  groupId: string;
  groupName: string;
  coachId: string;
  coachName: string;
  locationId: string;
  locationName: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  isIndividualTraining: boolean;
  monthlyFee: number;
  paymentStatus: 'paid' | 'overdue' | 'pending';
  lastPaymentDate?: string;
  attendanceRate: number;
  photo?: string;
  medicalClearance: boolean;
  notes?: string;
}

export interface AcademyGroup {
  id: string;
  name: string;
  category: string;
  birthYears: string;
  coachId: string;
  coachName: string;
  locationId: string;
  locationName: string;
  days: string;
  hours: string;
  pitch: string;
  monthlyFee: number;
  studentCount: number;
  maxCapacity: number;
}

export interface MatchEvent {
  id: string;
  groupId: string;
  groupName: string;
  type: 'match' | 'tournament' | 'friendly';
  title: string;
  opponent: string;
  date: string;
  time: string;
  venue: string;
  notes?: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  score?: string;
  createdByCoachId: string;
}

export interface BillingRecord {
  id: string;
  playerId: string;
  playerName: string;
  groupName: string;
  month: string;
  year: number;
  amount: number;
  status: 'paid' | 'overdue' | 'pending';
  dueDate: string;
  paidAt?: string;
  paymentMethod?: 'visa' | 'mastercard' | 'apple_pay' | 'google_pay';
  transactionId?: string;
  trainingType: 'standard' | 'individual';
  receiptNumber?: string;
}

interface AcademyContextType {
  currentUser: AuthUser | null;
  players: Player[];
  groups: AcademyGroup[];
  matchEvents: MatchEvent[];
  billingRecords: BillingRecord[];
  // Auth actions
  loginAs: (role: UserRole, customUser?: Partial<AuthUser>) => void;
  logout: () => void;
  // Match & Tournament actions (Coach & Admin)
  addMatchEvent: (event: Omit<MatchEvent, 'id' | 'status'>) => void;
  deleteMatchEvent: (id: string) => void;
  // Player actions (Admin)
  addPlayer: (player: Omit<Player, 'id'>) => void;
  updatePlayer: (id: string, updates: Partial<Player>) => void;
  deletePlayer: (id: string) => void;
  // Billing actions (Parent & Admin)
  payBillingRecord: (recordId: string, method: 'visa' | 'mastercard' | 'apple_pay' | 'google_pay') => Promise<boolean>;
  sendPaymentReminder: (playerId: string) => { success: boolean; message: string };
  markRecordPaidManually: (recordId: string) => void;
}

const STORAGE_KEYS = {
  USER: 'tfilisi_auth_user',
  PLAYERS: 'tfilisi_players_v1',
  MATCHES: 'tfilisi_matches_v1',
  BILLING: 'tfilisi_billing_v1'
};

// Initial Seed Data
const INITIAL_GROUPS: AcademyGroup[] = [
  {
    id: 'grp-u12-saburtalo',
    name: '2014-2015 წლიანების გუნდი (U-12)',
    category: 'U-12',
    birthYears: '2014 - 2015',
    coachId: 'coach-chelidze',
    coachName: 'ლევან ჭელიძე',
    locationId: 'saburtalo',
    locationName: 'საბურთალო (უნივერსიტეტის #6)',
    days: 'სამშაბათი, ხუთშაბათი, შაბათი',
    hours: '15:30 - 17:00',
    pitch: 'მოედანი B (ხელოვნური)',
    monthlyFee: 150,
    studentCount: 16,
    maxCapacity: 18
  },
  {
    id: 'grp-u14-saburtalo',
    name: '2012-2013 წლიანების გუნდი (U-14)',
    category: 'U-14',
    birthYears: '2012 - 2013',
    coachId: 'coach-demetradze',
    coachName: 'გიორგი დემეტრაძე',
    locationId: 'saburtalo',
    locationName: 'საბურთალო (უნივერსიტეტის #6)',
    days: 'ორშაბათი, ოთხშაბათი, პარასკევი',
    hours: '16:00 - 17:30',
    pitch: 'მოედანი A (სრული ზომა)',
    monthlyFee: 160,
    studentCount: 18,
    maxCapacity: 20
  },
  {
    id: 'grp-u10-varketili',
    name: '2016-2017 წლიანების გუნდი (U-10)',
    category: 'U-10',
    birthYears: '2016 - 2017',
    coachId: 'coach-kapanadze',
    coachName: 'დავით კაპანაძე',
    locationId: 'varketili',
    locationName: 'ვარკეთილის პლატო',
    days: 'სამშაბათი, ხუთშაბათი, შაბათი',
    hours: '17:00 - 18:30',
    pitch: 'საბავშვო მოედანი #1',
    monthlyFee: 140,
    studentCount: 14,
    maxCapacity: 16
  },
  {
    id: 'grp-u8-dinamo',
    name: '2018-2019 წლიანების ჯგუფი (U-8)',
    category: 'U-8',
    birthYears: '2018 - 2019',
    coachId: 'coach-chelidze',
    coachName: 'ლევან ჭელიძე',
    locationId: 'dinamo',
    locationName: 'დინამოს საწვრთნელი ბაზა',
    days: 'შაბათი, კვირა',
    hours: '11:00 - 12:30',
    pitch: 'სავარჯიშო მოედანი C',
    monthlyFee: 130,
    studentCount: 12,
    maxCapacity: 15
  }
];

const INITIAL_PLAYERS: Player[] = [
  {
    id: 'pl-01',
    firstName: 'ნიკოლოზ',
    lastName: 'ბერიძე',
    birthYear: 2014,
    age: 12,
    position: 'შემტევი ნახევარმცველი',
    jerseyNumber: 10,
    groupId: 'grp-u12-saburtalo',
    groupName: '2014-2015 წლიანების გუნდი (U-12)',
    coachId: 'coach-chelidze',
    coachName: 'ლევან ჭელიძე',
    locationId: 'saburtalo',
    locationName: 'საბურთალო',
    parentName: 'ზურაბ ბერიძე',
    parentPhone: '+995 599 12 34 56',
    parentEmail: 'parent@tbilisifa.ge',
    isIndividualTraining: false,
    monthlyFee: 150,
    paymentStatus: 'pending',
    attendanceRate: 96,
    medicalClearance: true,
    notes: 'კაპიტანი, გამორჩეული ხედვა და ტექნიკა'
  },
  {
    id: 'pl-02',
    firstName: 'ლუკა',
    lastName: 'მაისურაძე',
    birthYear: 2014,
    age: 12,
    position: 'ცენტრალური მცველი',
    jerseyNumber: 4,
    groupId: 'grp-u12-saburtalo',
    groupName: '2014-2015 წლიანების გუნდი (U-12)',
    coachId: 'coach-chelidze',
    coachName: 'ლევან ჭელიძე',
    locationId: 'saburtalo',
    locationName: 'საბურთალო',
    parentName: 'ნინო მაისურაძე',
    parentPhone: '+995 577 98 76 54',
    parentEmail: 'nino.maisuradze@gmail.com',
    isIndividualTraining: true,
    monthlyFee: 250,
    paymentStatus: 'paid',
    lastPaymentDate: '2026-10-05',
    attendanceRate: 92,
    medicalClearance: true,
    notes: 'გადის დამატებით ინდივიდუალურ ფიზ-მომზადებას'
  },
  {
    id: 'pl-03',
    firstName: 'ალექსანდრე',
    lastName: 'კალანდაძე',
    birthYear: 2013,
    age: 13,
    position: 'თავდამსხმელი',
    jerseyNumber: 9,
    groupId: 'grp-u14-saburtalo',
    groupName: '2012-2013 წლიანების გუნდი (U-14)',
    coachId: 'coach-demetradze',
    coachName: 'გიორგი დემეტრაძე',
    locationId: 'saburtalo',
    locationName: 'საბურთალო',
    parentName: 'ირაკლი კალანდაძე',
    parentPhone: '+995 595 44 33 22',
    parentEmail: 'irakli.kal@yahoo.com',
    isIndividualTraining: false,
    monthlyFee: 160,
    paymentStatus: 'overdue',
    attendanceRate: 88,
    medicalClearance: true,
    notes: 'შესახსენებელია სექტემბრის და ოქტომბრის დავალიანება'
  },
  {
    id: 'pl-04',
    firstName: 'სანდრო',
    lastName: 'ჯაფარიძე',
    birthYear: 2016,
    age: 10,
    position: 'მეკარე',
    jerseyNumber: 1,
    groupId: 'grp-u10-varketili',
    groupName: '2016-2017 წლიანების გუნდი (U-10)',
    coachId: 'coach-kapanadze',
    coachName: 'დავით კაპანაძე',
    locationId: 'varketili',
    locationName: 'ვარკეთილის პლატო',
    parentName: 'თამარ ჯაფარიძე',
    parentPhone: '+995 598 11 22 33',
    parentEmail: 'tamar.j@gmail.com',
    isIndividualTraining: true,
    monthlyFee: 240,
    paymentStatus: 'paid',
    lastPaymentDate: '2026-10-03',
    attendanceRate: 100,
    medicalClearance: true,
    notes: 'მეკარის ინდივიდუალური წვრთნები'
  },
  {
    id: 'pl-05',
    firstName: 'გიორგი',
    lastName: 'ღვინიაშვილი',
    birthYear: 2018,
    age: 8,
    position: 'ფლანგის შემტევი',
    jerseyNumber: 7,
    groupId: 'grp-u8-dinamo',
    groupName: '2018-2019 წლიანების ჯგუფი (U-8)',
    coachId: 'coach-chelidze',
    coachName: 'ლევან ჭელიძე',
    locationId: 'dinamo',
    locationName: 'დინამოს საწვრთნელი ბაზა',
    parentName: 'მამუკა ღვინიაშვილი',
    parentPhone: '+995 591 77 88 99',
    parentEmail: 'mamuka.gh@gmail.com',
    isIndividualTraining: false,
    monthlyFee: 130,
    paymentStatus: 'overdue',
    attendanceRate: 85,
    medicalClearance: true,
    notes: 'დავალიანება 130₾'
  },
  {
    id: 'pl-06',
    firstName: 'დაჩი',
    lastName: 'ჩხეიძე',
    birthYear: 2012,
    age: 14,
    position: 'საყრდენი ნახევარმცველი',
    jerseyNumber: 6,
    groupId: 'grp-u14-saburtalo',
    groupName: '2012-2013 წლიანების გუნდი (U-14)',
    coachId: 'coach-demetradze',
    coachName: 'გიორგი დემეტრაძე',
    locationId: 'saburtalo',
    locationName: 'საბურთალო',
    parentName: 'ეკა ჩხეიძე',
    parentPhone: '+995 599 33 55 77',
    parentEmail: 'eka.chkheidze@mail.ru',
    isIndividualTraining: false,
    monthlyFee: 160,
    paymentStatus: 'paid',
    lastPaymentDate: '2026-10-08',
    attendanceRate: 98,
    medicalClearance: true
  }
];

const INITIAL_MATCHES: MatchEvent[] = [
  {
    id: 'match-01',
    groupId: 'grp-u12-saburtalo',
    groupName: '2014-2015 წლიანების გუნდი (U-12)',
    type: 'tournament',
    title: 'ტფილისის შემოდგომის თასი - 1/4 ფინალი',
    opponent: 'დინამო თბილისი U-12',
    date: '2026-10-24',
    time: '12:00',
    venue: 'დინამოს საწვრთნელი ბაზა (მოედანი #2)',
    notes: 'შეკრება 11:00-ზე. ფორმა: ძირითადი ლურჯი ეკიპირება. წყალი და საკვები უზრუნველყოფილია.',
    status: 'upcoming',
    createdByCoachId: 'coach-chelidze'
  },
  {
    id: 'match-02',
    groupId: 'grp-u14-saburtalo',
    groupName: '2012-2013 წლიანების გუნდი (U-14)',
    type: 'match',
    title: 'GFF ჭაბუკთა ლიგა - ტური 8',
    opponent: 'საბურთალო U-14',
    date: '2026-10-28',
    time: '15:00',
    venue: 'ბენდელას სტადიონი, თბილისი',
    notes: 'ოფიციალური კალენდარული თამაში. მშობლების დასწრება თავისუფალია.',
    status: 'upcoming',
    createdByCoachId: 'coach-demetradze'
  },
  {
    id: 'match-03',
    groupId: 'grp-u12-saburtalo',
    groupName: '2014-2015 წლიანების გუნდი (U-12)',
    type: 'friendly',
    title: 'საკონტროლო ამხანაგური მატჩი',
    opponent: 'ლოკომოტივი თბილისი U-12',
    date: '2026-10-18',
    time: '14:30',
    venue: 'საბურთალოს კომპლექსი',
    notes: 'ტაქტიკური სქემის გამოცდა',
    status: 'completed',
    score: '3 - 1 (მოგება)',
    createdByCoachId: 'coach-chelidze'
  }
];

const INITIAL_BILLING: BillingRecord[] = [
  {
    id: 'bill-01',
    playerId: 'pl-01',
    playerName: 'ნიკოლოზ ბერიძე',
    groupName: '2014-2015 წლიანების გუნდი (U-12)',
    month: 'ოქტომბერი',
    year: 2026,
    amount: 150,
    status: 'pending',
    dueDate: '2026-10-25',
    trainingType: 'standard',
    receiptNumber: 'INV-2026-10-01'
  },
  {
    id: 'bill-01-prev',
    playerId: 'pl-01',
    playerName: 'ნიკოლოზ ბერიძე',
    groupName: '2014-2015 წლიანების გუნდი (U-12)',
    month: 'სექტემბერი',
    year: 2026,
    amount: 150,
    status: 'paid',
    dueDate: '2026-09-25',
    paidAt: '2026-09-21',
    paymentMethod: 'visa',
    transactionId: 'TX-94821',
    trainingType: 'standard',
    receiptNumber: 'INV-2026-09-14'
  },
  {
    id: 'bill-02',
    playerId: 'pl-02',
    playerName: 'ლუკა მაისურაძე',
    groupName: '2014-2015 წლიანების გუნდი (U-12)',
    month: 'ოქტომბერი',
    year: 2026,
    amount: 250,
    status: 'paid',
    dueDate: '2026-10-25',
    paidAt: '2026-10-05',
    paymentMethod: 'apple_pay',
    transactionId: 'TX-94883',
    trainingType: 'individual',
    receiptNumber: 'INV-2026-10-02'
  },
  {
    id: 'bill-03',
    playerId: 'pl-03',
    playerName: 'ალექსანდრე კალანდაძე',
    groupName: '2012-2013 წლიანების გუნდი (U-14)',
    month: 'ოქტომბერი',
    year: 2026,
    amount: 160,
    status: 'overdue',
    dueDate: '2026-10-15',
    trainingType: 'standard',
    receiptNumber: 'INV-2026-10-03'
  },
  {
    id: 'bill-04',
    playerId: 'pl-04',
    playerName: 'სანდრო ჯაფარიძე',
    groupName: '2016-2017 წლიანების გუნდი (U-10)',
    month: 'ოქტომბერი',
    year: 2026,
    amount: 240,
    status: 'paid',
    dueDate: '2026-10-25',
    paidAt: '2026-10-03',
    paymentMethod: 'mastercard',
    transactionId: 'TX-94750',
    trainingType: 'individual',
    receiptNumber: 'INV-2026-10-04'
  },
  {
    id: 'bill-05',
    playerId: 'pl-05',
    playerName: 'გიორგი ღვინიაშვილი',
    groupName: '2018-2019 წლიანების ჯგუფი (U-8)',
    month: 'ოქტომბერი',
    year: 2026,
    amount: 130,
    status: 'overdue',
    dueDate: '2026-10-10',
    trainingType: 'standard',
    receiptNumber: 'INV-2026-10-05'
  },
  {
    id: 'bill-06',
    playerId: 'pl-06',
    playerName: 'დაჩი ჩხეიძე',
    groupName: '2012-2013 წლიანების გუნდი (U-14)',
    month: 'ოქტომბერი',
    year: 2026,
    amount: 160,
    status: 'paid',
    dueDate: '2026-10-25',
    paidAt: '2026-10-08',
    paymentMethod: 'google_pay',
    transactionId: 'TX-94911',
    trainingType: 'standard',
    receiptNumber: 'INV-2026-10-06'
  }
];

const AcademyContext = createContext<AcademyContextType | undefined>(undefined);

export function AcademyProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);
  const [groups] = useState<AcademyGroup[]>(INITIAL_GROUPS);
  const [matchEvents, setMatchEvents] = useState<MatchEvent[]>(INITIAL_MATCHES);
  const [billingRecords, setBillingRecords] = useState<BillingRecord[]>(INITIAL_BILLING);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }

      const storedPlayers = localStorage.getItem(STORAGE_KEYS.PLAYERS);
      if (storedPlayers) {
        setPlayers(JSON.parse(storedPlayers));
      }

      const storedMatches = localStorage.getItem(STORAGE_KEYS.MATCHES);
      if (storedMatches) {
        setMatchEvents(JSON.parse(storedMatches));
      }

      const storedBilling = localStorage.getItem(STORAGE_KEYS.BILLING);
      if (storedBilling) {
        setBillingRecords(JSON.parse(storedBilling));
      }
    } catch (e) {
      console.error('Error loading academy state from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
      localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify(players));
      localStorage.setItem(STORAGE_KEYS.MATCHES, JSON.stringify(matchEvents));
      localStorage.setItem(STORAGE_KEYS.BILLING, JSON.stringify(billingRecords));
    } catch (e) {
      console.error('Error saving academy state to localStorage', e);
    }
  }, [currentUser, players, matchEvents, billingRecords, isLoaded]);

  // Auth actions
  const loginAs = (role: UserRole, customUser?: Partial<AuthUser>) => {
    const defaultName = role === 'coach' ? 'მწვრთნელი' : 'მშობელი';
    const user: AuthUser = {
      id: customUser?.id || `user-${Date.now()}`,
      name: customUser?.name || defaultName,
      email: customUser?.email || '',
      role: role,
      phone: customUser?.phone || '',
      avatar: (customUser?.name || defaultName).substring(0, 2).toUpperCase(),
      assignedPlayerId: customUser?.assignedPlayerId || undefined,
      assignedGroupId: role === 'coach' ? (customUser?.assignedGroupId || 'grp-u12-saburtalo') : undefined,
      ...customUser
    };

    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Match scheduling actions
  const addMatchEvent = (eventData: Omit<MatchEvent, 'id' | 'status'>) => {
    const newMatch: MatchEvent = {
      ...eventData,
      id: `match-${Date.now()}`,
      status: 'upcoming'
    };
    setMatchEvents(prev => [newMatch, ...prev]);
  };

  const deleteMatchEvent = (id: string) => {
    setMatchEvents(prev => prev.filter(m => m.id !== id));
  };

  // Player actions
  const addPlayer = (playerData: Omit<Player, 'id'>) => {
    const newPlayer: Player = {
      ...playerData,
      id: `pl-${Date.now()}`
    };
    setPlayers(prev => [newPlayer, ...prev]);

    // Also create initial billing record
    const newBill: BillingRecord = {
      id: `bill-${Date.now()}`,
      playerId: newPlayer.id,
      playerName: `${newPlayer.firstName} ${newPlayer.lastName}`,
      groupName: newPlayer.groupName,
      month: 'ოქტომბერი',
      year: 2026,
      amount: newPlayer.monthlyFee,
      status: 'pending',
      dueDate: '2026-10-25',
      trainingType: newPlayer.isIndividualTraining ? 'individual' : 'standard',
      receiptNumber: `INV-2026-10-${Math.floor(100 + Math.random() * 900)}`
    };
    setBillingRecords(prev => [newBill, ...prev]);
  };

  const updatePlayer = (id: string, updates: Partial<Player>) => {
    setPlayers(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deletePlayer = (id: string) => {
    setPlayers(prev => prev.filter(p => p.id !== id));
  };

  // Billing actions
  const payBillingRecord = async (
    recordId: string, 
    method: 'visa' | 'mastercard' | 'apple_pay' | 'google_pay'
  ): Promise<boolean> => {
    // Simulate payment gateway delay (e.g. Visa/Mastercard/Apple Pay)
    await new Promise(resolve => setTimeout(resolve, 800));

    const todayStr = new Date().toISOString().split('T')[0];
    const txId = `TX-${Math.floor(10000 + Math.random() * 90000)}`;

    setBillingRecords(prev => prev.map(rec => {
      if (rec.id === recordId) {
        return {
          ...rec,
          status: 'paid',
          paidAt: todayStr,
          paymentMethod: method,
          transactionId: txId
        };
      }
      return rec;
    }));

    // Also update player's paymentStatus if this is their latest bill
    setPlayers(prev => prev.map(pl => {
      const targetBill = billingRecords.find(b => b.id === recordId);
      if (targetBill && targetBill.playerId === pl.id) {
        return {
          ...pl,
          paymentStatus: 'paid',
          lastPaymentDate: todayStr
        };
      }
      return pl;
    }));

    return true;
  };

  const sendPaymentReminder = (playerId: string) => {
    const player = players.find(p => p.id === playerId);
    if (!player) return { success: false, message: 'მოთამაშე ვერ მოიძებნა' };

    return {
      success: true,
      message: `შეტყობინება გადახდის შესახებ წარმატებით გაეგზავნა მშობელს: ${player.parentName} (${player.parentPhone})`
    };
  };

  const markRecordPaidManually = (recordId: string) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const txId = `ADMIN-CASH-${Math.floor(1000 + Math.random() * 9000)}`;

    setBillingRecords(prev => prev.map(rec => {
      if (rec.id === recordId) {
        return {
          ...rec,
          status: 'paid',
          paidAt: todayStr,
          transactionId: txId
        };
      }
      return rec;
    }));

    const bill = billingRecords.find(b => b.id === recordId);
    if (bill) {
      setPlayers(prev => prev.map(p => p.id === bill.playerId ? { ...p, paymentStatus: 'paid', lastPaymentDate: todayStr } : p));
    }
  };

  return (
    <AcademyContext.Provider
      value={{
        currentUser,
        players,
        groups,
        matchEvents,
        billingRecords,
        loginAs,
        logout,
        addMatchEvent,
        deleteMatchEvent,
        addPlayer,
        updatePlayer,
        deletePlayer,
        payBillingRecord,
        sendPaymentReminder,
        markRecordPaidManually
      }}
    >
      {children}
    </AcademyContext.Provider>
  );
}

export function useAcademy() {
  const context = useContext(AcademyContext);
  if (!context) {
    throw new Error('useAcademy must be used within an AcademyProvider');
  }
  return context;
}
