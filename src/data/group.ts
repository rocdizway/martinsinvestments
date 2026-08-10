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

export const sectors: Sector[] = [
  {
    slug: "fashion-ecommerce",
    name: "Fashion & E-commerce",
    summary:
      "Consumer brands and digital retail platforms built for a global audience.",
    detail:
      "We build and back apparel and lifestyle labels with strong creative direction, supported by modern digital commerce infrastructure, fulfilment partnerships and performance marketing.",
    status: "Active",
  },
  {
    slug: "lifestyle",
    name: "Lifestyle",
    summary:
      "Products, spaces and experiences designed around modern living and culture.",
    detail:
      "Lifestyle ventures extend our consumer expertise into wellbeing, hospitality-adjacent concepts and premium everyday goods, where brand trust compounds over time.",
    status: "Growth",
  },
  {
    slug: "entertainment-events",
    name: "Entertainment & Events",
    summary:
      "Live experiences, nightlife and cultural programming with international reach.",
    detail:
      "From curated events to entertainment formats, this pillar builds audiences and cultural equity that feed the wider group's brands and media assets.",
    status: "Active",
  },
  {
    slug: "property",
    name: "Property",
    summary:
      "Real estate acquisition, development and long-term asset management.",
    detail:
      "Property provides the group with a stable asset base — residential and commercial holdings selected for yield, appreciation and strategic operational use.",
    status: "Growth",
  },
  {
    slug: "mobility",
    name: "Mobility",
    summary:
      "Transport, logistics and movement services for people and goods.",
    detail:
      "Mobility ventures focus on reliable, technology-enabled transport and logistics operations that support both consumers and other group businesses.",
    status: "Emerging",
  },
  {
    slug: "media",
    name: "Media",
    summary:
      "Content, publishing and brand storytelling across digital channels.",
    detail:
      "Media capability gives the group distribution: original content, creator partnerships and channels that build demand for every brand we own or back.",
    status: "Emerging",
  },
  {
    slug: "future-ventures",
    name: "Future Ventures",
    summary:
      "Early-stage exploration, partnerships and new market entry.",
    detail:
      "A deliberate space for what comes next — technology, financial services and international expansion opportunities evaluated against our long-term thesis.",
    status: "Exploratory",
  },
];

export const businesses: Business[] = [
  {
    slug: "rocdizway",
    name: "RocDizWay",
    sector: "fashion-ecommerce",
    tagline: "Contemporary fashion and digital retail.",
    description:
      "RocDizWay is the group's fashion and e-commerce brand, combining original design with a direct-to-consumer digital platform. It anchors our consumer strategy and serves as the testbed for the group's commerce, fulfilment and brand-building capability.",
    stage: "Operating",
    highlights: [
      "Direct-to-consumer digital storefront",
      "Original design and seasonal collections",
      "Foundation of the group's commerce infrastructure",
    ],
  },
  {
    slug: "roc-away",
    name: "Roc*Away",
    sector: "lifestyle",
    tagline: "Travel and lifestyle experiences.",
    description:
      "Roc*Away curates travel and getaway experiences for a discerning audience, translating the group's brand equity into memorable lifestyle offerings and recurring customer relationships.",
    stage: "Scaling",
    highlights: [
      "Curated travel and getaway programmes",
      "Partnership-led operating model",
      "Shared audience with the wider Roc portfolio",
    ],
  },
  {
    slug: "roc-parties",
    name: "Roc*Parties",
    sector: "entertainment-events",
    tagline: "Events, nightlife and cultural moments.",
    description:
      "Roc*Parties produces live events and entertainment experiences, building cultural presence and community around the group's brands while operating as a commercial venture in its own right.",
    stage: "Operating",
    highlights: [
      "Curated live events and nightlife formats",
      "Brand partnership and sponsorship revenue",
      "Audience engine for group media assets",
    ],
  },
  {
    slug: "martins-property",
    name: "Martins Property",
    sector: "property",
    tagline: "Real estate holdings and development.",
    description:
      "Martins Property manages the group's real estate interests, focusing on carefully selected acquisitions, refurbishment and long-term asset management.",
    stage: "In development",
    highlights: [
      "Acquisition and asset management",
      "Long-term capital appreciation focus",
      "Operational space for group businesses",
    ],
  },
  {
    slug: "martins-mobility",
    name: "Martins Mobility",
    sector: "mobility",
    tagline: "Transport and logistics services.",
    description:
      "Martins Mobility develops the group's transport and logistics capability, supporting both external customers and the delivery requirements of our consumer brands.",
    stage: "In development",
    highlights: [
      "Transport and delivery operations",
      "Technology-enabled scheduling",
      "Internal fulfilment support",
    ],
  },
  {
    slug: "martins-media",
    name: "Martins Media",
    sector: "media",
    tagline: "Content, storytelling and distribution.",
    description:
      "Martins Media builds the group's owned channels — content production, brand storytelling and creator partnerships that give every venture a route to audience.",
    stage: "Pipeline",
    highlights: [
      "Owned content channels",
      "Creator and partner network",
      "Group-wide brand storytelling",
    ],
  },
];

export const pillars = [
  {
    title: "Ownership",
    body: "We build and hold. Our businesses are operated for the long term, not assembled for a quick exit.",
  },
  {
    title: "Discipline",
    body: "Every venture is assessed on unit economics, operating capability and its fit within the wider group.",
  },
  {
    title: "Shared capability",
    body: "Commerce, media, logistics and brand expertise are built once and made available across the portfolio.",
  },
  {
    title: "Independence",
    body: "Each business keeps its own identity and platform while drawing on the strength of the parent company.",
  },
];

export const insights = [
  {
    slug: "building-a-modern-holding-company",
    title: "Building a modern holding company",
    date: "2026-07-14",
    category: "Group",
    excerpt:
      "Why Martins Investments is structured as a parent company with independent operating brands, and what that means for growth.",
    body: [
      "A holding structure separates ownership from operations. It allows each brand to move at its own pace, with its own identity and leadership, while capital allocation, governance and shared services remain centralised.",
      "For Martins Investments, this means a portfolio that can absorb new ventures without disrupting existing ones — and businesses that can eventually run their own platforms while remaining clearly connected to the group.",
    ],
  },
  {
    slug: "portfolio-expansion-strategy",
    title: "Our approach to portfolio expansion",
    date: "2026-05-02",
    category: "Strategy",
    excerpt:
      "The criteria we apply before a new venture enters the group, from market position to operating capability.",
    body: [
      "New ventures are evaluated against four questions: is the market durable, can we operate it well, does it strengthen an existing pillar, and can it stand alone commercially?",
      "Ventures that pass move into a structured development phase before they are presented publicly as part of the portfolio.",
    ],
  },
  {
    slug: "entertainment-as-brand-infrastructure",
    title: "Entertainment as brand infrastructure",
    date: "2026-02-19",
    category: "Sector",
    excerpt:
      "How live experiences and cultural programming compound value across the wider group.",
    body: [
      "Events create attention, community and data. For a group with consumer brands, that attention is infrastructure — it lowers the cost of launching the next venture.",
      "Roc*Parties illustrates the model: a commercially viable business that simultaneously builds audience for fashion, lifestyle and media assets across the group.",
    ],
  },
];

export const getSector = (slug: string) => sectors.find((s) => s.slug === slug);
export const getBusiness = (slug: string) =>
  businesses.find((b) => b.slug === slug);
