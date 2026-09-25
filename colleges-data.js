// Extensive Database of Real Indian Colleges
const collegesData = [
    // --- ENGINEERING ---
    {
        name: "Indian Institute of Technology (IIT)",
        acronym: "IITD",
        location: "New Delhi, NCR",
        type: "Engineering",
        badge: "#1 Ranked",
        cover: "https://images.unsplash.com/photo-1592284379477-8c460a379417?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        logoColor: "var(--primary)",
        fees: "₹2.35 Lacs",
        package: "₹20.5 Lacs",
        rating: "4.9"
    },
    {
        name: "Indian Institute of Technology (IIT)",
        acronym: "IITB",
        location: "Mumbai, Maharashtra",
        type: "Engineering",
        badge: "Top Placements",
        cover: "https://images.unsplash.com/photo-1574059086431-77b310d7a0c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        logoColor: "var(--primary)",
        fees: "₹2.30 Lacs",
        package: "₹22.5 Lacs",
        rating: "4.9"
    },
    {
        name: "Delhi Technological University",
        acronym: "DTU",
        location: "New Delhi, NCR",
        type: "Engineering",
        badge: "High ROI",
        cover: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        logoColor: "#0284c7",
        fees: "₹2.19 Lacs",
        package: "₹15.3 Lacs",
        rating: "4.5"
    },
    {
        name: "RV College of Engineering",
        acronym: "RVCE",
        location: "Bangalore, Karnataka",
        type: "Engineering",
        badge: "Top IT Hub",
        cover: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        logoColor: "#ea580c",
        fees: "₹9.8 Lacs",
        package: "₹10.5 Lacs",
        rating: "4.4"
    },
    {
        name: "Dhirubhai Ambani Institute of Info & Comm Tech",
        acronym: "DA-IICT",
        location: "Gandhinagar, Gujarat",
        type: "Engineering",
        badge: "Tech Driven",
        cover: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        logoColor: "#8b5cf6",
        fees: "₹3.8 Lacs",
        package: "₹13.7 Lacs",
        rating: "4.6"
    },

    // --- MANAGEMENT ---
    {
        name: "Indian Institute of Management (IIM)",
        acronym: "IIMA",
        location: "Ahmedabad, Gujarat",
        type: "Management",
        badge: "Top MBA",
        cover: "https://images.unsplash.com/photo-1546410531-ad7ce3849890?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        logoColor: "#ef4444",
        fees: "₹12.0 Lacs",
        package: "₹32.8 Lacs",
        rating: "5.0"
    },
    {
        name: "Indian Institute of Management (IIM)",
        acronym: "IIMB",
        location: "Bangalore, Karnataka",
        type: "Management",
        badge: "Unicorn Hub",
        cover: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        logoColor: "#ef4444",
        fees: "₹12.2 Lacs",
        package: "₹33.8 Lacs",
        rating: "4.9"
    },
    {
        name: "Faculty of Management Studies",
        acronym: "FMS",
        location: "New Delhi, NCR",
        type: "Management",
        badge: "Unbeatable ROI",
        cover: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        logoColor: "#c2410c",
        fees: "₹1.0 Lacs",
        package: "₹32.4 Lacs",
        rating: "4.9"
    },
    {
        name: "S.P. Jain Institute of Management",
        acronym: "SPJIMR",
        location: "Mumbai, Maharashtra",
        type: "Management",
        badge: "Top Corporate",
        cover: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        logoColor: "#0369a1",
        fees: "₹20.4 Lacs",
        package: "₹32.0 Lacs",
        rating: "4.8"
    },

    // --- MEDICAL ---
    {
        name: "All India Institute of Medical Sciences",
        acronym: "AIIMS",
        location: "New Delhi, NCR",
        type: "Medical",
        badge: "Top Medical",
        cover: "https://images.unsplash.com/photo-1538108149393-cebb47ac17e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        logoColor: "#10b981",
        fees: "₹0.1 Lacs",
        package: "₹15.0 Lacs",
        rating: "4.9"
    },
    {
        name: "Grant Medical College",
        acronym: "GMC",
        location: "Mumbai, Maharashtra",
        type: "Medical",
        badge: "Old & Reputed",
        cover: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        logoColor: "#059669",
        fees: "₹1.1 Lacs",
        package: "₹12.0 Lacs",
        rating: "4.6"
    },
    {
        name: "St. John's Medical College",
        acronym: "SJMC",
        location: "Bangalore, Karnataka",
        type: "Medical",
        badge: "Private Medical",
        cover: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        logoColor: "#34d399",
        fees: "₹6.5 Lacs",
        package: "₹10.0 Lacs",
        rating: "4.5"
    },
    {
        name: "B. J. Medical College",
        acronym: "BJMC",
        location: "Ahmedabad, Gujarat",
        type: "Medical",
        badge: "High Clinical",
        cover: "https://images.unsplash.com/photo-1551076805-e1869043e560?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        logoColor: "#10b981",
        fees: "₹0.25 Lacs",
        package: "₹11.0 Lacs",
        rating: "4.7"
    },

    // --- DESIGN ---
    {
        name: "National Institute of Design",
        acronym: "NID",
        location: "Ahmedabad, Gujarat",
        type: "Design",
        badge: "Top Design",
        cover: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        logoColor: "#8b5cf6",
        fees: "₹4.0 Lacs",
        package: "₹14.0 Lacs",
        rating: "4.7"
    },
    {
        name: "National Institute of Fashion Technology",
        acronym: "NIFT",
        location: "New Delhi, NCR",
        type: "Design",
        badge: "Fashion Leaders",
        cover: "https://images.unsplash.com/photo-1558769132-cb1fac0874e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        logoColor: "#db2777",
        fees: "₹3.2 Lacs",
        package: "₹11.5 Lacs",
        rating: "4.6"
    },
    {
        name: "National Institute of Fashion Technology",
        acronym: "NIFT",
        location: "Mumbai, Maharashtra",
        type: "Design",
        badge: "Creative Hub",
        cover: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        logoColor: "#db2777",
        fees: "₹3.1 Lacs",
        package: "₹10.5 Lacs",
        rating: "4.5"
    }
];
