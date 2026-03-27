import { Header, Footer } from '@/components/Navigation';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | ExamResize User Guidelines',
  description: 'Review the ExamResize Terms of Service to understand the rules, guidelines, and user responsibilities when using our photo and document resizing tools.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Terms of Service</h1>
          <p className="text-slate-500 mb-8">Effective Date: March 13, 2026</p>
          
          <div className="prose prose-slate max-w-none space-y-8 text-slate-700">
            <section>
              <p>
                These Terms of Service govern your use of the website ExamResize.online. By accessing or using the website, you agree to these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">1. Service Description</h2>
              <p>
                ExamResize provides online tools that allow users to resize images for exam forms, compress photos, optimize signatures, and prepare documents to meet file size requirements. The service is provided for convenience and informational purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">2. User Responsibilities</h2>
              <p>
                Users are responsible for ensuring they have the right to upload and process any file, verifying that processed files meet the requirements of the relevant exam authority, reviewing outputs before submitting them to any organization, and ensuring uploaded content does not violate any laws or third-party rights.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">3. Acceptable Use</h2>
              <p>
                Users agree not to upload malicious or illegal files, attempt to gain unauthorized access to the website or servers, interfere with the functionality or security of the service, or misuse the platform in any way that could harm the website or other users.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">4. File Processing</h2>
              <p>
                Uploaded files are processed temporarily to perform the requested optimization. Files are processed in memory or temporary system storage and are automatically deleted shortly after processing is completed. The service does not permanently store uploaded user files.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">5. No Guarantee of Acceptance</h2>
              <p>
                While the service helps format files to common exam requirements, we cannot guarantee that processed files will be accepted by any examination board, government authority, or institution. Users must verify official requirements independently.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">6. Service Availability</h2>
              <p>
                We strive to keep the service reliable and accessible. However, we do not guarantee uninterrupted operation and may modify or discontinue features at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">7. Intellectual Property</h2>
              <p>
                All website content including design, software, branding, and functionality is owned by ExamResize and protected by applicable intellectual property laws. Unauthorized copying, reproduction, or distribution is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">8. Disclaimer</h2>
              <p>
                The service is provided “as is” and “as available.” We make no warranties regarding accuracy, reliability, or suitability for specific requirements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">9. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, ExamResize will not be liable for rejection of applications due to file formatting, data loss, service interruptions, or indirect or consequential damages.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">10. Governing Law</h2>
              <p>
                These Terms are governed by the laws of India. Any disputes shall fall under the jurisdiction of the competent courts in India.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">11. Contact</h2>
              <p>
                For questions regarding these Terms, you may contact us through the website at <a href="https://examresize.online" className="text-[#0056b3] hover:underline">https://examresize.online</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
