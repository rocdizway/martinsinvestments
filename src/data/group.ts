export type Sector = {
  slug: string;
  name: string;
  summary: string;
  detail: string;
  status: "Active" | "Growth" | "Emerging" | "Exploratory";
};

export type Business = {
  slug: string;
  name: string;
  sector: string; // sector slug
  tagline: string;
  description: string;
  stage: "Operating" | "Scaling" | "In development" | "Pipeline";
  founded?: string;
  website?: string;
  highlights: string[];
};

export type Holding = {
  slug: string;
  name: string;
  category: string;
  positioning: string;
  description: string;
  image: string;
  status: "Operating" | "In development";
  website?: string;
};

export const holdings: Holding[] = [
  {
    slug: "rocdizway",
    name: "RocDizWay",
    category: "Fashion & Lifestyle",
    positioning: "Fashion with history, selected for now.",
    description:
      "RocDizWay finds the pieces that still matter: authentic Y2K labels, heritage streetwear and unmistakable design chosen for people who dress with intent.",
    image: "/sister-companies/roc-diz-way.png",
    status: "Operating",
    website: "https://rocdizway.com/",
  },
  {
    slug: "roc-parties",
    name: "Roc Parties",
    category: "Events & Experiences",
    positioning: "More than an invitation. A way into the moment.",
    description:
      "Roc Parties brings together access, entertainment and considered service to create occasions that feel personal long after the night is over.",
    image: "/sister-companies/roc-parties.png",
    status: "In development",
  },
  {
    slug: "roc-away",
    name: "Roc Away",
    category: "Food & Hospitality",
    positioning: "Good food. Warm energy. Reasons to stay.",
    description:
      "Roc Away is a restaurant and lounge concept where flavour, music and atmosphere meet—made for easy afternoons, late evenings and everything between.",
    image: "/sister-companies/roc-away.png",
    status: "In development",
  },
];

export const groupIntro =
  "Martins Investments is all about working with you to lift your capabilities and turn dreams to reality. Whether you are looking for business support or help to make your quality personal time richer and more relaxing, contact us and let us help you today.";

export const groupPromise =
  "Martins Investments can help you enjoy your leisure and maximize your business.";

export const sectors: Sector[] = [
  {
    slug: "home-property",
    name: "Home, Property & Gardens",
    summary: "Landscape design, property support and practical home services for better spaces.",
    detail:
      "From full garden and driveway designs to property market guidance, Martins Investments helps clients improve, manage and enjoy their homes and property interests.",
    status: "Active",
  },
  {
    slug: "transport-mobility",
    name: "Transport, Removals & Cars",
    summary: "Removals, rubbish clearance, minicabs, chauffeurs and limousine hire.",
    detail:
      "Transport services include removals and recycling, 24-hour personal chauffeur bookings, hybrid minicabs around London and the South East, PCO car rental and limousine hire for special occasions.",
    status: "Active",
  },
  {
    slug: "creative-digital",
    name: "Creative, Fashion & Digital",
    summary: "Music, video, fashion, e-commerce and web design services.",
    detail:
      "Martins Investments helps clients get seen, heard and sold online through professional music and video production, fashion retail, responsive websites and e-commerce platforms.",
    status: "Growth",
  },
  {
    slug: "personal-lifestyle",
    name: "Personal & Lifestyle Services",
    summary: "Home cookery and Girl Friday services that make personal time richer.",
    detail:
      "Lifestyle support ranges from Dial-a-Chef on-site cooking in your own home to Girl Friday assistance for planning, home support and companionship at business or social events.",
    status: "Active",
  },
  {
    slug: "finance",
    name: "Finance",
    summary: "Loans and finance planning support to help clients manage money with confidence.",
    detail:
      "Martins Investments helps clients plan and manage finances so money works for them instead of against them, including support when an extra amount at the right moment could make the difference.",
    status: "Emerging",
  },
];

