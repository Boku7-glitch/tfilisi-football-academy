export interface LocationItem {
  id: string;
  name: string;
  slug: string;
  address: string;
  description: string;
  pitches: string;
}

export interface TeamGroup {
  id: string;
  locationId: string;
  name: string;
  category: string;
  ageRange: string;
  birthYears: string;
  coach: string;
  coachRole: string;
  days: string;
  hours: string;
  monthlyFee: number;
  pitch: string;
  intensity: string;
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  category: string;
  date: string;
  image: string;
  readTime: string;
}

export interface Coach {
  id: string;
  name: string;
  role: string;
  license: string;
  experience: string;
  specialty: string;
  availableDays: string;
}

export const locationsData: LocationItem[] = [
  {
    id: 'vazissubani',
    name: 'ვაზისუბანი',
    slug: 'vazissubani',
    address: 'მე-4 მიკრორაიონი, 1-ლი კვარტალი',
    description: '172-ე საჯარო სკოლის მიმდებარე ტერიტორია',
    pitches: '2 მინი სტადიონი (7x7 / 9x9)'
  },
  {
    id: 'varketili-105',
    name: 'ვარკეთილი',
    slug: 'varketili-105',
    address: 'სუხიშვილის ქუჩა',
    description: '105-ე საჯარო სკოლის მიმდებარე ტერიტორია',
    pitches: '2 მინი სტადიონი (7x7 / 9x9)'
  },
  {
    id: 'varketili-seselia',
    name: 'ვარკეთილი',
    slug: 'varketili-seselia',
    address: 'სესილია თაყაიშვილის ქუჩა 26',
    description: 'მრავალფუნქციური საზოგადოებრივი ცენტრი (სარენდარო)',
    pitches: '1 სტადიონი (9x9)'
  },
  {
    id: 'isani',
    name: 'ისანი',
    slug: 'isani',
    address: '5 დეკემბერი, მანავის ქუჩა',
    description: 'საცურაო კომპლექს „ოლიმპიკის“ მიმდებარე ტერიტორია',
    pitches: '1 სტადიონი (9x9)'
  }
];

