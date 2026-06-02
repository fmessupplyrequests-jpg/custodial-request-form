// -------------------------------
// PRODUCT DATABASE
// -------------------------------
const products = {
  // PAPER PRODUCTS
  "Natural Multifold Towel": {
    short: "Multifold Towels",
    category: "Paper Products",
    description: "Natural Multifold Towel, GJO21100",
    vendor: "VIP Office",
    url: "https://www.vipoffice.com/Product/GJO/21100/11970426"
  },

  "Toilet Tissue": {
    short: "Toilet Tissue",
    category: "Paper Products",
    description: "Small roll bath tissue, GEN500",
    vendor: "VIP Office",
    url: ["https://www.vipoffice.com/Product/GJO/2540096/1026772774", "https://www.vipoffice.com/Product/GJO/2550096/1026772775"]
  },

  // TRASH BAGS
  "Black Can Liners 16 gal": {
    short: "Trash bags, small",
    category: "Trash Bags",
    description: "Everyday Genuine Joe, Black can liners. 1.0mil/500 per case/16 gallon",
    vendor: "VIP Office",
    url: "https://www.vipoffice.com/Product/EJO/LD243212/1076289124"
  },

  "Plasticplace 65 gal": {
    short: "Trash bags, large",
    category: "Trash Bags",
    description: "Plasticplace, 50\"x60\" black trash bag, 100 count/65 gallon/1.2 thickness",
    vendor: "Amazon",
    url: "https://www.amazon.com/dp/B01G24GWUE"
  },

  "Green Liner Cafeteria Bags": {
    short: "Trash bags, green",
    category: "Trash Bags",
    description: "Green Liner, Premium quality can liners, 100 Bags per case, 1.1mil, CPPG46-CS",
    vendor: "SunCoast Paper and Chemical",
    url: "https://suncoastpaper.com/p/CPPG46/Green-Liner-40-x-46-11-mil/"
  },

  // CLEANERS & CHEMICALS
  "Symmetry Hand Wash": {
    short: "Symmetry Hand Wash",
    category: "Cleaners & Chemicals",
    description: "Symmetry, Green certified foaming hand wash, 6 count x 1250ml",
    vendor: "Haskins Doyle",
    url: "https://www.haskinsinc.com/catalog/CatalogProductDetail.aspx?itemno=BUC-90091120"
  },

  "Buckeye E15": {
    short: "Buckeye E15 Cleaner",
    category: "Cleaners & Chemicals",
    description: "Buckeye Eco E15 Hydrogen Peroxide Cleaner",
    vendor: "Haskins Doyle",
    url: "https://www.haskinsinc.com/catalog/CatalogProductDetail.aspx?itemno=BUC-60151400"
  },

  "Buckeye E23": {
    short: "Buckeye E23 Disinfectant",
    category: "Cleaners & Chemicals",
    description: "Buckeye Eco E23 Disinfectant",
    vendor: "Haskins Doyle",
    url: "https://www.haskinsinc.com/catalog/CatalogProductDetail.aspx?itemno=BUC-60231400"
  },

  "Buckeye E33": {
    short: "Buckeye E33 Floor Cleaner",
    category: "Cleaners & Chemicals",
    description: "Buckeye Eco E33 Floor Cleaner",
    vendor: "Haskins Doyle",
    url: "https://www.haskinsinc.com/catalog/CatalogProductDetail.aspx?itemno=BUC-60331400"
  },

  "OdoBan Lavender": {
    short: "OdoBan Lavender",
    category: "Cleaners & Chemicals",
    description: "OdoBan, Lavender, 4 gallons per case",
    vendor: "VIP Office",
    url: "https://www.vipoffice.com/Product/ODO/911162G4CT/1047998588"
  },

  "OdoBan Eucalyptus": {
    short: "OdoBan Eucalyptus",
    category: "Cleaners & Chemicals",
    description: "Odoban, Eucalyptus, 4 gallons per case",
    vendor: "VIP Office",
    url: "https://www.vipoffice.com/Product/ODO/911062G4CT/1047998587"
  },

  "Purox Klean Bleach": {
    short: "Purox Klean Bleach",
    category: "Cleaners & Chemicals",
    description: "Purox Klean Bleach",
    vendor: "Mobile Janitorial Supply",
    url: "https://www.mobilejanitorialsupply.com/purox-germicidal-liquid-bleach-6-extra-strength-epa-1-gal-bottle/"
  },

  "Super-Sorb Lemon": {
    short: "Super-Sorb Lemon",
    category: "Cleaners & Chemicals",
    description: "Super-Sorb, lemon, 3 pack of 12 oz cans",
    vendor: "Amazon",
    url: "https://www.amazon.com/Super-Instant-Absorbent-Clean-Vomit/dp/B07PFYDH1T"
  },

  "Boardwalk Foaming Cleaner": {
    short: "Boardwalk Foaming Cleaner",
    category: "Cleaners & Chemicals",
    description: "Boardwalk all purpose foaming cleaner, 12 cans of 19 oz aerosol spray",
    vendor: "Amazon",
    url: "https://www.amazon.com/Boardwalk-All-Purpose-Foaming-Cleaner-ammonia/dp/B009R6049K"
  },

  "Sprayway Glass Cleaner": {
    short: "Sprayway Glass Cleaner",
    category: "Cleaners & Chemicals",
    description: "Sprayway glass cleaner, SW050, Pack of 12 cans",
    vendor: "Amazon",
    url: "https://www.amazon.com/dp/B000BQPIGY"
  },

  "Clorox Urine Remover": {
    short: "Clorox Urine Remover",
    category: "Cleaners & Chemicals",
    description: "Clorox Urine Remover",
    vendor: "Amazon",
    url: "https://a.co/d/05zggdgR"
  },

  "WOW Stainless Steel Cleaner": {
    short: "WOW Stainless Steel Cleaner",
    category: "Cleaners & Chemicals",
    description: "WOW Stainless Steel Cleaner",
    vendor: "Amazon",
    url: "https://a.co/d/09mH2Z8F"
  },

  "Pine-sol": {
    short: "Pine-sol",
    category: "Cleaners & Chemicals",
    description: "Pine-sol Multi-Surface Cleaner",
    vendor: "VIP Office",
    url: "https://www.vipoffice.com/Product/CLO/60160CT/1080428431"
  },

  "Pathfinder AP Carpet Cleaner": {
    short: "Carpet Cleaner Solution",
    category: "Cleaners & Chemicals",
    description: "Carpet Cleaner in 5 Gallon Jug, ITEM #BUC-53705000",
    vendor: "HASKINS DOYLE",
    url: "https://www.haskinsinc.com/catalog/catalogproductdetail.aspx?itemno=BUC-53705000"
  },

  // PPE / GLOVES
  "TitanFlex Heavy Duty Gloves, Large": {
    short: "TitanFlex Heavy Duty Gloves, Large",
    category: "PPE / Gloves",
    description: "TitanFlex Heavy Duty Gloves, Large",
    vendor: "Amazon",
    url: "https://a.co/d/02n1GdPs"
  },

  "TitanFlex Heavy Duty Gloves, Medium": {
    short: "TitanFlex Heavy Duty Gloves, Medium",
    category: "PPE / Gloves",
    description: "TitanFlex Heavy Duty Gloves, Medium",
    vendor: "Amazon",
    url: "https://a.co/d/0es0RmXX"
  },

  // TOOLS & EQUIPMENT
  "Dust Mop, 5inx60in": {
    short: "Dust Mop, (5inx60in)",
    category: "Tools & Equipment",
    description: "60in wide dust mop head",
    vendor: "HASKINS DOYLE",
    url: "https://www.haskinsinc.com/catalog/CatalogProductDetail.aspx?itemno=MFM-DM60"
  },

  "Dust Mop, 5inx36in": {
    short: "Dust Mop, (5inx36in)",
    category: "Tools & Equipment",
    description: "36in wide dust mop head",
    vendor: "HASKINS DOYLE",
    url: "https://www.haskinsinc.com/catalog/CatalogProductDetail.aspx?itemno=MFM-DM36"
  },

  "Dust Mop, 5inx24in": {
    short: "Dust Mop, (5inx24in)",
    category: "Tools & Equipment",
    description: "24in wide dust mop head",
    vendor: "HASKINS DOYLE",
    url: "https://www.haskinsinc.com/catalog/CatalogProductDetail.aspx?itemno=MFM-DM24"
  }

  "Black Diamond 14in Green Pad": {
    short: "14in Green Pad",
    category: "Tools & Equipment",
    description: "14in Green Pad for Floor Scrubber",
    vendor: "HASKINS DOYLE",
    url: "https://www.haskinsinc.com/catalog/CatalogProductDetail.aspx?itemno=AMR-FBD20G"
  },

"Black Diamond 14in Yellow Pad": {
    short: "14in Yellow Pad",
    category: "Tools & Equipment",
    description: "14in Yellow Pad for Floor Scrubber",
    vendor: "HASKINS DOYLE",
    url: "https://www.haskinsinc.com/catalog/CatalogProductDetail.aspx?itemno=AMR-FBD20Y"
  },

"Black Diamond 14in White Pad": {
    short: "14in White Pad",
    category: "Tools & Equipment",
    description: "14in White Pad for Floor Scrubber",
    vendor: "HASKINS DOYLE",
    url: "https://www.haskinsinc.com/catalog/CatalogProductDetail.aspx?itemno=AMR-FBD20W"
  },
};

