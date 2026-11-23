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
  PLAYERS: 'tfilisi_players_v4',
  GROUPS: 'tfilisi_groups_v4',
  MATCHES: 'tfilisi_matches_v4',
  BILLING: 'tfilisi_billing_v4',
  NEWS: 'tfilisi_news_v4',
  COACHES: 'tfilisi_coaches_v4',
  LOCATIONS: 'tfilisi_locations_v4',
};

// Unified Initial Seed Groups (Vazissubani, Varketili-105, Varketili-Seselia, Isani)
const INITIAL_GROUPS: AcademyGroup[] = [
  // ===== ვაზისუბანი =====
  {
    id: 'grp-vaz-u5',
    name: 'ვაზისუბანი U-5',
    category: 'U-5',
    ageRange: '4 - 5 წელი',
    birthYears: '2021',
    coachId: 'c-nika-pant',
    coachName: 'ნიკა ფანცულაია / ტაზო ვახანია',
    coachRole: 'მწვრთნელები',
    locationId: 'vazissubani',
    locationName: 'ვაზისუბანი (172-ე სკოლა)',
    days: 'ორშაბათი, ოთხშაბათი, პარასკევი',
    hours: '—',
    pitch: 'მინი სტადიონი',
    intensity: 'საფეხბურთო საწყისი ეტაპი',
    monthlyFee: 150,
    studentCount: 0,
    maxCapacity: 20,
  },
  {
    id: 'grp-vaz-u6',
    name: 'ვაზისუბანი U-6',
    category: 'U-6',
    ageRange: '5 - 6 წელი',
    birthYears: '2020',
    coachId: 'c-nika-pant',
    coachName: 'ნიკა ფანცულაია / ტაზო ვახანია',
    coachRole: 'მწვრთნელები',
    locationId: 'vazissubani',
    locationName: 'ვაზისუბანი (172-ე სკოლა)',
    days: 'ორშაბათი, ოთხშაბათი, პარასკევი',
    hours: '—',
    pitch: 'მინი სტადიონი',
    intensity: 'საფეხბურთო საწყისი ეტაპი',
    monthlyFee: 150,
    studentCount: 0,
    maxCapacity: 20,
  },
  {
    id: 'grp-vaz-u7-17',
    name: 'ვაზისუბანი U-7',
    category: 'U-7',
    ageRange: '6 - 7 წელი',
    birthYears: '2019',
    coachId: 'c-tazo-iash',
    coachName: 'თაზო იაშვილი / ირაკლი ყაველაშვილი',
    coachRole: 'მწვრთნელები',
    locationId: 'vazissubani',
    locationName: 'ვაზისუბანი (172-ე სკოლა)',
    days: 'სამშაბათი, ხუთშაბათი, შაბათი',
    hours: '17:00',
    pitch: 'მინი სტადიონი',
    intensity: 'ბურთის ფლობა & კოორდინაცია',
    monthlyFee: 150,
    studentCount: 0,
    maxCapacity: 20,
  },
  {
    id: 'grp-vaz-u8-18',
    name: 'ვაზისუბანი U-8',
    category: 'U-8',
    ageRange: '7 - 8 წელი',
    birthYears: '2018',
    coachId: 'c-tazo-iash',
    coachName: 'თაზო იაშვილი / ირაკლი ყაველაშვილი',
    coachRole: 'მწვრთნელები',
    locationId: 'vazissubani',
    locationName: 'ვაზისუბანი (172-ე სკოლა)',
    days: 'სამშაბათი, ხუთშაბათი, შაბათი',
    hours: '18:00',
    pitch: 'მინი სტადიონი',
    intensity: 'ბურთის ფლობა & თამაშის სიხარული',
    monthlyFee: 150,
    studentCount: 0,
    maxCapacity: 20,
  },
  {
    id: 'grp-vaz-u9',
    name: 'ვაზისუბანი U-9',
    category: 'U-9',
    ageRange: '8 - 9 წელი',
    birthYears: '2017',
    coachId: 'c-lado-kak',
    coachName: 'ლადო კაკაურიძე / ლაშა ღოთვაძე',
    coachRole: 'მწვრთნელები',
    locationId: 'vazissubani',
    locationName: 'ვაზისუბანი (172-ე სკოლა)',
    days: 'ორშაბათი, ოთხშაბათი, პარასკევი',
    hours: '—',
    pitch: 'მინი სტადიონი',
    intensity: 'ტაქტიკური განვითარება',
    monthlyFee: 150,
    studentCount: 0,
    maxCapacity: 20,
  },
  {
    id: 'grp-vaz-u10-1',
    name: 'ვაზისუბანი U-10 (1-ლი გუნდი)',
    category: 'U-10',
    ageRange: '9 - 10 წელი',
    birthYears: '2016',
    coachId: 'c-vache-alk',
    coachName: 'ვაჩე ალქაიძე / ილია გორდაძე',
    coachRole: 'მწვრთნელები',
    locationId: 'vazissubani',
    locationName: 'ვაზისუბანი (172-ე სკოლა)',
    days: 'ორშაბათი, ოთხშაბათი, პარასკევი',
    hours: '—',
    pitch: 'მინი სტადიონი',
    intensity: 'ტექნიკა & პოზიციური თამაში',
    monthlyFee: 150,
    studentCount: 0,
    maxCapacity: 20,
  },
  {
    id: 'grp-vaz-u10-2',
    name: 'ვაზისუბანი U-10 (მე-2 გუნდი)',
    category: 'U-10',
    ageRange: '9 - 10 წელი',
    birthYears: '2016',
    coachId: 'c-vache-alk',
    coachName: 'ვაჩე ალქაიძე / ილია გორდაძე',
    coachRole: 'მწვრთნელები',
    locationId: 'vazissubani',
    locationName: 'ვაზისუბანი (172-ე სკოლა)',
    days: 'ორშაბათი, ოთხშაბათი, პარასკევი',
    hours: '—',
    pitch: 'მინი სტადიონი',
    intensity: 'ტექნიკა & კოლექტიური თამაში',
    monthlyFee: 150,
    studentCount: 0,
    maxCapacity: 20,
  },
  {
    id: 'grp-vaz-u11-1',
    name: 'ვაზისუბანი U-11 (1-ლი გუნდი)',
    category: 'U-11',
    ageRange: '10 - 11 წელი',
    birthYears: '2015',
    coachId: 'c-kato-job',
    coachName: 'კატო ჯობლიძე / ლაშა ხომასურიძე',
    coachRole: 'მწვრთნელები',
    locationId: 'vazissubani',
    locationName: 'ვაზისუბანი (172-ე სკოლა)',
    days: 'ორშაბათი, ოთხშაბათი, პარასკევი',
    hours: '—',
    pitch: 'მინი სტადიონი',
    intensity: 'ტაქტიკური ფუძემდებლები',
    monthlyFee: 150,
    studentCount: 0,
    maxCapacity: 20,
  },
  {
    id: 'grp-vaz-u11-2',
    name: 'ვაზისუბანი U-11 (მე-2 გუნდი)',
    category: 'U-11',
    ageRange: '10 - 11 წელი',
    birthYears: '2015',
    coachId: 'c-kato-job',
    coachName: 'კატო ჯობლიძე / ლაშა ხომასურიძე',
    coachRole: 'მწვრთნელები',
    locationId: 'vazissubani',
    locationName: 'ვაზისუბანი (172-ე სკოლა)',
    days: 'ორშაბათი, ოთხშაბათი, პარასკევი',
    hours: '—',
    pitch: 'მინი სტადიონი',
    intensity: 'ტაქტიკა & გუნდური განვითარება',
    monthlyFee: 150,
    studentCount: 0,
    maxCapacity: 20,
  },
  {
    id: 'grp-vaz-u12',
    name: 'ვაზისუბანი U-12',
    category: 'U-12',
    ageRange: '11 - 12 წელი',
    birthYears: '2014',
    coachId: 'c-niko-pant',
    coachName: 'ნიკოლოზ ფანცულაია / ილია გორდაძე',
    coachRole: 'მწვრთნელები',
    locationId: 'vazissubani',
    locationName: 'ვაზისუბანი (172-ე სკოლა)',
    days: 'ორშაბათი, ოთხშაბათი, პარასკევი',
    hours: '—',
    pitch: 'მინი სტადიონი',
    intensity: 'სრული ტაქტიკური სისტემა',
    monthlyFee: 150,
    studentCount: 0,
    maxCapacity: 20,
  },
  // ===== ვარკეთილი (105-ე სკოლა) =====
  {
    id: 'grp-vark105-u7',
    name: 'ვარკეთილი U-7',
    category: 'U-7',
    ageRange: '6 - 7 წელი',
    birthYears: '2019',
    coachId: 'c-vark-tbc',
    coachName: 'შემოგვეწევა',
    coachRole: 'მწვრთნელი',
    locationId: 'varketili-105',
    locationName: 'ვარკეთილი (105-ე სკოლა)',
    days: 'სამშაბათი, ხუთშაბათი, შაბათი',
    hours: '17:00',
    pitch: 'მინი სტადიონი',
    intensity: 'ბურთის ფლობა & კოორდინაცია',
    monthlyFee: 150,
    studentCount: 0,
    maxCapacity: 20,
  },
  {
    id: 'grp-vark105-u8',
    name: 'ვარკეთილი U-8',
    category: 'U-8',
    ageRange: '7 - 8 წელი',
    birthYears: '2018 - 2019',
    coachId: 'c-vark-tbc',
    coachName: 'შემოგვეწევა',
    coachRole: 'მწვრთნელი',
    locationId: 'varketili-105',
    locationName: 'ვარკეთილი (105-ე სკოლა)',
    days: 'სამშაბათი, ხუთშაბათი, შაბათი',
    hours: '18:00',
    pitch: 'მინი სტადიონი',
    intensity: 'ბურთის ფლობა & თამაშის სიხარული',
    monthlyFee: 150,
    studentCount: 0,
    maxCapacity: 20,
  },
  // ===== ვარკეთილი სესელია (მრავალფუნქციური) =====
  {
    id: 'grp-seselia-all',
    name: 'ვარკეთილი (ყველა ასაკობრივი ჯგუფი)',
    category: 'ყველა ასაკი',
    ageRange: '4 - 14 წელი',
    birthYears: '2012 - 2021',
    coachId: 'c-giorgi-pirv',
    coachName: 'გიორგი პირველი',
    coachRole: 'ორივე ასაკობრივ ჯგუფში',
    locationId: 'varketili-seselia',
    locationName: 'ვარკეთილი, სესილია თაყაიშვილის ქუჩა 26',
    days: 'ორშაბათი - შაბათი',
    hours: '—',
    pitch: '1 სტადიონი (9x9)',
    intensity: 'ყველა ასაკობრივი ჯგუფი',
    monthlyFee: 150,
    studentCount: 0,
    maxCapacity: 30,
  },
  // ===== ისანი =====
  {
    id: 'grp-isani-u5u6',
    name: 'ისანი U-5 / U-6',
    category: 'U-5 / U-6',
    ageRange: '4 - 6 წელი',
    birthYears: '2020 - 2021',
    coachId: 'c-giorgi-melq',
    coachName: 'გიორგი მელქაძე',
    coachRole: 'მწვრთნელი',
    locationId: 'isani',
    locationName: 'ისანი, 5 დეკემბერი, მანავის ქუჩა',
    days: 'სამშაბათი, ხუთშაბათი',
    hours: '17:00',
    pitch: '1 სტადიონი (9x9)',
    intensity: 'საფეხბურთო საწყისი ეტაპი',
    monthlyFee: 150,
    studentCount: 0,
    maxCapacity: 20,
  },
  {
    id: 'grp-isani-u7u8',
    name: 'ისანი U-7 / U-8',
    category: 'U-7 / U-8',
    ageRange: '6 - 8 წელი',
    birthYears: '2018 - 2019',
    coachId: 'c-giorgi-melq',
    coachName: 'გიორგი მელქაძე',
    coachRole: 'მწვრთნელი',
    locationId: 'isani',
    locationName: 'ისანი, 5 დეკემბერი, მანავის ქუჩა',
    days: 'სამშაბათი, ხუთშაბათი',
    hours: '18:00',
    pitch: '1 სტადიონი (9x9)',
    intensity: 'ბურთის ფლობა & კოორდინაცია',
    monthlyFee: 150,
    studentCount: 0,
    maxCapacity: 20,
  },
  {
    id: 'grp-isani-u9u10u11-a',
    name: 'ისანი U-9 / U-10 / U-11 (დილის ჯგუფი)',
    category: 'U-9 / U-10 / U-11',
    ageRange: '8 - 11 წელი',
    birthYears: '2015 - 2017',
    coachId: 'c-giorgi-melq',
    coachName: 'გიორგი მელქაძე',
    coachRole: 'მწვრთნელი',
    locationId: 'isani',
    locationName: 'ისანი, 5 დეკემბერი, მანავის ქუჩა',
    days: 'ორშაბათი, ოთხშაბათი, პარასკევი',
    hours: '09:00',
    pitch: '1 სტადიონი (9x9)',
    intensity: 'ტექნიკა & ტაქტიკური განვითარება',
    monthlyFee: 150,
    studentCount: 0,
    maxCapacity: 20,
  },
  {
    id: 'grp-isani-u9u10u11-b',
    name: 'ისანი U-9 / U-10 / U-11 (შუადღის ჯგუფი)',
    category: 'U-9 / U-10 / U-11',
    ageRange: '8 - 11 წელი',
    birthYears: '2015 - 2017',
    coachId: 'c-giorgi-melq',
    coachName: 'გიორგი მელქაძე',
    coachRole: 'მწვრთნელი',
    locationId: 'isani',
    locationName: 'ისანი, 5 დეკემბერი, მანავის ქუჩა',
    days: 'ორშაბათი, ოთხშაბათი, პარასკევი',
    hours: '10:00',
    pitch: '1 სტადიონი (9x9)',
    intensity: 'ტაქტიკა & გუნდური თამაში',
    monthlyFee: 150,
    studentCount: 0,
    maxCapacity: 20,
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
    groupId: 'grp-vaz-u12',
    groupName: 'ვაზისუბანი U-12',
    coachId: 'c-niko-pant',
    coachName: 'ნიკოლოზ ფანცულაია / ილია გორდაძე',
    locationId: 'vazissubani',
    locationName: 'ვაზისუბანი (172-ე სკოლა)',
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
    birthYear: 2016,
    age: 10,
    position: 'ცენტრალური მცველი',
    jerseyNumber: 4,
    groupId: 'grp-vaz-u10-1',
    groupName: 'ვაზისუბანი U-10 (1-ლი გუნდი)',
    coachId: 'c-vache-alk',
    coachName: 'ვაჩე ალქაიძე / ილია გორდაძე',
    locationId: 'vazissubani',
    locationName: 'ვაზისუბანი (172-ე სკოლა)',
    parentName: 'ნინო მაისურაძე',
    parentPhone: '+995 577 98 76 54',
    parentEmail: 'nino.maisuradze@gmail.com',
    isIndividualTraining: false,
    monthlyFee: 150,
    paymentStatus: 'paid',
    lastPaymentDate: '2026-10-05',
    attendanceRate: 92,
    medicalClearance: true,
    notes: 'სტაბილური დაცვა',
  },
  {
    id: 'pl-03',
    firstName: 'ალექსანდრე',
    lastName: 'კალანდაძე',
    birthYear: 2016,
    age: 10,
    position: 'თავდამსხმელი',
    jerseyNumber: 9,
    groupId: 'grp-isani-u9u10u11-a',
    groupName: 'ისანი U-9 / U-10 / U-11 (დილის ჯგუფი)',
    coachId: 'c-giorgi-melq',
    coachName: 'გიორგი მელქაძე',
    locationId: 'isani',
    locationName: 'ისანი, 5 დეკემბერი, მანავის ქუჩა',
    parentName: 'ირაკლი კალანდაძე',
    parentPhone: '+995 595 44 33 22',
    parentEmail: 'irakli.kal@yahoo.com',
    isIndividualTraining: false,
    monthlyFee: 150,
    paymentStatus: 'overdue',
    attendanceRate: 88,
    medicalClearance: true,
    notes: 'შესახსენებელია მიმდინარე თვის დავალიანება (150₾)',
  },
  {
    id: 'pl-04',
    firstName: 'სანდრო',
    lastName: 'ჯაფარიძე',
    birthYear: 2019,
    age: 7,
    position: 'მეკარე',
    jerseyNumber: 1,
    groupId: 'grp-vark105-u7',
    groupName: 'ვარკეთილი U-7',
    coachId: 'c-vark-tbc',
    coachName: 'შემოგვეწევა',
    locationId: 'varketili-105',
    locationName: 'ვარკეთილი (105-ე სკოლა)',
    parentName: 'თამარ ჯაფარიძე',
    parentPhone: '+995 598 11 22 33',
    parentEmail: 'tamar.j@gmail.com',
    isIndividualTraining: false,
    monthlyFee: 150,
    paymentStatus: 'paid',
    lastPaymentDate: '2026-10-03',
    attendanceRate: 100,
    medicalClearance: true,
    notes: 'მეკარე',
  },
  {
    id: 'pl-05',
    firstName: 'გიორგი',
    lastName: 'ღვინიაშვილი',
    birthYear: 2018,
    age: 8,
    position: 'ფლანგის შემტევი',
    jerseyNumber: 7,
    groupId: 'grp-vaz-u8-18',
    groupName: 'ვაზისუბანი U-8',
    coachId: 'c-tazo-iash',
    coachName: 'თაზო იაშვილი / ირაკლი ყაველაშვილი',
    locationId: 'vazissubani',
    locationName: 'ვაზისუბანი (172-ე სკოლა)',
    parentName: 'მამუკა ღვინიაშვილი',
    parentPhone: '+995 591 77 88 99',
    parentEmail: 'mamuka.gh@gmail.com',
    isIndividualTraining: false,
    monthlyFee: 150,
    paymentStatus: 'overdue',
    attendanceRate: 85,
    medicalClearance: true,
    notes: 'დავალიანება 150₾',
  },
  {
    id: 'pl-06',
    firstName: 'დაჩი',
    lastName: 'ჩხეიძე',
    birthYear: 2015,
    age: 11,
    position: 'საყრდენი ნახევარმცველი',
    jerseyNumber: 6,
    groupId: 'grp-vaz-u11-1',
    groupName: 'ვაზისუბანი U-11 (1-ლი გუნდი)',
    coachId: 'c-kato-job',
    coachName: 'კატო ჯობლიძე / ლაშა ხომასურიძე',
    locationId: 'vazissubani',
    locationName: 'ვაზისუბანი (172-ე სკოლა)',
    parentName: 'ეკა ჩხეიძე',
    parentPhone: '+995 599 33 55 77',
    parentEmail: 'eka.chkheidze@mail.ru',
    isIndividualTraining: false,
    monthlyFee: 150,
    paymentStatus: 'paid',
    lastPaymentDate: '2026-10-08',
    attendanceRate: 98,
    medicalClearance: true,
  },
];

