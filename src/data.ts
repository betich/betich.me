export interface WorkExperience {
  position: string;
  type: string;
  company: string;
  url: string;
  years: string[];
  details: string[];
}

export const workExperience: WorkExperience[] = [
  {
		position: 'Software Engineer',
    type: 'Internship',
		company: 'Sertis Company Limited',
		url: 'https://sertiscorp.com/',
		years: ['Jun 2025', 'Oct 2025'],
		details: [
      'Helped develop and implement a design tokens system that synchronizes work from Figma by the UX/UI team with the dev team by converting them into code automatically using Style Dictionary.',
      'Used ReactJS to build front-end systems for enterprise-grade applications.',
		]
	},
  {
    position: "Data Scientist",
    type: "Internship",
    company: "Bualuang Securities Public Company Limited",
    url: "https://www.bualuang.co.th/",
    years: ["Jun 2024", "Jul 2024"],
    details: [
      "Developed artificial neural network models to predict values and classify data based on historical data.",
      "Researched about recommendation systems and deep recommender systems to effectively recommend products to customers.",
    ],
  },
  {
    position: "Front-end Web Developer",
    type: "Part-time",
    company: "Gamlytics (startup)",
    url: "https://gamlytics.gg/",
    years: ["Jun 2023", "Aug 2023"],
    details: [
      "Developed the web frontend of Gamlytics, an AI powered analytics and management platform for E-Sports using NextJS, React and TailwindCSS.",
    ],
  },
];

export const projects: Project[] = [
  {
    name: "Contester.life",
    details: "A website that gathers gather competition opportunities, camps, and activities that may be the starting point of great opportunities",
    url: "https://contester.life",
    year: "2025",
  },
  {
    name: "Intania Jukebox",
    details: "Web-based music player, powered by raspberry pi.",
    url: "https://github.com/betich/intania-jukebox",
    year: "2024",
  },
  {
    name: "Color Guessor Toy",
    details:
      'Project for "Robotics Project II" subject of the Robotics AI program, in collaboration with students from the Industrial Design program, Faculty of Architecture.',
    url: "https://github.com/betich/robo2-color-guessor",
    year: "2024",
  },
  {
    name: "Ped4You",
    details:
      "ช่วยทุกคนกาบัตรเลือกตั้งของตัวเองได้อย่างมั่นใจ — An interactive website that provides information about the 2023 Election, including an Election Simulator, a game that guides you through the process of the election. Integrated with a machine learning model that asseses if the election ballot is valid or not.",
    url: "https://github.com/PED4you/ped4you-website",
    year: "2023",
  },
  {
    name: "TCAS Schedule Generator",
    details:
      "A website for generating a study and exam schedule for students who are applying for universities in Thailand, the website gained a small traction via twitter and my friends.",
    url: "https://tcas.betich.me",
    year: "2022",
  },
];

export interface Project {
  name: string;
  details: string;
  url: string;
  year?: string;
}

export const contributions = [
  {
    name: "Junior Webmaster Camp 13",
    details: "Web services for Junior Webmaster Camp 13, a camp that teaches web development to high school students.",
    url: "13.jwc.in.th",
  },
  {
    name: "Vid Love Vid U 2024",
    details: "Initiated and coached the website team of the Vid Love Vid U 2024 event.",
    url: "https://github.com/vidlovevidu-chula/vlvu2024-website",
  },
  {
    name: "Vishnu 21st",
    details:
      "Worked with the PR team and IT team for Vishnu 21st, an event that welcomes new students to the Faculty of Engineering, Chulalongkorn University.",
    url: "instagram.com/vishnu21st",
  },
  {
    name: "Food & Film Festival 2023",
    details: "Lead the Graphic Design team for Food & Film Festival 2023, an event in Chulalongkorn University.",
    url: "instagram.com/foodfilmfest.cu/",
  },
  {
    name: "PED4you",
    details:
      "Initiated and developed an interactive website that provides information about the 2023 Election, including an Election Simulator, a game that guides you through the process of the election. Integrated with a machine learning model that asseses if the election ballot is valid or not. This project was used by more than 10,000 users and was featured in several news articles.",
    url: "github.com/PED4you/ped4you-website",
  },
  {
    name: "Vid Love Vid U 2023",
    details:
      "Initiated and developed an interactive website for Vid Love Vid U, a Valentine's day event. Take a quiz to discover your love personality and collect E-Stamps to win prizes.",
    url: "github.com/vidlovevidu-chula/vlvu-website",
  },
  {
    name: "Programming.in.th",
    details:
      "Contributed in developed the front-end for Programming.in.th, a website for practicing algorithms, data structures and competitive programming.",
    url: "programming.in.th",
  },
  {
    name: "Intania Open House 2023",
    details: "The website for Intania Open House 2023, with an interactive quiz to see which major suits you the best.",
    url: "github.com/thinc-org/intania-oph",
  },
  {
    name: "EIC Robocup Website",
    details: "Initiated and developed a website for the EIC club, Chulalongkorn University.",
    url: "https://github.com/robocup-eic/eic-website",
  },
  {
    name: "TOCPC Website",
    details: "The website for Thailand Online Competitive Programming Contest 2021.",
    url: "https://github.com/TOCPC/tocpc-site",
  },
  {
    name: "The 5th Stupid Hackathon Thailand Website",
    details: "The website for the 5th Stupid Hackathon Thailand.",
    url: "stupid.hackathon.in.th/5",
  },
];
