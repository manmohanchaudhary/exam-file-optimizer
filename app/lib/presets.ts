export type FileType = 'photo' | 'signature' | 'document';

export interface Preset {
  id: string;
  name: string;
  type: FileType;
  width?: number;
  height?: number;
  minSizeKb?: number;
  maxSizeKb: number;
  format: 'jpg' | 'jpeg' | 'png' | 'pdf';
  dpi?: number;
  description: string;
}

export const PRESETS: Preset[] = [
  {
    id: 'ssc-photo',
    name: 'SSC Photo',
    type: 'photo',
    width: 200,
    height: 230,
    minSizeKb: 20,
    maxSizeKb: 50,
    format: 'jpg',
    description: 'Standard photo for SSC exams (20KB - 50KB, 200x230px)',
  },
  {
    id: 'ssc-signature',
    name: 'SSC Signature',
    type: 'signature',
    width: 140,
    height: 60,
    minSizeKb: 10,
    maxSizeKb: 20,
    format: 'jpg',
    description: 'Standard signature for SSC exams (10KB - 20KB, 140x60px)',
  },
  {
    id: 'upsc-photo',
    name: 'UPSC Photo',
    type: 'photo',
    width: 350,
    height: 350,
    minSizeKb: 20,
    maxSizeKb: 300,
    format: 'jpg',
    description: 'Standard photo for UPSC exams (20KB - 300KB, Min 350x350px)',
  },
  {
    id: 'upsc-signature',
    name: 'UPSC Signature',
    type: 'signature',
    width: 350,
    height: 350,
    minSizeKb: 20,
    maxSizeKb: 300,
    format: 'jpg',
    description: 'Standard signature for UPSC exams (20KB - 300KB, Min 350x350px)',
  },
  {
    id: 'banking-photo',
    name: 'Banking Exam Photo',
    type: 'photo',
    width: 200,
    height: 230,
    minSizeKb: 20,
    maxSizeKb: 50,
    format: 'jpg',
    description: 'IBPS/SBI Banking photo (20KB - 50KB, 200x230px)',
  },
  {
    id: 'banking-signature',
    name: 'Banking Signature',
    type: 'signature',
    width: 140,
    height: 60,
    minSizeKb: 10,
    maxSizeKb: 20,
    format: 'jpg',
    description: 'IBPS/SBI Banking signature (10KB - 20KB, 140x60px)',
  },
  {
    id: 'neet-photo',
    name: 'NEET Passport Photo',
    type: 'photo',
    width: 200,
    height: 250,
    minSizeKb: 10,
    maxSizeKb: 200,
    format: 'jpg',
    description: 'NEET UG Passport size photo (10KB - 200KB)',
  },
  {
    id: 'passport-photo',
    name: 'Standard Passport Photo',
    type: 'photo',
    width: 413, // 3.5cm at 300dpi
    height: 531, // 4.5cm at 300dpi
    maxSizeKb: 100,
    format: 'jpg',
    dpi: 300,
    description: 'Standard 3.5cm x 4.5cm passport photo',
  },
  {
    id: 'document-pdf',
    name: 'Standard Document (PDF)',
    type: 'document',
    maxSizeKb: 1000, // 1MB
    format: 'pdf',
    description: 'Compress PDF document under 1MB',
  },
  {
    id: 'custom-photo',
    name: 'Custom Photo',
    type: 'photo',
    maxSizeKb: 50,
    format: 'jpg',
    description: 'Enter your own dimensions and size limits',
  },
  {
    id: 'custom-signature',
    name: 'Custom Signature',
    type: 'signature',
    maxSizeKb: 20,
    format: 'jpg',
    description: 'Enter your own dimensions and size limits',
  },
  {
    id: 'custom-document',
    name: 'Custom Document',
    type: 'document',
    maxSizeKb: 500,
    format: 'pdf',
    description: 'Enter your own size limit for PDF',
  }
];