export const businesses: Business[] = [
  {
    slug: "landscape-design",
    name: "Landscape Design",
    sector: "home-property",
    tagline:
      "Five years' experience in landscape architecture, ground works and full garden or driveway designs.",
    description:
      "The landscaping service covers landscaping and ground works, full garden and driveway designs, measuring up jobs, organising materials, and 360 digger and dumper operations. The wider home improvement skill set also includes plastering, carpentry, tiling, bathroom and kitchen fitting, brickwork, window fitting and UPVC work.",
    stage: "Operating",
    highlights: [
      "Landscaping, ground works, garden and driveway design",
      "Measuring up jobs and organising materials",
      "Plastering, carpentry, tiling, brickwork and UPVC work",
    ],
  },
  {
    slug: "transport-removals",
    name: "Transport & Removals",
    sector: "transport-mobility",
    tagline: "Removals, recycling, rubbish clearance, packing, cleaning and handyman support.",
    description:
      "Empire Killer Removals & Recycling Company provides transport and removals support including rubbish clearance, packing and assembling, cleaning and laundry service, recycling contract support, handyman work, packaging products, and help buying unwanted goods or clearing them for a few pounds.",
    stage: "Operating",
    highlights: [
      "Rubbish clearance, packing and assembling",
      "Cleaning, laundry, recycling and handyman services",
      "Packaging products plus unwanted-goods clearance",
    ],
  },
  {
    slug: "cars-limo",
    name: "Cars & Limo",
    sector: "transport-mobility",
    tagline: "24-hour personal chauffeur, minicab, PCO rental and limousine hire services.",
    description:
      "Cars & Limo helps clients get the car they want when they want it. Services include a 24-hour personal chauffeur for journeys to and from London and the south of England, quick hybrid minicabs around London and the South East, PCO car rental, driver opportunity support, and limousine hire for special occasions.",
    stage: "Operating",
    highlights: [
      "24-hour chauffeur bookings and hybrid minicabs",
      "PCO car rental and driver registration support",
      "Limousine options including Chrysler, Escalade, Hummer, party bus and Lincoln models",
    ],
  },
  {
    slug: "music-video-production",
    name: "Music & Video",
    sector: "creative-digital",
    tagline: "Professional music and video production to help clients broadcast to the world.",
    description:
      "Music & Video production helps clients get seen and heard with professional production delivered by Martins Investments. The service includes music production for a professional sound on download or disc, plus video production for selling videos, YouTube content and full-length features.",
    stage: "Operating",
    highlights: [
      "Music production for download or disc",
      "Short selling videos and YouTube-ready content",
      "Guidance for longer video and feature projects",
    ],
  },
  {
    slug: "fashion",
    name: "Fashion",
    sector: "creative-digital",
    tagline: "Online fashion through Roc Diz Way, with great designs for the whole family.",
    description:
      "Fashion at Martins Investments is built around the Roc Diz Way online fashion store. The service invites customers to love their look with designs for the whole family, while also calling for models interested in available modelling work.",
    stage: "Operating",
    website: "https://rocdizway.com/",
    highlights: [
      "Roc Diz Way online fashion store",
      "Great designs for the whole family",
      "Model recruitment for available modelling work",
    ],
  },
  {
    slug: "web-design",
    name: "Web Design",
    sector: "creative-digital",
    tagline: "Responsive websites, e-commerce and web publishing experience at great value.",
    description:
      "Web Design helps clients deliver their message online to the world. Martins Investments specifies what clients really need, draws on 20 years of web publishing experience, offers solutions from under GBP100, promises to beat any quote, and builds responsive sites that work across desktop, mobile and tablet. E-commerce solutions can include shopping basket and credit-card or PayPal-based payment systems.",
    stage: "Operating",
    highlights: [
      "Responsive design for desktop, mobile and tablet",
      "E-commerce stores with basket and payment systems",
      "HTML5, CSS3, JavaScript, jQuery, PHP, SQL and app-development experience",
    ],
  },
  {
    slug: "home-cookery",
    name: "Home Cookery",
    sector: "personal-lifestyle",
    tagline: "Dial-a-Chef on-site cooking that turns your own home into your restaurant.",
    description:
      "Dial-a-Chef brings the restaurant to you. Martins Investments uses your own facilities to prepare your chosen feast on the spot, letting you enjoy restaurant-style food in the comfort of your own home without worrying about travel, tables or what happens behind closed kitchen doors.",
    stage: "Operating",
    highlights: [
      "Professional on-site cooking in your own home",
      "Restaurant-style food prepared before your eyes",
      "Dial-a-Chef is a registered trade mark of Martins Investments",
    ],
  },
  {
    slug: "girl-friday",
    name: "Girl Friday",
    sector: "personal-lifestyle",
    tagline: "Weekend home support, planning help and companionship for business or social events.",
    description:
      "Girl Friday helps clients get their act together when life is too busy. The service covers home support at weekends, planning and arrangements, practical tasks, and Boy or Girl Friday companionship for business and social events during a short stay in London.",
    stage: "Operating",
    highlights: [
      "Weekend home support and practical task handling",
      "Planning and arrangements when life is busy",
      "Business and social event companionship in London",
    ],
  },
  {
    slug: "property",
    name: "Property",
    sector: "home-property",
    tagline:
      "A window to the property market for clients looking to optimise a property portfolio.",
    description:
      "Property services help clients find property that works for them. Martins Investments positions the current market as an opportunity to optimise a property portfolio when clients know what they are doing and where the best opportunities can be found.",
    stage: "Operating",
    highlights: [
      "Property market guidance",
      "Portfolio optimisation support",
      "Help finding property opportunities that work for the client",
    ],
  },
  {
    slug: "loans-finance",
    name: "Loans & Finance",
    sector: "finance",
    tagline: "Finance planning and support so money can work for you instead of against you.",
    description:
      "Loans & Finance helps clients plan and manage their finances so they can do the things they do best without worrying about stretching money across too many demands at once. The service is positioned for moments when even an extra GBP100 at the right time could make a difference.",
    stage: "Operating",
    highlights: [
      "Loans and finance support",
      "Planning and money-management guidance",
      "Practical help when timing and cash flow matter",
    ],
  },
];

