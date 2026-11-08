'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  LocationItem,
  NewsItem,
  Coach,
  locationsData as initialLocationsData,
  coachesData as initialCoachesData,
  newsData as initialNewsData,
} from '../data/mockData';

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
  createdAt?: number;
}

export interface AcademyGroup {
  id: string;
  name: string;
  category: string;
  ageRange?: string;
  birthYears: string;
  coachId: string;
  coachName: string;
  coachRole?: string;
  locationId: string;
  locationName: string;
  days: string;
  hours: string;
  pitch: string;
  intensity?: string;
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
  createdAt?: number;
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
  reminderSentAt?: string;
}

interface AcademyContextType {
  isLoaded: boolean;
  currentUser: AuthUser | null;
  players: Player[];
  groups: AcademyGroup[];
  matchEvents: MatchEvent[];
  billingRecords: BillingRecord[];
  news: NewsItem[];
  coaches: Coach[];
  locations: LocationItem[];
  // Auth actions
  loginAs: (role: UserRole, customUser?: Partial<AuthUser>) => void;
  logout: () => void;
  // Match & Tournament actions (Coach & Admin)
  addMatchEvent: (event: Omit<MatchEvent, 'id' | 'status'>) => void;
  updateMatchEvent: (id: string, updates: Partial<MatchEvent>) => void;
  deleteMatchEvent: (id: string) => void;
  // Player actions (Admin & Registration)
  addPlayer: (player: Omit<Player, 'id'> & { id?: string }) => Player;
  updatePlayer: (id: string, updates: Partial<Player>) => void;
  deletePlayer: (id: string) => void;
  // Billing actions (Parent & Admin)
  payBillingRecord: (recordId: string, method: 'visa' | 'mastercard' | 'apple_pay' | 'google_pay') => Promise<boolean>;
  sendPaymentReminder: (playerId: string) => { success: boolean; message: string };
  markRecordPaidManually: (recordId: string) => void;
  // CMS actions (News, Coaches, Locations, Groups)
  addNewsItem: (item: Omit<NewsItem, 'id' | 'slug'>) => void;
  updateNewsItem: (id: string, updates: Partial<NewsItem>) => void;
  deleteNewsItem: (id: string) => void;
  addCoach: (coach: Omit<Coach, 'id'>) => void;
  updateCoach: (id: string, updates: Partial<Coach>) => void;
  deleteCoach: (id: string) => void;
  addLocation: (loc: Omit<LocationItem, 'id' | 'slug'>) => void;
  updateLocation: (id: string, updates: Partial<LocationItem>) => void;
  deleteLocation: (id: string) => void;
  addGroup: (grp: Omit<AcademyGroup, 'id'>) => void;
  updateGroup: (id: string, updates: Partial<AcademyGroup>) => void;
  deleteGroup: (id: string) => void;
}

const STORAGE_KEYS = {
  USER: 'tfilisi_auth_user',
  PLAYERS: 'tfilisi_players_v2',
  GROUPS: 'tfilisi_groups_v2',
  MATCHES: 'tfilisi_matches_v2',
  BILLING: 'tfilisi_billing_v2',
  NEWS: 'tfilisi_news_v2',
  COACHES: 'tfilisi_coaches_v2',
  LOCATIONS: 'tfilisi_locations_v2',
};

