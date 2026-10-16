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
    id: 'saburtalo',
    name: 'საბურთალო',
    slug: 'saburtalo',
    address: 'უნივერსიტეტის ქ. #6, თბილისი',
    description: 'სრული ზომის სტანდარტული ხელოვნურსაფარიანი მოედანი, უსაფრთხო გარემო და კომფორტული გასახდელები.',
    pitches: '2 მოედანი (საბავშვო და სტანდარტული)'
  },
  {
    id: 'varketili',
    name: 'ვარკეთილი',
    slug: 'varketili',
    address: 'ვარკეთილის ზემო პლატო, მე-2 მ/რ',
    description: 'სავარჯიშო ცენტრი ბავშვთა ასაკობრივი ჯგუფებისთვის, სათამაშო და ფიზიკური განვითარების სივრცე.',
    pitches: '1 სტანდარტული მოედანი'
  },
  {
    id: 'dinamo',
    name: 'დინამოს ბაზა',
    slug: 'dinamo',
    address: 'დიღმის მასივი, საწვრთნელი ცენტრი',
    description: 'უმაღლესი ხარისხის ბუნებრივი და ხელოვნური საფარი, ექიმის მუდმივი მეთვალყურეობა.',
    pitches: '3 სავარჯიშო მოედანი'
  }
];

export const teamGroupsData: TeamGroup[] = [
  {
    id: '1',
    locationId: 'saburtalo',
    name: '2012-2013 წლიანების გუნდი (U-14)',
    category: 'U-14 (2012-2013)',
    ageRange: '12 - 14 წელი',
    birthYears: '2012 - 2013',
    coach: 'გიორგი დემეტრაძე',
    coachRole: 'მთავარი მწვრთნელი (UEFA A Youth)',
    days: 'ორშაბათი, ოთხშაბათი, პარასკევი',
    hours: '16:00 - 17:30',
    monthlyFee: 160,
    pitch: 'მოედანი A (სრული ზომა)',
    intensity: 'საბავშვო ჩემპიონატი & ტაქტიკა'
  },
  {
    id: '2',
    locationId: 'saburtalo',
    name: '2014-2015 წლიანების გუნდი (U-12)',
    category: 'U-12 (2014-2015)',
    ageRange: '10 - 12 წელი',
    birthYears: '2014 - 2015',
    coach: 'ლევან ჭელიძე',
    coachRole: 'მწვრთნელი (UEFA B Youth)',
    days: 'სამშაბათი, ხუთშაბათი, შაბათი',
    hours: '15:30 - 17:00',
    monthlyFee: 150,
    pitch: 'მოედანი B (8x8)',
    intensity: 'ტექნიკური ოსტატობა & გუნდური თამაში'
  },
  {
    id: '3',
    locationId: 'saburtalo',
    name: '2016-2017 წლიანების გუნდი (U-10)',
    category: 'U-10 (2016-2017)',
    ageRange: '8 - 10 წელი',
    birthYears: '2016 - 2017',
    coach: 'დავით კვირკველია',
    coachRole: 'საბავშვო მწვრთნელი',
    days: 'ორშაბათი, ოთხშაბათი, პარასკევი',
    hours: '17:30 - 18:45',
    monthlyFee: 140,
    pitch: 'მოედანი C (საბავშვო)',
    intensity: 'საბაზისო მოტორიკა & თამაშები'
  },
  {
    id: '4',
    locationId: 'saburtalo',
    name: '2018-2019 წლიანების ჯგუფი (U-8)',
    category: 'U-8 (2018-2019)',
    ageRange: '6 - 8 წელი',
    birthYears: '2018 - 2019',
    coach: 'მიხეილ მესხი',
    coachRole: 'საწყისი ეტაპის სპეციალისტი',
    days: 'სამშაბათი, ხუთშაბათი, შაბათი',
    hours: '14:30 - 15:30',
    monthlyFee: 130,
    pitch: 'საბავშვო დარბაზი / მოედანი B',
    intensity: 'პირველი ნაბიჯები ფეხბურთში'
  },
  {
    id: '5',
    locationId: 'varketili',
    name: 'ვარკეთილის U-12 გუნდი (2014-2015)',
    category: 'U-12 (2014-2015)',
    ageRange: '10 - 12 წელი',
    birthYears: '2014 - 2015',
    coach: 'ზურაბ ხიზანიშვილი',
    coachRole: 'მთავარი მწვრთნელი (UEFA A)',
    days: 'ორშაბათი, ოთხშაბათი, პარასკევი',
    hours: '16:30 - 18:00',
    monthlyFee: 140,
    pitch: 'მთავარი მოედანი',
    intensity: 'ტექნიკა & ამხანაგური მატჩები'
  },
  {
    id: '6',
    locationId: 'dinamo',
    name: 'დინამოს ბაზის U-14 რაზმი (2012-2013)',
    category: 'U-14 (2012-2013)',
    ageRange: '12 - 14 წელი',
    birthYears: '2012 - 2013',
    coach: 'კახა ცხადაძე',
    coachRole: 'უფროსი სპეციალისტი',
    days: 'სამშაბათი, ხუთშაბათი, შაბათი',
    hours: '16:00 - 17:30',
    monthlyFee: 170,
    pitch: 'დინამოს ბუნებრივი მოედანი',
    intensity: 'პროფესიონალური აკადემიური პროგრამა'
  }
];

export const coachesData: Coach[] = [
  {
    id: 'c1',
    name: 'გიორგი დემეტრაძე',
    role: 'საბავშვო-საყმაწვილო მიმართულების ხელმძღვანელი',
    license: 'UEFA A Youth Licence',
    experience: '12 წელი ბავშვთა ფეხბურთში',
    specialty: 'ტექნიკური ოსტატობა, ბავშვის ფსიქოლოგია, სათამაშო ინტელექტი',
    availableDays: 'ორშაბათი - პარასკევი'
  },
  {
    id: 'c2',
    name: 'ლევან ჭელიძე',
    role: 'კოორდინაციისა და მოტორიკის სპეციალისტი',
    license: 'UEFA B / Youth Physical Coach',
    experience: '8 წლიანი გამოცდილება',
    specialty: 'მოზარდის სწორი სირბილის ტექნიკა, სისწრაფე და მოქნილობა',
    availableDays: 'სამშაბათი, ხუთშაბათი, შაბათი'
  },
  {
    id: 'c3',
    name: 'დავით კვირკველია',
    role: 'საბავშვო მეკარეების მწვრთნელი',
    license: 'UEFA Goalkeeping B',
    experience: '10 წელი აკადემიურ წრეში',
    specialty: 'რეაქცია, ბურთის დაჭერის ტექნიკა, პოზიციის შერჩევა',
    availableDays: 'ორშაბათი, ოთხშაბათი, შაბათი'
  }
];

export const newsData: NewsItem[] = [
  {
    id: '1',
    title: 'შემოდგომის სეზონის მზადება: ახალი მიღება 2012-2019 წლიანებისთვის',
    slug: 'autumn-season-kids-recruitment',
    excerpt: 'აკადემია იწყებს ახალ სასწავლო სეზონს. გაეცანით განრიგსა და ასაკობრივ ჯგუფებს საბურთალოსა და ვარკეთილის ფილიალებში.',
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
    category: 'მეთოდოლოგია',
    date: '4 ოქტომბერი, 2026',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=800&auto=format&fit=crop',
    readTime: '3 წთ'
  }
];
