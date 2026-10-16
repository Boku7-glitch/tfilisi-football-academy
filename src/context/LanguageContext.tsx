'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ka' | 'en';

export interface Translations {
  navbar: {
    home: string;
    teamsAges: string;
    locations: string;
    schedule: string;
    individual: string;
    news: string;
    contact: string;
    login: string;
    teamsDropdownTitle: string;
    locationsDropdownTitle: string;
    u14Desc: string;
    u12Desc: string;
    u10Desc: string;
    u8Desc: string;
    saburtaloName: string;
    saburtaloAddr: string;
    varketiliName: string;
    varketiliAddr: string;
    dinamoName: string;
    dinamoAddr: string;
  };
  hero: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    titleEnd: string;
    subtitle: string;
    registerBtn: string;
    learnMoreBtn: string;
    stat1Title: string;
    stat1Desc: string;
    stat2Title: string;
    stat2Desc: string;
    stat3Title: string;
    stat3Desc: string;
    liveBadge: string;
    cardLocation: string;
    cardTitle: string;
    cardStat1Label: string;
    cardStat1Val: string;
    cardStat2Label: string;
    cardStat2Val: string;
  };
  groups: {
    badge: string;
    title: string;
    subtitle: string;
    filterLocation: string;
    filterAges: string;
    allLocations: string;
    allAges: string;
    daysLabel: string;
    hoursLabel: string;
    coachLabel: string;
    feeLabel: string;
    perMonth: string;
    enrollBtn: string;
  };
  individual: {
    badge: string;
    title: string;
    subtitle: string;
    chooseCoach: string;
    checkoutBadge: string;
    checkoutTitle: string;
    selectedCoachLabel: string;
    availableTimesLabel: string;
    durationLabel: string;
    durationVal: string;
    pitchLabel: string;
    pitchVal: string;
    totalLabel: string;
    payConfirmBtn: string;
    cardsAccepted: string;
  };
  locations: {
    badge: string;
    title: string;
    subtitle: string;
    changingRooms: string;
    ledLighting: string;
    viewMap: string;
  };
  news: {
    badge: string;
    title: string;
    subtitle: string;
    readMore: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    hotline: string;
    email: string;
    office: string;
    formTitle: string;
    childName: string;
    childNamePlaceholder: string;
    birthYear: string;
    parentName: string;
    parentNamePlaceholder: string;
    parentPhone: string;
    preferredLocation: string;
    preferredProgram: string;
    submitBtn: string;
    successTitle: string;
    successDesc: string;
  };
  footer: {
    desc: string;
    navTitle: string;
    branchesTitle: string;
    contactTitle: string;
    rights: string;
  };
  authModal: {
    titleLogin: string;
    titlePortal: string;
    subTitle: string;
    modeLabel: string;
    tabLogin: string;
    tabPortal: string;
    parentEmail: string;
    password: string;
    rememberMe: string;
    forgotPass: string;
    enterBtn: string;
    connectedWith: string;
    tabSchedule: string;
    tabBilling: string;
    nextTraining: string;
    today: string;
    upcomingMatch: string;
    dueFee: string;
    paidFee: string;
    payMonthlyBtn: string;
    historyTitle: string;
    statusPaid: string;
    closeBtn: string;
  };
  bookingModal: {
    headerTitle: string;
    subTitle: string;
    selectedProgram: string;
    totalAmount: string;
    cardholder: string;
    cardNumber: string;
    expiry: string;
    cvc: string;
    payBtn: string;
    processing: string;
    secureNotice: string;
    successTitle: string;
    successDesc: string;
    finishBtn: string;
  };
}

