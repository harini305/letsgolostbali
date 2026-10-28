// Single source for contact details, navigation and every outbound link.
// Values come from docs/source-audit (verified 2026-10-28). Do not add values that are not in the audit.

export const site = {
  name: "Let's Get Lost Bali",
  shortName: "Let's Get Lost",
  url: 'https://www.letsgetlostbali.com',
  description:
    "Breathwork, yoga, Reiki and men's circles in Ubud, Bali. Teacher trainings and courses led by Anthony Ball and Alicia Casillas, in person and online.",
};

export const contact = {
  emailInfo: 'info@letsgetlostbali.com',
  emailManager: 'manager@letsgetlostbali.com',
  phoneDisplay: '+62 821 4561 2219',
  phoneHref: 'tel:+6282145612219',
  whatsappHref: 'https://wa.me/6282145612219',
  // Postcode omitted: the site shows 80561, the structured data 80571 (audit A18).
  addressLines: ['Petulu, Kecamatan Ubud', 'Kabupaten Gianyar, Bali'],
  locationNote: 'A ten-minute drive north of Ubud',
  mapHref: 'https://www.google.com/maps/search/?api=1&query=-8.4863,115.2683',
};

export const social = [
  { label: 'Instagram', href: 'https://www.instagram.com/letsgetlostbali/' },
  { label: 'Facebook', href: 'https://www.facebook.com/letsgetlostubud' },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UCF9f5qfSDQzgS75zE7zsSdw' },
  // X/Twitter (twitter.com/letsgetlostubud) left out until the business confirms it is still active.
];

const mail = (to, subject, body, cc) => {
  const params = [`subject=${encodeURIComponent(subject)}`, `body=${encodeURIComponent(body)}`];
  if (cc) params.push(`cc=${encodeURIComponent(cc)}`);
  return `mailto:${to}?${params.join('&')}`;
};

export const links = {
  // Acuity (letsgetlostbali.as.me): each link resolved to the scheduler on 2026-10-28.
  discoveryBreathwork: 'https://letsgetlostbali.as.me/discovery-call',
  discoveryYin: 'https://letsgetlostbali.as.me/discovery-call-yin-yoga',
  discoveryReiki: 'https://letsgetlostbali.as.me/reiki-course-discovery-call',
  discoveryMentorship: 'https://letsgetlostbali.as.me/Mentorship-Training-application',
  reikiRegister: 'https://letsgetlostbali.as.me/reiki-courses-bali',
  reikiPackage: 'https://letsgetlostbali.as.me/reiki-package-deal',
  onlineSession: 'https://letsgetlostbali.as.me/online-class',

  // Sevaluz: the online course platform named on the original page.
  onlineEnrol: 'https://sevaluz.co/breathwork',
  onlineSyllabus: '/docs/100-hour-breathwork-instructor-training-syllabus.pdf',

  // Alicia's online Reiki courses.
  reikiOnline1: 'https://yogaliciacasillas.com/courses/reiki-level-1-online-training/',
  reikiOnline2: 'https://yogaliciacasillas.com/courses/reiki-level-2-online-training/',
  reikiOnlineMaster: 'https://yogaliciacasillas.com/courses/reiki-master-teacher-online-training/',

  solis: 'https://www.solisbrotherhood.com/',
  podcast: 'https://open.spotify.com/show/78ZQ3kWphM2aakuyHYf4D7',
  youtubeBreathwork: 'https://www.youtube.com/@Anthonybreathes',
  youtubeMensWork: 'https://www.youtube.com/@workingonitpod',

  // mailto links reproduce the original prefilled messages. The private Reiki link no longer
  // BCCs a personal address (audit B10).
  privateBreathwork: mail(
    'info@letsgetlostbali.com',
    'Private Breathwork Course',
    'Hi, I would like to find out more about a private breathwork course',
  ),
  privateReiki: mail(
    'info@letsgetlostbali.com',
    'Private Reiki Course',
    "Hi, I would like to arrange a private Reiki course at Let's Get Lost Ubud. ",
    'manager@letsgetlostbali.com',
  ),
  circleInPerson: mail(
    'info@letsgetlostbali.com',
    "Men's Circle",
    "I would like to find out more information regarding men's circle at Let's Get Lost Ubud.\n\nThank you.",
  ),
  circleOnline: mail(
    'info@letsgetlostbali.com',
    "Online Men's Group",
    "Hi, I would like to find out more details about the online men's group.\n\nRegards",
  ),
  general: mail('info@letsgetlostbali.com', 'Enquiry', ''),
};

// Checkout links found on the original site. They are NOT rendered until the business confirms
// the price, dates and merchant account behind each one (audit A1, A2, A5, A6, A8, A14).
export const pendingCheckouts = {
  breathworkFull: { href: 'https://buy.stripe.com/6oU6oGaud6gTdLFaerafS0i', confirmed: false },
  breathworkPlan: { href: 'https://buy.stripe.com/cNiaEWbyh9t58rlcmzafS0k', confirmed: false },
  breathworkAcuity: { href: 'https://letsgetlostbali.as.me/100hr-breathwork-teacher-trianing', confirmed: false },
  yinStripe: { href: 'https://buy.stripe.com/28E4gz1Bzf2bgWS0jM4ZG01', confirmed: false },
  mentorshipPackage: { href: 'https://letsgetlostbali.as.me/?appointmentType=83716691', confirmed: false },
};

export const nav = [
  {
    label: 'Breathwork',
    href: '/breathwork',
    children: [
      { label: 'Instructor training in Ubud', href: '/breathwork#in-person' },
      { label: 'Online instructor training', href: '/breathwork#online' },
      { label: 'Mentorship', href: '/breathwork#mentorship' },
    ],
  },
  { label: 'Yin Yoga', href: '/yoga' },
  {
    label: 'Reiki & Circles',
    href: '/reiki-and-circles',
    children: [
      { label: 'Reiki courses in Ubud', href: '/reiki-and-circles#reiki' },
      { label: 'Online Reiki', href: '/reiki-and-circles#online-reiki' },
      { label: "Men's circles", href: '/reiki-and-circles#mens-circles' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

// YouTube videos from the brand's own channel, confirmed public via oEmbed on 2026-10-28.
export const videos = {
  testimonialTraining: { id: '37rFihLhnZU', title: 'Breathwork Teacher Training Testimonial' },
  testimonialOnline: {
    id: '6HchRfzzFhs',
    title: '“I Can’t Recommend This Enough” – Drew’s Experience with the Online Breathwork Training',
  },
  testimonial100hr: { id: 'GkMuJnrQP18', title: 'Testimonial 100hr Breathwork Teacher Training' },
  trainingFilm: { id: 'FeUjE1hZGXY', title: 'Breathwork Instructor Training' },
};