// Unified Initial Seed Groups (Across Saburtalo, Varketili, Dinamo)
const INITIAL_GROUPS: AcademyGroup[] = [
  {
    id: 'grp-u14-saburtalo',
    name: '2012-2013 წლიანების გუნდი (U-14)',
    category: 'U-14',
    ageRange: '12 - 14 წელი',
    birthYears: '2012 - 2013',
    coachId: 'c1',
    coachName: 'გიორგი დემეტრაძე',
    coachRole: 'მთავარი მწვრთნელი (UEFA A Youth)',
    locationId: 'saburtalo',
    locationName: 'საბურთალო (უნივერსიტეტის #6)',
    days: 'ორშაბათი, ოთხშაბათი, პარასკევი',
    hours: '16:00 - 17:30',
    pitch: 'მოედანი A (სრული ზომა)',
    intensity: 'საბავშვო ჩემპიონატი & ტაქტიკა',
    monthlyFee: 160,
    studentCount: 18,
    maxCapacity: 20,
  },
  {
    id: 'grp-u12-saburtalo',
    name: '2014-2015 წლიანების გუნდი (U-12)',
    category: 'U-12',
    ageRange: '10 - 12 წელი',
    birthYears: '2014 - 2015',
    coachId: 'c2',
    coachName: 'ლევან ჭელიძე',
    coachRole: 'მწვრთნელი (UEFA B Youth)',
    locationId: 'saburtalo',
    locationName: 'საბურთალო (უნივერსიტეტის #6)',
    days: 'სამშაბათი, ხუთშაბათი, შაბათი',
    hours: '15:30 - 17:00',
    pitch: 'მოედანი B (8x8)',
    intensity: 'ტექნიკური ოსტატობა & გუნდური თამაში',
    monthlyFee: 150,
    studentCount: 16,
    maxCapacity: 18,
  },
  {
    id: 'grp-u10-saburtalo',
    name: '2016-2017 წლიანების გუნდი (U-10)',
    category: 'U-10',
    ageRange: '8 - 10 წელი',
    birthYears: '2016 - 2017',
    coachId: 'c3',
    coachName: 'დავით კვირკველია',
    coachRole: 'საბავშვო მწვრთნელი',
    locationId: 'saburtalo',
    locationName: 'საბურთალო (უნივერსიტეტის #6)',
    days: 'ორშაბათი, ოთხშაბათი, პარასკევი',
    hours: '17:30 - 18:45',
    pitch: 'მოედანი C (საბავშვო)',
    intensity: 'საბაზისო მოტორიკა & თამაშები',
    monthlyFee: 140,
    studentCount: 14,
    maxCapacity: 16,
  },
  {
    id: 'grp-u10-varketili',
    name: 'ვარკეთილის U-10 გუნდი (2016-2017)',
    category: 'U-10',
    ageRange: '8 - 10 წელი',
    birthYears: '2016 - 2017',
    coachId: 'c3',
    coachName: 'დავით კვირკველია',
    coachRole: 'საბავშვო მწვრთნელი',
    locationId: 'varketili',
    locationName: 'ვარკეთილის პლატო',
    days: 'სამშაბათი, ხუთშაბათი, შაბათი',
    hours: '17:00 - 18:30',
    pitch: 'საბავშვო მოედანი #1',
    intensity: 'ტექნიკა & სათამაშო უნარები',
    monthlyFee: 140,
    studentCount: 14,
    maxCapacity: 16,
  },
  {
    id: 'grp-u12-varketili',
    name: 'ვარკეთილის U-12 გუნდი (2014-2015)',
    category: 'U-12',
    ageRange: '10 - 12 წელი',
    birthYears: '2014 - 2015',
    coachId: 'c2',
    coachName: 'ლევან ჭელიძე',
    coachRole: 'მწვრთნელი (UEFA B Youth)',
    locationId: 'varketili',
    locationName: 'ვარკეთილის პლატო',
    days: 'ორშაბათი, ოთხშაბათი, პარასკევი',
    hours: '16:30 - 18:00',
    pitch: 'მთავარი მოედანი',
    intensity: 'ტექნიკა & ამხანაგური მატჩები',
    monthlyFee: 140,
    studentCount: 15,
    maxCapacity: 18,
  },
  {
    id: 'grp-u8-dinamo',
    name: '2018-2019 წლიანების ჯგუფი (U-8)',
    category: 'U-8',
    ageRange: '6 - 8 წელი',
    birthYears: '2018 - 2019',
    coachId: 'c2',
    coachName: 'ლევან ჭელიძე',
    coachRole: 'საწყისი ეტაპის სპეციალისტი',
    locationId: 'dinamo',
    locationName: 'დინამოს საწვრთნელი ბაზა',
    days: 'შაბათი, კვირა',
    hours: '11:00 - 12:30',
    pitch: 'სავარჯიშო მოედანი C',
    intensity: 'პირველი ნაბიჯები ფეხბურთში',
    monthlyFee: 130,
    studentCount: 12,
    maxCapacity: 15,
  },
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
    coachId: 'c2',
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
    notes: 'კაპიტანი, გამორჩეული ხედვა და ტექნიკა',
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
    coachId: 'c2',
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
    notes: 'გადის დამატებით ინდივიდუალურ ფიზ-მომზადებას',
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
    coachId: 'c1',
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
    notes: 'შესახსენებელია სექტემბრის და ოქტომბრის დავალიანება',
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
    groupName: 'ვარკეთილის U-10 გუნდი (2016-2017)',
    coachId: 'c3',
    coachName: 'დავით კვირკველია',
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
    notes: 'მეკარის ინდივიდუალური წვრთნები',
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
    coachId: 'c2',
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
    notes: 'დავალიანება 130₾',
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
    coachId: 'c1',
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
    medicalClearance: true,
  },
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
    createdByCoachId: 'c2',
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
    createdByCoachId: 'c1',
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
    createdByCoachId: 'c2',
  },
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
    receiptNumber: 'INV-2026-10-01',
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
    receiptNumber: 'INV-2026-09-14',
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
    receiptNumber: 'INV-2026-10-02',
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
    receiptNumber: 'INV-2026-10-03',
  },
  {
    id: 'bill-04',
    playerId: 'pl-04',
    playerName: 'სანდრო ჯაფარიძე',
    groupName: 'ვარკეთილის U-10 გუნდი (2016-2017)',
    month: 'ოქტომბერი',
    year: 2026,
    amount: 240,
    status: 'paid',
    dueDate: '2026-10-25',
    paidAt: '2026-10-03',
    paymentMethod: 'mastercard',
    transactionId: 'TX-94750',
    trainingType: 'individual',
    receiptNumber: 'INV-2026-10-04',
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
    receiptNumber: 'INV-2026-10-05',
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
    receiptNumber: 'INV-2026-10-06',
  },
];

