import type { Activity, EventConfig, FAQItem, ScheduleItem, EmotionPost } from '../types';

export const INITIAL_CONFIG: EventConfig = {
  festName: "MINDSPACE 2026",
  tagline: "Your Mind Matters. Your Story Matters.",
  expectedDates: "First week of November 2026",
  venuePlaceholder: "Campus Amphitheatre & Student Activity Center (To be announced)",
  collegePlaceholder: "College / University Campus (To be confirmed by organizers)",
  organizerPlaceholder: "College Mental Health Fest Committee",
  officialEmailPlaceholder: "mentalhealthfest@college.edu.placeholder",
  instagramPlaceholder: "@mindspace2026.fest",
  registrationStatus: "open",
  entryInfo: "Free for verified college students (Check with event organizers)",
  googleSheetsWebhookUrl: "",
  adminPasscodeHash: "mindspace2026"
};

export const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: "act-1",
    title: "OPEN MIC — VOICES UNFILTERED",
    shortDescription: "Share poetry, stories, music, or personal reflections in a supportive environment.",
    fullDescription: "A gentle, welcoming open stage where students can express spoken word, acoustic music, personal narratives, or reflections on resilience, vulnerability, and friendship. The space is guided by supportive peer moderators with zero judgment.",
    category: "Expression",
    duration: "60 minutes",
    capacity: 40,
    registeredCount: 14,
    isProposed: true,
    isOpen: true,
    timeSlot: "04:30 PM – 05:30 PM",
    venue: "Main Amphitheatre Stage",
    highlights: ["Spoken word poetry", "Acoustic songs & melodies", "Warm, encouraging audience"],
    whatToBring: "Your voice, notebook, or acoustic instrument (optional)."
  },
  {
    id: "act-2",
    title: "ART THERAPY-INSPIRED CREATIVE CORNER",
    shortDescription: "Explore emotions through colors, drawing, and creative expression.",
    fullDescription: "An open, pressure-free creative lounge stocked with pastels, watercolors, clay, and collage materials. Led by student arts coordinators, this workshop focuses on the process of unwinding and sensory expression rather than producing a polished masterpiece.",
    category: "Creativity",
    duration: "45 minutes",
    capacity: 35,
    registeredCount: 22,
    isProposed: true,
    isOpen: true,
    timeSlot: "11:30 AM – 12:15 PM",
    venue: "Design Studio & Garden Lawn",
    highlights: ["Fluid acrylics & pastels", "Emotion collage making", "Relaxing ambient lo-fi music"],
    whatToBring: "Comfortable clothes that can handle a splash of paint."
  },
  {
    id: "act-3",
    title: "MINDFULNESS & MEDITATION",
    shortDescription: "Experience a guided mindfulness session focused on breathing and present-moment awareness.",
    fullDescription: "Step away from deadlines, continuous screen time, and mental chatter. This tranquil 30-minute guided relaxation introduces grounding techniques, somatic body scans, and intentional breathing patterns you can apply right before stressful exams.",
    category: "Wellness",
    duration: "30 minutes",
    capacity: 50,
    registeredCount: 31,
    isProposed: true,
    isOpen: true,
    timeSlot: "10:30 AM – 11:00 AM",
    venue: "Quiet Hall / Yoga Pavillion",
    highlights: ["Guided breathwork (4-7-8)", "Progressive muscle relaxation", "Take-home pocket breath guide"],
    whatToBring: "Comfortable footwear; mats are provided on-site."
  },
  {
    id: "act-4",
    title: "MENTAL HEALTH MYTHS VS FACTS",
    shortDescription: "Participate in an interactive awareness quiz that challenges common misconceptions about mental health.",
    fullDescription: "An energetic, myth-busting interactive session and live trivia quiz that unpacks widespread cultural stigmas surrounding therapy, student burnout, anxiety, and neurodiversity. Learn actionable empathy skills and vocabulary to talk to friends without clichés.",
    category: "Awareness",
    duration: "30 minutes",
    capacity: 60,
    registeredCount: 19,
    isProposed: true,
    isOpen: true,
    timeSlot: "01:45 PM – 02:15 PM",
    venue: "Seminar Hall B",
    highlights: ["Live smartphone buzzers", "Fact-checked psychology facts", "Peer Q&A discussion"],
    whatToBring: "Any smartphone or tablet with browser access."
  },
  {
    id: "act-5",
    title: "EMOTION WALL",
    shortDescription: "Express your feelings through anonymous, optional messages in a respectful, moderated space.",
    fullDescription: "A collective visual installation where students can write anonymous reflections, what is weighing on their minds, or gratitude notes on colored paper tags. It stands as a powerful reminder that whatever you are carrying, you are never the only one.",
    category: "Expression",
    duration: "Open throughout the event",
    capacity: 200,
    registeredCount: 68,
    isProposed: true,
    isOpen: true,
    timeSlot: "All Day (10:00 AM – 06:00 PM)",
    venue: "Central Courtyard Installation",
    highlights: ["Interactive physical & digital board", "100% anonymous & voluntary", "Moderated peer safety guidelines"],
    whatToBring: "Just your thoughts and honesty."
  },
  {
    id: "act-6",
    title: "KINDNESS NOTES",
    shortDescription: "Write encouraging messages that help create a supportive college environment.",
    fullDescription: "Take twenty minutes to write a customized letter of encouragement, appreciation, or gentle reminder to a peer, a teacher, a campus worker, or a random student who may need a lift. Delivered via the Fest Postbox throughout the day.",
    category: "Connection",
    duration: "20 minutes",
    capacity: 50,
    registeredCount: 28,
    isProposed: true,
    isOpen: true,
    timeSlot: "02:30 PM – 02:50 PM",
    venue: "Student Plaza Booth 4",
    highlights: ["Handmade stationery & wax seals", "Secret peer post delivery", "Spreads real campus warmth"],
    whatToBring: "All stationery, stickers, and cards are provided."
  },
  {
    id: "act-7",
    title: "STRESS MANAGEMENT WORKSHOP",
    shortDescription: "Learn practical approaches to managing academic pressure, organizing tasks, and taking restorative breaks.",
    fullDescription: "Academic workload can feel paralyzing. This practical workshop breaks down cognitive reframing, time-blocking methods, dealing with perfectionism, boundary-setting with group projects, and recognizing early warning signs of chronic exhaustion.",
    category: "Learning",
    duration: "45 minutes",
    capacity: 45,
    registeredCount: 39,
    isProposed: true,
    isOpen: true,
    timeSlot: "03:15 PM – 04:00 PM",
    venue: "Auditorium Room 102",
    highlights: ["Anti-procrastination toolkit", "Boundary-setting scripts", "Printed wellness journal planner"],
    whatToBring: "A pen and your current week's schedule."
  },
  {
    id: "act-8",
    title: "HUMAN LIBRARY — LISTEN WITHOUT JUDGMENT",
    shortDescription: "Participate in respectful, facilitated conversations where volunteers share experiences and participants practice active listening.",
    fullDescription: "Inspired by the international Human Library organization. Instead of borrowing books, participants sit with volunteer 'books'—fellow students and mentors who share authentic 10-minute lived experiences about overcoming loneliness, academic setbacks, and finding belonging.",
    category: "Connection",
    duration: "45 minutes",
    capacity: 30,
    registeredCount: 24,
    isProposed: true,
    isOpen: true,
    timeSlot: "12:30 PM – 01:15 PM",
    venue: "Library Reading Garden",
    highlights: ["1-on-1 and micro-circles", "Deep human empathy", "Facilitated by trained peer volunteers"],
    whatToBring: "An open mind and respectful presence."
  },
  {
    id: "act-9",
    title: "WELLNESS TREASURE HUNT",
    shortDescription: "Solve clues related to emotional well-being, self-care, and mental health awareness.",
    fullDescription: "Team up in pairs or groups of three to solve campus-wide riddles that lead to mindful checkpoints—such as finding the campus quiet nook, decoding self-compassion mantras, and uncovering wellness resources hidden in plain sight.",
    category: "Games",
    duration: "30 minutes",
    capacity: 40,
    registeredCount: 27,
    isProposed: true,
    isOpen: true,
    timeSlot: "01:00 PM – 01:30 PM",
    venue: "Begins at Campus Fountain",
    highlights: ["Fun clues & riddles", "Mindful mini-challenges", "Eco-friendly festival gift bag for finishers"],
    whatToBring: "Comfortable walking shoes and one smartphone per team."
  },
  {
    id: "act-10",
    title: "SELF-CARE STATION",
    shortDescription: "Explore simple self-care activities, reflection cards, journaling prompts, and wellness resources.",
    fullDescription: "A self-paced, cozy decompression zone featuring herbal tea tastings, sensory stress-relief items, guided self-reflection card decks, and student resource toolkits that you can pick up anytime during the day at your own pace.",
    category: "Wellness",
    duration: "Open throughout the event",
    capacity: 150,
    registeredCount: 52,
    isProposed: true,
    isOpen: true,
    timeSlot: "All Day (10:00 AM – 06:00 PM)",
    venue: "Student Lounge East Wing",
    highlights: ["Warm herbal infusions", "Prompted reflection journals", "Sensory tactile objects & quiet lounge"],
    whatToBring: "Drop by whenever you need a calm moment."
  }
];