const INITIAL_MATCHES: MatchEvent[] = [
  {
    id: 'match-01',
    groupId: 'grp-vaz-u12',
    groupName: 'ვაზისუბანი U-12',
    type: 'tournament',
    title: 'ტფილისის შემოდგომის თასი - 1/4 ფინალი',
    opponent: 'დინამო თბილისი U-12',
    date: '2026-10-24',
    time: '12:00',
    venue: 'ვაზისუბნის კომპლექსი (172-ე სკოლა)',
    notes: 'შეკრება 11:00-ზე. ფორმა: ძირითადი ლურჯი ეკიპირება. წყალი უზრუნველყოფილია.',
    status: 'upcoming',
    createdByCoachId: 'c-niko-pant',
  },
  {
    id: 'match-02',
    groupId: 'grp-isani-u9u10u11-a',
    groupName: 'ისანი U-9 / U-10 / U-11 (დილის ჯგუფი)',
    type: 'match',
    title: 'საბავშვო ლიგა - ტური 8',
    opponent: 'საბურთალო U-11',
    date: '2026-10-28',
    time: '15:00',
    venue: 'ისანი, 5 დეკემბერი, მანავის ქუჩა',
    notes: 'ოფიციალური კალენდარული თამაში. მშობლების დასწრება თავისუფალია.',
    status: 'upcoming',
    createdByCoachId: 'c-giorgi-melq',
  },
  {
    id: 'match-03',
    groupId: 'grp-vaz-u10-1',
    groupName: 'ვაზისუბანი U-10 (1-ლი გუნდი)',
    type: 'friendly',
    title: 'საკონტროლო ამხანაგური მატჩი',
    opponent: 'ლოკომოტივი U-10',
    date: '2026-10-18',
    time: '14:30',
    venue: 'ვაზისუბნის მინი სტადიონი',
    notes: 'ტაქტიკური სქემის გამოცდა',
    status: 'completed',
    score: '3 - 1 (მოგება)',
    createdByCoachId: 'c-vache-alk',
  },
];

