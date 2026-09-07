import { useState, useEffect } from "react";
import c1 from "@/assets/campus-1.jpg";
import c2 from "@/assets/campus-2.jpg";
import c3 from "@/assets/campus-3.jpg";
import c4 from "@/assets/campus-4.jpg";
import c5 from "@/assets/campus-5.jpg";
import c6 from "@/assets/campus-6.jpg";
import bio from "@/assets/biology-lab.jpg";
import chem from "@/assets/chemistry-lab.jpg";
import comp from "@/assets/computer-lab.jpg";

export interface FeatureItem {
  title: string;
  text: string;
  tag: string;
}

export interface CampusPreviewItem {
  title: string;
  desc: string;
  cat: string;
  imgUrl?: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  text: string;
}

export interface TickerItem {
  tag: string;
  text: string;
  link: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  dept: string;
  subject: string;
  qual: string;
  exp: string;
  email?: string;
  phone?: string;
  imageUrl?: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  desc: string;
}

export interface ValueItem {
  title: string;
  desc: string;
}

export interface AdmissionStepItem {
  step: string;
  title: string;
  text: string;
  tag: string;
}

export interface AdmissionDateItem {
  label: string;
  value: string;
  status: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface InfrastructureItem {
  title: string;
  cat: string;
  tag: string;
  text: string;
  imgUrl?: string;
}

export interface AmenityItem {
  title: string;
  desc: string;
}

export interface GalleryPhotoItem {
  title: string;
  cat: string;
  alt: string;
  src: string;
}

export interface FeeRowItem {
  cls: string;
  admission: string;
  monthly: string;
  exam: string;
  other: string;
}

export interface PolicyItem {
  title: string;
  points: string[];
}

export interface CircularItem {
  date: string;
  title: string;
  ref: string;
}

export interface DisclosureSection {
  title: string;
  rows: [string, string][];
}

export interface StudentRecord {
  id: string;
  rollNo: string;
  admissionNo: string;
  name: string;
  fatherName: string;
  motherName?: string;
  dob?: string;
  studentClass?: string;
  className?: string;
  stream?: string;
  section?: string;
  phone?: string;
  email?: string;
  address?: string;
  gender?: "Male" | "Female" | "Other" | string;
  status: "Active" | "Alumni" | "Transferred" | "Inactive" | "Graduated" | string;
  attendancePercentage?: number;
  attendancePercent?: number;
  academicYear?: string;
  photoUrl?: string;
}

export interface ExamSubjectScore {
  subjectName: string;
  marksObtained: number;
  maxMarks: number;
  theoryMarks?: number;
  practicalMarks?: number;
  grade?: string;
}

export interface StudentResultRecord {
  id: string;
  studentId: string;
  rollNo: string;
  studentName: string;
  studentClass?: string;
  className?: string;
  stream?: string;
  fatherName?: string;
  motherName?: string;
  dob?: string;
  admissionNo?: string;
  studentPhotoUrl?: string;
  examName: string;
  academicSession?: string;
  academicYear?: string;
  issueDate: string;
  scores?: ExamSubjectScore[];
  subjectScores?: any[];
  totalMarksObtained?: number;
  totalMaxMarks?: number;
  percentage?: number;
  overallGrade?: string;
  resultStatus?: "Passed with Distinction" | "Passed (First Division)" | "Passed (Second Division)" | "Passed" | "Compartment" | "Needs Improvement" | string;
  rank?: string;
  teacherRemarks?: string;
}

export interface SiteContent {
  // Brand & Navbar
  schoolName: string;
  schoolShortName: string;
  tagline: string;
  estdYear: string;
  affiliationCode: string;
  logoUrl?: string;

  // Contact Info
  phone: string;
  email: string;
  officeHours: string;
  address: string;
  mapEmbedUrl: string;

  // Hero Section
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  heroBadge: string;
  heroImageUrl?: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;

  // Statistics
  stat1Value: number;
  stat1Suffix: string;
  stat1Label: string;
  stat1Sub: string;

  stat2Value: number;
  stat2Suffix: string;
  stat2Label: string;
  stat2Sub: string;

  stat3Value: string;
  stat3Label: string;
  stat3Sub: string;

  stat4Value: number;
  stat4Suffix: string;
  stat4Label: string;
  stat4Sub: string;

  // Principal's Desk
  principalName: string;
  principalRole: string;
  principalQual: string;
  principalQuote: string;
  principalMessage: string;
  principalImageUrl?: string;

  // Dignitaries
  cmName: string;
  cmRole: string;
  cmDept: string;
  cmQuote: string;

  eduMinisterName: string;
  eduMinisterRole: string;
  eduMinisterDept: string;
  eduMinisterQuote: string;

  directorName: string;
  directorRole: string;
  directorDept: string;
  directorQuote: string;

  // Faculty Directory
  facultyList: FacultyMember[];

  // Students & Results Directory (ERP)
  studentsList: StudentRecord[];
  resultsList: StudentResultRecord[];

  // Why Choose Us (6 Features)
  features: FeatureItem[];

  // Campus Previews (4 Labs / Facilities)
  campusPreviews: CampusPreviewItem[];

  // Testimonials (3 Voices)
  testimonials: TestimonialItem[];

  // Notice Ticker (4 items)
  tickerItems: TickerItem[];

  // Admissions
  admissionSession: string;
  admissionDeadline: string;
  admissionStatus: string;
  admissionNote: string;
  admissionSteps: AdmissionStepItem[];
  admissionDocs: string[];
  admissionDates: AdmissionDateItem[];
  admissionFaqs: FaqItem[];

  // About Page
  aboutStoryTitle: string;
  aboutStoryP1: string;
  aboutStoryP2: string;
  aboutHighlights: string[];
  aboutTimeline: TimelineItem[];
  aboutValues: ValueItem[];

  // Infrastructure Page
  infrastructureList: InfrastructureItem[];
  amenitiesList: AmenityItem[];

  // Gallery Page
  galleryPhotos: GalleryPhotoItem[];

  // Fee Structure Page
  feeRows: FeeRowItem[];
  feeNotes: string[];

  // Policies Page
  policiesList: PolicyItem[];

  // Circulars Page
  circularsList: CircularItem[];