export const INITIAL_SCHEDULE: ScheduleItem[] = [
  {
    id: "sch-1",
    time: "09:30 AM – 10:15 AM",
    title: "Festival Opening & Welcome Circle",
    category: "Opening",
    description: "Opening keynote by student organizers, an overview of the fest, and a short collective grounding pause.",
    location: "Main Amphitheatre",
    speakerOrHost: "Student Organizing Committee & Guest Speaker [Placeholder]"
  },
  {
    id: "sch-2",
    time: "10:30 AM – 11:00 AM",
    title: "Mindfulness & Breathwork Session",
    category: "Wellness",
    description: "Group meditation with calming breath patterns for everyday campus stress and mental clarity.",
    location: "Quiet Hall / Yoga Pavillion",
    speakerOrHost: "Peer Wellness Facilitators"
  },
  {
    id: "sch-3",
    time: "11:30 AM – 12:15 PM",
    title: "Art Therapy-Inspired Creative Corner",
    category: "Creativity",
    description: "Hands-on expressive art workshop using colors, textures, and clay to express what words cannot.",
    location: "Design Studio & Garden Lawn",
    speakerOrHost: "Student Arts Collective"
  },
  {
    id: "sch-4",
    time: "12:30 PM – 01:15 PM",
    title: "Human Library — Listen Without Judgment",
    category: "Connection",
    description: "Facilitated micro-conversations with volunteer 'books' sharing lived stories of navigating college life.",
    location: "Library Reading Garden",
    speakerOrHost: "Human Library Student Volunteers"
  },
  {
    id: "sch-5",
    time: "01:00 PM – 01:30 PM",
    title: "Wellness Treasure Hunt (Campus Run)",
    category: "Games",
    description: "A playful, active clue-solving journey across campus discovering mental health facts and wellness resources.",
    location: "Campus Fountain (Start Point)",
    speakerOrHost: "Events Team"
  },
  {
    id: "sch-6",
    time: "01:45 PM – 02:15 PM",
    title: "Mental Health Myths vs Facts Awareness Session",
    category: "Awareness",
    description: "Interactive myth-busting game challenging common misconceptions about therapy, burnout, and mental wellness.",
    location: "Seminar Hall B",
    speakerOrHost: "Psychology Department Student Ambassadors"
  },
  {
    id: "sch-7",
    time: "02:30 PM – 02:50 PM",
    title: "Kindness Notes Collective Writing",
    category: "Connection",
    description: "Write and dispatch heartfelt letters of validation and hope across campus mail drops.",
    location: "Student Plaza Booth 4",
    speakerOrHost: "Peer Support Circle"
  },
  {
    id: "sch-8",
    time: "03:15 PM – 04:00 PM",
    title: "Stress Management & Burnout Prevention Workshop",
    category: "Learning",
    description: "Practical strategies for balancing grades, relationships, screen-time, and restorative rest.",
    location: "Auditorium Room 102",
    speakerOrHost: "Campus Wellness Advisory [Placeholder]"
  },
  {
    id: "sch-9",
    time: "04:30 PM – 05:45 PM",
    title: "Open Mic: Voices Unfiltered & Community Reflection",
    category: "Expression",
    description: "An inspiring closing evening of spoken poetry, acoustic tunes, shared moments, and festival reflections.",
    location: "Main Amphitheatre Stage",
    speakerOrHost: "Student Hosts & Registered Performers"
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Who can attend the fest?",
    answer: "MINDSPACE 2026 is welcoming and open to all enrolled college students, freshers, postgraduate scholars, faculty, and campus staff. [Organizer Note: Specific inter-collegiate entry criteria will be finalized by the College Fest Committee].",
    category: "Eligibility",
    isPlaceholderConfirmed: false
  },
  {
    id: "faq-2",
    question: "How do I register?",
    answer: "Registration is simple! Click on 'Register Now' or browse any activity card in the Activity Explorer. Fill in your name, college email, department, and pick your desired activity. You will receive an instant digital registration pass with your unique Registration ID.",
    category: "Registration",
    isPlaceholderConfirmed: true
  },
  {
    id: "faq-3",
    question: "Can I participate in multiple activities?",
    answer: "Yes! You can choose more than one activity when registering, provided the time slots do not overlap. We encourage choosing a balance—such as an active workshop and a reflective drop-in station like the Emotion Wall or Self-Care Station.",
    category: "Activities",
    isPlaceholderConfirmed: true
  },
  {
    id: "faq-4",
    question: "Is registration free?",
    answer: "Yes, all proposed student activities, art materials, and workshops are free of charge for students. [Organizer Note: Any special kit fees or optional merchandise, if introduced, will be clearly notified by the organizing team beforehand].",
    category: "Fees",
    isPlaceholderConfirmed: false
  },
  {
    id: "faq-5",
    question: "Where will the event take place?",
    answer: "Activities are planned across the campus, including the Main Amphitheatre, Design Studio, and Library Gardens. [Organizer Note: The exact campus venue map and room allocations will be announced closer to the first week of November 2026].",
    category: "Venue",
    isPlaceholderConfirmed: false
  },
  {
    id: "faq-6",
    question: "Can I cancel or modify my registration?",
    answer: "Yes. If your plans change, you can contact the student desk or email the committee so we can release your workshop slot to someone on the waiting list. You can also view your pass anytime using your Registration ID.",
    category: "Policies",
    isPlaceholderConfirmed: true
  },
  {
    id: "faq-7",
    question: "Who should I contact for assistance?",
    answer: "You can reach out to the College Mental Health Fest Committee at the official contact desk: [Organizer Email: mentalhealthfest@college.edu.placeholder]. For student emergencies, please refer to the emergency helplines listed in the Mental Health Awareness Corner.",
    category: "Contact",
    isPlaceholderConfirmed: false
  }
];

