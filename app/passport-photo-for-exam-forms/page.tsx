import LandingPageTemplate from '@/components/LandingPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Passport Photo for Exam Forms | ExamResize',
  description: 'Create a standard passport photo for exam forms instantly. Our tool automatically crops, resizes, and compresses your photo to 3.5cm x 4.5cm at 300 DPI.',
  alternates: {
    canonical: '/passport-photo-for-exam-forms',
  },
};

export default function PassportPhoto() {
  return (
    <LandingPageTemplate
      title="Passport Photo for Exam Forms"
      description="Create a standard passport photo for exam forms. Automatically crop, resize, and compress your photo to 3.5cm x 4.5cm at 300 DPI."
      keyword="passport photo maker"
      faqs={[
        {
          q: 'What is the standard size for a passport photo?',
          a: 'The standard size for a passport photo is 3.5cm x 4.5cm (width x height). At 300 DPI, this translates to 413x531 pixels.'
        },
        {
          q: 'How do I create a passport photo for an exam form?',
          a: 'Upload your photo, select the "Standard Passport Photo" preset, and click optimize. Our tool will automatically resize and compress your photo to the standard dimensions and size.'
        },
        {
          q: 'Can I use a selfie for a passport photo?',
          a: 'While you can use a selfie, it is highly recommended to use a photo taken by someone else against a plain background. Ensure your face is clearly visible, well-lit, and centered.'
        }
      ]}
      relatedTools={[
        {
          title: 'DSSSB Image Optimizer',
          link: '/dsssb-image-optimizer',
          desc: 'Format your photo, signature, and thumb impressions for DSSSB exams with exact 96 DPI requirement.'
        },
        {
          title: 'Photo Resize for SSC Form',
          link: '/photo-resize-for-ssc-form',
          desc: 'Easily resize and compress your photo for SSC exams. Get the exact 200x230 pixels and 20KB-50KB size.'
        }
      ]}
    />
  );
}
