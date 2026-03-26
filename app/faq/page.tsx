import { Header, Footer } from '@/components/Navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) | ExamResize',
  description: 'Find answers to frequently asked questions about ExamResize. Learn about supported file formats, size limits, data security, and how to use our tools.',
  alternates: {
    canonical: '/faq',
  },
};

const faqs = [
  {
    question: "What is ExamResize?",
    answer: "ExamResize is an online tool that helps you resize and optimize photos, signatures, and PDF documents to meet exam application requirements."
  },
  {
    question: "Which file formats are supported?",
    answer: "You can upload JPG, PNG, HEIC, and PDF files for processing."
  },
  {
    question: "What is the maximum file size I can upload?",
    answer: "The maximum upload size currently supported is 10 MB."
  },
  {
    question: "Are my uploaded files stored on the server?",
    answer: "No. Files are processed temporarily and automatically deleted shortly after the optimized file is generated."
  },
  {
    question: "Is my data secure?",
    answer: "Yes. Uploaded files are only used to perform the requested optimization and are not permanently stored."
  },
  {
    question: "Can I use custom dimensions or file sizes?",
    answer: "Yes. In addition to preset options for common exams, you can enter custom dimensions and size requirements."
  },
  {
    question: "Will the processed file always be accepted by exam authorities?",
    answer: "The tool helps format files according to common requirements, but users should always verify the official specifications provided by the exam authority."
  },
  {
    question: "Do I need to install any software to use the tool?",
    answer: "No installation is required. The tool works directly in your web browser."
  },
  {
    question: "What should I do if my file does not process correctly?",
    answer: "Make sure the file format is supported and the size is within the allowed limit. If the problem continues, try uploading the file again."
  },
  {
    question: "Is the service free to use?",
    answer: "Yes. ExamResize is free to use for preparing files for exam applications."
  }
];

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      
      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Frequently Asked Questions (FAQ)
            </h1>
            <p className="text-lg text-slate-600">
              Find quick answers to common questions about using ExamResize.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {index + 1}. {faq.question}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
