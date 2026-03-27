import { Header, Footer } from '@/components/Navigation';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | ExamResize Secure Photo Handling',
  description: 'Read the ExamResize Privacy Policy to understand how we securely handle, process, and protect your photos, signatures, and documents for exam applications.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
          <p className="text-slate-500 mb-8">Effective Date: March 13, 2026</p>
          
          <div className="prose prose-slate max-w-none space-y-8 text-slate-700">
            <section>
              <p>
                ExamResize (“we”, “our”, or “us”) operates the website ExamResize.online, which provides tools to resize, compress, and optimize images and documents for exam applications and similar purposes.
              </p>
              <p className="mt-4">
                This Privacy Policy explains how information is handled when you use our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">1. Information We Process</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-800">Uploaded Files</h3>
                  <p>
                    Files uploaded by users for processing, such as photographs, signatures, PDF documents, or other image and document files required for exam forms. These files are used only to perform the requested processing operation.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Technical Information</h3>
                  <p>
                    We may automatically collect limited technical data including IP address, browser type, device type, approximate geographic region, and usage data. This information helps maintain security, detect misuse, and improve the service.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">2. How File Processing Works</h2>
              <p>
                When you upload a file, the file is securely transmitted to our processing server. The server performs the requested optimization task such as resizing or compression, and the optimized file is returned to your browser.
              </p>
              <p className="mt-4">
                Processing is performed in memory or using temporary system storage only for the duration necessary to complete the request.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">3. Temporary Processing and Deletion</h2>
              <p>
                Uploaded files are not permanently stored.
              </p>
              <p className="mt-4">
                Files may exist temporarily during processing in server memory or in temporary system directories used for processing tasks.
              </p>
              <p className="mt-4">
                Once processing is completed and the optimized file is delivered to the user, the temporary files are automatically deleted and no permanent copy of the uploaded or processed files is retained.
              </p>
              <p className="mt-4">
                We do not maintain a database or archive of user-uploaded files.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">4. Purpose of Data Processing</h2>
              <p>
                Information is processed solely to provide the requested file optimization tools, maintain service functionality and security, diagnose technical issues, improve performance and reliability, and comply with legal obligations where applicable.
              </p>
              <p className="mt-4 font-medium text-[#0056b3]">
                We do not sell, rent, or trade personal data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">5. Cookies and Website Analytics</h2>
              <p>
                The website may use minimal cookies or similar technologies necessary for maintaining functionality, preventing abuse, and understanding website traffic and performance.
              </p>
              <p className="mt-4">
                Users can control cookies through their browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">6. Data Security</h2>
              <p>
                We implement reasonable administrative and technical safeguards to protect data during processing. However, no internet-based system can guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">7. Third-Party Infrastructure</h2>
              <p>
                Our service may rely on third-party hosting infrastructure required to operate the website. These providers may process limited technical data necessary for hosting and delivering the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">8. User Rights</h2>
              <p>
                Under applicable data protection laws in India, including the Digital Personal Data Protection Act, 2023, users may have the right to request information about personal data processing, request correction or deletion where applicable, withdraw consent where processing is based on consent, and submit complaints regarding data handling.
              </p>
              <p className="mt-4">
                Requests may be submitted using the contact information below.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">9. Children’s Privacy</h2>
              <p>
                The website is intended for general users preparing documents for examination forms. We do not knowingly collect personal information from children without appropriate consent where required by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">10. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy periodically. The latest version will always be available on this page with the updated effective date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">11. Contact Information</h2>
              <p>
                If you have any questions regarding this Privacy Policy, you may contact us through the website at <a href="https://examresize.online" className="text-[#0056b3] hover:underline">https://examresize.online</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
