export type Project = {
  name: string;
  emoji: string;
  description?: string;
  url: string;
  live?: string;
};

export type ProjectYear = {
  year: number;
  projects: Project[];
};

export const projectsByYear: ProjectYear[] = [
  {
    year: 2026,
    projects: [
      {
        name: "runner-bot",
        emoji: "🏃",
        description: "A LINE bot that keeps your runner group running.",
        url: "https://github.com/betich/runner-bot",
      },
      {
        name: "mini-home-displays",
        emoji: "📟",
        description: "I had an LED matrix panel and a mini OLED display left unused so why not do something fun :)",
        url: "https://github.com/betich/mini-home-displays",
      },
    ],
  },
  {
    year: 2025,
    projects: [
      {
        name: "contester.life",
        emoji: "✨",
        description: "Gathers competition opportunities, camps, and activities for students.",
        url: "https://contester.life",
        live: "https://contester.life",
      },
      {
        name: "intania jukebox",
        emoji: "🔊",
        description: "Web-based music player, powered by raspberry pi and Spotify API.",
        url: "https://github.com/betich/intania-jukebox",
      },
    ],
  },
  {
    year: 2024,
    projects: [
      {
        name: "color guessor toy",
        emoji: "🎨",
        description: "Project for \"Robotics Project II\" subject of the Robotics AI program, in collaboration with students from the Industrial Design program, Faculty of Architecture.",
        url: "https://github.com/betich/robo2-color-guessor",
      },
      {
        name: "junior webmaster camp 13",
        emoji: "💖",
        description: "Web services for a camp teaching web development to high school students.",
        url: "https://github.com/webmastercamp",
        live: "https://13.jwc.in.th",
      },
      {
        name: "cu-tu 2024 unity football match",
        emoji: "⚽️",
        description: "Interactive website for the CU-TU Unity Football Match 2024 event.",
        url: "https://github.com/isd-sgcu/cutu-2024",
      },
      {
        name: "vid love vid u 2024",
        emoji: "🌷",
        description: "Valentine's day interactive website for Chulalongkorn University.",
        url: "https://github.com/vidlovevidu-chula/vlvu2024-website",
        live: "https://vidlovevidu.com",
      },
    ],
  },
  {
    year: 2023,
    projects: [
      {
        name: "rub puen kao mai 2023",
        emoji: "👩‍🎓",
        description: "E-stamp and registration system welcoming new students to Chulalongkorn University.",
        url: "https://github.com/isd-sgcu/rpkm66-frontend",
      },
      {
        name: "vishnu 21st",
        emoji: "🔮",
        description: "Event website for the Faculty of Engineering freshman welcome event.",
        url: "https://github.com/esc-chula/vishnu21-frontend",
      },
      {
        name: "ped4you",
        emoji: "🦆",
        description: "ช่วยทุกคนกาบัตรเลือกตั้งของตัวเองได้อย่างมั่นใจ — An interactive website that provides information about the 2023 Election, including an Election Simulator, a game that guides you through the process of the election. Integrated with a machine learning model that asseses if the election ballot is valid or not.",
        url: "https://github.com/PED4you/ped4you-website",
        live: "https://ped4you.com",
      },
      {
        name: "cu wander",
        emoji: "👞",
        description: "App for collecting rewards by walking around Chulalongkorn University.",
        url: "https://www.instagram.com/cu_wander/",
      },
      {
        name: "cu intania open house 2023",
        emoji: "🪐",
        description: "Interactive quiz to help prospective students find their best-fit major.",
        url: "https://github.com/thinc-org/intania-oph",
        live: "https://intania-oph.vercel.app/",
      },
      {
        name: "vid love vid u 2023",
        emoji: "🌷",
        description: "Take a quiz to discover your love personality and collect e-stamps to win prizes.",
        url: "https://github.com/vidlovevidu-chula/vlvu2023-website",
        live: "https://vidlovevidu.com",
      },
    ],
  },
  {
    year: 2022,
    projects: [
      {
        name: "eic robocup website",
        emoji: "🤖",
        description: "Website for the EIC Robocup club at Chulalongkorn University.",
        url: "https://github.com/robocup-eic/eic-website",
        live: "https://eicrobocup.com",
      },
      {
        name: "rub puen kao mai 2022",
        emoji: "👨‍🎓",
        description: "E-stamp and registration system for the 2022 freshman welcome event.",
        url: "https://github.com/isd-sgcu/rnkm65-frontend",
      },
      {
        name: "tcas exam schedule generator",
        emoji: "📕",
        description: "A website for generating a study and exam schedule for students who are applying for universities in Thailand, the website gained a small traction via twitter and my friends.",
        url: "https://github.com/betich/tcas3-schedule-generator",
        live: "https://tcas.betich.me",
      },
      {
        name: "programming.in.th",
        emoji: "💻",
        description: "Platform for practicing algorithms, data structures, and competitive programming.",
        url: "https://github.com/programming-in-th/programming.in.th",
        live: "https://programming.in.th",
      },
      {
        name: "tucmc website",
        emoji: "👩‍💻",
        description: "Website for the Triam Udom Computer Club.",
        url: "https://github.com/triamudomcmc/tucmc-site",
        live: "https://clubs.triamudom.ac.th/",
      },
      {
        name: "triam udom clubs registration system",
        emoji: "📝",
        description: "Club registration system used by 3,000+ students at Triam Udom Suksa School.",
        url: "https://github.com/triamudomcmc/clubreg",
        live: "https://register.clubs.triamudom.ac.th/",
      },
      {
        name: "triam udom open house 2022",
        emoji: "🛰️",
        description: "Interactive open house website for Triam Udom Suksa School.",
        url: "https://github.com/triamudomcmc/openhouse2022",
        live: "https://openhouse-2022.vercel.app/",
      },
    ],
  },
  {
    year: 2021,
    projects: [
      {
        name: "salimtype",
        emoji: "⌨️",
        description: "Typing practice website with Thai language support.",
        url: "https://github.com/betich/salimtype",
        live: "https://salim-type.web.app",
      },
      {
        name: "the 5th stupid hackathon thailand",
        emoji: "👾",
        description: "Website for the 5th Stupid Hackathon Thailand — build something useless.",
        url: "https://github.com/StupidHackTH/Stupid-Hackathon-5-Webpage",
        live: "https://stupid.hackathon.in.th/5",
      },
      {
        name: "tocpc website",
        emoji: "🖥️",
        description: "Website for the Thailand Online Competitive Programming Contest 2021.",
        url: "https://github.com/TOCPC/tocpc-site",
        live: "https://tocpc.codes",
      },
      {
        name: "triam udom schedule generator",
        emoji: "📅",
        description: "Study schedule generator for Triam Udom Suksa School students.",
        url: "https://github.com/triamudomcmc/schedule-generator",
        live: "https://schedule.tucm.cc",
      },
      {
        name: "online loy kratong",
        emoji: "🌿",
        description: "Online Loy Kratong animation for Triam Udom Suksa School.",
        url: "https://github.com/triamudomcmc/loy-kratong",
        live: "https://loy-kratong.vercel.app/",
      },
    ],
  },
];
