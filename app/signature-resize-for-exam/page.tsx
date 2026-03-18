import LandingPageTemplate from '@/components/LandingPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Signature Resize for Exam | ExamResize',
  description: 'Optimize your signature image for exam forms. Automatically convert background to white, increase contrast, and compress to 10KB-20KB.',
};

export default function SignatureResize() {
  return (
    <LandingPageTemplate
      title="Signature Resize for Exam"
      description="Optimize your signature image for exam forms. Automatically convert background to white, increase contrast, and compress to 10KB-20KB."
      keyword="signature resizer"
      faqs={[
        {
          q: 'What is the required signature size for most exams?',
          a: 'Most government and competitive exams require signatures to be between 10KB and 20KB in size, with dimensions around 140x60 pixels in JPEG/JPG format.'
        },
        {
          q: 'How does the signature optimizer work?',
          a: 'Our signature optimizer automatically detects the signature, converts the background to white, increases the contrast of the ink, and compresses the file to the required size.'
        },
        {
          q: 'Can I use a photo of my signature taken with a phone?',
          a: 'Yes! Just upload the photo of your signature. Our tool will automatically clean up the background and enhance the contrast to make it look like a scanned document.'
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