  // Mandatory Disclosure Page
  disclosureSections: DisclosureSection[];
}

export const DEFAULT_SITE_CONTENT: SiteContent = {
  // Brand & Navbar
  schoolName: "Govt. Sr. Sec. School Sangla",
  schoolShortName: "GSSS Sangla",
  tagline: "EXCELLENCE IN EDUCATION • KINNAUR",
  estdYear: "1952",
  affiliationCode: "CBSE Affiliation No: 6200XX",
  logoUrl: "",

  // Contact Info
  phone: "+91 82193-98898",
  email: "principal5010sangla@gmail.com",
  officeHours: "Monday to Saturday: 9:00 AM - 4:00 PM",
  address: "Sangla Valley, Kinnaur District, Himachal Pradesh - 172106",
  mapEmbedUrl: "https://www.openstreetmap.org/export/embed.html?bbox=78.24%2C31.39%2C78.32%2C31.45&layer=mapnik&marker=31.4234%2C78.2664",

  // Hero Section
  heroTitle: "Nurturing Minds in the",
  heroHighlight: "Himalayas.",
  heroSubtitle:
    "Government Senior Secondary School Sangla delivers quality education, modern digital laboratories, and holistic values against the majestic peaks of Kinnaur, Himachal Pradesh.",
  heroBadge: "Admissions Open for Session 2026-27",
  heroImageUrl: "",
  heroCtaPrimary: "Apply for Admission",
  heroCtaSecondary: "Discover Our Story",

  // Statistics
  stat1Value: 1000,
  stat1Suffix: "+",
  stat1Label: "Students Enrolled",
  stat1Sub: "From Primary to Class XII",

  stat2Value: 28,
  stat2Suffix: "",
  stat2Label: "Qualified Faculty & Staff",
  stat2Sub: "Verified subject specialists & lecturers",

  stat3Value: "CBSE",
  stat3Label: "Affiliated Board",
  stat3Sub: "Central Board New Delhi",

  stat4Value: 100,
  stat4Suffix: "%",
  stat4Label: "Board Pass Rate",
  stat4Sub: "Excellence in Class 10 & 12",

  // Principal's Desk
  principalName: "Sh. Balvinder Singh Negi",
  principalRole: "Principal, GSSS Sangla",
  principalQual: "M.A. Economics, History • M.A., B.Ed. • Senior Gazetted Principal",
  principalQuote:
    "Every child in Sangla deserves equal access to modern education, digital skills, and high aspirations.",
  principalMessage:
    "At Government Senior Secondary School Sangla, we combine strong academic discipline with compassion and character building. Our dedicated team of 28 subject specialist lecturers, teachers, and instructors work tirelessly to ensure that our students from Kinnaur district compete and excel at state and national levels in CBSE boards, competitive exams, sports, and cultural arts.",
  principalImageUrl: "",

  // Dignitaries
  cmName: "Sh. Sukhvinder Singh Sukhu",
  cmRole: "Hon'ble Chief Minister",
  cmDept: "Himachal Pradesh",
  cmQuote:
    "Empowering every remote region of Himachal with premier education infrastructure.",

  eduMinisterName: "Sh. Rohit Thakur",
  eduMinisterRole: "Hon'ble Education Minister",
  eduMinisterDept: "Himachal Pradesh",
  eduMinisterQuote:
    "Building modern smart classrooms and holistic learning centers across our hills.",

  directorName: "Director of Higher Education",
  directorRole: "Directorate of Education",
  directorDept: "Govt. of HP, Shimla",
  directorQuote:
    "Fostering academic rigor, scientific curiosity, and character in students.",

  // Faculty Directory (Official 28 Staff Members from GSSS Sangla Records)
  facultyList: [
    {
      id: "fac-1",
      name: "Sh. Balvinder Singh Negi",
      role: "Principal",
      dept: "Administration",
      subject: "Economics & History, School Leadership",
      qual: "M.A. Economics, History, M.A., B.Ed.",
      exp: "Senior Gazetted Principal",
      email: "principal5010sangla@gmail.com",
      phone: "+91 82193-98898",
    },
    {
      id: "fac-2",
      name: "Sh. Vinod Kumar",
      role: "Lecturer (PGT)",
      dept: "Humanities & Social Sciences",
      subject: "Geography (Geo)",
      qual: "M.A., B.Ed.",
      exp: "Senior Faculty",
    },
    {
      id: "fac-3",
      name: "Sh. Rajman",
      role: "Lecturer (PGT)",
      dept: "Commerce",
      subject: "Commerce & Accountancy",
      qual: "M.Com., B.Ed.",
      exp: "Senior Faculty",
    },
    {
      id: "fac-4",
      name: "Smt. Sudesh Kumari",
      role: "Lecturer (PGT)",
      dept: "Languages",
      subject: "Hindi Literature",
      qual: "M.A., B.Ed., M.Phil",
      exp: "Subject Specialist",
    },
    {
      id: "fac-5",
      name: "Smt. Manjosna",
      role: "Lecturer (PGT)",
      dept: "Humanities & Social Sciences",
      subject: "History",
      qual: "M.A., B.Ed.",
      exp: "Senior Faculty",
    },
    {
      id: "fac-6",
      name: "Sh. Navjeevan Kumar",
      role: "Lecturer (PGT)",
      dept: "Humanities & Social Sciences",
      subject: "Economics",
      qual: "M.A., B.Ed.",
      exp: "Senior Faculty",
    },
    {
      id: "fac-7",
      name: "Sh. Sunil Dutt",
      role: "Lecturer (PGT)",
      dept: "Physical Education & Sports",
      subject: "Physical Education",
      qual: "M.A. Physical Education",
      exp: "Senior Physical Mentor",
    },
    {
      id: "fac-8",
      name: "Smt. Nisha Kumari",
      role: "Lecturer (PGT)",
      dept: "Commerce",
      subject: "Commerce & Business Studies",
      qual: "M.Com., B.Ed.",
      exp: "Senior Faculty",
    },
    {
      id: "fac-9",
      name: "Smt. Madhu Bala",
      role: "Lecturer (PGT)",
      dept: "Humanities & Social Sciences",
      subject: "Political Science (Pol Science)",
      qual: "M.A., B.Ed.",
      exp: "Senior Faculty",
    },
    {
      id: "fac-10",
      name: "Smt. Aarti Deryan",
      role: "Lecturer (PGT)",
      dept: "Science",
      subject: "Biology & Life Sciences",
      qual: "M.Sc., B.Ed.",
      exp: "Science Specialist",
    },
    {
      id: "fac-11",
      name: "Smt. Mamta Devi Negi",
      role: "Lecturer (PGT)",
      dept: "Languages",
      subject: "English Core & Literature",
      qual: "M.A., B.Ed.",
      exp: "English Specialist",
    },
    {
      id: "fac-12",
      name: "Sh. Dhan Dev Singh",
      role: "Lecturer (PGT)",
      dept: "Science & Mathematics",
      subject: "Mathematics",
      qual: "M.A., B.Ed.",
      exp: "Math Specialist",
    },
    {
      id: "fac-13",
      name: "Sh. Sanjay Kumar",
      role: "Lecturer (PGT)",
      dept: "Science",
      subject: "Chemistry & Lab Incharge",
      qual: "M.Sc., B.Ed.",
      exp: "Chemistry Specialist",
    },
    {
      id: "fac-14",
      name: "Sh. Avinash Bist",
      role: "Lecturer (PGT)",
      dept: "Science",
      subject: "Physics",
      qual: "M.Sc., B.Ed.",
      exp: "Physics Specialist",
    },
    {
      id: "fac-15",
      name: "Sh. Satya Nand",
      role: "TGT (Medical)",
      dept: "Science",
      subject: "Medical Sciences & Biology",
      qual: "B.Sc., B.Ed.",
      exp: "Trained Graduate Teacher",
    },
    {
      id: "fac-16",
      name: "Sh. Virender Singh",
      role: "TGT (Non-Medical)",
      dept: "Science & Mathematics",
      subject: "Non-Medical / Mathematics & Physics",
      qual: "B.Sc., B.Ed.",
      exp: "Trained Graduate Teacher",
    },
    {
      id: "fac-17",
      name: "Sh. Bhupender Singh",
      role: "TGT (Arts)",
      dept: "Humanities & Arts",
      subject: "Social Studies & Arts",
      qual: "M.A., B.Ed.",
      exp: "Trained Graduate Teacher",
    },
    {
      id: "fac-18",
      name: "Smt. Sapna Negi",
      role: "TGT (Arts)",
      dept: "Humanities & Arts",
      subject: "Social Sciences & Humanities",
      qual: "B.A., B.Ed.",
      exp: "Trained Graduate Teacher",
    },
    {
      id: "fac-19",
      name: "Smt. Narbada Devi",
      role: "Drawing Master (DM)",
      dept: "Arts & Crafts",
      subject: "Visual Arts, Drawing & Painting",
      qual: "10th (Art & Craft Diploma)",
      exp: "Creative Arts Faculty",
    },
    {
      id: "fac-20",
      name: "Sh. Lodos Kunkhyab",
      role: "TGT (Sanskrit)",
      dept: "Languages",
      subject: "Sanskrit Language & Culture",
      qual: "10+2 Shastri Diploma",
      exp: "Classical Language Faculty",
    },
    {
      id: "fac-21",
      name: "Sh. Jagmohan Singh",
      role: "TGT (Hindi)",
      dept: "Languages",
      subject: "Hindi Language & Grammar",
      qual: "M.A., B.Ed.",
      exp: "Trained Graduate Teacher",
    },
    {
      id: "fac-22",
      name: "Sh. Sanjeev Kumar",
      role: "TGT (Sanskrit)",
      dept: "Languages",
      subject: "Sanskrit & Vedic Studies",
      qual: "Matric Shastri Diploma",
      exp: "Classical Language Faculty",
    },
    {
      id: "fac-23",
      name: "Sh. Devi Sagar",
      role: "IT Teacher",
      dept: "Computer & IT",
      subject: "Computer Science & Informatics Practices",
      qual: "M.Sc. Computer Science",
      exp: "ICT & Digital Labs Incharge",
    },
    {
      id: "fac-24",
      name: "Smt. Ashok Kumari",
      role: "IT Teacher",
      dept: "Computer & IT",
      subject: "Information Technology & Digital Education",
      qual: "M.Sc. Computer Science",
      exp: "IT Lab Instructor",
    },
    {
      id: "fac-25",
      name: "Sh. Raj Bhagat",
      role: "Vocational Trainer (Security)",
      dept: "Vocational Education",
      subject: "Private Security & Safety Management",
      qual: "B.A., V.T. Private Security",
      exp: "Vocational Skills Trainer",
    },
    {
      id: "fac-26",
      name: "Smt. Keerti",
      role: "Vocational Trainer (Healthcare)",
      dept: "Vocational Education",
      subject: "Health Care & First Aid Science",
      qual: "Post Basic B.Sc. Nursing",
      exp: "Healthcare Trainer",
    },
    {
      id: "fac-27",
      name: "Smt. Bhag Mani (Rajmani)",
      role: "Lab Attendant (JBT)",
      dept: "Laboratory & Primary",
      subject: "Science Lab Support & Primary Education",
      qual: "Matric + JBT",
      exp: "Laboratory & Primary Staff",
    },
    {
      id: "fac-28",
      name: "Smt. Savitri Kumari",
      role: "Lab Attendant (JBT)",
      dept: "Laboratory & Primary",
      subject: "Laboratory Assistance & Foundational Learning",
      qual: "10+2, B.Sc., B.Ed., JBT",
      exp: "Laboratory & Primary Staff",
    },
  ],

  // Students Directory (ERP)
  studentsList: [
    {
      id: "stu-1",
      rollNo: "1201",
      admissionNo: "GSSS-2022-1201",
      name: "Arun Kumar Negi",
      fatherName: "Sh. Ramesh Negi",
      motherName: "Smt. Sunita Negi",
      dob: "14/08/2008",
      studentClass: "Class 12",
      stream: "Science (Non-Medical)",
      phone: "+91 98160-12345",
      email: "arun.negi@student.gsss-sangla.edu.in",
      address: "Village Sangla, Kinnaur, HP",
      gender: "Male",
      status: "Active",
      attendancePercentage: 94,
    },
    {
      id: "stu-2",
      rollNo: "1202",
      admissionNo: "GSSS-2022-1202",
      name: "Priyanka Kumari",
      fatherName: "Sh. Rajender Singh",
      motherName: "Smt. Kamala Devi",
      dob: "22/11/2008",
      studentClass: "Class 12",
      stream: "Science (Medical)",
      phone: "+91 98160-54321",
      email: "priyanka.kumari@student.gsss-sangla.edu.in",
      address: "Village Batseri, Sangla Valley, Kinnaur, HP",
      gender: "Female",
      status: "Active",
      attendancePercentage: 96,
    },
    {
      id: "stu-3",
      rollNo: "1203",
      admissionNo: "GSSS-2022-1203",
      name: "Tenzin Norbu",
      fatherName: "Sh. Dorje Angchuk",
      motherName: "Smt. Dolma Lhamo",
      dob: "05/03/2008",
      studentClass: "Class 12",
      stream: "Commerce",
      phone: "+91 98160-98765",
      email: "tenzin.norbu@student.gsss-sangla.edu.in",
      address: "Village Rakcham, Kinnaur, HP",
      gender: "Male",
      status: "Active",
      attendancePercentage: 92,
    },
    {
      id: "stu-4",
      rollNo: "1204",
      admissionNo: "GSSS-2022-1204",
      name: "Rohit Sharma",
      fatherName: "Sh. Mohan Lal Sharma",
      motherName: "Smt. Geeta Sharma",
      dob: "19/07/2008",
      studentClass: "Class 12",
      stream: "Humanities & Arts",
      phone: "+91 98160-67890",
      email: "rohit.sharma@student.gsss-sangla.edu.in",
      address: "Village Chitkul, Kinnaur, HP",
      gender: "Male",
      status: "Active",
      attendancePercentage: 91,
    },
    {
      id: "stu-5",
      rollNo: "1001",
      admissionNo: "GSSS-2024-1001",
      name: "Sneha Thakur",
      fatherName: "Sh. Vijay Thakur",
      motherName: "Smt. Meena Thakur",
      dob: "10/05/2010",
      studentClass: "Class 10",
      stream: "General",
      phone: "+91 98160-23456",
      email: "sneha.thakur@student.gsss-sangla.edu.in",
      address: "Village Sangla, Kinnaur, HP",
      gender: "Female",
      status: "Active",
      attendancePercentage: 98,
    },
    {
      id: "stu-6",
      rollNo: "1002",
      admissionNo: "GSSS-2024-1002",
      name: "Amit Negi",
      fatherName: "Sh. Prem Singh Negi",
      motherName: "Smt. Radha Negi",
      dob: "18/09/2010",
      studentClass: "Class 10",
      stream: "General",
      phone: "+91 98160-78901",
      email: "amit.negi@student.gsss-sangla.edu.in",
      address: "Village Kamru, Sangla Valley, Kinnaur, HP",
      gender: "Male",
      status: "Active",
      attendancePercentage: 89,
    },
    {
      id: "stu-7",
      rollNo: "1101",
      admissionNo: "GSSS-2023-1101",
      name: "Divya Kumari",
      fatherName: "Sh. Suresh Kumar",
      motherName: "Smt. Urmila Devi",
      dob: "02/01/2009",
      studentClass: "Class 11",
      stream: "Science (Medical)",
      phone: "+91 98160-34567",
      email: "divya.kumari@student.gsss-sangla.edu.in",
      address: "Village Sangla, Kinnaur, HP",
      gender: "Female",
      status: "Active",
      attendancePercentage: 95,
    },
    {
      id: "stu-8",
      rollNo: "1102",
      admissionNo: "GSSS-2023-1102",
      name: "Vikram Sen",
      fatherName: "Sh. Jagdish Sen",
      motherName: "Smt. Shanti Sen",
      dob: "12/12/2009",
      studentClass: "Class 11",
      stream: "Commerce",
      phone: "+91 98160-89012",
      email: "vikram.sen@student.gsss-sangla.edu.in",
      address: "Village Kuppa, Kinnaur, HP",
      gender: "Male",
      status: "Active",
      attendancePercentage: 90,
    },
  ],

  // Exam Results / Marksheets (ERP)
  resultsList: [
    {
      id: "res-1",
      studentId: "stu-1",
      rollNo: "1201",
      studentName: "Arun Kumar Negi",
      studentClass: "Class 12",
      stream: "Science (Non-Medical)",
      fatherName: "Sh. Ramesh Negi",
      motherName: "Smt. Sunita Negi",
      dob: "14/08/2008",
      admissionNo: "GSSS-2022-1201",
      examName: "Annual Senior Secondary Board Examination 2026",
      academicSession: "2025-26",
      issueDate: "05/03/2026",
      scores: [
        { subjectName: "Physics", theoryMarks: 68, practicalMarks: 29, marksObtained: 97, maxMarks: 100, grade: "A1" },
        { subjectName: "Chemistry", theoryMarks: 67, practicalMarks: 29, marksObtained: 96, maxMarks: 100, grade: "A1" },
        { subjectName: "Mathematics", theoryMarks: 77, practicalMarks: 19, marksObtained: 96, maxMarks: 100, grade: "A1" },
        { subjectName: "English Core", theoryMarks: 75, practicalMarks: 19, marksObtained: 94, maxMarks: 100, grade: "A1" },
        { subjectName: "Physical Education", theoryMarks: 68, practicalMarks: 29, marksObtained: 97, maxMarks: 100, grade: "A1" },
      ],
      totalMarksObtained: 480,
      totalMaxMarks: 500,
      percentage: 96.0,
      overallGrade: "A1",
      resultStatus: "Passed with Distinction",
      rank: "1st in Kinnaur District",
      teacherRemarks: "Outstanding academic performance! Exemplary conceptual understanding and practical problem-solving.",
    },
    {
      id: "res-2",
      studentId: "stu-2",
      rollNo: "1202",
      studentName: "Priyanka Kumari",
      studentClass: "Class 12",
      stream: "Science (Medical)",
      fatherName: "Sh. Rajender Singh",
      motherName: "Smt. Kamala Devi",
      dob: "22/11/2008",
      admissionNo: "GSSS-2022-1202",
      examName: "Annual Senior Secondary Board Examination 2026",
      academicSession: "2025-26",
      issueDate: "05/03/2026",
      scores: [
        { subjectName: "Physics", theoryMarks: 64, practicalMarks: 28, marksObtained: 92, maxMarks: 100, grade: "A1" },
        { subjectName: "Chemistry", theoryMarks: 63, practicalMarks: 28, marksObtained: 91, maxMarks: 100, grade: "A1" },
        { subjectName: "Biology", theoryMarks: 68, practicalMarks: 29, marksObtained: 97, maxMarks: 100, grade: "A1" },
        { subjectName: "English Core", theoryMarks: 73, practicalMarks: 18, marksObtained: 91, maxMarks: 100, grade: "A1" },
        { subjectName: "Physical Education", theoryMarks: 64, practicalMarks: 27, marksObtained: 91, maxMarks: 100, grade: "A1" },
      ],
      totalMarksObtained: 462,
      totalMaxMarks: 500,
      percentage: 92.4,
      overallGrade: "A1",
      resultStatus: "Passed with Distinction",
      rank: "2nd in School",
      teacherRemarks: "Exceptional mastery in Biology and Life Sciences. Active NCC athlete and dedicated student.",
    },
    {
      id: "res-3",
      studentId: "stu-3",
      rollNo: "1203",
      studentName: "Tenzin Norbu",
      studentClass: "Class 12",
      stream: "Commerce",
      fatherName: "Sh. Dorje Angchuk",
      motherName: "Smt. Dolma Lhamo",
      dob: "05/03/2008",
      admissionNo: "GSSS-2022-1203",
      examName: "Annual Senior Secondary Board Examination 2026",
      academicSession: "2025-26",
      issueDate: "05/03/2026",
      scores: [
        { subjectName: "Accountancy", theoryMarks: 70, practicalMarks: 20, marksObtained: 90, maxMarks: 100, grade: "A1" },
        { subjectName: "Business Studies", theoryMarks: 72, practicalMarks: 19, marksObtained: 91, maxMarks: 100, grade: "A1" },
        { subjectName: "Economics", theoryMarks: 68, practicalMarks: 19, marksObtained: 87, maxMarks: 100, grade: "A2" },
        { subjectName: "English Core", theoryMarks: 71, practicalMarks: 18, marksObtained: 89, maxMarks: 100, grade: "A2" },
        { subjectName: "Informatics Practices", theoryMarks: 64, practicalMarks: 27, marksObtained: 91, maxMarks: 100, grade: "A1" },
      ],
      totalMarksObtained: 448,
      totalMaxMarks: 500,
      percentage: 89.6,
      overallGrade: "A2",
      resultStatus: "Passed (First Division)",
      rank: "1st in Commerce Stream",
      teacherRemarks: "Strong analytical acumen in financial management and business case studies.",
    },
    {
      id: "res-4",
      studentId: "stu-4",
      rollNo: "1204",
      studentName: "Rohit Sharma",
      studentClass: "Class 12",
      stream: "Humanities & Arts",
      fatherName: "Sh. Mohan Lal Sharma",
      motherName: "Smt. Geeta Sharma",
      dob: "19/07/2008",
      admissionNo: "GSSS-2022-1204",
      examName: "Annual Senior Secondary Board Examination 2026",
      academicSession: "2025-26",
      issueDate: "05/03/2026",
      scores: [
        { subjectName: "History", theoryMarks: 73, practicalMarks: 19, marksObtained: 92, maxMarks: 100, grade: "A1" },
        { subjectName: "Political Science", theoryMarks: 74, practicalMarks: 20, marksObtained: 94, maxMarks: 100, grade: "A1" },
        { subjectName: "Hindi Core", theoryMarks: 72, practicalMarks: 19, marksObtained: 91, maxMarks: 100, grade: "A1" },
        { subjectName: "English Core", theoryMarks: 71, practicalMarks: 18, marksObtained: 89, maxMarks: 100, grade: "A2" },
        { subjectName: "Economics", theoryMarks: 71, practicalMarks: 19, marksObtained: 90, maxMarks: 100, grade: "A1" },
      ],
      totalMarksObtained: 456,
      totalMaxMarks: 500,
      percentage: 91.2,
      overallGrade: "A1",
      resultStatus: "Passed with Distinction",
      rank: "1st in Humanities Stream",
      teacherRemarks: "Brilliant essay writing, debate leadership, and comprehensive grasp of constitution and governance.",
    },
    {
      id: "res-5",
      studentId: "stu-5",
      rollNo: "1001",
      studentName: "Sneha Thakur",
      studentClass: "Class 10",
      stream: "General",
      fatherName: "Sh. Vijay Thakur",
      motherName: "Smt. Meena Thakur",
      dob: "10/05/2010",
      admissionNo: "GSSS-2024-1001",
      examName: "CBSE Class 10 Secondary School Examination 2026",
      academicSession: "2025-26",
      issueDate: "05/03/2026",
      scores: [
        { subjectName: "Mathematics", theoryMarks: 76, practicalMarks: 19, marksObtained: 95, maxMarks: 100, grade: "A1" },
        { subjectName: "Science", theoryMarks: 75, practicalMarks: 20, marksObtained: 95, maxMarks: 100, grade: "A1" },
        { subjectName: "Social Science", theoryMarks: 76, practicalMarks: 19, marksObtained: 95, maxMarks: 100, grade: "A1" },
        { subjectName: "English Language & Lit.", theoryMarks: 74, practicalMarks: 20, marksObtained: 94, maxMarks: 100, grade: "A1" },
        { subjectName: "Hindi Course-A", theoryMarks: 75, practicalMarks: 20, marksObtained: 95, maxMarks: 100, grade: "A1" },
      ],
      totalMarksObtained: 474,
      totalMaxMarks: 500,
      percentage: 94.8,
      overallGrade: "A1",
      resultStatus: "Passed with Distinction",
      rank: "Class 10 Topper",
      teacherRemarks: "All-round brilliant academic track record. Consistent top scores across all subjects.",
    },
    {
      id: "res-6",
      studentId: "stu-6",
      rollNo: "1002",
      studentName: "Amit Negi",
      studentClass: "Class 10",
      stream: "General",
      fatherName: "Sh. Prem Singh Negi",
      motherName: "Smt. Radha Negi",
      dob: "18/09/2010",
      admissionNo: "GSSS-2024-1002",
      examName: "CBSE Class 10 Secondary School Examination 2026",
      academicSession: "2025-26",
      issueDate: "05/03/2026",
      scores: [
        { subjectName: "Mathematics", theoryMarks: 67, practicalMarks: 18, marksObtained: 85, maxMarks: 100, grade: "A2" },
        { subjectName: "Science", theoryMarks: 69, practicalMarks: 19, marksObtained: 88, maxMarks: 100, grade: "A2" },
        { subjectName: "Social Science", theoryMarks: 71, practicalMarks: 18, marksObtained: 89, maxMarks: 100, grade: "A2" },
        { subjectName: "English Language & Lit.", theoryMarks: 68, practicalMarks: 18, marksObtained: 86, maxMarks: 100, grade: "A2" },
        { subjectName: "Hindi Course-A", theoryMarks: 70, practicalMarks: 18, marksObtained: 88, maxMarks: 100, grade: "A2" },
      ],
      totalMarksObtained: 436,
      totalMaxMarks: 500,
      percentage: 87.2,
      overallGrade: "A2",
      resultStatus: "Passed (First Division)",
      teacherRemarks: "Very good performance in science and languages. Regular in practicals.",
    },
  ],

  // Why Choose Us (6 Features)
  features: [
    {
      title: "CBSE Curriculum & Streams",
      text: "Comprehensive curriculum offering Science (Medical & Non-Medical), Commerce, and Humanities with modern conceptual pedagogy.",
      tag: "Academics",
    },
    {
      title: "Smart Digital Classrooms",
      text: "Interactive digital boards, multimedia presentations, and audio-visual modules making every lesson engaging and intuitive.",
      tag: "Technology",
    },
    {
      title: "State-of-the-Art Labs",
      text: "Fully equipped Physics, Chemistry, Biology, and High-Speed Computer labs adhering to national CBSE safety and practical norms.",
      tag: "Practical Learning",
    },
    {
      title: "Sports & NCC Training",
      text: "Extensive athletic ground for football, volleyball, cricket, plus active NCC & Scouts programs instilling leadership and grit.",
      tag: "Fitness & Discipline",
    },
    {
      title: "Cultural & Co-Curricular",
      text: "Annual cultural festivals, tribal art traditions of Kinnaur, science exhibitions, debate clubs, and youth parliaments.",
      tag: "Holistic Growth",
    },
    {
      title: "Safe & Inclusive Campus",
      text: "Complete CCTV surveillance, clean drinking water systems, mid-day meals, ramp access, and supportive mentor guidance.",
      tag: "Student Care",
    },
  ],

  // Campus Previews
  campusPreviews: [
    {
      title: "Biology & Life Sciences Lab",
      cat: "Laboratories",
      desc: "Advanced microscopes, biological specimens & botanical charts.",
    },
    {
      title: "Chemistry Research Lab",
      cat: "Laboratories",
      desc: "Individual workstations, safety reagent chambers & experimental setups.",
    },
    {
      title: "Modern Computer Center",
      cat: "Digital Hub",
      desc: "High-speed internet workstations with coding & digital literacy curriculum.",
    },
    {
      title: "Himalayan View Reading Room",
      cat: "Library",
      desc: "Extensive reference archives, competitive exam guides & periodicals.",
    },
  ],

  // Testimonials
  testimonials: [
    {
      name: "Arun Kumar Negi",
      role: "CBSE Board District Topper (Batch 2025)",
      text: "The dedicated teachers at GSSS Sangla and personal laboratory mentorship gave me the confidence to score 96% in Class 12 Science.",
    },
    {
      name: "Smt. Sunita Devi",
      role: "Parent of Class 10 Student",
      text: "As a parent in Sangla valley, having smart digital classrooms and caring faculty right in our hometown is a blessing for our children's future.",
    },
    {
      name: "Priyanka Kumari",
      role: "NCC Cadet & State Athlete",
      text: "The sports training and NCC drills taught me discipline, teamwork, and resilience. GSSS Sangla nurtures both mind and character.",
    },
  ],

  // Notice Ticker
  tickerItems: [
    {
      tag: "Admissions 2026-27",
      text: "Online registration open for all classes (Class 1 to 12). Apply early for guaranteed placement!",
      link: "/admissions/form",
    },
    {
      tag: "CBSE Board",
      text: "Congratulations to GSSS Sangla students for 100% pass record in CBSE Board Examinations.",
      link: "/news",
    },
    {
      tag: "Notice",
      text: "Annual Sports Meet & Science Exhibition schedule released. Check official notice board.",
      link: "/notice-board",
    },
    {
      tag: "Smart Labs",
      text: "New Advanced Computer & Robotics module introduced for senior secondary students.",
      link: "/infrastructure",
    },
  ],

  // Admissions
  admissionSession: "Academic Session 2026-27",
  admissionDeadline: "15 April 2026",
  admissionStatus: "Online & Offline Registrations Open",
  admissionNote: "Admissions are open for Class 1 to 12. Give your child the foundation of quality government CBSE education, dedicated mentorship, and high aspirations.",
  admissionSteps: [
    {
      step: "01",
      title: "Fill Application Form",
      text: "Submit the online registration form on this portal or collect physical application from the school office desk during office hours.",
      tag: "Online or Offline",
    },
    {
      step: "02",
      title: "Document Verification",
      text: "Submit self-attested photocopies of birth certificate, previous mark sheet, transfer certificate (TC), and Aadhaar cards.",
      tag: "Essential Records",
    },
    {
      step: "03",
      title: "Stream Counseling / Test",
      text: "For Class 11 & 12, stream allocation (Science, Commerce, Arts) is guided by academic counseling and merit guidelines.",
      tag: "Faculty Interaction",
    },
    {
      step: "04",
      title: "Admission Confirmation",
      text: "Collect the official admission slip and student ID card upon fee waiver/concession verification from the administration.",
      tag: "Enrollment Finalized",
    },
  ],
  admissionDocs: [
    "Original / Attested Birth Certificate (Mandatory for Primary & Class 1)",
    "Transfer Certificate (TC) counter-signed by previous school head",
    "Previous Class Marksheet / Progress Report Card",
    "Aadhaar Card copies of student, father, and mother",
    "Category Certificate (SC / ST / OBC / EWS / BPL) if applicable",
    "Himachali Bonafide / Resident Certificate",
    "Four recent passport-size colour photographs",
    "Bank Account Passbook photocopy (for DBT scholarships & schemes)",
  ],
  admissionDates: [
    { label: "Online & Offline Registration Opens", value: "01 March 2026", status: "Active Now" },
    { label: "Last Date for Form Submission", value: "15 April 2026", status: "Upcoming" },
    { label: "Class 11 Stream Counseling Session", value: "20 April 2026", status: "Upcoming" },
    { label: "Publication of Selected Merit List", value: "25 April 2026", status: "Upcoming" },
    { label: "Commencement of Academic Classes", value: "01 May 2026", status: "Upcoming" },
  ],
  admissionFaqs: [
    {
      q: "What are the age criteria for primary admission?",
      a: "As per the NEP 2020 and Himachal Pradesh Education rules, a child must have attained the age of 6 years by 31st March for Class 1.",
    },
    {
      q: "Is there any admission fee for government school students?",
      a: "Education is free and highly subsidized under government norms with no tuition fee for elementary classes and minimal nominal charges.",
    },
    {
      q: "Are hostel / residential facilities provided?",
      a: "Currently GSSS Sangla operates as a day school. Students from nearby villages easily commute via local transport connectivity.",
    },
  ],

  // About Page
  aboutStoryTitle: "Educating the Sangla Valley for Generations",
  aboutStoryP1:
    "Government Senior Secondary School Sangla stands proudly amidst the snow-capped Himalayan peaks of Kinnaur district. Founded with the conviction that geography should never limit a child's ambition, our school has served as a beacon of learning and opportunity.",
  aboutStoryP2:
    "Today, GSSS Sangla combines traditional values of respect, hard work, and resilience with 21st-century digital smart classrooms, well-stocked science laboratories, and experienced educators.",
  aboutHighlights: [
    "Experienced senior faculty with specialized CBSE subject qualifications (M.Sc., M.A., B.Ed.)",
    "Equitable student-to-teacher ratio for individualized academic guidance and mentoring",
    "Consistently 100% board pass percentage in Class 10 and Class 12 examinations",
    "Wide spectrum of co-curricular clubs, NCC Battalion, Bharat Scouts & Guides, and cultural arts",
    "High-grade science laboratories, ICT digital lab, and extensive Himalayan reference library",
    "Holistic focus on mountain ecology, tribal cultural preservation, and national integration",
  ],
  aboutTimeline: [
    {
      year: "Foundation",
      title: "Established in Sangla Valley",
      desc: "Started as a primary center to bring accessible schooling to remote tribal communities of Kinnaur.",
    },
    {
      year: "Upgradation",
      title: "High School Status",
      desc: "Expanded with dedicated secondary science laboratories and modern classroom blocks.",
    },
    {
      year: "Excellence",
      title: "Senior Secondary & Multi-Stream",
      desc: "Introduced Science (Medical & Non-Medical), Commerce, and Arts streams with advanced faculty.",
    },
    {
      year: "2026 Modern Era",
      title: "Smart Digital Campus",
      desc: "Equipped with interactive digital smart boards, ICT computer center, and comprehensive CBSE curriculum.",
    },
  ],
  aboutValues: [
    {
      title: "Academic Rigour",
      desc: "Conceptual clarity and analytical problem-solving preparing students for higher studies and competitive exams.",
    },
    {
      title: "Moral Integrity",
      desc: "Instilling deep respect for cultural heritage, discipline, community service, and environmental stewardship.",
    },
    {
      title: "Inclusive Opportunity",
      desc: "Providing equal opportunity and encouragement to every child regardless of socio-economic background.",
    },
    {
      title: "Holistic Development",
      desc: "Nurturing intellectual, physical, emotional, and creative capabilities through sports, arts, and leadership.",
    },
  ],

  // Infrastructure Page
  infrastructureList: [
    {
      imgUrl: bio,
      title: "Biology Laboratory",
      cat: "Labs",
      tag: "CBSE Practical Lab",
      text: "Equipped with compound microscopes, human anatomical models, botanical specimens, and dissection trays supporting CBSE Senior Secondary curriculum.",
    },
    {
      imgUrl: chem,
      title: "Chemistry Laboratory",
      cat: "Labs",
      tag: "CBSE Practical Lab",
      text: "Well-stocked chemical reagent storage, safety exhaust system, individual experiment burners, titration stands, and safety glassware.",
    },
    {
      imgUrl: comp,
      title: "Computer & ICT Center",
      cat: "Digital Hub",
      tag: "Smart Learning",
      text: "Modern desktop systems with high-speed internet connectivity, multimedia peripherals, and digital literacy curriculum for Class 1 to 12.",
    },
    {
      imgUrl: c3,
      title: "Digital Smart Classrooms",
      cat: "Digital Hub",
      tag: "Interactive Boards",
      text: "Interactive digital display panels and high-definition projectors making lessons visual, intuitive, and interactive for students.",
    },
    {
      imgUrl: c4,
      title: "Central Reference Library",
      cat: "Library",
      tag: "5000+ Titles",
      text: "Vast collection of textbooks, competitive exam reference materials (JEE, NEET, NDA, HP TET), newspapers, and quiet reading study halls.",
    },
    {
      imgUrl: c5,
      title: "Sports Playground & Track",
      cat: "Sports",
      tag: "Athletics & NCC",
      text: "Spacious outdoor sports ground for cricket, volleyball, football, track athletics, daily physical training, and annual sports tournaments.",
    },
  ],
  amenitiesList: [
    { title: "Pure Drinking Water", desc: "Equipped with multi-stage UV water filtration units." },
    { title: "CCTV Surveillance", desc: "24/7 security monitoring across all gates and corridors." },
    { title: "Clean Sanitation Facilities", desc: "Separate, hygienic washroom blocks for boys and girls." },
    { title: "Mid-Day Meal Facility", desc: "Clean kitchen and sheltered dining area serving nutritious food." },
    { title: "First-Aid Health Station", desc: "Emergency medical supplies and regular health screening camps." },
    { title: "Ramp & Barrier-Free Access", desc: "Specially designed ramps for differently-abled students." },
    { title: "Science Activity Hall", desc: "Dedicated space for science exhibitions and student model showcases." },
    { title: "Staff Resource Rooms", desc: "Connected workspaces for teachers to prepare lessons and evaluations." },
  ],

  // Gallery Page
  galleryPhotos: [
    { src: c1, alt: "Panoramic view of GSSS Sangla campus amidst Himalayan peaks", cat: "Campus", title: "Himalayan Campus View" },
    { src: c2, alt: "Main school administration & senior secondary block", cat: "Campus", title: "Main Academic Block" },
    { src: c3, alt: "Smart digital classroom in session with interactive display", cat: "Academics", title: "Smart Digital Classroom" },
    { src: bio, alt: "Biology laboratory practical session with compound microscopes", cat: "Laboratories", title: "Biology Practical Lab" },
    { src: chem, alt: "Chemistry laboratory with reagent apparatus & safety systems", cat: "Laboratories", title: "Chemistry Laboratory" },
    { src: comp, alt: "High-speed computer IT lab with student workstations", cat: "Laboratories", title: "Computer Science ICT Lab" },
    { src: c4, alt: "School reference library and reading room", cat: "Academics", title: "Central Reference Library" },
    { src: c5, alt: "Spacious playground with athletic track & volleyball courts", cat: "Sports", title: "Sports Playground" },
    { src: c6, alt: "Annual day cultural celebrations and traditional folk dances", cat: "Celebrations", title: "Annual Cultural Fest" },
  ],

  // Fee Structure Page
  feeRows: [
    { cls: "Class VI – VIII (Middle)", admission: "₹0 (Free)", monthly: "₹0 (Free)", exam: "₹50", other: "₹100" },
    { cls: "Class IX – X (Secondary)", admission: "₹0 (Free)", monthly: "₹0 (Free)", exam: "₹100", other: "₹150" },
    { cls: "Class XI – XII (Arts Stream)", admission: "₹50", monthly: "₹30", exam: "₹150", other: "₹200" },
    { cls: "Class XI – XII (Commerce Stream)", admission: "₹50", monthly: "₹30", exam: "₹150", other: "₹250" },
    { cls: "Class XI – XII (Science Stream)", admission: "₹50", monthly: "₹50", exam: "₹150", other: "₹300" },
  ],
  feeNotes: [
    "Girl students are 100% exempted from tuition fees as per Government of Himachal Pradesh directives.",
    "Students belonging to SC / ST / BPL / EWS categories receive full fee concessions, free textbooks, and direct benefit scholarships.",
    "Free mid-day meal scheme provided for all elementary section students (Classes 1 to 8).",
    "No hidden fees or building development charges — completely transparent government scale.",
  ],

  // Policies Page
  policiesList: [
    {
      title: "Code of Conduct",
      points: [
        "Students must be respectful towards teachers, staff and fellow students.",
        "Damage to school property must be reported and will be recovered from the responsible student.",
        "Use of mobile phones is not permitted during school hours without permission.",
      ],
    },
    {
      title: "Attendance Policy",
      points: [
        "A minimum of 75% attendance is required to appear in the annual examination.",
        "Leave must be applied for in writing by the parent or guardian.",
        "Long absence without intimation may result in the removal of the student's name from the rolls.",
      ],
    },
    {
      title: "Uniform & Discipline",
      points: [
        "The prescribed school uniform must be worn neatly on all working days.",
        "Identity cards must be carried on campus at all times.",
        "Assembly attendance is compulsory for all students.",
      ],
    },
    {
      title: "Anti-Bullying & Safety",
      points: [
        "Ragging, bullying or harassment of any form results in strict disciplinary action.",
        "A grievance and complaint box is available outside the Principal's office.",
        "The campus is monitored by CCTV and a safety committee reviews incidents regularly.",
      ],
    },
    {
      title: "Examination Policy",
      points: [
        "Unit tests, half-yearly and annual examinations are conducted as per the CBSE pattern.",
        "Any form of unfair means during examinations leads to cancellation of the paper.",
        "Report cards are issued to parents during the parent-teacher meetings.",
      ],
    },
  ],

  // Circulars Page
  circularsList: [
    {
      date: "15 Jul 2026",
      title: "Half-Yearly Examination Schedule — Classes VI to XII",
      ref: "GSSS/SGL/2026/12",
    },
    {
      date: "02 Jul 2026",
      title: "Parent-Teacher Meeting for Classes X and XII",
      ref: "GSSS/SGL/2026/11",
    },
    {
      date: "20 Jun 2026",
      title: "Monsoon Uniform and Timings Advisory",
      ref: "GSSS/SGL/2026/10",
    },
    {
      date: "05 Jun 2026",
      title: "Enrolment under Samagra Shiksha — Data Verification",
      ref: "GSSS/SGL/2026/09",
    },
    {
      date: "18 May 2026",
      title: "Summer Vacation Homework Guidelines",
      ref: "GSSS/SGL/2026/08",
    },
    {
      date: "01 Apr 2026",
      title: "Commencement of New Academic Session 2026–27",
      ref: "GSSS/SGL/2026/07",
    },
  ],

  // Mandatory Disclosure Page
  disclosureSections: [
    {
      title: "A. General Institutional Information",
      rows: [
        ["Name of the School", "Govt. Sr. Sec. School Sangla"],
        ["Complete Address", "Sangla Valley, Kinnaur District, Himachal Pradesh – 172106"],
        ["Principal Contact Phone", "+91 82193-98898"],
        ["Official Primary Email", "principal5010sangla@gmail.com"],
        ["CBSE Official Email ID", "44363@cbseshiksha.in"],
        ["Year of Establishment", "1952"],
        ["School Management Type", "Department of Higher Education, Govt. of Himachal Pradesh"],
        ["Medium of Instruction", "English & Hindi (Bilingual CBSE Standard)"],
      ],
    },
    {
      title: "B. Affiliation & Academic Scope",
      rows: [
        ["Affiliated Board", "Central Board of Secondary Education (CBSE), New Delhi"],
        ["CBSE School Code", "44363 (44363@cbseshiksha.in)"],
        ["Affiliation Category", "Senior Secondary (Co-educational, Classes 1 to 12)"],
        ["Senior Secondary Streams", "Science (Medical / Non-Medical), Commerce, Humanities & Arts"],
      ],
    },
    {
      title: "C. Campus Infrastructure & Safety",
      rows: [
        ["Total Campus Area", "Approx. 2.5 Acres of open Himalayan campus"],
        ["Classrooms", "18 well-ventilated rooms with Digital Smart Boards"],
        ["Science Laboratories", "Physics, Chemistry, Biology, and Computer Science IT Lab"],
        ["Library Resources", "Dedicated reading room with over 5,000 reference books and journals"],
        ["Sports Grounds", "Full-size athletic playground, volleyball court, badminton & indoor games"],
        ["Safety & Cleanliness", "24/7 CCTV surveillance, boundary walls, pure UV drinking water, fire extinguishers"],
      ],
    },
    {
      title: "D. Staff & Faculty Composition",
      rows: [
        ["Principal / Head of Institution", "1 (Full-Time Regular)"],
        ["Post Graduate Teachers (PGT / Lecturers)", "10 (Subject Specialists)"],
        ["Trained Graduate Teachers (TGT)", "12"],
        ["Primary & Assistant Teachers (JBT/PRT)", "6"],
        ["Physical Education & Sports Trainer", "1 (M.P.Ed.)"],
        ["Administrative & Support Staff", "8"],
      ],
    },
    {
      title: "E. Academic Session & Calendar",
      rows: [
        ["Academic Session Duration", "April 1 to March 31"],
        ["Vacation Schedule", "Winter vacation as notified by Govt. of Himachal Pradesh"],
        ["Annual Admission Window", "March – April (Online and Offline)"],
      ],
    },
  ],
};

const STORAGE_KEY = "gsss_sangla_site_content_v8";


export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setContent({ ...DEFAULT_SITE_CONTENT, ...parsed });
      }
    } catch (e) {
      console.error("Failed to load site content from localStorage", e);
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setContent({ ...DEFAULT_SITE_CONTENT, ...JSON.parse(e.newValue) });
        } catch (err) {
          console.error(err);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const updateContent = (newContent: Partial<SiteContent>) => {
    const merged = { ...content, ...newContent };
    setContent(merged);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: STORAGE_KEY,
          newValue: JSON.stringify(merged),
        })
      );
    } catch (e) {
      console.error("Failed to save site content to localStorage", e);
    }
  };

  const resetContent = () => {
    setContent(DEFAULT_SITE_CONTENT);
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: STORAGE_KEY,
          newValue: JSON.stringify(DEFAULT_SITE_CONTENT),
        })
      );
    } catch (e) {
      console.error(e);
    }
  };

  return { content, updateContent, resetContent };
}

