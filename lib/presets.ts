export type FileType = 'photo' | 'signature' | 'document' | 'left_thumb' | 'right_thumb' | 'declaration';

export interface ExamRequirement {
  width?: number;
  height?: number;
  dimensionsDescription?: string;
  minSizeKb?: number;
  maxSizeKb: number;
  format: 'jpg' | 'jpeg' | 'png' | 'pdf';
  description: string;
  dpi?: number;
}

export interface Exam {
  id: string;
  name: string;
  category?: string;
  notes?: string;
  photo: ExamRequirement;
  signature: ExamRequirement;
  document?: ExamRequirement;
  left_thumb?: ExamRequirement;
  right_thumb?: ExamRequirement;
  declaration?: ExamRequirement;
}

export const EXAMS: Exam[] = [
  // Existing Exams
  {
    id: 'dsssb',
    name: 'DSSSB',
    category: 'Other',
    photo: {
      width: 480,
      height: 672,
      minSizeKb: 50,
      maxSizeKb: 300,
      format: 'jpg',
      description: 'Photo: 480 × 672 px, 96 DPI (50–300 KB)',
      dpi: 96
    },
    signature: {
      width: 140,
      height: 110,
      maxSizeKb: 40,
      format: 'jpg',
      description: 'Signature: 140 × 110 px (Max 40 KB)',
    },
    left_thumb: {
      width: 110,
      height: 140,
      maxSizeKb: 40,
      format: 'jpg',
      description: 'Left Thumb: 110 × 140 px (Max 40 KB)',
    },
    right_thumb: {
      width: 110,
      height: 140,
      maxSizeKb: 40,
      format: 'jpg',
      description: 'Right Thumb: 110 × 140 px (Max 40 KB)',
    }
  },
  {
    id: 'ssc',
    name: 'SSC (CGL / CHSL / MTS / GD)',
    category: 'All India Exams',
    photo: {
      width: 413, // ~3.5cm at 300dpi
      height: 531, // ~4.5cm at 300dpi
      minSizeKb: 20,
      maxSizeKb: 50,
      format: 'jpg',
      description: 'Photo: ~3.5 × 4.5 cm (20–50 KB)',
    },
    signature: {
      width: 708, // ~6cm at 300dpi
      height: 236, // ~2cm at 300dpi
      minSizeKb: 10,
      maxSizeKb: 20,
      format: 'jpg',
      description: 'Signature: ~6 × 2 cm (10–20 KB)',
    }
  },
  {
    id: 'rrb-ntpc',
    name: 'RRB NTPC',
    category: 'Railway',
    photo: {
      width: 240,
      height: 320,
      minSizeKb: 30,
      maxSizeKb: 70,
      format: 'jpg',
      description: 'Photo: 240(W) × 320(H) px (30–70 KB)',
    },
    signature: {
      width: 140,
      height: 60,
      minSizeKb: 30,
      maxSizeKb: 70,
      format: 'jpg',
      description: 'Signature: 140 × 60 px (30–70 KB)',
    },
    document: {
      format: 'pdf',
      minSizeKb: 10,
      maxSizeKb: 500,
      description: 'Document: PDF (Max 500 KB)'
    }
  },
  {
    id: 'rrb-alp',
    name: 'RRB ALP',
    category: 'Railway',
    photo: {
      width: 240,
      height: 320,
      minSizeKb: 30,
      maxSizeKb: 70,
      format: 'jpg',
      description: 'Photo: 240(W) × 320(H) px (30–70 KB)',
    },
    signature: {
      width: 140,
      height: 60,
      minSizeKb: 30,
      maxSizeKb: 70,
      format: 'jpg',
      description: 'Signature: 140 × 60 px (30–70 KB)',
    },
    document: {
      format: 'pdf',
      minSizeKb: 10,
      maxSizeKb: 500,
      description: 'Document: PDF (Max 500 KB)'
    }
  },
  {
    id: 'rrb-group-d',
    name: 'RRB Group D',
    category: 'Railway',
    photo: {
      width: 240,
      height: 320,
      minSizeKb: 30,
      maxSizeKb: 70,
      format: 'jpg',
      description: 'Photo: Live capture (Not uploaded normally)',
    },
    signature: {
      width: 140,
      height: 60,
      minSizeKb: 30,
      maxSizeKb: 49,
      format: 'jpg',
      description: 'Signature: 140 × 60 px (30–49 KB)',
    },
    document: {
      format: 'pdf',
      minSizeKb: 10,
      maxSizeKb: 500,
      description: 'Document: PDF (Max 500 KB)'
    }
  },
  {
    id: 'ibps',
    name: 'IBPS (PO / Clerk / RRB / SO)',
    category: 'All India Exams',
    photo: {
      width: 200,
      height: 230,
      minSizeKb: 20,
      maxSizeKb: 50,
      format: 'jpg',
      description: 'Photo: 200 × 230 px (20–50 KB)',
    },
    signature: {
      width: 140,
      height: 60,
      minSizeKb: 10,
      maxSizeKb: 20,
      format: 'jpg',
      description: 'Signature: 140 × 60 px (10–20 KB)',
    }
  },
  {
    id: 'sbi',
    name: 'SBI (PO / Clerk)',
    category: 'All India Exams',
    photo: {
      width: 200,
      height: 230,
      minSizeKb: 20,
      maxSizeKb: 50,
      format: 'jpg',
      description: 'Photo: 200 × 230 px (20–50 KB)',
    },
    signature: {
      width: 140,
      height: 60,
      minSizeKb: 10,
      maxSizeKb: 20,
      format: 'jpg',
      description: 'Signature: 140 × 60 px (10–20 KB)',
    }
  },
  {
    id: 'rbi',
    name: 'RBI Grade-B / RBI Assistant',
    category: 'All India Exams',
    photo: {
      width: 200,
      height: 230,
      minSizeKb: 20,
      maxSizeKb: 50,
      format: 'jpg',
      description: 'Photo: 200 × 230 px (20–50 KB)',
    },
    signature: {
      width: 140,
      height: 60,
      minSizeKb: 10,
      maxSizeKb: 20,
      format: 'jpg',
      description: 'Signature: 140 × 60 px (10–20 KB)',
    }
  },
  {
    id: 'upsc',
    name: 'UPSC Civil Services (CSE)',
    category: 'All India Exams',
    photo: {
      minSizeKb: 20,
      maxSizeKb: 200,
      format: 'jpg',
      description: "Photo: JPG image between 20–200 KB. Must be named exactly 'photo.jpg'. Background must be plain white. Both ears must be clearly visible. No shadows, dark glasses, or uneven lighting. Face must cover at least 75% (3/4th) of the image area.",
    },
    signature: {
      width: 450,
      height: 350,
      dimensionsDescription: 'Width between 350 px and 500 px',
      minSizeKb: 20,
      maxSizeKb: 100,
      format: 'jpg',
      description: "Signature: JPG image between 20–100 KB. Must be named exactly 'signature.jpg'. Sign THREE times, one below the other, using black ink on plain white paper with adequate spacing. Scan all three into a single image. Width must be between 350px to 500px.",
    },
    document: {
      minSizeKb: 50,
      maxSizeKb: 300,
      format: 'pdf',
      description: "Document: All uploaded PDFs must strictly follow UPSC's exact file naming nomenclature (e.g., id_card.pdf, board_certificate.pdf, caste_certificate.pdf). The UPSC portal will reject incorrectly named files.",
    }
  },
  {
    id: 'neet',
    name: 'NEET (UG)',
    category: 'All India Exams',
    photo: {
      minSizeKb: 10,
      maxSizeKb: 200,
      format: 'jpg',
      description: 'Photo: JPG, 10–200 KB',
    },
    signature: {
      minSizeKb: 4,
      maxSizeKb: 30,
      format: 'jpg',
      description: 'Signature: JPG, 4–30 KB',
    }
  },
  {
    id: 'jee',
    name: 'JEE Main',
    category: 'All India Exams',
    photo: {
      minSizeKb: 10,
      maxSizeKb: 200,
      format: 'jpg',
      description: 'Photo: JPG, 10–200 KB',
    },
    signature: {
      minSizeKb: 4,
      maxSizeKb: 30,
      format: 'jpg',
      description: 'Signature: JPG, 4–30 KB',
    }
  },
  // Police & Paramilitary
  {
    id: 'up-police',
    name: 'UP Police Constable/SI',
    category: 'Police',
    notes: 'White background, No spectacles, No cap.',
    photo: { width: 413, height: 531, minSizeKb: 20, maxSizeKb: 50, format: 'jpg', description: 'Photo: 3.5x4.5 cm (20-50 KB)' },
    signature: { width: 413, height: 177, minSizeKb: 10, maxSizeKb: 20, format: 'jpg', description: 'Signature: 3.5x1.5 cm (10-20 KB)' }
  },
  {
    id: 'bihar-police',
    name: 'Bihar Police',
    category: 'Police',
    notes: 'Clear face, no selfies.',
    photo: { width: 200, height: 230, maxSizeKb: 50, format: 'jpg', description: 'Photo: 200x230 px (<50 KB)' },
    signature: { width: 140, height: 60, maxSizeKb: 50, format: 'jpg', description: 'Signature: 140x60 px (<50 KB)' }
  },
  {
    id: 'mp-police',
    name: 'MP Police',
    category: 'Police',
    notes: 'Name and Date of Photo must be printed on image.',
    photo: { width: 413, height: 531, minSizeKb: 20, maxSizeKb: 50, format: 'jpg', description: 'Photo: 3.5x4.5 cm (20-50 KB)' },
    signature: { width: 708, height: 236, minSizeKb: 10, maxSizeKb: 20, format: 'jpg', description: 'Signature: 6x2 cm (10-20 KB)' }
  },
  {
    id: 'punjab-police',
    name: 'Punjab Police',
    category: 'Police',
    notes: 'Standard Passport Ratio.',
    photo: { minSizeKb: 20, maxSizeKb: 100, format: 'jpg', description: 'Photo: 20-100 KB' },
    signature: { minSizeKb: 10, maxSizeKb: 50, format: 'jpg', description: 'Signature: 10-50 KB' }
  },
  {
    id: 'capf-ac',
    name: 'CAPF AC (UPSC)',
    category: 'Police',
    notes: 'Face must cover 75% of photo area.',
    photo: { width: 350, height: 350, minSizeKb: 20, maxSizeKb: 200, format: 'jpg', description: 'Photo: 350x350 px (20-200 KB)' },
    signature: { width: 350, height: 350, minSizeKb: 20, maxSizeKb: 100, format: 'jpg', description: 'Signature: 350x350 px (20-100 KB)' }
  },
  // Teaching Eligibility
  {
    id: 'bpsc-tre-4-0-2026',
    name: 'BPSC TRE 4.0 2026',
    category: 'Teaching',
    notes: 'Photo is captured live via webcam. Resize Signature & Document only.',
    photo: { minSizeKb: 0, maxSizeKb: 100, format: 'jpg', description: 'Photo: Upload not required (Live Capture)' },
    signature: { width: 300, height: 200, minSizeKb: 1, maxSizeKb: 20, format: 'jpg', description: 'Signature: 250-320px (W) x 150-220px (H) (Under 20 KB)' },
    document: { minSizeKb: 50, maxSizeKb: 100, format: 'pdf', description: 'Document: 50–100 KB' }
  },
  {
    id: 'otet-2026',
    name: 'OTET 2026',
    category: 'Teaching',
    notes: 'This tool follows official OTET 2026 upload guidelines (10KB–40KB, JPG/PNG). No fixed dimensions are specified.',
    photo: { minSizeKb: 10, maxSizeKb: 40, format: 'jpg', description: 'Photo: 10KB to 40KB (JPG/PNG)' },
    signature: { minSizeKb: 10, maxSizeKb: 40, format: 'jpg', description: 'Signature: 10KB to 40KB (JPG/PNG)' }
  },
  {
    id: 'ctet',
    name: 'CTET',
    category: 'Teaching',
    photo: { width: 413, height: 531, minSizeKb: 10, maxSizeKb: 100, format: 'jpg', description: 'Photo: 3.5x4.5 cm (10-100 KB)' },
    signature: { width: 413, height: 177, minSizeKb: 3, maxSizeKb: 30, format: 'jpg', description: 'Signature: 3.5x1.5 cm (3-30 KB)' }
  },
  {
    id: 'uptet',
    name: 'UPTET',
    category: 'Teaching',
    photo: { width: 413, height: 531, minSizeKb: 20, maxSizeKb: 50, format: 'jpg', description: 'Photo: 3.5x4.5 cm (20-50 KB)' },
    signature: { width: 413, height: 177, minSizeKb: 10, maxSizeKb: 20, format: 'jpg', description: 'Signature: 3.5x1.5 cm (10-20 KB)' }
  },
  {
    id: 'reet',
    name: 'REET',
    category: 'Teaching',
    notes: 'Recent photo within 6 months.',
    photo: { minSizeKb: 50, maxSizeKb: 100, format: 'jpg', description: 'Photo: 50-100 KB' },
    signature: { minSizeKb: 20, maxSizeKb: 50, format: 'jpg', description: 'Signature: 20-50 KB' }
  },
  {
    id: 'supertet',
    name: 'Super TET',
    category: 'Teaching',
    photo: { width: 413, height: 531, minSizeKb: 20, maxSizeKb: 50, format: 'jpg', description: 'Photo: 3.5x4.5 cm (20-50 KB)' },
    signature: { minSizeKb: 5, maxSizeKb: 20, format: 'jpg', description: 'Signature: 5-20 KB' }
  },
  {
    id: 'kvs',
    name: 'KVS',
    category: 'Teaching',
    notes: 'Standard 3.5x4.5cm Ratio.',
    photo: { minSizeKb: 10, maxSizeKb: 50, format: 'jpg', description: 'Photo: 10-50 KB' },
    signature: { minSizeKb: 10, maxSizeKb: 20, format: 'jpg', description: 'Signature: 10-20 KB' }
  },
  // Defence Services
  {
    id: 'nda-cds',
    name: 'NDA/CDS',
    category: 'Defence',
    photo: { width: 350, height: 350, minSizeKb: 20, maxSizeKb: 300, format: 'jpg', description: 'Photo: 350x350 px (20-300 KB)' },
    signature: { width: 350, height: 350, minSizeKb: 20, maxSizeKb: 300, format: 'jpg', description: 'Signature: 350x350 px (20-300 KB)' },
    document: { minSizeKb: 20, maxSizeKb: 300, format: 'pdf', description: 'ID Proof: PDF (20-300 KB)' }
  },
  {
    id: 'afcat',
    name: 'AFCAT',
    category: 'Defence',
    notes: 'Slate Photo: Hold black slate with Name and Date in chalk.',
    photo: { minSizeKb: 10, maxSizeKb: 50, format: 'jpg', description: 'Photo: 10-50 KB' },
    signature: { minSizeKb: 10, maxSizeKb: 50, format: 'jpg', description: 'Signature: 10-50 KB' }
  },
  {
    id: 'navy-agniveer',
    name: 'Navy Agniveer',
    category: 'Defence',
    photo: { width: 300, height: 400, minSizeKb: 20, maxSizeKb: 100, format: 'jpg', description: 'Photo: 300x400 px (20-100 KB)' },
    signature: { minSizeKb: 20, maxSizeKb: 100, format: 'jpg', description: 'Signature: 20-100 KB' }
  },
  {
    id: 'army-agniveer',
    name: 'Army Agniveer',
    category: 'Defence',
    photo: { width: 200, height: 230, minSizeKb: 10, maxSizeKb: 40, format: 'jpg', description: 'Photo: 200x230 px (10-40 KB)' },
    signature: { width: 140, height: 60, minSizeKb: 4, maxSizeKb: 30, format: 'jpg', description: 'Signature: 140x60 px (4-30 KB)' }
  },
  // Insurance Regulatory
  {
    id: 'lic-aao',
    name: 'LIC AAO/Asst',
    category: 'Insurance',
    photo: { width: 200, height: 230, minSizeKb: 20, maxSizeKb: 50, format: 'jpg', description: 'Photo: 200x230 px (20-50 KB)' },
    signature: { width: 140, height: 60, minSizeKb: 10, maxSizeKb: 20, format: 'jpg', description: 'Signature: 140x60 px (10-20 KB)' },
    declaration: { width: 800, height: 400, minSizeKb: 50, maxSizeKb: 100, format: 'jpg', description: 'Handwritten Declaration: 800x400 px (50-100 KB)' }
  },
  {
    id: 'niacl-ao',
    name: 'NIACL AO',
    category: 'Insurance',
    photo: { width: 200, height: 230, minSizeKb: 20, maxSizeKb: 50, format: 'jpg', description: 'Photo: 200x230 px (20-50 KB)' },
    signature: { width: 140, height: 60, minSizeKb: 10, maxSizeKb: 20, format: 'jpg', description: 'Signature: 140x60 px (10-20 KB)' }
  },
  {
    id: 'esic-udc',
    name: 'ESIC UDC/MTS',
    category: 'Insurance',
    photo: { width: 200, height: 230, minSizeKb: 20, maxSizeKb: 50, format: 'jpg', description: 'Photo: 200x230 px (20-50 KB)' },
    signature: { width: 140, height: 60, minSizeKb: 10, maxSizeKb: 20, format: 'jpg', description: 'Signature: 140x60 px (10-20 KB)' },
    left_thumb: { width: 240, height: 240, minSizeKb: 20, maxSizeKb: 50, format: 'jpg', description: 'Thumb Impression: 240x240 px (20-50 KB)' }
  },
  {
    id: 'ssb-odisha',
    name: 'SSB Odisha (Jr Asst/Clerk)',
    category: 'State Exams',
    photo: { width: 390, height: 470, minSizeKb: 30, maxSizeKb: 100, format: 'jpg', description: 'Photo: 390x470 px (30-100 KB)' },
    signature: { width: 455, height: 210, minSizeKb: 20, maxSizeKb: 50, format: 'jpg', description: 'Signature: 455x210 px (20-50 KB)' },
    left_thumb: { width: 455, height: 210, minSizeKb: 20, maxSizeKb: 50, format: 'jpg', description: 'Left Thumb: 455x210 px (20-50 KB)' }
  }
];
