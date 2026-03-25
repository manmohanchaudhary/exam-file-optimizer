import LandingPageTemplate from '@/components/LandingPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photo Resize for SSC Form | ExamResize',
  description: 'Easily resize and compress your photo for SSC exams. Get the exact 200x230 pixels and 20KB-50KB size required for SSC applications.',
};

export default function SSCPhotoResize() {
  return (
    <LandingPageTemplate
      title="Photo Resize for SSC Form"
      description="Easily resize and compress your photo for SSC exams. Get the exact 200x230 pixels and 20KB-50KB size required for SSC applications."
      keyword="SSC photo resizer"
      initialExamId="ssc"
      faqs={[
        {
          q: 'What is the required photo size for SSC forms?',
          a: 'The Staff Selection Commission (SSC) requires uploaded photos to be between 20KB and 50KB in size, with dimensions of 200x230 pixels in JPEG/JPG format.'
        },
        {
          q: 'How do I resize my photo to 20KB-50KB?',
          a: 'Simply upload your photo to our tool, select the "SSC Photo" preset, and click optimize. We will automatically resize and compress it to meet the exact requirements.'
        },
        {
          q: 'Is my photo secure?',
          a: 'Yes, absolutely. All processing is done securely and your files are automatically deleted from our servers immediately after processing.'
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