const AcademyContext = createContext<AcademyContextType | undefined>(undefined);

export function AcademyProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);
  const [groups, setGroups] = useState<AcademyGroup[]>(INITIAL_GROUPS);
  const [matchEvents, setMatchEvents] = useState<MatchEvent[]>(INITIAL_MATCHES);
  const [billingRecords, setBillingRecords] = useState<BillingRecord[]>(INITIAL_BILLING);
  const [news, setNews] = useState<NewsItem[]>(initialNewsData);
  const [coaches, setCoaches] = useState<Coach[]>(initialCoachesData);
  const [locations, setLocations] = useState<LocationItem[]>(initialLocationsData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
      if (storedUser) setCurrentUser(JSON.parse(storedUser));

      const storedPlayers = localStorage.getItem(STORAGE_KEYS.PLAYERS);
      if (storedPlayers) {
        const parsedPlayers: Player[] = JSON.parse(storedPlayers);
        const migratedPlayers = parsedPlayers.map(p => {
          // Migrate user-created players that had old auto-assigned defaults in localStorage
          if (
            !p.id.startsWith('pl-0') &&
            (!p.createdAt || (p.jerseyNumber === 10 && p.position === 'ნახევარმცველი' && p.medicalClearance === true))
          ) {
            return {
              ...p,
              jerseyNumber: 0,
              position: 'განსაზღვრის პროცესში',
              medicalClearance: false,
              createdAt: p.createdAt || Date.now(),
            };
          }
          return p;
        });
        setPlayers(migratedPlayers);
      }

      const storedGroups = localStorage.getItem(STORAGE_KEYS.GROUPS);
      if (storedGroups) setGroups(JSON.parse(storedGroups));

      const storedMatches = localStorage.getItem(STORAGE_KEYS.MATCHES);
      if (storedMatches) setMatchEvents(JSON.parse(storedMatches));

      const storedBilling = localStorage.getItem(STORAGE_KEYS.BILLING);
      if (storedBilling) setBillingRecords(JSON.parse(storedBilling));

      const storedNews = localStorage.getItem(STORAGE_KEYS.NEWS);
      if (storedNews) setNews(JSON.parse(storedNews));

      const storedCoaches = localStorage.getItem(STORAGE_KEYS.COACHES);
      if (storedCoaches) setCoaches(JSON.parse(storedCoaches));

      const storedLocations = localStorage.getItem(STORAGE_KEYS.LOCATIONS);
      if (storedLocations) setLocations(JSON.parse(storedLocations));
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
      localStorage.setItem(STORAGE_KEYS.GROUPS, JSON.stringify(groups));
      localStorage.setItem(STORAGE_KEYS.MATCHES, JSON.stringify(matchEvents));
      localStorage.setItem(STORAGE_KEYS.BILLING, JSON.stringify(billingRecords));
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(news));
      localStorage.setItem(STORAGE_KEYS.COACHES, JSON.stringify(coaches));
      localStorage.setItem(STORAGE_KEYS.LOCATIONS, JSON.stringify(locations));
    } catch (e) {
      console.error('Error saving academy state to localStorage', e);
    }
  }, [currentUser, players, groups, matchEvents, billingRecords, news, coaches, locations, isLoaded]);

  // Auth actions
  const loginAs = (role: UserRole, customUser?: Partial<AuthUser>) => {
    const defaultName = role === 'coach' || role === 'admin' ? 'მწვრთნელი' : 'მშობელი';
    const user: AuthUser = {
      id: customUser?.id || `user-${Date.now()}`,
      name: customUser?.name || defaultName,
      email: customUser?.email || '',
      role: role,
      phone: customUser?.phone || '',
      avatar: (customUser?.name || defaultName).substring(0, 2).toUpperCase(),
      assignedPlayerId: customUser?.assignedPlayerId || undefined,
      assignedGroupId: role === 'coach' ? (customUser?.assignedGroupId || 'grp-u12-saburtalo') : undefined,
      ...customUser,
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
      status: 'upcoming',
      createdAt: Date.now(),
    };
    setMatchEvents(prev => [newMatch, ...prev]);
  };

  const updateMatchEvent = (id: string, updates: Partial<MatchEvent>) => {
    setMatchEvents(prev => prev.map(m => (m.id === id ? { ...m, ...updates } : m)));
  };

  const deleteMatchEvent = (id: string) => {
    setMatchEvents(prev => prev.filter(m => m.id !== id));
  };

  // Player actions
  const addPlayer = (playerData: Omit<Player, 'id'> & { id?: string }): Player => {
    const playerId = playerData.id || `pl-${Date.now()}`;
    const todayStr = new Date().toISOString().split('T')[0];
    const isPaid = playerData.paymentStatus === 'paid';

    const newPlayer: Player = {
      ...playerData,
      id: playerId,
      createdAt: playerData.createdAt ?? Date.now(),
      lastPaymentDate: isPaid ? todayStr : playerData.lastPaymentDate,
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
      status: isPaid ? 'paid' : 'pending',
      dueDate: '2026-10-25',
      paidAt: isPaid ? todayStr : undefined,
      paymentMethod: isPaid ? 'visa' : undefined,
      transactionId: isPaid ? `TX-${Math.floor(10000 + Math.random() * 90000)}` : undefined,
      trainingType: newPlayer.isIndividualTraining ? 'individual' : 'standard',
      receiptNumber: `INV-2026-10-${Math.floor(100 + Math.random() * 900)}`,
    };
    setBillingRecords(prev => [newBill, ...prev]);

    return newPlayer;
  };

  const updatePlayer = (id: string, updates: Partial<Player>) => {
    setPlayers(prev =>
      prev.map(p => {
        if (p.id !== id) return p;
        return { ...p, ...updates };
      })
    );
    // Keep billing records synced if name, groupName, or monthlyFee changed
    if (updates.firstName || updates.lastName || updates.groupName || updates.monthlyFee !== undefined) {
      setBillingRecords(prev =>
        prev.map(b => {
          if (b.playerId !== id) return b;
          const targetPlayer = players.find(p => p.id === id);
          const firstName = updates.firstName ?? targetPlayer?.firstName ?? '';
          const lastName = updates.lastName ?? targetPlayer?.lastName ?? '';
          return {
            ...b,
            playerName: `${firstName} ${lastName}`.trim() || b.playerName,
            groupName: updates.groupName ?? b.groupName,
            amount: b.status !== 'paid' && updates.monthlyFee !== undefined ? updates.monthlyFee : b.amount,
          };
        })
      );
    }
  };

  const deletePlayer = (id: string) => {
    setPlayers(prev => prev.filter(p => p.id !== id));
    setBillingRecords(prev => prev.filter(b => b.playerId !== id));
  };

  // Billing actions
  const payBillingRecord = async (
    recordId: string,
    method: 'visa' | 'mastercard' | 'apple_pay' | 'google_pay'
  ): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const todayStr = new Date().toISOString().split('T')[0];
    const txId = `TX-${Math.floor(10000 + Math.random() * 90000)}`;

    const targetBill = billingRecords.find(b => b.id === recordId);

    setBillingRecords(prev =>
      prev.map(rec => {
        if (rec.id === recordId) {
          return {
            ...rec,
            status: 'paid',
            paidAt: todayStr,
            paymentMethod: method,
            transactionId: txId,
          };
        }
        return rec;
      })
    );

    if (targetBill) {
      setPlayers(prev =>
        prev.map(pl => {
          if (targetBill.playerId === pl.id) {
            return {
              ...pl,
              paymentStatus: 'paid',
              lastPaymentDate: todayStr,
            };
          }
          return pl;
        })
      );
    }

    return true;
  };

  const sendPaymentReminder = (playerId: string) => {
    const player = players.find(p => p.id === playerId);
    if (!player) return { success: false, message: 'მოთამაშე ვერ მოიძებნა' };

    const nowIso = new Date().toLocaleDateString('ka-GE');
    setBillingRecords(prev =>
      prev.map(rec => {
        if (rec.playerId === playerId && rec.status !== 'paid') {
          return { ...rec, reminderSentAt: nowIso };
        }
        return rec;
      })
    );

    return {
      success: true,
      message: `შეტყობინება გადახდის შესახებ წარმატებით გაეგზავნა მშობელს: ${player.parentName} (${player.parentPhone})`,
    };
  };

  const markRecordPaidManually = (recordId: string) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const txId = `ADMIN-CASH-${Math.floor(1000 + Math.random() * 9000)}`;

    const bill = billingRecords.find(b => b.id === recordId);

    setBillingRecords(prev =>
      prev.map(rec => {
        if (rec.id === recordId) {
          return {
            ...rec,
            status: 'paid',
            paidAt: todayStr,
            transactionId: txId,
          };
        }
        return rec;
      })
    );

    if (bill) {
      setPlayers(prev =>
        prev.map(p => (p.id === bill.playerId ? { ...p, paymentStatus: 'paid', lastPaymentDate: todayStr } : p))
      );
    }
  };

  // CMS Actions: News
  const addNewsItem = (item: Omit<NewsItem, 'id' | 'slug'>) => {
    const newItem: NewsItem = {
      ...item,
      id: `news-${Date.now()}`,
      slug: `article-${Date.now()}`,
    };
    setNews(prev => [newItem, ...prev]);
  };

  const updateNewsItem = (id: string, updates: Partial<NewsItem>) => {
    setNews(prev => prev.map(n => (n.id === id ? { ...n, ...updates } : n)));
  };

  const deleteNewsItem = (id: string) => {
    setNews(prev => prev.filter(n => n.id !== id));
  };

  // CMS Actions: Coaches
  const addCoach = (coach: Omit<Coach, 'id'>) => {
    const newCoach: Coach = {
      ...coach,
      id: `coach-${Date.now()}`,
    };
    setCoaches(prev => [...prev, newCoach]);
  };

  const updateCoach = (id: string, updates: Partial<Coach>) => {
    setCoaches(prev => prev.map(c => (c.id === id ? { ...c, ...updates } : c)));
  };

  const deleteCoach = (id: string) => {
    setCoaches(prev => prev.filter(c => c.id !== id));
  };

  // CMS Actions: Locations
  const addLocation = (loc: Omit<LocationItem, 'id' | 'slug'>) => {
    const id = `loc-${Date.now()}`;
    const newLoc: LocationItem = {
      ...loc,
      id,
      slug: id,
    };
    setLocations(prev => [...prev, newLoc]);
  };

  const updateLocation = (id: string, updates: Partial<LocationItem>) => {
    setLocations(prev => prev.map(l => (l.id === id ? { ...l, ...updates } : l)));
  };

  const deleteLocation = (id: string) => {
    setLocations(prev => prev.filter(l => l.id !== id));
  };

  // CMS Actions: Groups
  const addGroup = (grp: Omit<AcademyGroup, 'id'>) => {
    const newGrp: AcademyGroup = {
      ...grp,
      id: `grp-${Date.now()}`,
    };
    setGroups(prev => [...prev, newGrp]);
  };

  const updateGroup = (id: string, updates: Partial<AcademyGroup>) => {
    setGroups(prev => prev.map(g => (g.id === id ? { ...g, ...updates } : g)));
  };

  const deleteGroup = (id: string) => {
    setGroups(prev => prev.filter(g => g.id !== id));
  };

  return (
    <AcademyContext.Provider
      value={{
        isLoaded,
        currentUser,
        players,
        groups,
        matchEvents,
        billingRecords,
        news,
        coaches,
        locations,
        loginAs,
        logout,
        addMatchEvent,
        updateMatchEvent,
        deleteMatchEvent,
        addPlayer,
        updatePlayer,
        deletePlayer,
        payBillingRecord,
        sendPaymentReminder,
        markRecordPaidManually,
        addNewsItem,
        updateNewsItem,
        deleteNewsItem,
        addCoach,
        updateCoach,
        deleteCoach,
        addLocation,
        updateLocation,
        deleteLocation,
        addGroup,
        updateGroup,
        deleteGroup,
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
