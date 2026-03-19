import { Header, Footer } from '@/components/Navigation';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">About ExamResize</h1>
        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-600 mb-6">
            ExamResize is dedicated to simplifying the application process for competitive exams. We understand the frustration of having your application rejected due to incorrect photo dimensions, file sizes, or formatting issues. Our platform offers a comprehensive suite of tools, including an <strong>SSC photo resizer</strong>, <strong>UPSC document compressor</strong>, <strong>IBPS signature optimizer</strong>, and <strong>20KB photo converter</strong>, designed to help you prepare your files with precision.
          </p>
          <p className="text-lg text-slate-600 mb-6">
            Our tool provides a fast, secure, and easy-to-use solution to <strong>resize, compress, and format photos, signatures, and PDF documents</strong> to meet the strict requirements of various government and competitive exam portals in India, such as <strong>RRB, SBI, RBI, NEET, and JEE</strong>. Whether you need a <strong>passport size photo maker</strong> or a <strong>document size reducer</strong>, we have you covered.
          </p>
          <p className="text-lg text-slate-600">
            Your privacy is our priority. When you upload a file, it is securely transmitted to our processing server to perform the requested optimization task. Once processing is completed and the optimized file is delivered to your browser, the temporary files are automatically deleted. We do not maintain a database or archive of user-uploaded files, and no permanent copy of your files is retained.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
