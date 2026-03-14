import LandingPageTemplate from '@/components/LandingPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '20KB Photo Converter | ExamResize',
  description: 'Convert your photo to exactly 20KB or any custom size. Perfect for online applications, exam forms, and government portals.',
};

export default function PhotoConverter20kb() {
  return (
    <LandingPageTemplate
      title="20KB Photo Converter"
      description="Convert your photo to exactly 20KB or any custom size. Perfect for online applications, exam forms, and government portals."
      keyword="20KB photo converter"
      faqs={[
        {
          q: 'How do I compress a photo to exactly 20KB?',
          a: 'Our tool uses advanced compression algorithms to reduce the file size of your photo while maintaining maximum visual quality. Simply upload your photo, select the custom preset, and enter 20KB as the max size.'
        },
        {
          q: 'Will compressing to 20KB make my photo blurry?',
          a: 'We use smart compression techniques that balance file size and quality. While some detail loss is inevitable at very small sizes, our tool ensures your face remains clear and recognizable.'
        },
        {
          q: 'What formats are supported?',
          a: 'We support JPG, JPEG, and PNG formats. The output file will be a highly optimized JPG, which is the standard format required by most portals.'
        }
      ]}
    />
  );
}