export const pillars = [
  {
    title: "Business support",
    body: "We work with clients to lift capabilities, solve practical problems and help business plans move from idea to action.",
  },
  {
    title: "Personal time",
    body: "Our leisure and lifestyle services are designed to make quality personal time richer, easier and more relaxing.",
  },
  {
    title: "Practical delivery",
    body: "From transport and property to web design and production, the focus is useful service delivered at the point clients need it.",
  },
  {
    title: "Direct contact",
    body: "It all starts when clients get in touch, explain what they need and let Martins Investments help with the next step.",
  },
];

export const insights = [
  {
    slug: "why-the-right-piece-still-matters",
    title: "Why the right piece still matters",
    date: "2026-07-14",
    category: "Style",
    excerpt:
      "The best archive fashion carries more than a logo. It holds a time, an attitude and a story worth wearing again.",
    body: [
      "A sought-after piece of Y2K streetwear is never only about nostalgia. The cut, the weight, the branding and the memory around it all say something that a quick imitation cannot.",
      "RocDizWay exists for that distinction: finding authentic pieces with enough character to feel relevant without pretending they were made yesterday.",
    ],
  },
  {
    slug: "the-feeling-before-the-event",
    title: "The feeling begins before the event",
    date: "2026-05-02",
    category: "Experience",
    excerpt:
      "A memorable night starts with anticipation—and every detail either builds it or lets it fade.",
    body: [
      "The first impression of an event rarely happens at the door. It begins with how the invitation arrives, who tells you about it and what remains deliberately unsaid.",
      "For Roc Parties, access and atmosphere belong to the same experience. The aim is not simply to fill a room, but to make every stage of the occasion feel considered.",
    ],
  },
  {
    slug: "why-some-places-make-you-stay",
    title: "Why some places make you stay",
    date: "2026-02-19",
    category: "Hospitality",
    excerpt:
      "People may arrive for the menu, but atmosphere is what turns one visit into a favourite place.",
    body: [
      "The places we remember understand timing: the welcome, the music, the pace of a table and the moment an evening begins to feel effortless.",
      "Roc Away is being shaped around that whole experience. Food matters deeply, but so do warmth, rhythm and the feeling that there is no need to rush elsewhere.",
    ],
  },
];

export const getSector = (slug: string) => sectors.find((s) => s.slug === slug);
export const getBusiness = (slug: string) => businesses.find((b) => b.slug === slug);