export const INITIAL_EMOTION_POSTS: EmotionPost[] = [
  {
    id: "post-1",
    text: "Taking a deep breath today. Midterms were heavy, but I am proud of myself for showing up every morning.",
    emotion: "Grateful",
    authorTag: "Sophomore • Engineering",
    timestamp: "10 mins ago",
    likes: 24,
    color: "sage"
  },
  {
    id: "post-2",
    text: "Remember that your grades are just a snapshot of a moment; they don't define your worth as a human.",
    emotion: "Encouraging",
    authorTag: "Senior • Psychology",
    timestamp: "25 mins ago",
    likes: 41,
    color: "lavender"
  },
  {
    id: "post-3",
    text: "Feeling anxious about the future, but sitting in the grass with a warm cup of chai gave me quiet peace.",
    emotion: "Reflective",
    authorTag: "Fresher • Architecture",
    timestamp: "1 hour ago",
    likes: 18,
    color: "peach"
  },
  {
    id: "post-4",
    text: "Shoutout to my roommate who left a sticky note on my desk saying 'You've got this'. Little things save lives.",
    emotion: "Warmth",
    authorTag: "Junior • Literature",
    timestamp: "2 hours ago",
    likes: 35,
    color: "cream"
  }
];

export const HELPLINE_DIRECTORY = [
  {
    name: "Tele-MANAS (National Mental Health Helpline)",
    phone: "14416 / 1800-891-4416",
    timing: "24/7 • Toll-Free • Multi-lingual",
    description: "Official comprehensive, toll-free 24/7 mental health counseling service by the Ministry of Health."
  },
  {
    name: "Vandrevala Foundation Helpline",
    phone: "+91 9999 666 555",
    timing: "24/7 • Free • Confidential",
    description: "Experienced mental health counselors for emotional distress, panic, grief, and crisis intervention."
  },
  {
    name: "iCall Psychosocial Helpline (TISS)",
    phone: "+91 9152 987 821",
    timing: "Mon to Sat, 10:00 AM – 8:00 PM",
    description: "Free telephone and email-based counseling run by the Tata Institute of Social Sciences."
  },
  {
    name: "KIRAN National Helpline",
    phone: "1800-599-0019",
    timing: "24/7 • Toll-Free",
    description: "Operated by the Department of Empowerment of Persons with Disabilities for mental health rehabilitation."
  },
  {
    name: "College Counseling Center [Placeholder]",
    phone: "[Campus Ext: 2400 / counselor@college.edu.placeholder]",
    timing: "Mon to Fri, 9:00 AM – 5:00 PM",
    description: "Dedicated on-campus student counseling unit. Walk-in appointments and confidential consultations available."
  }
];
