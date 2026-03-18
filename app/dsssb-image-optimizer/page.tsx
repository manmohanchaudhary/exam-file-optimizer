import LandingPageTemplate from '@/components/LandingPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DSSSB Image Optimizer | Resize Photo, Signature & Thumb',
  description: 'Resize and compress your photo, signature, and thumb impressions for DSSSB exams. Ensure exactly 96 DPI and correct dimensions for DSSSB applications.',
};

export default function DSSSBImageOptimizer() {
  return (
    <LandingPageTemplate
      title="DSSSB Image Optimizer"
      description="Resize photo, signature & thumb for DSSSB form. Get the exact dimensions, 96 DPI, and file size required for DSSSB applications instantly."
      keyword="DSSSB Image Optimizer"
      initialExamId="dsssb"
      faqs={[
        {
          q: 'What is the required photo size for DSSSB forms?',
          a: 'The DSSSB requires candidate photos to be 480x672 pixels, exactly 96 DPI, in JPG format, and between 50KB to 300KB in size.'
        },
        {
          q: 'What are the requirements for signature and thumb impressions?',
          a: 'Signatures must be 140x110 pixels (max 40KB). Left and Right thumb impressions must be 110x140 pixels (max 40KB). All must be in JPG format.'
        },
        {
          q: 'Does this tool set the correct DPI?',
          a: 'Yes, our tool automatically sets the output DPI to 96 for your candidate photo, ensuring full compliance with DSSSB requirements.'
        },
        {
          q: 'Is my photo secure?',
          a: 'Yes, absolutely. All processing is done securely and your files are automatically deleted from our servers immediately after processing.'
        }
      ]}
      relatedTools={[
        {
          title: 'Photo Resize for SSC Form',
          link: '/photo-resize-for-ssc-form',
          desc: 'Easily resize and compress your photo for SSC exams. Get the exact 200x230 pixels and 20KB-50KB size.'
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