export const teamGroupsData: TeamGroup[] = [
  // ===== ვაზისუბანი =====
  {
    id: 'vaz-u5',
    locationId: 'vazissubani',
    name: 'ვაზისუბანი U-5',
    category: 'U-5',
    ageRange: '4 - 5 წელი',
    birthYears: '2021',
    coach: 'ნიკა ფანცულაია / ტაზო ვახანია',
    coachRole: 'მწვრთნელები',
    days: 'ორშაბათი, ოთხშაბათი, პარასკევი',
    hours: '—',
    monthlyFee: 150,
    pitch: 'მინი სტადიონი',
    intensity: 'საფეხბურთო საწყისი ეტაპი'
  },
  {
    id: 'vaz-u6',
    locationId: 'vazissubani',
    name: 'ვაზისუბანი U-6',
    category: 'U-6',
    ageRange: '5 - 6 წელი',
    birthYears: '2020',
    coach: 'ნიკა ფანცულაია / ტაზო ვახანია',
    coachRole: 'მწვრთნელები',
    days: 'ორშაბათი, ოთხშაბათი, პარასკევი',
    hours: '—',
    monthlyFee: 150,
    pitch: 'მინი სტადიონი',
    intensity: 'საბაზისო მოტორიკა & სათამაშო'
  },
  {
    id: 'vaz-u7',
    locationId: 'vazissubani',
    name: 'ვაზისუბანი U-7',
    category: 'U-7',
    ageRange: '6 - 7 წელი',
    birthYears: '2019',
    coach: 'თაზო იაშვილი / ირაკლი ყაველაშვილი',
    coachRole: 'მწვრთნელები',
    days: 'სამშაბათი, ხუთშაბათი, შაბათი',
    hours: '17:00',
    monthlyFee: 150,
    pitch: 'მინი სტადიონი',
    intensity: 'ბურთის ფლობა & კოორდინაცია'
  },
  {
    id: 'vaz-u8',
    locationId: 'vazissubani',
    name: 'ვაზისუბანი U-8',
    category: 'U-8',
    ageRange: '7 - 8 წელი',
    birthYears: '2018',
    coach: 'თაზო იაშვილი / ირაკლი ყაველაშვილი',
    coachRole: 'მწვრთნელები',
    days: 'სამშაბათი, ხუთშაბათი, შაბათი',
    hours: '18:00',
    monthlyFee: 150,
    pitch: 'მინი სტადიონი',
    intensity: 'ბურთის ფლობა & თამაშის სიხარული'
  },
  {
    id: 'vaz-u9',
    locationId: 'vazissubani',
    name: 'ვაზისუბანი U-9',
    category: 'U-9',
    ageRange: '8 - 9 წელი',
    birthYears: '2017',
    coach: 'ლადო კაკაურიძე / ლაშა ღოთვაძე',
    coachRole: 'მწვრთნელები',
    days: 'ორშაბათი, ოთხშაბათი, პარასკევი',
    hours: '—',
    monthlyFee: 150,
    pitch: 'მინი სტადიონი',
    intensity: 'ტაქტიკური განვითარება'
  },
  {
    id: 'vaz-u10-1',
    locationId: 'vazissubani',
    name: 'ვაზისუბანი U-10 (1-ლი გუნდი)',
    category: 'U-10 (1-ლი გუნდი)',
    ageRange: '9 - 10 წელი',
    birthYears: '2016',
    coach: 'ვაჩე ალქაიძე / ილია გორდაძე',
    coachRole: 'მწვრთნელები',
    days: 'ორშაბათი, ოთხშაბათი, პარასკევი',
    hours: '—',
    monthlyFee: 150,
    pitch: 'მინი სტადიონი',
    intensity: 'ტექნიკა & პოზიციური თამაში'
  },
  {
    id: 'vaz-u10-2',
    locationId: 'vazissubani',
    name: 'ვაზისუბანი U-10 (მე-2 გუნდი)',
    category: 'U-10 (მე-2 გუნდი)',
    ageRange: '9 - 10 წელი',
    birthYears: '2016',
    coach: 'ვაჩე ალქაიძე / ილია გორდაძე',
    coachRole: 'მწვრთნელები',
    days: 'ორშაბათი, ოთხშაბათი, პარასკევი',
    hours: '—',
    monthlyFee: 150,
    pitch: 'მინი სტადიონი',
    intensity: 'ტექნიკა & კოლექტიური თამაში'
  },
  {
    id: 'vaz-u11-1',
    locationId: 'vazissubani',
    name: 'ვაზისუბანი U-11 (1-ლი გუნდი)',
    category: 'U-11 (1-ლი გუნდი)',
    ageRange: '10 - 11 წელი',
    birthYears: '2015',
    coach: 'კატო ჯობლიძე / ლაშა ხომასურიძე',
    coachRole: 'მწვრთნელები',
    days: 'ორშაბათი, ოთხშაბათი, პარასკევი',
    hours: '—',
    monthlyFee: 150,
    pitch: 'მინი სტადიონი',
    intensity: 'ტაქტიკური ფუძემდებლები'
  },
  {
    id: 'vaz-u11-2',
    locationId: 'vazissubani',
    name: 'ვაზისუბანი U-11 (მე-2 გუნდი)',
    category: 'U-11 (მე-2 გუნდი)',
    ageRange: '10 - 11 წელი',
    birthYears: '2015',
    coach: 'კატო ჯობლიძე / ლაშა ხომასურიძე',
    coachRole: 'მწვრთნელები',
    days: 'ორშაბათი, ოთხშაბათი, პარასკევი',
    hours: '—',
    monthlyFee: 150,
    pitch: 'მინი სტადიონი',
    intensity: 'ტაქტიკა & გუნდური განვითარება'
  },
  {
    id: 'vaz-u12',
    locationId: 'vazissubani',
    name: 'ვაზისუბანი U-12',
    category: 'U-12',
    ageRange: '11 - 12 წელი',
    birthYears: '2014',
    coach: 'ნიკოლოზ ფანცულაია / ილია გორდაძე',
    coachRole: 'მწვრთნელები',
    days: 'ორშაბათი, ოთხშაბათი, პარასკევი',
    hours: '—',
    monthlyFee: 150,
    pitch: 'მინი სტადიონი',
    intensity: 'სრული ტაქტიკური სისტემა'
  },
  // ===== ვარკეთილი =====
  {
    id: 'vark105-u7',
    locationId: 'varketili-105',
    name: 'ვარკეთილი U-7',
    category: 'U-7',
    ageRange: '6 - 7 წელი',
    birthYears: '2019',
    coach: 'შემოგვეწევა',
    coachRole: 'მწვრთნელი',
    days: 'სამშაბათი, ხუთშაბათი, შაბათი',
    hours: '17:00',
    monthlyFee: 150,
    pitch: 'მინი სტადიონი',
    intensity: 'ბურთის ფლობა & კოორდინაცია'
  },
  {
    id: 'vark105-u8',
    locationId: 'varketili-105',
    name: 'ვარკეთილი U-8',
    category: 'U-8',
    ageRange: '7 - 8 წელი',
    birthYears: '2019 - 2020',
    coach: 'შემოგვეწევა',
    coachRole: 'მწვრთნელი',
    days: 'სამშაბათი, ხუთშაბათი, შაბათი',
    hours: '18:00',
    monthlyFee: 150,
    pitch: 'მინი სტადიონი',
    intensity: 'ბურთის ფლობა & თამაშის სიხარული'
  },
  // ===== ისანი =====
  {
    id: 'isani-u5',
    locationId: 'isani',
    name: 'ისანი U-5 / U-6',
    category: 'U-5 / U-6',
    ageRange: '4 - 6 წელი',
    birthYears: '2020 - 2021',
    coach: 'გიორგი მელქაძე',
    coachRole: 'მწვრთნელი',
    days: 'სამშაბათი, ხუთშაბათი',
    hours: '17:00',
    monthlyFee: 150,
    pitch: 'სტადიონი (9x9)',
    intensity: 'საფეხბურთო საწყისი ეტაპი'
  },
  {
    id: 'isani-u7u8',
    locationId: 'isani',
    name: 'ისანი U-7 / U-8',
    category: 'U-7 / U-8',
    ageRange: '6 - 8 წელი',
    birthYears: '2018 - 2019',
    coach: 'გიორგი მელქაძე',
    coachRole: 'მწვრთნელი',
    days: 'სამშაბათი, ხუთშაბათი',
    hours: '18:00',
    monthlyFee: 150,
    pitch: 'სტადიონი (9x9)',
    intensity: 'ბურთის ფლობა & კოორდინაცია'
  },
  {
    id: 'isani-u9u10u11',
    locationId: 'isani',
    name: 'ისანი U-9 / U-10 / U-11 (1-ლი ნაკადი)',
    category: 'U-9 / U-10 / U-11',
    ageRange: '8 - 11 წელი',
    birthYears: '2015 - 2017',
    coach: 'გიორგი მელქაძე',
    coachRole: 'მწვრთნელი',
    days: 'ორშაბათი, ოთხშაბათი, პარასკევი',
    hours: '09:00',
    monthlyFee: 150,
    pitch: 'სტადიონი (9x9)',
    intensity: 'ტექნიკა & ტაქტიკური განვითარება'
  },
  {
    id: 'isani-u9u10u11-b',
    locationId: 'isani',
    name: 'ისანი U-9 / U-10 / U-11 (მე-2 ნაკადი)',
    category: 'U-9 / U-10 / U-11',
    ageRange: '8 - 11 წელი',
    birthYears: '2015 - 2017',
    coach: 'გიორგი მელქაძე',
    coachRole: 'მწვრთნელი',
    days: 'ორშაბათი, ოთხშაბათი, პარასკევი',
    hours: '10:00',
    monthlyFee: 150,
    pitch: 'სტადიონი (9x9)',
    intensity: 'ტაქტიკა & გუნდური თამაში'
  },
  // ===== ვარკეთილი (მრავალფუნქციური) =====
  {
    id: 'seselia-all',
    locationId: 'varketili-seselia',
    name: 'ვარკეთილი U-გუნდი',
    category: 'U-გუნდი',
    ageRange: '4 - 14 წელი',
    birthYears: '2012 - 2021',
    coach: 'გიორგი პირველი',
    coachRole: 'ორივე ასაკობრივ ჯგუფში',
    days: 'ორშაბათი - შაბათი',
    hours: '—',
    monthlyFee: 150,
    pitch: 'სტადიონი (9x9)',
    intensity: 'ყველა ასაკობრივი ჯგუფი'
  }
];

