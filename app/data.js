import icons from "@/app/icons";

const data = {
  adminEmails: [
    "kudlu2004@gmail.com",
    "ddhara36@gmail.com",
    "bhuvandesai2006@gmail.com",
    "careagencies2014@gmail.com",
    "raichurhardware2024@yahoo.com",
  ],

  // gst number
  gstNumber: "29AFCPD3464Q1Z1",

  // logo
  logoUrl: "/raichur_hardware_logo_nobg.png",

  // name
  companyName: "Raichur Hardwares",

  // phone numbers
  phones: ["+91 94490 30030"],

  // emails
  emails: ["raichurhardware2024@yahoo.com"],

  // address
  address:
    "Old 12-10-49 , New 12-10-87 Near Chandramouleshwar circle, Lingasugur Road, Raichur Karnataka – 584101, India",

  // footer desc
  footerDescription:
    " Raichur hardware Store is your one-stop shop for high-quality products at affordable prices. Discover the best deals and enjoy a seamless shopping experience.",

  // footer reach
  footerReach: [
    {
      stat: "200000",
      description: "Customers served",
    },
    {
      stat: "10000",
      description: "Products available",
    },
    {
      stat: "1000",
      description: "Professionals trained",
    },
    {
      stat: "100",
      description:
        "Meetings with carpenters, mechanics, plumbers, and electricians",
    },
  ],

  // social handles link
  facebook: "https://www.facebook.com/people/Raichur-Hardware/61562291072118/",
  instagram: "https://www.instagram.com/raichurhardware/",
  linkedin: "https://www.linkedin.com/company/raichur-hardware/",
  googleMaps: "https://maps.app.goo.gl/JM1DPqbfZyc32Ha99",

  // terms
  termsOfService:
    "https://docs.google.com/document/d/1n_9ZuDO-6GzhHdZ4koXkBBBc-xJ1MtQzp3m3SI6F0D4/edit?usp=sharing",

  // privacy
  privacy:
    "https://docs.google.com/document/d/1RLOMlHDvVqiccSbNTNgHGHrejgediOC1GnKbh2uKzDA/edit?usp=sharing",

  // return policy
  returnAndCancellationPolicy:
    "https://docs.google.com/document/d/1WtNP0H-Hmpv0vuaGrdZ3XcHm1imepaabxyEW-w7n2Ao/edit?usp=sharing",

  // hero section
  heroTitleFunc: () => (
    <h1
      className="text-4xl xl:text-5xl font-bold"
      style={{ lineHeight: "3.1rem" }}
    >
      Most <span className="text-amber-950"> Trusted Hardware </span> Wholesale
      Store in <span className="text-amber-950">Raichur </span>
    </h1>
  ),
  heroDescription:
    "Offering complete solutions for agricultural, irrigational, and water supply (plumbing) needs since 1972.",
  heroDescriptionSecondLineFunc: () => (
    <p className="text-lg my-6">
      {/* Building trust, faith and having delivered services to{" "}
      <span className="underline underline-offset-4">more than 2 Lakh</span>{" "}
      customers and counting in Raichur and near{" "}
      <span className="underline underline-offset-4">since 1970</span>. */}
    </p>
  ),
  heroButtonText: "Shop Now",

  heroImages: [
    "https://i.postimg.cc/TY5t8yyR/1.jpg",
    "https://i.postimg.cc/VkyDzYMX/3.jpg",
    "https://i.postimg.cc/tgk5dWcz/IMG-6986.jpg",
    "https://i.postimg.cc/nLp2Q03z/IMG-6999.jpg",
  ],

  // about page
  aboutPageSections: [
    {
      aboutSectionBadgeText: "About the Founder",
      aboutSectionTitle: "The Founder of the Company",
      aboutSectionDescriptions: [
        "The company was founded in 1972 by the late Shri Jivraj Mulji Desai, a young and dynamic entrepreneur. He established Raichur Machinery Stores, a business specializing in ginning and pressing machines, general supplies, and paints.",
      ],
      aboutSectionImageUrl: "/image_of_seth_jeevraj.jpg",
    },
    {
      aboutSectionBadgeText: "Since 1972",
      aboutSectionTitle: "Raichur Hardware",
      aboutSectionDescriptions: [
        "In 1975, Raichur Machinery Stores was renamed Raichur Hardwares. By 1992, the business shifted its focus from ginning and pressing machines to selling agricultural equipment such as irrigation systems, irrigation pump sets, and G.I pipes.",
        "That same year, Finolex invited Raichur Hardwares to collaborate as dealers in the Raichur district, a partnership that has since made Raichur Hardwares a major distributor for Finolex.",
      ],
      aboutSectionImageUrl: "https://i.postimg.cc/V6G5Fk1T/Raichurhardware.png",
    },
    {
      aboutSectionBadgeText: "Since 2014",
      aboutSectionTitle: "Care Agencies",
      aboutSectionDescriptions: [
        "In 2014, Care Agencies was incorporated, expanding its business into sanitary ware with brands like Jaquar and Hindware. They also distribute Viking bathroom fittings, switches, gear division products, and Taro motors. In addition, Care Agencies broadened its portfolio to include a range of high-quality products from renowned brands like Tecmo Industries, Watertech, and Esco.",
        "This expansion not only enhanced their product offerings but also solidified their position as a comprehensive provider of both residential and commercial plumbing solutions.",
      ],
      aboutSectionImageUrl: "https://i.postimg.cc/DyD7VMgB/careagencies.png",
    },
    {
      aboutSectionBadgeText: "Contact Us",
      aboutSectionTitle: "Visit Us at Raichur Hardware",
      aboutSectionDescriptions: [
        "Old 12-10-49 , New 12-10-87 Near Chandramouleshwar circle, Lingasugur Road, Raichur Karnataka – 584101, India",
        "Phone: +91 94490 30030",
      ],
      aboutSectionImageUrl: "/store_entrance_1.png",
    },
  ],

  // faqs
  faqs: [
    {
      icon: icons?.money,
      question:
        "What is the role of Raichur Hardware in case of damaged goods, shortages, or complaints?",
      answer:
        "If you encounter any issues with your goods, please visit our website to report your complaint. Once we verify the complaint and find it genuine, our team will address and resolve the problem accordingly.",
    },
    {
      icon: icons?.time,
      question: "What is your refund and cancellation policy?",
      answer:
        "Orders can be canceled within 24 hours. A cancellation fee will be charged, and the remaining amount will be refunded. For further details check out our policy.",
    },
    {
      icon: icons?.questionmark,
      question: "Why should I buy from the Raichur Hardware website?",
      answer:
        "1.	Wide Range of Products: Find everything you need in one place.   2.Easy Browsing: Conveniently explore our collections at your own pace.   3.Competitive Prices: Enjoy great value for your money.   4.Delivery Options: Get your purchases delivered to your doorstep.(extra charges applicable)",
    },
    {
      icon: icons?.lock,
      question: "How do I place an order on raichurhardware.in?",
      answer:
        "Browse through our product catalogs, add the items you desire to your cart, and proceed to checkout. Follow the on-screen instructions to complete your order.",
    },
    {
      icon: icons?.questionmark,
      question: "When and how do I pay?",
      answer:
        "After adding your desired products to your cart, you can pay after our team contacts you about your purchase. Cash payment is only available if the pick-up option is selected. For delivery, payment must be made upfront.",
    },
    {
      icon: icons?.plug,
      question: " How do I register on the site?",
      answer:
        "Click on the 'Sign In' option in the upper right corner of your screen and follow the steps. Registration is mandatory for placing an order. you will also be automatically be asked to sign in when checking out your cart",
    },
    {
      icon: icons?.lock,
      question: "How can I provide my feedback?",
      answer:
        "We always welcome feedback. Feel free to contact us via the website 'contact' page or E-mail: raichurhardware2024@yahoo.com",
    },
    {
      icon: icons?.time,
      question: "What is your return policy?",
      answer:
        "We do not accept returns. All products are thoroughly checked by our team before dispatch. Customers are welcome to inspect the items themselves before pick-up.",
    },
    {
      icon: icons?.questionmark,
      question: "How do i track my order?",
      answer:
        "You will be provided with the third-party delivery contractor’s phone number and tracking number (if available). All relevant details will be shared with you.",
    },
    {
      icon: icons?.plug,
      question: "How can I cancel an order?",
      answer:
        "To cancel an order within 24 hours, use the contact page of the website to message us about your cancellation and mention your reason too",
    },
    {
      icon: icons?.lock,
      question: "Can I pick up my order at a location?",
      answer:
        "Yes, you can pick up your order in person at our offline store: Raichur Hardware Chandramouleshwara Circle Siya Talab Raichur – 584101, Karnataka (Monday to Saturday – 10:00 AM to 7:00 PM)",
    },
    {
      icon: icons?.questionmark,
      question: "How do I report a problem and contact your team?",
      answer:
        "Visit the website, click on 'Contact' and follow the instructions. We will get in touch with you as soon as possible.",
    },
    {
      icon: icons?.money,
      question: "Is free shipping available?",
      answer:
        "Free shipping is not available. Shipping charges will be communicated to you by our team.",
    },
    {
      icon: icons?.plug,
      question: "Do you offer a warranty?",
      answer:
        "Warranty on specific products will be based on the manufacturer’s policy. Only certain products come with a warranty, which will be specified after checkout by our team",
    },
    {
      icon: icons?.time,
      question: "What are your store timings?",
      answer:
        "Our online store is open 24/7. The offline store operates from Monday to Saturday, 10:00 AM to 7:00 PM.",
    },
    {
      icon: icons?.questionmark,
      question: "How and when will my ordered goods be delivered?",
      answer:
        "After checkout, you can choose to either pick up your order from our offline store or have it delivered to your address. For delivery, a third-party delivery company or contractor will be hired, and their contact information along with the order ID/delivery ID will be shared with you",
    },
  ],

  // contact page
  contactTitle: "Get in Touch",
  contactDescription:
    "Have a question or need assistance? Our team is here to help. Fill out the form or use the contact information below to reach out.",
  contactImageUrl: "https://i.postimg.cc/c1XDdt89/Raichurhardware-map.jpg",

  // what our customers say testimonials
  heroTestimonials: [
    {
      name: "Sarah Smith",
      designation: "CEO, Hill Networks",
      message:
        "I absolutely love this product! It has transformed my daily routine and made my life so much easier.",
      image: "",
    },
    {
      name: "Alex Smith",
      designation: "CEO, Bill Networks",
      message:
        "I was hesitant at first, but this product has exceeded all my expectations. It's a game-changer!",
      image: "",
    },
    {
      name: "Joe Dan",
      designation: "CEO, Pill Networks",
      message:
        "I was hesitant at first, but this product has exceeded all my expectations. It's a game-changer!",
      image: "",
    },
  ],

  // global dropdowns
  globalDropdowns: [
    {
      name: "PVC, CPVC, SWR & ASTM Pipes",
      dropdowns: [
        "PVC Self-Fit Pipes",
        "PVC Plain Pipes",
        "PVC Self-Fit (slotted) Pipes",
        "PVC U Column Pipes Coupler Type",
        "ASTM Plumbing Pipes",
        "CPVC Pipes",
        "SWR Pipes",
      ],
    },
    {
      name: "Drainage & Sewage Pipes",
      dropdowns: ["Self-Fit Pipes", "Ring-Fit Pipes"],
    },
    {
      name: "ASTM Fittings",
      dropdowns: [
        "Coupler & Union",
        "Elbows",
        "Tee(s)",
        "Reducer & Reducing Bush",
        "End Cap & THRD End Plug",
        "Threaded Adapters (MTA & FTA)",
        "Bends",
        "Clip & Clamps",
        "Tank & Hex Nipple",
        "UPVC Valves",
        "Converter Couplers",
      ],
    },
    {
      name: "CPVC Fittings (SDR 11)",
      dropdowns: [
        "Coupler & Union(CPVC)",
        "Elbows(CPVC)",
        "Tee(CPVC)",
        "Reducer(CPVC)",
        "End Cap(CPVC)",
        "Threaded Adapters(CPVC)",
        "Bends & Transition Bush",
        "Clip & Clamps(CPVC)",
        "Tank Nipple",
        "CPVC Ball Valve",
        "Flange with Gasket",
        "Mixer",
      ],
    },
    {
      name: "CPVC fittings(Sch 40, 80)",
      dropdowns: ["CPVC Fittings (SCH 40)", "CPVC Fittings (SCH 80)"],
    },
    {
      name: "Agricultural Fittings",
      dropdowns: [
        "Coupler(Agri)",
        "Elbow 90° (Plain and THRD)",
        "Elbow 45° (Plain)",
        "Tee(Agri)",
        "End Cap (Plain and THRD)",
        "Threaded Adapter(Agri)",
        "Tail Piece(Agri)",
        "Butterfly Valve",
        "Service Saddle (THRD)",
        "Reducer(Agri)",
        "Reducing Bush",
        "Single Y (Reducing & non-reducing)",
      ],
    },
    {
      name: "Agricultural Fabricated Fittings",
      dropdowns: [
        "Bend (45° & 90°)",
        "Coupler(Agri Fab)",
        "Repairing Coupler (R/R)",
        "Reducer(Agri Fab)",
        "Tail Piece(Agri Fab)",
      ],
    },
    {
      name: "SWR Fittings (with ring)",
      dropdowns: [
        "Coupler(SWR)",
        "Bends(SWR)",
        "Tees(SWR)",
        "Cleaning Pipe",
        "Reducer(SWR)",
        "Single Y & Double Y",
      ],
    },
    {
      name: "SWR Self-fit fittings",
      dropdowns: [
        "Bend (Double Socket)",
        "Tee (Double Socket)",
        "Gully Trap",
        "Multi-Floor Trap",
        "Nahani Trap",
        "P-Trap & S-Trap",
        "Clip & Vent Cowl",
        "WC Connector",
        "Socket Plug & Door Cap",
      ],
    },
    {
      name: "Irrigation and Fittings",
      dropdowns: [
        "Drip Irrigation",
        "Sprinkle Irrigation",
        "Subsurface Drip",
        "PVC Ball Valves",
      ],
    },
    {
      name: "Bath Fittings",
      dropdowns: [
        "Faucets",
        "Shower",
        "Thermostatic Mixers",
        "Shower panel",
        "Water heaters",
        "Sanitary ware",
        "Wellness",
        "Shower enclosures",
        "Flushing systems",
        "Drains",
        "Bath Accessories",
      ],
    },
    {
      name: "Locks and Fittings",
      dropdowns: [
        "Digital locks",
        "Mortise locks",
        "Rim locks",
        "Cylindrical locks",
        "Padlocks",
        "Furniture locks",
        "Home décor handles",
        "Door controls",
        "Door fittings",
        "Wardrobe fittings",
        "Bed fittings",
        "Furniture fittings",
        "Kitchen fittings",
      ],
    },
    {
      name: "Kitchenware",
      dropdowns: [
        "Luxury Kitchen Sinks",
        "Quartz Kitchen Sinks",
        "Stainless steel sinks",
      ],
    },
    {
      name: "Pumpsets",
      dropdowns: [
        "Open Well Pumps",
        "Submersible Pumps",
        "Monoblock Pumps",
        "Jet Pumps",
        "Sewage Pumps",
        "Electric Induction Motors",
      ],
    },
    {
      name: "Booster Sets and water tanks",
      dropdowns: [
        "CMBE And CMBE Twin",
        "CM Single Booster",
        "SCALA1 and SCALA2 booster",
        "Shower and other Boosters",
        "Overhead Water Tanks",
      ],
    },
    {
      name: "Valves",
      dropdowns: [
        "Ball Valve",
        "Gate Valve",
        "Sluice Valve",
        "Horizontal Check Valve",
        "Vertical Check Valve",
      ],
    },
    {
      name: "Manhole Covers",
      dropdowns: ["Cast Iron Manhole covers"],
    },
  ],

  // featured logos
  featuredLogos: [
    {
      logo: "/company_logos/Finolex Pipes.png",
      link: "https://www.finolexpipes.com/",
    },
    {
      logo: "/company_logos/Taro.png",
      link: "https://www.taropumps.com/",
    },
    {
      logo: "/company_logos/jaquar.png",
      link: "https://www.jaquar.com/",
    },
    {
      logo: "/company_logos/godrej Locks.png",
      link: "https://www.godrej.com/godrej-locking-solutions-and-systems",
    },
    {
      logo: "/company_logos/Watertec.png",
      link: "https://watertecindia.com/",
    },
    {
      logo: "/company_logos/Carysil.png",
      link: "https://carysil.com/",
    },
    {
      logo: "/company_logos/schneider.png",
      link: "https://www.se.com/in/en/",
    },
    {
      logo: "https://i.postimg.cc/KzXdJXmg/Viking.png",
      link: "https://www.vikingindia.com/",
    },
    {
      logo: "/company_logos/essco.jpg",
      link: "https://www.esscobathware.com/",
    },
    {
      logo: "/company_logos/Aqua-tech.png",
      link: "https://www.aquatech.com/",
    },
    {
      logo: "/company_logos/Berger_Paints.png",
      link: "https://www.bergerpaints.com/",
    },
    {
      logo: "/company_logos/finolex plassion.png",
      link: "https://www.finolexdrip.com/",
    },
    {
      logo: "/company_logos/SKF BEARINGS.png",
      link: "https://www.skf.com/in",
    },
    {
      logo: "/company_logos/matrix ball valve.png",
      link: "https://www.matrixvalves.in/",
    },
    {
      logo: "/company_logos/grundfos.png",
      link: "https://www.grundfos.com/in",
    },
    {
      logo: "/company_logos/deepak.png",
      link: "https://deepakvalves.com/",
    },
  ],

  // brands
  brands: [
    "Finolex Pipes",
    "Taro Pumps",
    "Jaquar",
    "Godrej",
    "WaterTecIndia",
    "Carysil",
    "Schneider",
    "Viking",
    "Essco Bathware",
    "Aquatech",
    "Berger Paints",
    "Finolex Drip",
    "SKF",
    "Matrix Valves",
    "Grundfos",
    "Deepak Valves",
    "Others",
  ],
};

export default data;
