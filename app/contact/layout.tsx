import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact ExamResize | Support for Photo & Signature Resizing',
  description: 'Need help resizing photos or signatures for your exam forms? Contact the ExamResize support team for fast assistance with our image and document tools.',
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