export const coachesData: Coach[] = [
  {
    id: 'c-giorgi-pirv',
    name: 'გიორგი პირველი',
    role: 'ვარკეთილის მრავალფუნქციური ცენტრის მწვრთნელი',
    license: '',
    experience: '',
    specialty: 'U-5 — U-14',
    availableDays: 'ორშაბათი - შაბათი'
  },
  {
    id: 'c-giorgi-melq',
    name: 'გიორგი მელქაძე',
    role: 'ისნის ფილიალის მწვრთნელი',
    license: '',
    experience: '',
    specialty: 'U-5, U-6, U-7, U-8, U-9, U-10, U-11',
    availableDays: 'ორშაბათი - პარასკევი'
  },
  {
    id: 'c-nika-pant',
    name: 'ნიკა ფანცულაია',
    role: 'ვაზისუბნის ფილიალის მწვრთნელი',
    license: '',
    experience: '',
    specialty: 'U-5, U-6',
    availableDays: 'ორშაბათი, ოთხშაბათი, პარასკევი'
  },
  {
    id: 'c-tazo-vakha',
    name: 'ტაზო ვახანია',
    role: 'ვაზისუბნის ფილიალის მწვრთნელი',
    license: '',
    experience: '',
    specialty: 'U-5, U-6',
    availableDays: 'ორშაბათი, ოთხშაბათი, პარასკევი'
  },
  {
    id: 'c-tazo-iash',
    name: 'თაზო იაშვილი',
    role: 'ვაზისუბნის ფილიალის მწვრთნელი',
    license: '',
    experience: '',
    specialty: 'U-7, U-8',
    availableDays: 'სამშაბათი, ხუთშაბათი, შაბათი'
  },
  {
    id: 'c-irakli-yavel',
    name: 'ირაკლი ყაველაშვილი',
    role: 'ვაზისუბნის ფილიალის მწვრთნელი',
    license: '',
    experience: '',
    specialty: 'U-7, U-8',
    availableDays: 'სამშაბათი, ხუთშაბათი, შაბათი'
  },
  {
    id: 'c-lado-kak',
    name: 'ლადო კაკაურიძე',
    role: 'ვაზისუბნის ფილიალის მწვრთნელი',
    license: '',
    experience: '',
    specialty: 'U-9',
    availableDays: 'ორშაბათი, ოთხშაბათი, პარასკევი'
  },
  {
    id: 'c-lasha-ghot',
    name: 'ლაშა ღოთვაძე',
    role: 'ვაზისუბნის ფილიალის მწვრთნელი',
    license: '',
    experience: '',
    specialty: 'U-9',
    availableDays: 'ორშაბათი, ოთხშაბათი, პარასკევი'
  },
  {
    id: 'c-vache-alk',
    name: 'ვაჩე ალქაიძე',
    role: 'ვაზისუბნის ფილიალის მწვრთნელი',
    license: '',
    experience: '',
    specialty: 'U-10 (1-ლი და მე-2 გუნდები)',
    availableDays: 'ორშაბათი, ოთხშაბათი, პარასკევი'
  },
  {
    id: 'c-ilia-gord',
    name: 'ილია გორდაძე',
    role: 'ვაზისუბნის ფილიალის მწვრთნელი',
    license: '',
    experience: '',
    specialty: 'U-10 (1-ლი და მე-2 გუნდები), U-12',
    availableDays: 'ორშაბათი, ოთხშაბათი, პარასკევი'
  },
  {
    id: 'c-kato-job',
    name: 'კატო ჯობლიძე',
    role: 'ვაზისუბნის ფილიალის მწვრთნელი',
    license: '',
    experience: '',
    specialty: 'U-11 (1-ლი და მე-2 გუნდები)',
    availableDays: 'ორშაბათი, ოთხშაბათი, პარასკევი'
  },
  {
    id: 'c-lasha-khom',
    name: 'ლაშა ხომასურიძე',
    role: 'ვაზისუბნის ფილიალის მწვრთნელი',
    license: '',
    experience: '',
    specialty: 'U-11 (1-ლი და მე-2 გუნდები)',
    availableDays: 'ორშაბათი, ოთხშაბათი, პარასკევი'
  },
  {
    id: 'c-niko-pant',
    name: 'ნიკოლოზ ფანცულაია',
    role: 'ვაზისუბნის ფილიალის მწვრთნელი',
    license: '',
    experience: '',
    specialty: 'U-12',
    availableDays: 'ორშაბათი, ოთხშაბათი, პარასკევი'
  },
  {
    id: 'c-vark-tbc',
    name: 'შემოგვეწევა',
    role: 'ვარკეთილის ფილიალის მწვრთნელი',
    license: '',
    experience: '',
    specialty: 'U-7, U-8',
    availableDays: 'სამშაბათი, ხუთშაბათი, შაბათი'
  }
];

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  phone?: string;
  email?: string;
  bio: string;
}

