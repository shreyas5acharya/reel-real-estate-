import miamiVillaImg from '../assets/images/listing_miami_villa_1794534345800.jpg';
import manhattanPenthouseImg from '../assets/images/listing_manhattan_penthouse_1794534347052.jpg';
import beverlyHillsImg from '../assets/images/listing_beverly_hills_modern_1794534345521.jpg';
import austinLakehouseImg from '../assets/images/listing_austin_lakehouse_1794534346603.jpg';
import aspenChaletImg from '../assets/images/listing_aspen_chalet_1794534347080.jpg';
import sfTownhouseImg from '../assets/images/listing_sf_townhouse_1794534347412.jpg';

import cityNewYorkImg from '../assets/images/city_new_york_1794534347208.jpg';
import cityMiamiImg from '../assets/images/city_miami_1794534347522.jpg';
import cityLosAngelesImg from '../assets/images/city_los_angeles_1794534347805.jpg';
import cityAustinImg from '../assets/images/city_austin_1794534348543.jpg';
import cityAspenImg from '../assets/images/city_aspen_1794534348539.jpg';

import agentVictoriaImg from '../assets/images/agent_victoria_sterling_1794534349463.jpg';
import agentMarcusImg from '../assets/images/agent_marcus_vance_1794534352074.jpg';
import agentElenaImg from '../assets/images/agent_elena_rostova_1794534350224.jpg';
import agentJulianImg from '../assets/images/agent_julian_brooks_1794534351146.jpg';

/**
 * Editable Brand & Brokerage Configuration
 * Update COMPANY_NAME and licensing placeholders here to customize the entire site.
 */
export const COMPANY_CONFIG = {
  name: 'Sterling & Co.',
  legalName: 'Sterling & Co. Luxury Real Estate, LLC',
  tagline: 'Private Brokerage & Architectural Advisory',
  headquarters: '745 Fifth Avenue, Suite 2800, New York, NY 10151',
  phone: '+1 (212) 555-0194',
  email: 'private@sterlingandco-estates.example',
  licensePlaceholder: 'CA DRE #02194851 · NY DOS #10991234821 · TX TREC #9011842 (Placeholder)',
  copyrightYear: 2026,
};

export interface StatMetric {
  id: string;
  value: number;
  prefix?: string;
  suffix: string;
  decimals?: number;
  label: string;
  context: string;
}

export const STATS_METRICS: StatMetric[] = [
  {
    id: 'homes-sold',
    value: 12000,
    suffix: '+',
    label: 'Homes Sold',
    context: 'Across 14 major US luxury corridors',
  },
  {
    id: 'experience',
    value: 28,
    suffix: ' Yrs',
    label: 'Market Stewardship',
    context: 'Founded in Manhattan in 1998',
  },
  {
    id: 'cities',
    value: 14,
    suffix: '',
    label: 'US Cities Served',
    context: 'Coast-to-coast private offices',
  },
  {
    id: 'satisfaction',
    value: 99.4,
    suffix: '%',
    decimals: 1,
    label: 'Client Satisfaction',
    context: 'Verified post-closing client index',
  },
];

export type ListingCategory = 'Luxury' | 'Condos' | 'Family Homes' | 'Investment';
export type ListingTransaction = 'Buy' | 'Rent';

export interface PropertyListing {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  locationLabel: string;
  price: number;
  monthlyRent?: number;
  transaction: ListingTransaction;
  category: ListingCategory;
  beds: number;
  baths: number;
  sqft: number;
  yearBuilt: number;
  architect: string;
  image: string;
  imageAlt: string;
  summary: string;
  highlights: string[];
}

