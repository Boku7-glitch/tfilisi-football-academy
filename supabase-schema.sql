-- ==============================================================================
-- TBILISI FOOTBALL ACADEMY (ტფილისის საფეხბურთო აკადემია)
-- SUPABASE POSTGRESQL DATABASE SCHEMA
-- ==============================================================================

-- 1. Profiles Table (Extends Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'player' CHECK (role IN ('admin', 'coach', 'player')),
  position TEXT, -- For players (e.g., 'მეკარე', 'მცველი', 'ნახევარმცველი', 'თავდამსხმელი')
  jersey_number INT,
  birth_year INT,
  group_id UUID,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Locations / Branches (ფილიალები)
CREATE TABLE IF NOT EXISTS public.locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, -- 'საბურთალოს ფილიალი', 'ვარკეთილის ფილიალი', 'დინამოს ბაზა'
  slug TEXT UNIQUE NOT NULL,
  address TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Teams & Age Groups for Men / Adults (გუნდები და ასაკობრივი კატეგორიები)
CREATE TABLE IF NOT EXISTS public.teams_and_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID REFERENCES public.locations(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- e.g. "ძირითადი გუნდი (18-28)", "სამოყვარულო ლიგის გუნდი (21-35)", "ვეტერანები / მასტერსი (35+)"
  category TEXT NOT NULL CHECK (category IN ('senior_first_team', 'amateur_league', 'masters_35_plus', 'individual')),
  age_range TEXT NOT NULL, -- "18-28 წწ", "21-35 წწ", "35+ წწ"
  coach_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  monthly_fee NUMERIC(10, 2) NOT NULL DEFAULT 150.00,
  max_players INT DEFAULT 25,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Weekly Training Schedule (სავარჯიშო განრიგი)
CREATE TABLE IF NOT EXISTS public.schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES public.teams_and_groups(id) ON DELETE CASCADE,
  day_of_week TEXT NOT NULL, -- 'ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', etc.
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  pitch_name TEXT DEFAULT 'მოედანი 1',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Matches & Tournaments Calendar (მატჩები და ტურნირები)
CREATE TABLE IF NOT EXISTS public.matches_and_tournaments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES public.teams_and_groups(id) ON DELETE CASCADE,
  opponent TEXT NOT NULL,
  match_date TIMESTAMPTZ NOT NULL,
  venue TEXT NOT NULL,
  tournament_name TEXT NOT NULL, -- 'თბილისის სამოყვარულო ლიგა', 'ამხანაგური შეხვედრა'
  home_or_away TEXT DEFAULT 'home' CHECK (home_or_away IN ('home', 'away')),
  score TEXT, -- e.g. "3 - 1"
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'in_progress', 'finished', 'postponed')),
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Individual Training Sessions & Bookings (ინდივიდუალური მომზადების მოდული)
CREATE TABLE IF NOT EXISTS public.individual_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  location_id UUID REFERENCES public.locations(id) ON DELETE CASCADE,
  session_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  price NUMERIC(10, 2) NOT NULL DEFAULT 50.00,
  is_booked BOOLEAN DEFAULT FALSE,
  booked_by_player_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. News & Blog Feed (სიახლეები)
CREATE TABLE IF NOT EXISTS public.news_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  category TEXT DEFAULT 'სიახლე', -- 'მატჩი', 'ტურნირები', 'განცხადება'
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  is_published BOOLEAN DEFAULT TRUE,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Billing & Payments (ფინანსური მოდული / ბილინგი)
CREATE TABLE IF NOT EXISTS public.invoices_and_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  group_id UUID REFERENCES public.teams_and_groups(id) ON DELETE SET NULL,
  invoice_number TEXT UNIQUE NOT NULL,
  month_for TEXT NOT NULL, -- 'ოქტომბერი 2026'
  amount NUMERIC(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue')),
  due_date DATE NOT NULL,
  paid_at TIMESTAMPTZ,
  payment_method TEXT, -- 'Visa/Mastercard', 'Apple Pay', 'Google Pay'
  transaction_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams_and_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches_and_tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.individual_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices_and_payments ENABLE ROW LEVEL SECURITY;

-- Public can read published news, locations, teams, and schedules
CREATE POLICY "Public read news" ON public.news_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public read locations" ON public.locations FOR SELECT USING (true);
CREATE POLICY "Public read teams" ON public.teams_and_groups FOR SELECT USING (true);
CREATE POLICY "Public read schedules" ON public.schedules FOR SELECT USING (true);
CREATE POLICY "Public read available sessions" ON public.individual_sessions FOR SELECT USING (true);

-- User profiles policy
CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Invoices policy: Players see own invoices; admins see all
CREATE POLICY "Players see own invoices" ON public.invoices_and_payments FOR SELECT USING (auth.uid() = player_id);

-- Profile creation trigger on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'full_name', 'ახალი წევრი'), 'player');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