export const staffData: StaffMember[] = [
  {
    id: 's1',
    name: 'დავით ჯიშკარიანი',
    role: 'დირექტორი',
    department: 'მენეჯმენტი',
    bio: 'ტფილისის საფეხბურთო აკადემიის დირექტორი.'
  },
  {
    id: 's2',
    name: 'კახა ტოგონიძე',
    role: 'სპორტული დირექტორი',
    department: 'სპორტული დეპარტამენტი',
    bio: 'ტფილისის საფეხბურთო აკადემიის სპორტული დირექტორი.'
  },
  {
    id: 's3',
    name: 'დავით დვალი',
    role: 'ადმინისტრატორი',
    department: 'ადმინისტრაცია',
    bio: 'ტფილისის საფეხბურთო აკადემიის ადმინისტრატორი.'
  }
];

export const newsData: NewsItem[] = [
  {
    id: '1',
    title: 'შემოდგომის სეზონის მზადება: ახალი მიღება 2012-2019 წლიანებისთვის',
    slug: 'autumn-season-kids-recruitment',
    excerpt: 'აკადემია იწყებს ახალ სასწავლო სეზონს. გაეცანით განრიგსა და ასაკობრივ ჯგუფებს საბურთალოსა და ვარკეთილის ფილიალებში.',
    content: 'ტფილისის საფეხბურთო აკადემია ოფიციალურად ხსნის 2026/2027 სასწავლო-საწვრთნელო სეზონის მიღებას 6-დან 15 წლამდე (2012-2019 წლებში დაბადებული) ბავშვებისა და მოზარდებისთვის. სავარჯიშო პროცესი მიმდინარეობს საბურთალოს, ვარკეთილისა და დინამოს ბაზის ფილიალებში UEFA-ს ლიცენზირებული მწვრთნელების ხელმძღვანელობით. ყველა ახალ აღსაზრდელს ეძლევა საშუალება გაიაროს პირველი საცდელი ვარჯიში და შეუერთდეს მის ასაკობრივ გუნდს.',
    category: 'მიღება 2026',
    date: '15 ოქტომბერი, 2026',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop',
    readTime: '3 წთ'
  },
  {
    id: '2',
    title: 'ახალი ფილიალი საბურთალოზე: თანამედროვე მოედანი ბავშვებისთვის',
    slug: 'saburtalo-new-kids-branch',
    excerpt: 'უნივერსიტეტის ქუჩაზე გაიხსნა დამატებითი სავარჯიშო სივრცე დაწყებითი ასაკის ბავშვებისთვის (6-10 წელი).',
    content: 'საბურთალოს საფეხბურთო ცენტრში (უნივერსიტეტის ქ. #6) დაემატა განახლებული ხელოვნურსაფარიანი მოედანი, რომელიც სპეციალურად მოეწყო U-8 და U-10 ასაკობრივი ჯგუფებისთვის. ინფრასტრუქტურა აღჭურვილია თანამედროვე LED განათებით, უსაფრთხო გარემოთი, კომფორტული გასახდელებითა და სამედიცინო პუნქტით.',
    category: 'ფილიალები',
    date: '12 ოქტომბერი, 2026',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop',
    readTime: '2 წთ'
  },
  {
    id: '3',
    title: 'ტფილისის აკადემიის U-12 გუნდი „ოქროს თასის“ ფინალში გავიდა',
    slug: 'tbilisi-fa-u12-cup-final',
    excerpt: 'ჩვენმა აღსაზრდელებმა დრამატულ ნახევარფინალში 3:2 დაამარცხეს მეტოქე და თასის მთავარი მატჩისთვის ემზადებიან.',
    content: 'ლევან ჭელიძის ხელმძღვანელობით მოასპარეზე 2014-2015 წლიანების გუნდმა (U-12) ბრწყინვალე თამაში აჩვენა თბილისის შემოდგომის „ოქროს თასის“ ნახევარფინალში. ჩვენმა ახალგაზრდა ფეხბურთელებმა დაძაბულ ბრძოლაში 3:2 სძლიეს მეტოქეს. ფინალური შეხვედრა მომდევნო შაბათს გაიმართება, სადაც მშობლებისა და გულშემატკივრების დასწრება თავისუფალია.',
    category: 'ტურნირები',
    date: '8 ოქტომბერი, 2026',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=800&auto=format&fit=crop',
    readTime: '4 წთ'
  },
  {
    id: '4',
    title: 'ინდივიდუალური ვარჯიშები: როგორ ვეხმარებით ბავშვებს ტექნიკის დახვეწაში',
    slug: 'individual-training-kids-skills',
    excerpt: 'პერსონალური მწვრთნელის როლი ბავშვის თავდაჯერებულობასა და ბურთის ფლობის ტექნიკაში. რეგისტრაცია უკვე ღიაა.',
    content: 'ინდივიდუალური მომზადების პროგრამა შექმნილია იმ მოთამაშეებისთვის, რომლებსაც სურთ დამატებით იმუშაონ ბურთის ფლობის ტექნიკაზე, კოორდინაციაზე, სისწრაფესა და სათამაშო აზროვნებაზე. ვარჯიშები ტარდება 1-ზე-1 ფორმატში UEFA-ს ლიცენზირებულ სპეციალისტებთან. საიტზე უკვე მოქმედებს ონლაინ ჯავშნისა და გამოწერის სისტემა, საიდანაც მშობელს შეუძლია აირჩიოს სასურველი მწვრთნელი, დრო და გადაიხადოს ონლაინ.',
    category: 'მეთოდოლოგია',
    date: '4 ოქტომბერი, 2026',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=800&auto=format&fit=crop',
    readTime: '3 წთ'
  }
];
