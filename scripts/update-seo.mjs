import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const seoData = {
  "afcat-2026-slate-photo-upload-guide.md": {
    metaTitle: "AFCAT 2026 Slate Photo Upload Guide | Correct Format",
    metaDescription: "Master the AFCAT 2026 slate photo upload process. Learn correct dimensions, format, and common mistakes to avoid rejection of your IAF application.",
    keywords: ["AFCAT 2026 photo upload", "AFCAT slate photo format", "IAF application photo", "AFCAT photo guidelines 2026", "resize image for AFCAT"]
  },
  "bihar-board-10th-result-2026-date-time-updates.md": {
    metaTitle: "Bihar Board 10th Result 2026: Date, Time & Live Updates",
    metaDescription: "Get the latest updates on Bihar Board 10th Result 2026. Learn where and how to check your BSEB Matric scorecard online when the results drop.",
    keywords: ["Bihar Board 10th Result 2026", "BSEB Matric Result date", "check Bihar board result online", "BSEB 10th scorecard", "Bihar board marking scheme"]
  },
  "bihar-board-class-12-result-2026-check-online.md": {
    metaTitle: "Bihar Board 12th Result 2026: Check Intermediate Scorecard",
    metaDescription: "Check your Bihar Board 12th Result 2026 directly here. Discover the exact steps to access your BSEB Intermediate score and download the marksheet.",
    keywords: ["Bihar Board 12th Result 2026", "BSEB Inter result check", "Bihar board class 12 marksheet", "BSEB 12th scorecard download", "Bihar Board intermediate"]
  },
  "bpsc-aedo-recruitment-2026-admit-card-exam-dates.md": {
    metaTitle: "BPSC AEDO Recruitment 2026: Admit Card & Exam Dates",
    metaDescription: "Stay updated on BPSC AEDO Recruitment 2026. Learn how to download your admit card, check exam dates, and prepare for the Assistant Estate Officer exam.",
    keywords: ["BPSC AEDO admit card 2026", "BPSC Assistant Estate Officer", "BPSC AEDO exam date", "BPSC recruitment 2026", "Bihar PSC admit card download"]
  },
  "bpsc-tre-4-0-recruitment-2026.md": {
    metaTitle: "BPSC TRE 4.0 Recruitment 2026 | Vacancies & Application",
    metaDescription: "Explore the BPSC TRE 4.0 Recruitment 2026. Find all details regarding teacher vacancies, eligibility, and the step-by-step application process online.",
    keywords: ["BPSC TRE 4.0 recruitment", "Bihar teacher vacancy 2026", "BPSC teacher application form", "TRE 4.0 exam date", "Bihar teacher eligibility"]
  },
  "bseb-10th-result-2026-comprehensive-guide.md": {
    metaTitle: "BSEB 10th Result 2026 Comprehensive Guide & Marksheet",
    metaDescription: "Your complete guide to the BSEB 10th Result 2026. Steps to check, marking schemes, and how to apply for scrutiny or compartment exams in Bihar.",
    keywords: ["BSEB 10th result guide 2026", "Bihar matric marksheet", "BSEB scrutiny 2026", "Bihar Board 10th compartment", "BSEB matric passing marks"]
  },
  "bseb-matric-compartment-special-exam-2026.md": {
    metaTitle: "BSEB Matric Compartment & Special Exam 2026 Dates",
    metaDescription: "Get the complete schedule for the BSEB Matric Compartment and Special Exam 2026. Know how to apply, eligibility, and important dates for Bihar board.",
    keywords: ["BSEB matric compartment 2026", "Bihar Board 10th special exam", "BSEB supplementary exam form", "Bihar compartmental admit card", "BSEB 10th exam date"]
  },
  "ctet-february-2026-results-guide.md": {
    metaTitle: "CTET Feb 2026 Results Guide: Download Marksheet & Certificate",
    metaDescription: "A complete guide on checking your CTET February 2026 results. Learn to download your Digital Marksheet and Certificate via the DigiLocker app easily.",
    keywords: ["CTET results Feb 2026", "CTET CBSE nic in result", "DigiLocker CTET certificate", "CTET marksheet download", "CTET passing marks 2026"]
  },
  "cuet-ug-2026-complete-guide.md": {
    metaTitle: "CUET UG 2026 Guide: Registration, Syllabus & Exam Pattern",
    metaDescription: "Master the CUET UG 2026 with our complete guide. Get updates on registration dates, syllabus changes, normalized scoring, and NTA updates.",
    keywords: ["CUET UG 2026 registration", "CUET UG syllabus", "NTA CUET exam date", "central university entrance test", "CUET passing marks"]
  },
  "dsssb-advertisement-02-2026-candidate-guide.md": {
    metaTitle: "DSSSB Advertisement 02/2026: Vacancies & Application Guide",
    metaDescription: "Everything you need to know about DSSSB Advertisement 02/2026. Check the post list, eligibility criteria, exam pattern, and how to apply online.",
    keywords: ["DSSSB 02/2026 notification", "Delhi DSSSB recruitment 2026", "DSSSB application process", "DSSSB exam pattern", "DSSSB vacancies 2026"]
  },
  "how-to-compress-pdf-to-200kb-for-upsc-ssc-ibps-rrb-exams.md": {
    metaTitle: "Compress PDF to 200KB for UPSC, SSC, IBPS & RRB Exams",
    metaDescription: "Learn how to instantly compress your PDF files to under 200KB for UPSC, SSC, IBPS, and RRB exam applications. Optimize documents without losing quality.",
    keywords: ["compress PDF under 200KB", "PDF resizer for SSC", "reduce PDF size for UPSC", "IBPS document upload size", "RRB PDF compression tool"]
  },
  "ibps-sbi-photo-signature-upload-problem-fix.md": {
    metaTitle: "Fix IBPS & SBI Photo/Signature Upload Errors Instantly",
    metaDescription: "Having trouble uploading your photo and signature for IBPS or SBI applications? Discover the exact dimensions, format rules, and fixes for upload failures.",
    keywords: ["IBPS photo size guide", "SBI signature upload error", "bank exam photo resizer", "IBPS upload guidelines 2026", "fix SBI application errors"]
  },
  "ignou-assignment-submission-date-extended-june-2026.md": {
    metaTitle: "IGNOU Assignment Deadline Extended for June 2026 TEE",
    metaDescription: "Good news for IGNOU students: The assignment submission deadline for June 2026 TEE has been extended. Ensure timely online submission of your assignments.",
    keywords: ["IGNOU assignment last date 2026", "IGNOU June TEE assignments", "submit IGNOU assignment online", "IGNOU deadline extension", "IGNOU study portal"]
  },
  "ignou-june-2026-tee-registration-deadline-extended.md": {
    metaTitle: "IGNOU June 2026 TEE Registration Deadline Extended",
    metaDescription: "IGNOU has extended the registration deadline for the June 2026 Term End Examination. Find out late fee details and how to fill the TEE form online.",
    keywords: ["IGNOU TEE registration 2026", "IGNOU June exam form", "IGNOU late fee TEE", "IGNOU distance learning exams", "IGNOU admit card 2026"]
  },
  "ignou-june-tee-2026-exam-form-guide.md": {
    metaTitle: "IGNOU June TEE 2026 Exam Form: Step-by-Step Guide",
    metaDescription: "A straightforward guide on filling out the IGNOU June TEE 2026 exam form. Check eligibility, subject selection, payment methods, and common issues.",
    keywords: ["IGNOU exam form June 2026", "fill IGNOU TEE form", "IGNOU exam fee payment", "IGNOU subject code 2026", "IGNOU student portal"]
  },
  "image-upload-rejected-even-after-resizing.md": {
    metaTitle: "Why Is Your Re-Sized Image Upload Still Getting Rejected?",
    metaDescription: "Struggling with a rejected image upload despite resizing? Learn the hidden reasons like metadata, DPI, aspect ratios, and color profiles for govt exams.",
    keywords: ["image upload rejected", "fix DPI for exam photos", "photo aspects ratio gov exams", "image metadata issues", "form photo format rules"]
  },
  "neet-photo-signature-upload-problem-fix.md": {
    metaTitle: "Fix NEET Photo & Signature Upload Problems Fast",
    metaDescription: "Eliminate NEET UG photo and signature upload errors with our guide. Check NTA dimension guidelines, file sizes, format requirements, and resolution.",
    keywords: ["NEET photo specifications 2026", "NTA NEET signature size", "fix NEET upload error", "NEET passport size photo", "NEET image format rules"]
  },
  "neet-ug-2026-city-intimation-slip.md": {
    metaTitle: "NEET UG 2026 City Intimation Slip Download Process",
    metaDescription: "Keep track of the NEET UG 2026 City Intimation Slip. Learn how to verify your allotted exam city from NTA's official site before admit cards release.",
    keywords: ["NEET UG city slip 2026", "NTA exam city intimation", "NEET exam center check", "download NEET city slip", "NEET admit card 2026"]
  },
  "otet-2026-application-process-guide.md": {
    metaTitle: "OTET 2026 Application Process Guide | BSE Odisha",
    metaDescription: "Applying for OTET 2026? Follow this step-by-step guide on filling the BSE Odisha application form securely, uploading documents, and paying the fee.",
    keywords: ["OTET 2026 application form", "BSE Odisha OTET", "apply for OTET online", "OTET eligibility 2026", "Odisha Teacher Eligibility Test"]
  },
  "otet-2026-notification-complete-guide.md": {
    metaTitle: "OTET 2026 Notification: Eligibility, Syllabus & Dates",
    metaDescription: "Dive into the OTET 2026 notification by BSE Odisha. Find complete details about the eligibility criteria, papers, syllabus, mark distribution, and dates.",
    keywords: ["OTET notification 2026", "Odisha TET syllabus", "OTET exam date", "OTET qualifying marks", "BSE Odisha updates"]
  },
  "rajasthan-board-10th-result-2026-out-today.md": {
    metaTitle: "Rajasthan Board 10th Result 2026 is Out Today | Check RBSE",
    metaDescription: "RBSE 10th Result 2026 has been declared! Get the direct link to check your Rajasthan Board marksheet, latest pass percentages, and topper list.",
    keywords: ["RBSE 10th Result 2026", "Rajasthan board matric scorecard", "check RBSE 10th marks", "RBSE topper list", "rajeduboard result"]
  },
  "rrb-alp-2026-recruitment-cen-01-2026.md": {
    metaTitle: "RRB ALP Recruitment 2026 CEN 01/2026: Vacancies & Apply",
    metaDescription: "Get the complete breakdown of RRB ALP Recruitment 2026 (CEN 01/2026). Check loco pilot vacancies, medical standards, CBT stages, and age limit.",
    keywords: ["RRB ALP recruitment 2026", "Loco Pilot notification CEN 01/2026", "RRB Assistant Loco Pilot", "railway ALP vacancies", "RRB CBT exam pattern"]
  },
  "rrb-group-d-recruitment-2026.md": {
    metaTitle: "RRB Group D Recruitment 2026: Level 1 Post Notification",
    metaDescription: "Explore RRB Group D Recruitment 2026 for Level 1 posts in Indian Railways. Everything on eligibility, CBT exam pattern, PET guidelines, and applying.",
    keywords: ["RRB Group D notification 2026", "Railway Group D jobs", "RRC Level 1 recruitment", "RRB Group D PET", "Railway recruitment physical test"]
  },
  "ssc-gd-2026-latest-updates-exam-dates-admit-card.md": {
    metaTitle: "SSC GD 2026 Constable: Exam Dates & Admit Card Guide",
    metaDescription: "Stay on top of SSC GD 2026 latest updates. Get info on exam dates, admit card downloads, force-wise vacancies, and CBT preparation tips.",
    keywords: ["SSC GD exam dates 2026", "SSC GD Constable admit card", "CAPF vacancies GD", "SSC GD syllabus 2026", "SSC GD CBT details"]
  },
  "ssc-je-2025-tier-2-admit-card-out.md": {
    metaTitle: "SSC JE 2025 Tier 2 Admit Card Out Now | Download Link",
    metaDescription: "The Staff Selection Commission has released the SSC JE 2025 Tier 2 admit cards. Use the direct download links to get your region-wise hall ticket today.",
    keywords: ["SSC JE Tier 2 admit card", "SSC JE 2025 updates", "download SSC JE hall ticket", "Staff Selection Commission JE", "SSC JE exam cities"]
  },
  "ssc-photo-signature-upload-problem-fix.md": {
    metaTitle: "Fix SSC Photo & Signature Upload Error Instantly",
    metaDescription: "Solve SSC live photo and signature upload issues easily. Follow the official mySSC app guidelines, correct dimensions, and background color rules.",
    keywords: ["SSC photo signature size", "mySSC app live photo", "fix SSC upload fail", "SSC CGL photo requirements", "SSC selection post signature"]
  },
  "ssc-selection-post-phase-14-2026.md": {
    metaTitle: "SSC Selection Post Phase 14 2026: Vacancies & Rules",
    metaDescription: "Get all details on SSC Selection Post Phase 14 2026. Explore 3,003 vacancies, new 15-minute sectional timing, eligibility, and how to apply at ssc.gov.in.",
    keywords: ["SSC Selection Post Phase 14", "SSC 2026 vacancies", "SSC sectional timing rule", "SSC graduation post jobs", "SSC Phase 14 syllabus"]
  },
  "up-police-constable-photo-signature-guide-2026.md": {
    metaTitle: "UP Police Constable Photo Strategy & Upload Guide 2026",
    metaDescription: "Master the photo and signature upload for the UP Police Constable 2026 exam. Learn dimension requirements, DPI configurations, and avoid form rejection.",
    keywords: ["UP Police UPPRPB photo size", "UP Constable signature format", "UP police application 2026", "Uttar Pradesh police recruitment", "fix UPPRPB upload"]
  },
  "upsc-photo-signature-guidelines-2026.md": {
    metaTitle: "UPSC Photo & Signature Guidelines 2026: 10-Day Rule",
    metaDescription: "Understand the strict UPSC Photo and Signature guidelines for 2026 applications. Learn about the 10-day name/date rule and correct DPI settings.",
    keywords: ["UPSC photo guidelines 2026", "UPSC 10-day photo rule", "UPSC signature dimensions", "UPSC civil services upload", "UPSC application photo"]
  },
  "upsc-photo-signature-upload-problem-fix.md": {
    metaTitle: "Fix UPSC Photo & Signature Upload Rejection 2026",
    metaDescription: "Fix your UPSC OTR and application image upload errors. Quick fixes for Bit Depth limit, DPI mismatches, and pixel dimensional mismatch on upsc.gov.in.",
    keywords: ["fix UPSC image rejection", "UPSC DPI mismatch error", "UPSC pixel dimensions", "resize for UPSC OTR", "UPSC upload troubleshooting"]
  }
};

const contentDir = path.join(process.cwd(), 'content/blog');

function main() {
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));
  
  files.forEach(file => {
    const data = seoData[file];
    if (data) {
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const parsed = matter(fileContent);
      
      // Update frontmatter properties
      parsed.data.metaTitle = data.metaTitle;
      parsed.data.metaDescription = data.metaDescription;
      parsed.data.keywords = data.keywords;
      
      const newFileContent = matter.stringify(parsed.content, parsed.data);
      fs.writeFileSync(filePath, newFileContent, 'utf8');
      console.log(`Successfully updated SEO meta for: ${file}`);
    }
  });
}

main();