const INITIAL_BILLING: BillingRecord[] = [
  {
    id: 'bill-01',
    playerId: 'pl-01',
    playerName: 'ნიკოლოზ ბერიძე',
    groupName: 'ვაზისუბანი U-12',
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
    groupName: 'ვაზისუბანი U-12',
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
    groupName: 'ვაზისუბანი U-10 (1-ლი გუნდი)',
    month: 'ოქტომბერი',
    year: 2026,
    amount: 150,
    status: 'paid',
    dueDate: '2026-10-25',
    paidAt: '2026-10-05',
    paymentMethod: 'apple_pay',
    transactionId: 'TX-94883',
    trainingType: 'standard',
    receiptNumber: 'INV-2026-10-02',
  },
  {
    id: 'bill-03',
    playerId: 'pl-03',
    playerName: 'ალექსანდრე კალანდაძე',
    groupName: 'ისანი U-9 / U-10 / U-11 (დილის ჯგუფი)',
    month: 'ოქტომბერი',
    year: 2026,
    amount: 150,
    status: 'overdue',
    dueDate: '2026-10-15',
    trainingType: 'standard',
    receiptNumber: 'INV-2026-10-03',
  },
  {
    id: 'bill-04',
    playerId: 'pl-04',
    playerName: 'სანდრო ჯაფარიძე',
    groupName: 'ვარკეთილი U-7',
    month: 'ოქტომბერი',
    year: 2026,
    amount: 150,
    status: 'paid',
    dueDate: '2026-10-25',
    paidAt: '2026-10-03',
    paymentMethod: 'mastercard',
    transactionId: 'TX-94750',
    trainingType: 'standard',
    receiptNumber: 'INV-2026-10-04',
  },
  {
    id: 'bill-05',
    playerId: 'pl-05',
    playerName: 'გიორგი ღვინიაშვილი',
    groupName: 'ვაზისუბანი U-8',
    month: 'ოქტომბერი',
    year: 2026,
    amount: 150,
    status: 'overdue',
    dueDate: '2026-10-10',
    trainingType: 'standard',
    receiptNumber: 'INV-2026-10-05',
  },
  {
    id: 'bill-06',
    playerId: 'pl-06',
    playerName: 'დაჩი ჩხეიძე',
    groupName: 'ვაზისუბანი U-11 (1-ლი გუნდი)',
    month: 'ოქტომბერი',
    year: 2026,
    amount: 150,
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
      // Clean up legacy keys from previous development iterations
      const legacyKeys = [
        'tfilisi_players_v2',
        'tfilisi_groups_v2',
        'tfilisi_matches_v2',
        'tfilisi_billing_v2',
        'tfilisi_news_v2',
        'tfilisi_coaches_v2',
        'tfilisi_locations_v2',
        'tfilisi_players_v3',
        'tfilisi_groups_v3',
        'tfilisi_matches_v3',
        'tfilisi_billing_v3',
        'tfilisi_news_v3',
        'tfilisi_coaches_v3',
        'tfilisi_locations_v3',
      ];
      legacyKeys.forEach(k => {
        try { localStorage.removeItem(k); } catch {}
      });

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
