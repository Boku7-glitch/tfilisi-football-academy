-- ==============================================================================
-- TFILISI FOOTBALL ACADEMY - SUPABASE DATABASE SCHEMA
-- ==============================================================================
-- Instructions: Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. User Profiles Table (Linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'parent' CHECK (role IN ('parent', 'coach', 'manager')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Academy Locations Table
CREATE TABLE IF NOT EXISTS public.locations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  address TEXT NOT NULL,
  description TEXT,
  pitches TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Academy Squad Groups Table
CREATE TABLE IF NOT EXISTS public.groups (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  birth_years TEXT NOT NULL,
  coach_name TEXT NOT NULL,
  coach_id TEXT,
  location_id TEXT REFERENCES public.locations(id) ON DELETE SET NULL,
  days TEXT NOT NULL,
  hours TEXT NOT NULL,
  pitch TEXT NOT NULL,
  monthly_fee NUMERIC(10, 2) NOT NULL DEFAULT 150.00,
  max_capacity INTEGER NOT NULL DEFAULT 18,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Players Table (Enrolled Kids)
CREATE TABLE IF NOT EXISTS public.players (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  birth_year INTEGER NOT NULL,
  position TEXT NOT NULL DEFAULT 'ნახევარმცველი',
  jersey_number INTEGER DEFAULT 10,
  group_id TEXT REFERENCES public.groups(id) ON DELETE SET NULL,
  parent_name TEXT NOT NULL,
  parent_phone TEXT NOT NULL,
  parent_email TEXT NOT NULL,
  is_individual_training BOOLEAN NOT NULL DEFAULT FALSE,
  monthly_fee NUMERIC(10, 2) NOT NULL DEFAULT 150.00,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('paid', 'pending', 'overdue')),
  last_payment_date DATE,
  attendance_rate INTEGER NOT NULL DEFAULT 100,
  medical_clearance BOOLEAN NOT NULL DEFAULT TRUE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Match & Tournament Events Table (Coach Scheduler)
CREATE TABLE IF NOT EXISTS public.match_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id TEXT REFERENCES public.groups(id) ON DELETE CASCADE,
  type TEXT NOT NULL DEFAULT 'match' CHECK (type IN ('match', 'tournament', 'friendly')),
  title TEXT NOT NULL,
  opponent TEXT NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME NOT NULL,
  venue TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'completed', 'cancelled')),
  score TEXT,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Billing & Invoices Table
CREATE TABLE IF NOT EXISTS public.billing_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_id UUID REFERENCES public.players(id) ON DELETE CASCADE,
  player_name TEXT NOT NULL,
  group_name TEXT NOT NULL,
  month TEXT NOT NULL,
  year INTEGER NOT NULL DEFAULT 2026,
  amount NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('paid', 'pending', 'overdue')),
  due_date DATE NOT NULL,
  paid_at TIMESTAMPTZ,
  payment_method TEXT CHECK (payment_method IN ('visa', 'mastercard', 'apple_pay', 'google_pay', 'cash')),
  transaction_id TEXT,
  training_type TEXT NOT NULL DEFAULT 'standard' CHECK (training_type IN ('standard', 'individual')),
  receipt_number TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.billing_records ENABLE ROW LEVEL SECURITY;

-- Public can read locations and groups
CREATE POLICY "Allow public read on locations" ON public.locations FOR SELECT USING (true);
CREATE POLICY "Allow public read on groups" ON public.groups FOR SELECT USING (true);

-- Profiles: Users can read and update their own profile
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Players: Parents can view only their own children; Coaches/Staff can view all
CREATE POLICY "Parents view own children" ON public.players 
  FOR SELECT USING (auth.uid() = parent_id OR auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('coach', 'manager')));

CREATE POLICY "Parents insert own children" ON public.players 
  FOR INSERT WITH CHECK (auth.uid() = parent_id OR auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('coach', 'manager')));

-- Matches: Anyone logged in can view group matches; Coaches/Staff can insert
CREATE POLICY "View matches" ON public.match_events FOR SELECT USING (true);
CREATE POLICY "Coaches can insert matches" ON public.match_events 
  FOR ALL USING (auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('coach', 'manager')));

-- Billing: Parents view own child bills; Coaches/Staff view all
CREATE POLICY "Parents view own bills" ON public.billing_records 
  FOR SELECT USING (
    player_id IN (SELECT id FROM public.players WHERE parent_id = auth.uid()) OR 
    auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('coach', 'manager'))
  );

CREATE POLICY "Parents pay own bills" ON public.billing_records 
  FOR UPDATE USING (
    player_id IN (SELECT id FROM public.players WHERE parent_id = auth.uid()) OR 
    auth.uid() IN (SELECT id FROM public.profiles WHERE role IN ('coach', 'manager'))
  );

-- ==============================================================================
-- INITIAL SEED DATA
-- ==============================================================================

INSERT INTO public.locations (id, name, slug, address, description, pitches) VALUES
('saburtalo', 'საბურთალო', 'saburtalo', 'უნივერსიტეტის ქ. #6, თბილისი', 'სრული ზომის სტანდარტული ხელოვნურსაფარიანი მოედანი', '2 მოედანი'),
('varketili', 'ვარკეთილი', 'varketili', 'ვარკეთილის ზემო პლატო, მე-2 მ/რ', 'სავარჯიშო ცენტრი ბავშვთა ასაკობრივი ჯგუფებისთვის', '1 მოედანი'),
('dinamo', 'დინამოს ბაზა', 'dinamo', 'დიღმის მასივი, საწვრთნელი ცენტრი', 'უმაღლესი ხარისხის ბუნებრივი და ხელოვნური საფარი', '3 მოედანი')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.groups (id, name, category, birth_years, coach_name, coach_id, location_id, days, hours, pitch, monthly_fee, max_capacity) VALUES
('grp-u12-saburtalo', '2014-2015 წლიანების გუნდი (U-12)', 'U-12', '2014 - 2015', 'ლევან ჭელიძე', 'coach-chelidze', 'saburtalo', 'სამშაბათი, ხუთშაბათი, შაბათი', '15:30 - 17:00', 'მოედანი B (ხელოვნური)', 150.00, 18),
('grp-u14-saburtalo', '2012-2013 წლიანების გუნდი (U-14)', 'U-14', '2012 - 2013', 'გიორგი დემეტრაძე', 'coach-demetradze', 'saburtalo', 'ორშაბათი, ოთხშაბათი, პარასკევი', '16:00 - 17:30', 'მოედანი A (სრული ზომა)', 160.00, 20),
('grp-u10-varketili', '2016-2017 წლიანების გუნდი (U-10)', 'U-10', '2016 - 2017', 'დავით კაპანაძე', 'coach-kapanadze', 'varketili', 'სამშაბათი, ხუთშაბათი, შაბათი', '17:00 - 18:30', 'საბავშვო მოედანი #1', 140.00, 16),
('grp-u8-dinamo', '2018-2019 წლიანების ჯგუფი (U-8)', 'U-8', '2018 - 2019', 'ლევან ჭელიძე', 'coach-chelidze', 'dinamo', 'შაბათი, კვირა', '11:00 - 12:30', 'სავარჯიშო მოედანი C', 130.00, 15)
ON CONFLICT (id) DO NOTHING;