export const FEATURED_LISTINGS: PropertyListing[] = [
  {
    id: 'coral-gables-pavilion',
    title: 'Biscayne Glass Waterfront Pavilion',
    address: '412 Leucadendra Drive',
    city: 'Miami',
    state: 'FL',
    locationLabel: 'Miami, FL',
    price: 11850000,
    transaction: 'Buy',
    category: 'Luxury',
    beds: 6,
    baths: 7.5,
    sqft: 7420,
    yearBuilt: 2024,
    architect: 'Alder & Solis Studio',
    image: miamiVillaImg,
    imageAlt: 'Modern glass waterfront estate in Coral Gables Miami with infinity pool at twilight',
    summary:
      'Set on 160 feet of deep-water canal frontage in Gables Estates, this limestone and low-iron glass residence pairs hurricane-rated transparency with a private 70-foot yacht slip.',
    highlights: [
      'Private deep-water dockage with direct Biscayne Bay access',
      'Zero-edge saltwater pool and cantilevered summer kitchen',
      'Climate-controlled 1,400-bottle wine gallery and home wellness suite',
    ],
  },
  {
    id: 'central-park-skyline-ph',
    title: '57th Street Park-View Penthouse',
    address: '217 West 57th Street, PH4',
    city: 'New York',
    state: 'NY',
    locationLabel: 'New York, NY',
    price: 18400000,
    monthlyRent: 48000,
    transaction: 'Buy',
    category: 'Condos',
    beds: 4,
    baths: 4.5,
    sqft: 4680,
    yearBuilt: 2023,
    architect: 'Kessler & Partners',
    image: manhattanPenthouseImg,
    imageAlt: 'Manhattan penthouse living room overlooking Central Park and skyline at dusk',
    summary:
      'Spanning a full upper floor above Billionaires Row, this bespoke residence features 13-foot ceilings, a monolithic Roman travertine hearth, and uninterrupted Central Park panoramas.',
    highlights: [
      'Direct private elevator landing with biometric access',
      'Custom rift-cut walnut library and acoustic glazing',
      '24-hour concierge, private dining salon, and valet garage',
    ],
  },
  {
    id: 'trousdale-cantilever-estate',
    title: 'Trousdale Cantilevered Limestone Villa',
    address: '1480 Loma Vista Drive',
    city: 'Los Angeles',
    state: 'CA',
    locationLabel: 'Los Angeles, CA',
    price: 14950000,
    transaction: 'Buy',
    category: 'Luxury',
    beds: 5,
    baths: 6,
    sqft: 6850,
    yearBuilt: 2025,
    architect: 'Harlow Pacific Architecture',
    image: beverlyHillsImg,
    imageAlt: 'Contemporary Beverly Hills hillside residence with limestone terraces at sunset',
    summary:
      'Floating above the Beverly Hills basin with sweeping views from Downtown Los Angeles to the Pacific Ocean, crafted in honed limestone, bronze fascia, and mature olive groves.',
    highlights: [
      '65-foot glass-walled infinity pool overlooking the canyon',
      '12-seat screening room and subterranean 6-car gallery',
      'Motorized pocket doors merging living salon and limestone terrace',
    ],
  },
  {
    id: 'lake-travis-bluff-house',
    title: 'Westlake Cedar & Limestone Bluff Residence',
    address: '8901 Barton Creek Rim',
    city: 'Austin',
    state: 'TX',
    locationLabel: 'Austin, TX',
    price: 5650000,
    monthlyRent: 22500,
    transaction: 'Buy',
    category: 'Family Homes',
    beds: 5,
    baths: 5.5,
    sqft: 5940,
    yearBuilt: 2024,
    architect: 'Hill Country Modern',
    image: austinLakehouseImg,
    imageAlt: 'Limestone and cedar modern home overlooking Lake Travis in Austin Texas at golden hour',
    summary:
      'Perched on 2.4 private acres above Lake Travis, this warm modernist family compound balances Texas Hill Country stone masonry with shaded cedar pavilions for year-round entertaining.',
    highlights: [
      'Detached guest casita with dedicated lakeside terrace',
      'Resort-scale heated lap pool, spa, and outdoor hearth pavilion',
      'Exemplary Eanes ISD school corridor and 18 minutes to downtown',
    ],
  },
  {
    id: 'red-mountain-timber-chalet',
    title: 'Red Mountain Glass & Timber Sanctuary',
    address: '304 Willoughby Way',
    city: 'Aspen',
    state: 'CO',
    locationLabel: 'Aspen, CO',
    price: 16200000,
    monthlyRent: 54000,
    transaction: 'Rent',
    category: 'Investment',
    beds: 5,
    baths: 6,
    sqft: 6120,
    yearBuilt: 2023,
    architect: 'Northline Alpine Studio',
    image: aspenChaletImg,
    imageAlt: 'Modern timber and glass luxury mountain residence in Aspen Colorado at blue hour',
    summary:
      'Available for seasonal lease or private portfolio acquisition, this ski-access mountain sanctuary pairs reclaimed Douglas fir trusses with heated granite terraces facing Aspen Mountain.',
    highlights: [
      'Radiant snow-melt driveway and ski locker mudroom',
      'Double-height great room with unobstructed Continental Divide views',
      'Proven $680K+ annualized prime winter & summer yield profile',
    ],
  },
  {
    id: 'pacific-heights-limestone-manor',
    title: 'Pacific Heights Beaux-Arts Townhouse',
    address: '2640 Broadway Street',
    city: 'San Francisco',
    state: 'CA',
    locationLabel: 'San Francisco, CA',
    price: 8950000,
    monthlyRent: 29000,
    transaction: 'Rent',
    category: 'Family Homes',
    beds: 4,
    baths: 4.5,
    sqft: 5180,
    yearBuilt: 1914,
    architect: 'Restored by Vance & Reed (2024)',
    image: sfTownhouseImg,
    imageAlt: 'Historic restored limestone townhouse in Pacific Heights San Francisco',
    summary:
      'A landmark Gold Coast limestone residence thoughtfully restored for contemporary living, complete with Golden Gate Bridge views from the penthouse conservatory and manicured south garden.',
    highlights: [
      'Original Beaux-Arts stonework paired with seismic steel framing',
      'Four-level internal elevator and private two-car garage',
      'Rooftop sky terrace overlooking the Presidio and San Francisco Bay',
    ],
  },
];

