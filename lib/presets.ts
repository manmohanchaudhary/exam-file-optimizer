export type FileType = 'photo' | 'signature' | 'document' | 'left_thumb' | 'right_thumb';

export interface ExamRequirement {
  width?: number;
  height?: number;
  minSizeKb?: number;
  maxSizeKb: number;
  format: 'jpg' | 'jpeg' | 'png' | 'pdf';
  description: string;
  dpi?: number;
}

export interface Exam {
  id: string;
  name: string;
  photo: ExamRequirement;
  signature: ExamRequirement;
  left_thumb?: ExamRequirement;
  right_thumb?: ExamRequirement;
}

export const EXAMS: Exam[] = [
  {
    id: 'dsssb',
    name: 'DSSSB',
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
    id: 'rrb',
    name: 'RRB (NTPC / Group-D / ALP)',
    photo: {
      width: 320,
      height: 240,
      minSizeKb: 30,
      maxSizeKb: 70,
      format: 'jpg',
      description: 'Photo: 35 × 45 mm or 320 × 240 px (30–70 KB)',
    },
    signature: {
      width: 140,
      height: 60,
      minSizeKb: 30,
      maxSizeKb: 70,
      format: 'jpg',
      description: 'Signature: 140 × 60 px (30–70 KB)',
    }
  },
  {
    id: 'ibps',
    name: 'IBPS (PO / Clerk / RRB / SO)',
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
    photo: {
      minSizeKb: 20,
      maxSizeKb: 300,
      format: 'jpg',
      description: 'Photo: JPG image between 20–300 KB',
    },
    signature: {
      minSizeKb: 20,
      maxSizeKb: 300,
      format: 'jpg',
      description: 'Signature: JPG image between 20–300 KB',
    }
  },
  {
    id: 'neet',
    name: 'NEET (UG)',
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
  }
];
