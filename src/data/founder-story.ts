export type FounderChapter = {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  year: string;
  image: string;
  imageAlt: string;
  quote: string;
  sections: { heading?: string; paragraphs: string[]; cta?: string; ctaHref?: string }[];
};

export const founderChapters: FounderChapter[] = [
  {
    slug: "nigeria",
    number: "01",
    title: "Nigeria",
    subtitle: "Where the story begins.",
    year: "The early years",
    image: "/founder/archive/bobby-childhood.jpeg",
    imageAlt: "Bobby Martins as a child in Nigeria",
    quote: "Before the businesses, there was Bobby. Before the boardroom, there was creativity.",
    sections: [
      {
        paragraphs: [
          "The story of Bobby Martins, known professionally as Roc Boss, begins in Nigeria—long before the businesses, brands and boardrooms that would come later.",
          "He came of age during an important period in the country’s cultural development. Music and fashion were powerful forms of expression, and the creative environment around him shaped the way he saw identity, style and possibility.",
        ],
      },
      {
        heading: "The first influence",
        paragraphs: [
          "Those early influences led Bobby towards the recording industry. Music became his first major creative language, but it would also teach him lessons that travelled far beyond the studio: originality, collaboration, discipline and the courage to make something of his own.",
          "Music became the beginning. Culture became the constant. Every chapter that followed carried something of Nigeria with it.",
        ],
      },
      {
        heading: "A life begins to take shape",
        paragraphs: [
          "Before Roc Boss, there was Bobby. Before RocDizWay, there was an appreciation for music, fashion, style and culture. These were not separate interests; together they formed an early understanding of how people express identity.",
          "The desire to create would remain the most consistent force in Bobby’s journey—from the recording studio to entrepreneurship and, ultimately, the development of Martins Investments.",
        ],
      },
    ],
  },
  {
    slug: "dark-alley",
    number: "02",
    title: "Dark Alley",
    subtitle: "The artist emerges.",
    year: "Nigeria · 1982",
    image: "/founder/archive/bobby-young-artist.jpeg",
    imageAlt: "A young Bobby Martins during his recording career",
    quote:
      "Dark Alley is not simply a record. It is the surviving document of where the story began.",
    sections: [
      {
        heading: "The record",
        paragraphs: [
          "In 1982, Bobby released Dark Alley in Nigeria through His Master’s Voice. Issued under catalogue HMV (N) 025, the six-track LP captured the first fully realised chapter of his creative life.",
          "Side A comprises Dark Alley, Take It Slowly and Crazy Love. Side B continues with Hot Coco, Stay and Poor Not Crazy.",
        ],
      },
      {
        heading: "The people behind the music",
        paragraphs: [
          "Bobby Martins led the vocals and contributed editing and the design concept. Berkley Jones produced the album; Monday Oki and Olubayo Aro handled engineering and mixing, assisted by Ed Jatto and Sunny Uka.",
          "Nkono Teles and Lemmy Jackson played synthesizers; Basil Barap played bass; Oscar and Sol played guitars; Moustique played drums; Laolu ‘Akins’ Akintobi contributed cowbell and Chiko Ab. percussion. Charlimo created the photography and Ajayi Kanayo Mokwenyei designed the sleeve.",
        ],
      },
      {
        heading: "The archive lives on",
        paragraphs: [
          "Its continued presence in specialist African vinyl and music-collecting circles has allowed Dark Alley to survive as part of the historical record of Nigerian popular music. The album connects Bobby’s first creative identity to the cultural work that continues through RocDizWay today.",
        ],
      },
      {
        heading: "From vinyl to vision",
        paragraphs: [
          "Dark Alley is a physical document from the beginning of Bobby Martins’ creative journey. Its survival demonstrates that the record belongs not only to a personal history, but to the wider archival story of Nigerian popular music.",
          "The RocDizWay archive creates a direct line between this historic recording and Bobby’s present-day cultural work: music became the beginning, and preservation became part of the legacy.",
        ],
      },
    ],
  },
  {
    slug: "britain",
    number: "03",
    title: "Britain",
    subtitle: "A new chapter begins.",
    year: "Reinvention",
    image: "/founder/archive/bobby-contemplative.jpeg",
    imageAlt: "Bobby Martins in a reflective portrait",
    quote:
      "The transition from artist to entrepreneur was not a rejection of the past. It was an evolution of it.",
    sections: [
      {
        paragraphs: [
          "Following his music career, Bobby relocated to the United Kingdom and began the demanding work of building a new life.",
          "He refused to remain defined solely by entertainment. The creativity, cultural awareness and experience developed through music remained central, while his attention increasingly moved towards business, strategy, entrepreneurship and brand development.",
        ],
      },
      {
        heading: "From artist to entrepreneur",
        paragraphs: [
          "Britain became the setting for reinvention. The instinct to create remained the same; what changed was its application. Ideas were no longer expressed only through records, but through services, experiences and businesses designed to meet real needs.",
        ],
      },
    ],
  },
  {
    slug: "education",
    number: "04",
    title: "Education",
    subtitle: "Building the foundation.",
    year: "First-Class Honours",
    image: "/founder/archive/bobby-portrait.jpeg",
    imageAlt: "Portrait of Bobby Martins",
    quote: "Creative instinct gained structure, language and commercial discipline.",
    sections: [
      {
        paragraphs: [
          "Bobby studied Business Management at the University of Sunderland in London, achieving First-Class Honours.",
          "His studies strengthened his understanding of strategic management, marketing, leadership, entrepreneurship, finance, organisational behaviour and innovation.",
        ],
      },
      {
        heading: "Experience, formalised",
        paragraphs: [
          "Education did not replace the experience built through music and working life. It gave that experience a framework. The combination of creative understanding and formal business knowledge became central to Bobby’s approach to entrepreneurship and leadership.",
        ],
      },
    ],
  },
  {
    slug: "entrepreneurship",
    number: "05",
    title: "Entrepreneurship",
    subtitle: "Ideas become businesses.",
    year: "Create · Build · Evolve",
    image: "/founder/archive/bobby-evening.jpeg",
    imageAlt: "Bobby Martins in London",
    quote:
      "Music taught creativity. Entertainment taught experience. Business introduced discipline.",
    sections: [
      {
        paragraphs: [
          "Bobby’s entrepreneurial journey developed across entertainment, culture, fashion, hospitality and commerce. The objective became larger than any single project: to turn ideas into brands with identities of their own.",
        ],
      },
      {
        heading: "Roc*Parties",
        paragraphs: [
          "Originating in 2009, Roc*Parties reflects Bobby’s continuing relationship with entertainment, nightlife and hospitality. It has evolved into a lifestyle proposition spanning VIP events, curated experiences, concierge, lifestyle management, hospitality and access.",
          "More than an invitation, Roc*Parties is a way into the moment: considered access, atmosphere and experience brought together around the people in the room.",
        ],
      },
      {
        heading: "RocDizWay",
        paragraphs: [
          "RocDizWay brings together music, culture, fashion and commerce. Built around authentic archive and Y2K-era designer clothing and accessories, its Curated Sovereign👑 philosophy treats every piece as an artefact with identity, history and significance—not simply an item to be sold.",
          "Every piece has a story. Some represent an era; some represent a movement; some may never be available again. They are curated not simply to be sold, but to be remembered.",
        ],
      },
      {
        heading: "Roc*Away",
        paragraphs: [
          "Roc*Away represents the hospitality dimension of the portfolio: food, music, atmosphere and warm service brought together as an experience. It embodies the belief that a business can be memorable because of how it makes people feel, not only what it sells.",
          "Good food. Warm energy. Reasons to stay. Roc*Away expresses the wider Martins Investments commitment to businesses that are experiential rather than merely transactional.",
        ],
      },
    ],
  },
  {
    slug: "martins-investments",
    number: "06",
    title: "Martins Investments",
    subtitle: "The vision becomes a group.",
    year: "Established 2022",
    image: "/founder/vision-boardroom.png",
    imageAlt: "A boardroom representing the long-term vision of Martins Investments",
    quote: "Each company has its own identity. Together, they form part of a larger story.",
    sections: [
      {
        paragraphs: [
          "The evolution from individual ventures to a wider portfolio led to Martins Investments: a private holding company building and backing exceptional businesses and future ventures.",
          "Bobby Martins Investments Limited was incorporated in the United Kingdom on 3 November 2022, with Bobby Martins as director.",
        ],
      },
      {
        heading: "One philosophy, distinct identities",
        paragraphs: [
          "The portfolio brings together RocDizWay across fashion, culture and commerce; Roc*Parties across events, experiences and lifestyle; and Roc*Away across food, hospitality and experiences.",
          "The parent company provides institutional structure without erasing the individual voice of each venture. Martins Investments is the culmination and continuation of everything that came before it.",
        ],
      },
      {
        heading: "The parent company",
        paragraphs: [
          "Each company has its own audience, identity and direction. The role of Martins Investments is to provide the clarity, discipline and long-term support that allows distinctive businesses to grow without losing their character.",
          "The vision extends beyond the present portfolio. Martins Investments is intended to become an enduring parent company capable of developing carefully selected future opportunities while protecting the culture and values from which it grew.",
        ],
      },
    ],
  },
  {
    slug: "roc-boss",
    number: "07",
    title: "Roc Boss",
    subtitle: "Culture · Identity · Perspective.",
    year: "The founder today",
    image: "/founder/archive/bobby-lifestyle.jpeg",
    imageAlt: "Bobby Martins, known professionally as Roc Boss",
    quote: "The greatest brands preserve authenticity rather than simply following trends.",
    sections: [
      {
        paragraphs: [
          "Roc Boss is more than a professional name. It represents the thread connecting Bobby’s music, cultural history, personal style, business outlook and present-day work.",
          "Music taught creativity. Business taught discipline. Culture taught identity. Experience taught perspective. Every chapter contributed something to the next.",
        ],
      },
      {
        heading: "Leadership philosophy",
        paragraphs: [
          "Bobby’s approach is built around authenticity rather than imitation. Strong brands understand who they are, where they came from and why their audience should remember them.",
          "Today he is Founder and Chief Executive Officer of Martins Investments, Founder of RocDizWay and Roc*Parties, portfolio founder of Roc*Away, a Business Management and Strategy professional, former recording artist and First-Class Honours graduate.",
        ],
      },
      {
        heading: "The Founder’s philosophy",
        paragraphs: [
          "‘I believe the greatest brands are built by preserving authenticity rather than simply following trends.’",
          "Music taught me creativity. Business taught me discipline. Culture taught me identity. Experience taught me perspective. And every chapter has contributed something to the next. — Bobby Martins",
        ],
      },
      {
        heading: "The Founder today",
        paragraphs: [
          "Bobby Martins BA (Hons), known professionally as Roc Boss, is the Founder and Chief Executive Officer of Bobby Martins Investments Limited, and continues to lead the company as it builds, develops and backs businesses with long-term potential.",
          "Today, Bobby operates with the flexibility of an entrepreneur, business strategist and commercial professional. Rather than being confined to a single industry or role, he is open to opportunities where his experience, knowledge and perspective can create value.",
        ],
      },
      {
        heading: "Consulting, advisory and speaking",
        paragraphs: [
          "His current professional work includes business consulting and strategic advisory, helping businesses and entrepreneurs think more clearly about their direction, positioning, customers, sales and growth.",
          "He also undertakes paid speaking engagements, sharing practical insight and experience across sales, management, marketing, business strategy, entrepreneurship and leadership.",
          "Available for consulting, advisory and speaking engagements.",
        ],
        cta: "Book Bobby Martins",
        ctaHref: "https://www.sumupbookings.com/bobby-martins-investments-limited",
      },
      {
        heading: "Strategy into action",
        paragraphs: [
          "His approach is straightforward: understand the objective, understand the market, identify what works, and turn strategy into action.",
          "For Bobby, business is not simply about creating something that works today. It is about understanding when to adapt, knowing when to take a different direction and having the vision to build something that can endure.",
        ],
      },
      {
        heading: "Looking Ahead",
        paragraphs: [
          "The next chapter remains open.",
          "Bobby continues to build through Martins Investments, develop his own ventures, advise businesses, share his knowledge and explore new opportunities across different industries and markets.",
          "The position is flexible. The ambition is not.",
          "Build with purpose. Create value. Stay authentic. Think independently. Keep moving forward.",
        ],
        cta: "Start a conversation",
      },
    ],
  },
  {
    slug: "legacy",
    number: "08",
    title: "Legacy",
    subtitle: "The story continues.",
    year: "Beyond today",
    image: "/founder/archive/bobby-portrait.jpeg",
    imageAlt: "Bobby Martins, founder of Martins Investments",
    quote: "The greatest measure of success is what can still have value tomorrow.",
    sections: [
      {
        paragraphs: [
          "A legacy is not created by one achievement. It is built through the accumulation of a lifetime: from Nigeria to Britain, from the recording studio to the boardroom, from vinyl records to digital commerce, from music to fashion, and from individual ventures to a portfolio.",
        ],
      },
      {
        heading: "Building beyond today",
        paragraphs: [
          "The ambition for Martins Investments is to become a respected and enduring parent company with distinctive businesses spanning fashion, experiences, lifestyle, hospitality and carefully selected future opportunities.",
          "The objective is not simply to build bigger, but to build better: to create brands with identity, develop businesses with purpose, create opportunities, preserve culture and deliver memorable experiences.",
          "The story began with music. It evolved through business. It continues through Martins Investments—and the next chapter remains unwritten.",
        ],
      },
      {
        heading: "Build · Evolve · Preserve · Create",
        paragraphs: [
          "The vision is to create brands with identity, develop businesses with purpose, create opportunities, preserve culture and deliver memorable experiences—ultimately establishing something capable of continuing beyond the Founder himself.",
          "Build. Evolve. Preserve. Create. Legacy.",
        ],
      },
      {
        heading: "Executive biography",
        paragraphs: [
          "Bobby Martins BA (Hons), known professionally as Roc Boss, is a UK-based entrepreneur, founder, business professional and former recording artist whose journey spans music, culture, fashion, entertainment, hospitality and entrepreneurship.",
          "His creative journey began in Nigeria and includes the 1982 release of Dark Alley, issued through His Master’s Voice under catalogue HMV (N) 025. Following his relocation to Britain, Bobby achieved First-Class Honours in Business Management at the University of Sunderland in London.",
          "His entrepreneurial journey developed through ventures including Roc*Parties and RocDizWay before the wider Martins Investments vision brought multiple businesses together under one parent-company philosophy. Today the portfolio encompasses RocDizWay, Roc*Parties and Roc*Away.",
          "His philosophy is simple: Defy trends. Define legacy.",
        ],
      },
    ],
  },
];

export const getFounderChapter = (slug: string) =>
  founderChapters.find((chapter) => chapter.slug === slug);