export interface NeighborhoodCity {
  id: string;
  city: string;
  state: string;
  district: string;
  medianPrice: string;
  activeResidences: number;
  yoyAppreciation: string;
  character: string;
  image: string;
  imageAlt: string;
}

export const NEIGHBORHOODS: NeighborhoodCity[] = [
  {
    id: 'new-york',
    city: 'New York',
    state: 'NY',
    district: 'Upper East Side & Tribeca',
    medianPrice: '$6.8M',
    activeResidences: 42,
    yoyAppreciation: '+6.4% YoY',
    character: 'Pre-war limestone cooperatives, cast-iron lofts, and trophy park-facing penthouses.',
    image: cityNewYorkImg,
    imageAlt: 'Twilight view of Manhattan skyline and Upper East Side brownstones',
  },
  {
    id: 'miami',
    city: 'Miami',
    state: 'FL',
    district: 'Coral Gables & Coconut Grove',
    medianPrice: '$5.2M',
    activeResidences: 38,
    yoyAppreciation: '+9.1% YoY',
    character: 'Bayfront modern estates, private yacht moorings, and architectural sky residences.',
    image: cityMiamiImg,
    imageAlt: 'Golden hour aerial view of Miami Biscayne Bay waterfront and skyline',
  },
  {
    id: 'los-angeles',
    city: 'Los Angeles',
    state: 'CA',
    district: 'Beverly Hills & Bel Air',
    medianPrice: '$8.4M',
    activeResidences: 31,
    yoyAppreciation: '+5.7% YoY',
    character: 'Mid-century hillside pavilions, gated canyon compounds, and ocean-view estates.',
    image: cityLosAngelesImg,
    imageAlt: 'Sunset over palm-lined Beverly Hills boulevard and Hollywood Hills',
  },
  {
    id: 'austin',
    city: 'Austin',
    state: 'TX',
    district: 'Westlake & Tarrytown',
    medianPrice: '$3.6M',
    activeResidences: 27,
    yoyAppreciation: '+7.8% YoY',
    character: 'Limestone lakefront sanctuaries, cedar estates, and walkable urban towers.',
    image: cityAustinImg,
    imageAlt: 'Golden hour view of Lady Bird Lake and Austin Texas skyline',
  },
  {
    id: 'aspen',
    city: 'Aspen',
    state: 'CO',
    district: 'Red Mountain & West End',
    medianPrice: '$12.4M',
    activeResidences: 16,
    yoyAppreciation: '+8.5% YoY',
    character: 'Ski-in alpine modern retreats, historic Victorian landmarks, and ranch acreage.',
    image: cityAspenImg,
    imageAlt: 'Twilight view of Aspen Colorado alpine village beneath snowy peaks',
  },
];

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  headline: string;
  description: string;
  deliverables: string[];
  outcomeMetric: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'buying',
    number: '01',
    title: 'Buying',
    headline: 'Off-Market Access & Discreet Acquisition',
    description:
      'More than 38% of our placements occur privately before public listing. We represent buyers with architectural due diligence, off-market sourcing, and precision valuation.',
    deliverables: [
      'Private pocket-listing network across 14 US markets',
      'Structural, zoning, and coastal inspection coordination',
      'Confidential LLC & trust-aligned offer structuring',
    ],
    outcomeMetric: '96.2% list-to-purchase precision',
  },
  {
    id: 'selling',
    number: '02',
    title: 'Selling',
    headline: 'Architectural Positioning & Global Distribution',
    description:
      'Every residence receives an editorial campaign—museum-grade photography, twilight film, architectural monographs, and direct outreach to vetted family offices.',
    deliverables: [
      'Bespoke staging and architectural lighting direction',
      'Private broker previews and international buyer syndication',
      'Data-backed pricing strategy to protect asset equity',
    ],
    outcomeMetric: '29 days average market-to-contract',
  },
  {
    id: 'property-management',
    number: '03',
    title: 'Property Management',
    headline: 'Turnkey Estate Stewardship & Seasonal Care',
    description:
      'For multi-residence owners, our dedicated estate managers oversee preventative maintenance, fine-art climate control, vendor auditing, and seasonal readiness.',
    deliverables: [
      'Bi-weekly physical inspections and smart-home monitoring',
      'Vetted landscape, marine, and mechanical vendor oversight',
      'Consolidated monthly accounting and tax-ready reporting',
    ],
    outcomeMetric: '$1.4B in managed residential assets',
  },
  {
    id: 'investment-advisory',
    number: '04',
    title: 'Investment Advisory',
    headline: 'Portfolio Yield, 1031 Exchanges & Development',
    description:
      'Quantitative neighborhood underwriting for trophy rentals, boutique residential developments, and tax-deferred 1031 capital reallocations.',
    deliverables: [
      'Cap-rate, appreciation, and zoning upside modeling',
      '1031 exchange timeline orchestration with qualified intermediaries',
      'Ground-up architectural feasibility and exit projections',
    ],
    outcomeMetric: '11.8% 5-year historical net IRR benchmark',
  },
  {
    id: 'relocation',
    number: '05',
    title: 'Relocation',
    headline: 'Executive & Family Office Transitions',
    description:
      'Seamless interstate transitions tailored for executives, founders, and families—coordinating school placement briefings, interim leases, and cross-country closings.',
    deliverables: [
      'Curated neighborhood orientation tours within 48 hours',
      'Private school, club, and commute corridor briefings',
      'Coordinated dual-coast sale and purchase closings',
    ],
    outcomeMetric: '420+ executive families relocated since 2020',
  },
];

