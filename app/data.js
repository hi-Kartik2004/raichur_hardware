import icons from "@/app/icons";

const data = {
  adminEmails: [
    "kudlu2004@gmail.com",
    "raichurhardware2024@gmail.com",
    "ddhara36@gmail.com",
    "bhuvandesai2006@gmail.com",
  ],

  // gst number
  gstNumber: "29AAHFR1020A1Z0",

  // logo
  logoUrl: "/raichur_hardware_logo_nobg.png",

  // name
  companyName: "Raichur Hardware",

  // phone numbers
  phones: ["+91 94488 00030"],

  // emails
  emails: ["raichurhardware2024@gmail.com"],

  // address
  address:
    "Old 12-10-49 , New 12-10-87 Near Chandramouleshwar circle, Lingasugur Road, Raichur Karnataka – 584101, India",

  // footer desc
  footerDescription:
    " Raichur hardware Store is your one-stop shop for high-quality products at affordable prices. Discover the best deals and enjoy a seamless shopping experience.",

  // footer reach
  footerReach: [
    {
      stat: "21000",
      description: "lorem ipsum dolor",
    },
    {
      stat: "21000",
      description: "lorem ipsum dolor",
    },
    {
      stat: "21000",
      description: "lorem ipsum dolor",
    },
  ],

  // social handles link
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
  linkedin: "https://linkedin.com",

  // terms
  termsOfService: "/terms",

  // privacy
  privacy: "/privacy",

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
    "Offering complete solutions for agricultural, irrigational, and water supply (plumbing) needs since 1970.",
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
    "/store_entrance_1.png",
    "/store/insider_8.jpg",
    "/store/insider_6.jpg",
    "/store/insider_5.jpg",
    "/store/insider_4.jpg",
    "/store/insider_3.jpg",
    "/store/insider_2.jpg",
    "/store/insider_1.jpg",
    "/store/people_in_store_2.jpg",
    "/people/team_pic_1.jpg",
    "/people/finolex_winning_2.jpg",
    "/certificates/jaquar_certificate.jpg",
  ],

  // about page
  aboutPageSections: [
    {
      aboutSectionBadgeText: "About the Founder",
      aboutSectionTitle: "The Founder of the Company",
      aboutSectionDescriptions: [
        "The company was founded in 1970 by the late Shri Jivraj Mulji Desai, a young and dynamic entrepreneur. He established Raichur Machinery Stores, a business specializing in ginning and pressing machines, general supplies, and paints.",
      ],
      aboutSectionImageUrl: "/image_of_seth_jeevraj.jpg",
    },
    {
      aboutSectionBadgeText: "Our Products",
      aboutSectionTitle:
        "Everything You Need for Your Home Improvement Projects",
      aboutSectionDescriptions: [
        "At Raichur Hardware, we offer a comprehensive selection of high-quality tools, hardware, and home improvement supplies to meet all your needs. From power tools and hand tools to gardening equipment, plumbing supplies, and electrical components, we have everything you need to tackle any project, big or small.",
        "Our knowledgeable staff is always on hand to provide expert advice and help you find the right products for your specific needs. Whether you're a seasoned DIYer or a first-time homeowner, we're here to support you every step of the way.",
      ],
      aboutSectionImageUrl: "/people/family_1.jpg",
    },
    {
      aboutSectionBadgeText: "Our Services",
      aboutSectionTitle: "Expert Advice and Personalized Support",
      aboutSectionDescriptions: [
        "In addition to our extensive product selection, Raichur Hardware also offers a range of services to support our customers. Our experienced staff can provide expert advice and guidance on everything from tool selection and project planning to troubleshooting and repair.",
        "We also offer a variety of hands-on workshops and DIY classes to help our customers learn new skills and tackle their home improvement projects with confidence. Whether you're a seasoned DIYer or a first-time homeowner, we're here to support you every step of the way.",
      ],
      aboutSectionImageUrl: "/people/crowd_1.jpg",
    },
    {
      aboutSectionBadgeText: "Our Services",
      aboutSectionTitle: "Expert Advice and Personalized Support",
      aboutSectionDescriptions: [
        "In addition to our extensive product selection, Raichur Hardware also offers a range of services to support our customers. Our experienced staff can provide expert advice and guidance on everything from tool selection and project planning to troubleshooting and repair.",
        "We also offer a variety of hands-on workshops and DIY classes to help our customers learn new skills and tackle their home improvement projects with confidence. Whether you're a seasoned DIYer or a first-time homeowner, we're here to support you every step of the way.",
      ],
      aboutSectionImageUrl: "/people/finolex_winning.jpg",
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
      question: "How long does it take to set up your product?",
      answer:
        "The setup process is designed to be quick and easy. Most customers can get up and running in just a few minutes. We provide detailed onboarding guides and our support team is available to help you every step of the way.",
    },
    {
      icon: icons?.questionmark,
      question: "How long does it take to set up your product?",
      answer:
        "The setup process is designed to be quick and easy. Most customers can get up and running in just a few minutes. We provide detailed onboarding guides and our support team is available to help you every step of the way.",
    },
    {
      icon: icons?.lock,
      question: "How long does it take to set up your product?",
      answer:
        "The setup process is designed to be quick and easy. Most customers can get up and running in just a few minutes. We provide detailed onboarding guides and our support team is available to help you every step of the way.",
    },
    {
      icon: icons?.plug,
      question: "How long does it take to set up your product?",
      answer:
        "The setup process is designed to be quick and easy. Most customers can get up and running in just a few minutes. We provide detailed onboarding guides and our support team is available to help you every step of the way.",
    },
  ],

  // contact page
  contactTitle: "Get in Touch",
  contactDescription:
    "Have a question or need assistance? Our team is here to help. Fill out the form or use the contact information below to reach out.",
  contactImageUrl: "/placeholder.svg",

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
        "Coupler & Union",
        "Elbows",
        "Tee(s)",
        "Reducer",
        "End Cap",
        "Threaded Adapters (MTA & FTA)",
        "Bends & Transition Bush",
        "Clip & Clamps",
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
        "Coupler",
        "Elbow 90° (Plain and THRD)",
        "Elbow 45° (Plain)",
        "Tee",
        "End Cap (Plain and THRD)",
        "Threaded Adapter (MTA & FTA)",
        "Tail Piece",
        "Butterfly Valve",
        "Service Saddle (THRD)",
        "Reducer",
        "Reducing Bush",
        "Single Y (Reducing & non-reducing)",
      ],
    },
    {
      name: "Agricultural Fabricated Fittings",
      dropdowns: [
        "Bend (45° & 90°)",
        "Coupler",
        "Repairing Coupler (R/R)",
        "Reducer",
        "Tail Piece",
      ],
    },
    {
      name: "SWR Fittings (with ring)",
      dropdowns: [
        "Coupler",
        "Bends",
        "Tees",
        "Cleaning Pipe",
        "Reducer",
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
      logo: "/company_logos/viking.png",
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
    {
      logo: "/company_logos/sonet.png",
      link: "https://www.sonetindia.com/",
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
    "Sonet India",
    "Others",
  ],
};

export default data;