export const translations: Record<Language, Translations> = {
  ka: {
    navbar: {
      home: 'მთავარი',
      teamsAges: 'ჯგუფები & ასაკები',
      locations: 'ფილიალები',
      schedule: 'განრიგი',
      individual: 'ინდივიდუალური',
      news: 'სიახლეები',
      contact: 'კონტაქტი',
      login: 'შესვლა',
      teamsDropdownTitle: 'ასაკობრივი ჯგუფები (წლიანების მიხედვით)',
      locationsDropdownTitle: 'საწვრთნელი ლოკაციები',
      u14Desc: '12 - 14 წლის მოზარდები · ჩემპიონატი & ტაქტიკა',
      u12Desc: '10 - 12 წლის ბავშვები · ტექნიკა & გუნდური თამაში',
      u10Desc: '8 - 10 წლის ბავშვები · მოტორიკა & სათამაშო უნარები',
      u8Desc: '6 - 8 წელი · პირველი ნაბიჯები ფეხბურთში',
      saburtaloName: 'საბურთალოს კომპლექსი',
      saburtaloAddr: 'უნივერსიტეტის ქ. #6',
      varketiliName: 'ვარკეთილის ცენტრი',
      varketiliAddr: 'ზემო პლატო, მე-2 მ/რ',
      dinamoName: 'დინამოს ბაზა',
      dinamoAddr: 'დიღმის საწვრთნელი ცენტრი',
    },
    hero: {
      badge: 'მიღება 2026/2027 სეზონზე · 6-დან 16 წლამდე',
      titleStart: 'გახდი',
      titleHighlight: '„ტფილისის“',
      titleEnd: 'მომავალი',
      subtitle: 'საფეხბურთო აკადემია ბავშვებისა და მოზარდებისთვის. ევროპული სტანდარტების საწვრთნელი მეთოდოლოგია, უსაფრთხო გარემო და ბავშვის ჰარმონიული განვითარება.',
      registerBtn: 'დარეგისტრირდი',
      learnMoreBtn: 'გაიგე მეტი',
      stat1Title: 'UEFA Youth',
      stat1Desc: 'ლიცენზირებული მწვრთნელები',
      stat2Title: 'საბავშვო ლიგა',
      stat2Desc: 'ოფიციალური ტურნირები',
      stat3Title: 'უსაფრთხოება',
      stat3Desc: 'ექიმის მუდმივი კონტროლი',
      liveBadge: 'მიმდინარეობს ვარჯიშები',
      cardLocation: 'საბურთალოს & ვარკეთილის ფილიალები',
      cardTitle: '2012-2019 წლიანების სავარჯიშო სესიები',
      cardStat1Label: 'აღსაზრდელები',
      cardStat1Val: '250+ ბავშვი',
      cardStat2Label: 'ასაკობრივი ჯგუფი',
      cardStat2Val: '6 ასაკობრივი გუნდი',
    },
    groups: {
      badge: 'ასაკობრივი ჯგუფები & განრიგი',
      title: 'იპოვე შენი გუნდი ასაკის მიხედვით',
      subtitle: 'გაფილტრეთ ლოკაციის (საბურთალო, ვარკეთილი, დინამო) და დაბადების წლის მიხედვით. თითოეულ ჯგუფზე მუშაობენ გამოცდილი საბავშვო მწვრთნელები.',
      filterLocation: 'ლოკაცია:',
      filterAges: 'წლიანები:',
      allLocations: 'ყველა ლოკაცია',
      allAges: 'ყველა ასაკი',
      daysLabel: 'დღეები:',
      hoursLabel: 'საათები:',
      coachLabel: 'მწვრთნელი:',
      feeLabel: 'საფასური',
      perMonth: '/თვეში',
      enrollBtn: 'ჩაწერა',
    },
    individual: {
      badge: 'ინდივიდუალური მომზადება ბავშვებისთვის',
      title: 'ინდივიდუალური ვარჯიშები და პერსონალური მწვრთნელი',
      subtitle: 'ბავშვის ინდივიდუალური ტექნიკის, ბურთის კონტროლის, სისწრაფისა და მეკარის უნარების გაძლიერება UEFA-ს ლიცენზირებულ მწვრთნელებთან.',
      chooseCoach: 'აირჩიეთ მწვრთნელი:',
      checkoutBadge: 'ჯავშნისა და გამოწერის სისტემა',
      checkoutTitle: 'ინდივიდუალური სესიის რეგისტრაცია',
      selectedCoachLabel: 'არჩეული მწვრთნელი:',
      availableTimesLabel: 'ხელმისაწვდომი დრო:',
      durationLabel: 'სესიის ხანგრძლივობა:',
      durationVal: '60 წუთი',
      pitchLabel: 'მოედნის & ინვენტარის საფასური:',
      pitchVal: 'შედის ფასში',
      totalLabel: 'ჯამური საფასური:',
      payConfirmBtn: 'გადახდა & ჯავშნის დადასტურება',
      cardsAccepted: 'Visa • Mastercard • Apple Pay • Google Pay',
    },
    locations: {
      badge: 'საწვრთნელი ინფრასტრუქტურა',
      title: 'აკადემიის ფილიალები & მოედნები',
      subtitle: 'ვარჯიშები ტარდება თბილისის საუკეთესო ლოკაციებზე — თანამედროვე განათებით, გასახდელებითა და უმაღლესი სტანდარტის საფარით.',
      changingRooms: 'ინდივიდუალური გასახდელები & საშხაპეები',
      ledLighting: 'პროფესიონალური LED განათება',
      viewMap: 'რუკაზე ნახვა',
    },
    news: {
      badge: 'სიახლეების ველი & მატჩების Feed-ი',
      title: 'აკადემიის სიახლეები & მატჩები',
      subtitle: 'უახლესი ინფორმაცია ტურნირების, ამხანაგური მატჩების, ახალი ჯგუფებისა და კლუბის აქტივობების შესახებ.',
      readMore: 'სრულად წაკითხვა',
    },
    contact: {
      badge: 'მიღება & რეგისტრაცია',
      title: 'ჩაწერეთ ბავშვი აკადემიაში',
      subtitle: 'შეავსეთ მოკლე სააპლიკაციო ფორმა. ჩვენი მენეჯერი დაგიკავშირდებათ 24 საათში პირველი საცდელი ვარჯიშის დროისა და ეკიპირების დეტალების შესათანხმებლად.',
      hotline: 'მშობელთა ცხელი ხაზი / WhatsApp',
      email: 'ელექტრონული ფოსტა',
      office: 'მთავარი ოფისი & ბაზა',
      formTitle: 'აღსაზრდელის სარეგისტრაციო ანკეტა',
      childName: 'ბავშვის სახელი და გვარი *',
      childNamePlaceholder: 'მაგ: ნიკოლოზ ბერიძე',
      birthYear: 'დაბადების წელი *',
      parentName: 'მშობლის სახელი და გვარი *',
      parentNamePlaceholder: 'მაგ: დავით ბერიძე',
      parentPhone: 'მშობლის ტელეფონი *',
      preferredLocation: 'სასურველი ფილიალი',
      preferredProgram: 'ასაკობრივი პროგრამა',
      submitBtn: 'ანკეტის გაგზავნა',
      successTitle: 'ანკეტა წარმატებით გაიგზავნა!',
      successDesc: 'ჩვენი ადმინისტრატორი უმოკლეს დროში დაუკავშირდება მშობელს მითითებულ ნომერზე.',
    },
    footer: {
      desc: 'საფეხბურთო აკადემია ბავშვებისა და მოზარდებისთვის. პროფესიონალური საწვრთნელი პროცესი, ტურნირები და ინდივიდუალური განვითარება.',
      navTitle: 'ნავიგაცია',
      branchesTitle: 'ფილიალები',
      contactTitle: 'კონტაქტი',
      rights: '© 2026 ტფილისის საფეხბურთო აკადემია. ყველა უფლება დაცულია.',
    },
    authModal: {
      titleLogin: 'პირად კაბინეტში შესვლა',
      titlePortal: 'მშობლისა & მოთამაშის პირადი კაბინეტი',
      subTitle: 'ტფილისის საფეხბურთო აკადემია',
      modeLabel: 'რეჟიმი:',
      tabLogin: 'ავტორიზაცია',
      tabPortal: 'კაბინეტის დემო (Parent Portal)',
      parentEmail: 'მშობლის ელ-ფოსტა',
      password: 'პაროლი',
      rememberMe: 'დამიმახსოვრე',
      forgotPass: 'დაგავიწყდა პაროლი?',
      enterBtn: 'შესვლა კაბინეტში',
      connectedWith: 'დაკავშირებულია Supabase Auth-თან',
      tabSchedule: 'განრიგი & თამაშები',
      tabBilling: 'საფასური & ბილინგი',
      nextTraining: 'უახლოესი ვარჯიში',
      today: 'დღეს',
      upcomingMatch: 'დაგეგმილი საბავშვო მატჩი',
      dueFee: 'გადასახდელია: ₾150.00',
      paidFee: 'გადახდილია',
      payMonthlyBtn: 'გადახდა (Visa / Mastercard / Apple Pay)',
      historyTitle: 'გადახდების ისტორია:',
      statusPaid: 'გადახდილია',
      closeBtn: 'დახურვა',
    },
    bookingModal: {
      headerTitle: 'ონლაინ რეგისტრაცია & გადახდა',
      subTitle: 'ტფილისის საფეხბურთო აკადემია',
      selectedProgram: 'არჩეული ასაკობრივი პროგრამა',
      totalAmount: 'გადასახდელი თანხა:',
      cardholder: 'ბარათის მფლობელი (მშობელი)',
      cardNumber: 'ბარათის ნომერი',
      expiry: 'ვადა',
      cvc: 'CVC',
      payBtn: 'გადახდა',
      processing: 'მუშავდება...',
      secureNotice: 'დაცული გადახდა SSL 256-bit დაშიფვრით · Visa, Mastercard, Apple Pay',
      successTitle: 'რეგისტრაცია & გადახდა წარმატებულია!',
      successDesc: 'თქვენი ბავშვი ოფიციალურად ჩაირიცხა აკადემიაში. დეტალური ინფორმაცია და ჩეკი გაგზავნილია მშობლის ნომერზე.',
      finishBtn: 'დასრულება',
    },
  },
  en: {
    navbar: {
      home: 'Home',
      teamsAges: 'Squads & Ages',
      locations: 'Branches',
      schedule: 'Schedule',
      individual: 'Individual',
      news: 'News',
      contact: 'Contact',
      login: 'Log In',
      teamsDropdownTitle: 'Age Squads (By Birth Year)',
      locationsDropdownTitle: 'Training Grounds',
      u14Desc: '12 - 14 Years Old · League Tournaments & Tactics',
      u12Desc: '10 - 12 Years Old · Technique & Team Play',
      u10Desc: '8 - 10 Years Old · Motor Skills & Fundamentals',
      u8Desc: '6 - 8 Years Old · First Steps in Football',
      saburtaloName: 'Saburtalo Complex',
      saburtaloAddr: '6 University St, Tbilisi',
      varketiliName: 'Varketili Centre',
      varketiliAddr: 'Upper Plateau, 2nd M/D',
      dinamoName: 'Dinamo Training Base',
      dinamoAddr: 'Dighomi Training Centre',
    },
    hero: {
      badge: 'Season 2026/2027 Admissions · Ages 6 to 16',
      titleStart: 'Become the',
      titleHighlight: '"Tfilisi"',
      titleEnd: 'Future',
      subtitle: 'Football academy for children and youth. European coaching methodology, safe environment, and harmonious athletic development.',
      registerBtn: 'Enroll Now',
      learnMoreBtn: 'Explore More',
      stat1Title: 'UEFA Youth',
      stat1Desc: 'Licensed Coaching Staff',
      stat2Title: 'Youth League',
      stat2Desc: 'Official Tournaments',
      stat3Title: 'Safety First',
      stat3Desc: 'Certified Medical Staff',
      liveBadge: 'Training in Progress',
      cardLocation: 'Saburtalo & Varketili Grounds',
      cardTitle: '2012–2019 Youth Training Sessions',
      cardStat1Label: 'Enrolled Players',
      cardStat1Val: '250+ Kids',
      cardStat2Label: 'Squads',
      cardStat2Val: '6 Age Groups',
    },
    groups: {
      badge: 'Age Groups & Weekly Schedule',
      title: 'Find Your Squad by Age',
      subtitle: 'Filter by training location (Saburtalo, Varketili, Dinamo) and birth year. Every group is coached by licensed youth specialists.',
      filterLocation: 'Location:',
      filterAges: 'Birth Years:',
      allLocations: 'All Grounds',
      allAges: 'All Ages',
      daysLabel: 'Days:',
      hoursLabel: 'Hours:',
      coachLabel: 'Head Coach:',
      feeLabel: 'Fee',
      perMonth: '/month',
      enrollBtn: 'Enroll',
    },
    individual: {
      badge: 'Individual Youth Coaching',
      title: 'Personal Training & 1-on-1 Coaching',
      subtitle: 'Accelerate your child’s ball mastery, speed, agility, and goalkeeping technique with certified UEFA specialists.',
      chooseCoach: 'Choose a Coach:',
      checkoutBadge: 'Booking & Subscription System',
      checkoutTitle: 'Book an Individual Session',
      selectedCoachLabel: 'Selected Coach:',
      availableTimesLabel: 'Available Time Slots:',
      durationLabel: 'Session Duration:',
      durationVal: '60 Minutes',
      pitchLabel: 'Pitch & Equipment Fee:',
      pitchVal: 'Included in Price',
      totalLabel: 'Total Fee:',
      payConfirmBtn: 'Confirm & Pay Securely',
      cardsAccepted: 'Visa • Mastercard • Apple Pay • Google Pay',
    },
    locations: {
      badge: 'Training Infrastructure',
      title: 'Academy Branches & Pitches',
      subtitle: 'Sessions are hosted across top locations in Tbilisi featuring floodlit pitches, modern dressing rooms, and premium synthetic turf.',
      changingRooms: 'Dedicated Changing Rooms & Showers',
      ledLighting: 'Professional LED Floodlights',
      viewMap: 'View on Google Maps',
    },
    news: {
      badge: 'Newsfeed & Match Highlights',
      title: 'Academy News & Match Reports',
      subtitle: 'Latest updates on tournaments, friendly matches, branch openings, and youth development achievements.',
      readMore: 'Read Full Story',
    },
    contact: {
      badge: 'Admissions & Enrollment',
      title: 'Enroll Your Child Today',
      subtitle: 'Fill out this brief application form. Our academy director will contact you within 24 hours to schedule a trial session.',
      hotline: 'Parents Hotline / WhatsApp',
      email: 'Email Address',
      office: 'Headquarters & Base',
      formTitle: 'Player Registration Form',
      childName: "Child's Full Name *",
      childNamePlaceholder: 'e.g. Nicholas Beridze',
      birthYear: 'Birth Year *',
      parentName: "Parent's Full Name *",
      parentNamePlaceholder: 'e.g. David Beridze',
      parentPhone: "Parent's Phone *",
      preferredLocation: 'Preferred Branch',
      preferredProgram: 'Age Category Program',
      submitBtn: 'Submit Application',
      successTitle: 'Application Submitted Successfully!',
      successDesc: 'Our admissions office will reach out to you shortly via phone.',
    },
    footer: {
      desc: 'Football academy for children and youth. Modern training methodology, youth leagues, and individual player development.',
      navTitle: 'Navigation',
      branchesTitle: 'Branches',
      contactTitle: 'Contact',
      rights: '© 2026 Tfilisi Football Academy. All rights reserved.',
    },
    authModal: {
      titleLogin: 'Sign in to Portal',
      titlePortal: 'Parent & Player Portal Demo',
      subTitle: 'Tfilisi Football Academy',
      modeLabel: 'Mode:',
      tabLogin: 'Sign In',
      tabPortal: 'Portal Demo (Parent Portal)',
      parentEmail: 'Parent Email',
      password: 'Password',
      rememberMe: 'Remember Me',
      forgotPass: 'Forgot password?',
      enterBtn: 'Sign In',
      connectedWith: 'Powered by Supabase Auth',
      tabSchedule: 'Schedule & Matches',
      tabBilling: 'Fees & Invoicing',
      nextTraining: 'Next Training Session',
      today: 'Today',
      upcomingMatch: 'Upcoming Youth League Match',
      dueFee: 'Due Amount: ₾150.00',
      paidFee: 'Paid',
      payMonthlyBtn: 'Pay Membership (Visa / Mastercard / Apple Pay)',
      historyTitle: 'Payment History:',
      statusPaid: 'Paid',
      closeBtn: 'Close',
    },
    bookingModal: {
      headerTitle: 'Online Registration & Checkout',
      subTitle: 'Tfilisi Football Academy',
      selectedProgram: 'Selected Youth Program',
      totalAmount: 'Total Due Amount:',
      cardholder: 'Cardholder Name (Parent)',
      cardNumber: 'Card Number',
      expiry: 'MM/YY',
      cvc: 'CVC',
      payBtn: 'Pay',
      processing: 'Processing...',
      secureNotice: 'Secure 256-bit SSL encrypted checkout · Visa, Mastercard, Apple Pay',
      successTitle: 'Enrollment & Payment Successful!',
      successDesc: 'Your child has been enrolled in the squad. Confirmation and receipt have been dispatched to the parent phone.',
      finishBtn: 'Complete',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('ka');

  useEffect(() => {
    document.documentElement.lang = 'ka';
    try {
      localStorage.removeItem('tfa_lang');
    } catch {
      // ignore
    }
  }, []);

  const handleSetLanguage = (_lang: Language) => {
    setLanguage('ka');
    document.documentElement.lang = 'ka';
  };

  return (
    <LanguageContext.Provider
      value={{
        language: 'ka',
        setLanguage: handleSetLanguage,
        t: translations['ka'],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