export interface TimelineStep {
  id: string;
  step: string;
  phase: string;
  title: string;
  summary: string;
  detail: string;
  benchmark: string;
}

export const TIMELINE_STEPS: TimelineStep[] = [
  {
    id: 'consult',
    step: '01',
    phase: 'Consult',
    title: 'Private Discovery & Thesis Alignment',
    summary:
      'We begin with a confidential briefing covering architectural preferences, lifestyle cadence, tax residency goals, and capital timeline.',
    detail:
      'Your senior advisor prepares a custom market dossier mapping comparable trades, pocket inventory, and upcoming zoning shifts across your target neighborhoods.',
    benchmark: '48-hour custom dossier delivery',
  },
  {
    id: 'tour',
    step: '02',
    phase: 'Tour',
    title: 'Curated Showings & Architectural Review',
    summary:
      'Skip generic open houses. Experience private, unhurried viewings timed to natural light, accompanied by architectural and engineering insights.',
    detail:
      'For remote principals, we conduct live 4K architectural walkthroughs with structural commentary, acoustic readings, and sun-path orientation.',
    benchmark: 'On-site & live 4K private tours',
  },
  {
    id: 'offer',
    step: '03',
    phase: 'Offer',
    title: 'Strategic Valuation & Term Negotiation',
    summary:
      'We structure clean, compelling terms backed by hyper-local comps, inspection intelligence, and direct coordination with private bankers.',
    detail:
      'Whether competing in a multiple-offer corridor or negotiating an off-market estate, our partners protect your privacy and price discipline.',
    benchmark: 'Average 3.8% negotiation advantage',
  },
  {
    id: 'close',
    step: '04',
    phase: 'Close',
    title: 'White-Glove Escrow & Key Handover',
    summary:
      'From title clearance and insurance underwriting to utility concierge and designer introductions, every milestone is tracked to the hour.',
    detail:
      'Long after closing day, our estate services team remains on call for renovations, seasonal staffing, and future portfolio strategy.',
    benchmark: '99.6% on-schedule closing rate',
  },
];

