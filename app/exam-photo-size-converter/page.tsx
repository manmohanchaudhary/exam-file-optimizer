import LandingPageTemplate from '@/components/LandingPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exam Photo Size Converter | Resize Images for Exam Forms',
  description: 'Convert your photo to the exact dimensions and file size required for any exam form. Support for SSC, UPSC, Banking, NEET, and custom size requirements.',
  alternates: {
    canonical: '/exam-photo-size-converter',
  },
};

export default function ExamPhotoConverter() {
  return (
    <LandingPageTemplate
      title="Exam Photo Size Converter"
      description="Convert your photo to the exact dimensions and file size required for any exam form. Support for SSC, UPSC, Banking, NEET, and custom sizes."
      keyword="exam photo size converter"
      faqs={[
        {
          q: 'How do I convert my photo size for an exam form?',
          a: 'Upload your photo, select the appropriate preset for your exam (e.g., SSC, UPSC, Banking), and click optimize. Our tool will automatically resize and compress your photo to the exact requirements.'
        },
        {
          q: 'Can I enter custom dimensions and file size?',
          a: 'Yes! If your exam is not listed in our presets, you can select the "Custom Photo" preset and enter the exact width, height, and maximum file size required by the exam portal.'
        },
        {
          q: 'What if my photo is too large?',
          a: 'Our tool is designed to handle large photos up to 10MB. We use advanced compression algorithms to reduce the file size while maintaining the visual quality required for exam forms.'
        }
      ]}
      relatedTools={[
        {
          title: 'DSSSB Image Optimizer',
          link: '/dsssb-image-optimizer',
          desc: 'Format your photo, signature, and thumb impressions for DSSSB exams with exact 96 DPI requirement.'
        },
        {
          title: 'Signature Resize for Exam',
          link: '/signature-resize-for-exam',
          desc: 'Resize your signature to 10KB-20KB with 140x60 pixels for SSC and other exams.'
        }
      ]}
    />
  );
}
