import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | ExamResize',
  description: 'Have questions or need help with resizing your exam photos? Get in touch with the ExamResize support team.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