export interface AgentProfile {
  id: string;
  name: string;
  role: string;
  market: string;
  closedVolume: string;
  languages: string;
  bio: string;
  email: string;
  phone: string;
  image: string;
}

export const AGENTS: AgentProfile[] = [
  {
    id: 'victoria-sterling',
    name: 'Victoria Sterling',
    role: 'Managing Partner',
    market: 'New York & Tri-State',
    closedVolume: '$1.4B+ Closed',
    languages: 'English · French',
    bio: 'Twenty-two years advising ultra-prime Manhattan cooperatives, Fifth Avenue penthouses, and historic townhouses.',
    email: 'v.sterling@sterlingandco-estates.example',
    phone: '(212) 555-0141',
    image: agentVictoriaImg,
  },
  {
    id: 'marcus-vance',
    name: 'Marcus Vance',
    role: 'Director of Private Estates',
    market: 'Los Angeles & Aspen',
    closedVolume: '$980M+ Closed',
    languages: 'English · German',
    bio: 'Specializes in architectural hillside compounds in Beverly Hills and ski-access trophy residences across the Roaring Fork Valley.',
    email: 'm.vance@sterlingandco-estates.example',
    phone: '(310) 555-0188',
    image: agentMarcusImg,
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    role: 'Senior Architectural Advisor',
    market: 'Miami & Palm Beach',
    closedVolume: '$740M+ Closed',
    languages: 'English · Spanish',
    bio: 'Former architectural designer guiding waterfront acquisitions, pre-construction penthouses, and coastal engineering diligence.',
    email: 'e.rostova@sterlingandco-estates.example',
    phone: '(305) 555-0162',
    image: agentElenaImg,
  },
  {
    id: 'julian-brooks',
    name: 'Julian Brooks',
    role: 'Head of Relocation & Investment',
    market: 'Austin & San Francisco',
    closedVolume: '$610M+ Closed',
    languages: 'English · Mandarin',
    bio: 'Advises founders and family offices on Texas Hill Country estates, Bay Area historic homes, and tax-deferred 1031 portfolios.',
    email: 'j.brooks@sterlingandco-estates.example',
    phone: '(512) 555-0129',
    image: agentJulianImg,
  },
];

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  transactionType: string;
  outcome: string;
}

/**
 * Placeholder Testimonials — Clearly labeled in the UI as sample placeholder content.
 */
export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    quote:
      'Before engaging Sterling & Co., we spent eight months losing out on crowded Manhattan listings. Victoria surfaced an off-market pre-war residence on Park Avenue, structured a discreet all-cash review, and closed us $1.1M below our ceiling in 34 days.',
    author: 'Dr. Jonathan & Claire Mercer',
    role: 'Biotech Founder & Art Collector',
    location: 'Upper East Side, NY',
    transactionType: 'Private Acquisition · $14.2M',
    outcome: 'Closed 34 days · $1.1M under cap',
  },
  {
    id: 't2',
    quote:
      'Relocating our headquarters from San Francisco to Austin meant selling and buying simultaneously under a tight school calendar. Julian coordinated both transactions seamlessly, securing a Westlake bluff home before it ever hit MLS.',
    author: 'David Chen',
    role: 'Managing Director, Horizon Capital',
    location: 'Austin, TX',
    transactionType: 'Executive Relocation · $5.8M',
    outcome: 'Dual-coast close in 45 days',
  },
  {
    id: 't3',
    quote:
      'Other brokerages wanted to discount our Coral Gables waterfront home after a slow winter. Sterling & Co. repositioned the property with twilight architectural film and private European outreach, achieving 98.7% of our original asking price.',
    author: 'Sophia Alvarez-Montero',
    role: 'Private Family Office Principal',
    location: 'Coral Gables, FL',
    transactionType: 'Exclusive Listing · $11.6M',
    outcome: 'Sold at 98.7% of ask in 27 days',
  },
];
