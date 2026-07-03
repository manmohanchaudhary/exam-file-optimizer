import LandingPageTemplate from '@/components/LandingPageTemplate';
import { Metadata } from 'next';
import { CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'SSC Photo Resizer & Signature Resize Tool Online',
  description: 'Free ssc photo resizer and signature resize tool online. Fix ssc signature resize, adjust photo background, and get the exact ssc photo and signature size limit required.',
  alternates: {
    canonical: '/photo-resize-for-ssc-form',
  },
};

export default function SSCPhotoResize() {
  return (
    <LandingPageTemplate
      title="SSC Photo Resizer & Signature Resize Tool Online"
      description="The fastest, most accurate SSC photo resizer and signature resize tool. Instantly adjust your files for SSC CGL, SSC GD, SSC Stenographer, and SSC Stenographer 2026 applications. Free, fast, secure, and browser-friendly."
      keyword="SSC photo resizer & signature resize"
      initialExamId="ssc"
      toolHelperText={
        <p>Tool supports <strong>SSC photo resize</strong>, <strong>SSC signature resize</strong>, checking <strong>SSC signature size</strong> and performing a <strong>signature resize for SSC</strong> or <strong>photo background change</strong>.</p>
      }
      faqs={[
        {
          q: 'What is the required SSC photo and signature size?',
          a: 'For SSC exams, your photo must be between 20KB and 50KB with dimensions of 200x230 pixels. For an SSC signature resize, the file must be between 10KB and 20KB, with dimensions typically around 4.0 cm x 2.0 cm (or 140x60 pixels).'
        },
        {
          q: 'How do I perform an SSC signature resize 6cm x 2cm?',
          a: 'While standard SSC signatures are 4cm x 2cm, some specific forms may ask for a 6cm x 2cm signature. You can use our tool to enter custom dimensions, and our resize signature feature will automatically compress the file size under 20KB.'
        },
        {
          q: 'Is this an online photo background change tool for SSC?',
          a: 'SSC guidelines typically require a plain white or light-colored photo background. While our primary function is a photo size reducer and resizer, we highly advise ensuring your original photo background is plain before uploading it here.'
        },
        {
          q: 'Can I use this for the SSC Stenographer 2026 exam?',
          a: 'Yes! Our tool is fully updated as an SSC Stenographer photo size adjuster. Whether you are applying for SSC GD, SSC CGL, or SSC Stenographer 2026, the tool automatically enforces the strict photo and signature guidelines.'
        },
        {
          q: 'How does the 20kb photo converter work?',
          a: 'Our built-in 20kb photo converter smart-compresses your image. It reduces file weight without losing vital clarity, ensuring your photo upload gets accepted instantly in the SSC application portal.'
        },
        {
          q: 'Is my data safe with this image resizer?',
          a: 'Absolutely. We respect your privacy. Our photo compressor operates securely in your browser, meaning your photos and signatures are never stored or shared with anyone.'
        },
        {
          q: 'Can I resize an image on my mobile phone?',
          a: 'Yes, our SSC photo resizer and signature resize tool is completely mobile-friendly. You can snap a photo of your signature, upload it, and use the signature resize for SSC feature right from your smartphone.'
        },
        {
          q: 'Why is my SSC form rejecting my photo?',
          a: 'Your photo might be rejected if it has spectacles, a cap, or if the SSC photo and signature size isn\'t correct. Use our 50kb photo converter to ensure the size is exact, and take the picture with a plain photo background without any headgear or glasses.'
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
    >
      {/* Content Sections */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section A */}
          <div className="mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">What is SSC Photo Resizer?</h2>
            <div className="prose prose-slate max-w-none prose-p:leading-relaxed prose-p:text-slate-600 prose-strong:text-slate-900">
              <p>
                Applying for government exams requires strict adherence to digital guidelines. An <strong>SSC photo resizer</strong> is a specialized online tool designed to adjust your passport-size photo to meet the exact requirements of the Staff Selection Commission. Rather than struggling with complicated desktop software, our <strong>photo resizer</strong> acts as an automated <strong>image resizer</strong> and <strong>photo compressor</strong> rolled into one streamlined solution.
              </p>
              <p>
                Whether you are applying for SSC CGL, SSC GD, or SSC Stenographer, this free utility automatically crops, resizes, and guarantees your final image falls perfectly within the required 20KB to 50KB range. It is fast, browser-friendly, and highly secure.
              </p>
            </div>
          </div>

          {/* Section B */}
          <div className="mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">SSC Signature Resize Online</h2>
            <div className="prose prose-slate max-w-none prose-p:leading-relaxed prose-p:text-slate-600 prose-strong:text-slate-900">
              <p>
                Many applicants face rejection due to incorrect signature uploads. It is crucial to perform a proper <strong>resize signature</strong> step before your final submission. Our dedicated online <strong>SSC signature resizer</strong> specifically helps you achieve correct physical dimensions and maintain structural clarity under the file size limits.
              </p>
              <p>
                A standard <strong>signature resize for SSC</strong> requires the file to be sized precisely between 10KB and 20KB, generally measuring 4.0 cm x 2.0 cm. However, if your specific form requests an <strong>SSC signature resize 6cm x 2cm</strong>, our tool enables you to adjust the canvas settings to comply instantly. Make sure you sign with black or blue ink on smooth white paper before processing your <strong>ssc signature resize</strong>.
              </p>
            </div>
          </div>

          {/* Section C */}
          <div className="mb-14 bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">SSC Photo and Signature Size Guidelines</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Staying informed about the official <strong>SSC photo and signature size</strong> limitations is your best defense against application rejection. Here are the specific parameters mandated for exams like SSC CGL, SSC GD, and the upcoming <strong>SSC Stenographer 2026</strong> check.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-slate-900 mb-5 flex items-center">
                  <CheckCircle2 className="w-6 h-6 text-green-500 mr-2.5" /> 
                  Photo Requirements
                </h3>
                <ul className="space-y-4 text-slate-600">
                  <li className="flex items-start"><span className="font-semibold text-slate-800 w-24">Dimensions:</span> <span>3.5 cm (width) x 4.5 cm (height)</span></li>
                  <li className="flex items-start"><span className="font-semibold text-slate-800 w-24">File Size:</span> <span>20 KB to 50 KB</span></li>
                  <li className="flex items-start"><span className="font-semibold text-slate-800 w-24">Format:</span> <span>JPEG/JPG</span></li>
                  <li className="flex items-start"><span className="font-semibold text-slate-800 w-24">Applicable:</span> <span><strong>SSC Stenographer photo size</strong> standard</span></li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-slate-900 mb-5 flex items-center">
                  <CheckCircle2 className="w-6 h-6 text-green-500 mr-2.5" /> 
                  SSC Signature Size
                </h3>
                <ul className="space-y-4 text-slate-600">
                  <li className="flex items-start"><span className="font-semibold text-slate-800 w-24">Dimensions:</span> <span>4.0 cm (width) x 2.0 cm (height)</span></li>
                  <li className="flex items-start"><span className="font-semibold text-slate-800 w-24">File Size:</span> <span>10 KB to 20 KB</span></li>
                  <li className="flex items-start"><span className="font-semibold text-slate-800 w-24">Format:</span> <span>JPEG/JPG</span></li>
                  <li className="flex items-start"><span className="font-semibold text-slate-800 w-24">Clarity:</span> <span>No blurriness, clear white background</span></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section D */}
          <div className="mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Photo Background and Size Reduction</h2>
            <div className="prose prose-slate max-w-none prose-p:leading-relaxed prose-p:text-slate-600 prose-strong:text-slate-900">
              <p>
                A high-quality <strong>photo background</strong> is essential. The Staff Selection Commission demands a clear, light gray or plain white background for all uploads. If your current photo has scenery, dark colors, or visible shadows, you must execute a <strong>photo background change</strong> with a separate remover tool before bringing it here for resizing. 
              </p>
              <p>
                Once your background is compliant, our platform acts as a smart <strong>photo size reducer</strong>. With integrated <strong>20kb photo converter</strong> and <strong>50kb photo converter</strong> limits built straight into the engine, it automatically manages the perfect compression ratio. The end result keeps your facial features crystal clear while clamping the file size firmly within the allowed kilobyte bounds.
              </p>
            </div>
          </div>

          {/* Section E */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">How to Use This SSC Photo Resizer</h2>
            <div className="grid gap-6">
              <div className="flex bg-slate-50 p-6 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">1</div>
                <div className="ml-5">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Select Tool Mode</h3>
                  <p className="text-slate-600 leading-relaxed">First, choose whether you need to perform an <strong>SSC photo resize</strong> or a <strong>signature resize</strong> by switching between the Photo and Signature tabs on the tool.</p>
                </div>
              </div>
              
              <div className="flex bg-slate-50 p-6 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">2</div>
                <div className="ml-5">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Upload Your Image</h3>
                  <p className="text-slate-600 leading-relaxed">Upload your original picture from your device. Make sure the <strong>photo background</strong> is clear. The same logic applies if you are preparing a scanned signature—it must be cleanly written on purely white paper.</p>
                </div>
              </div>

              <div className="flex bg-slate-50 p-6 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">3</div>
                <div className="ml-5">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Auto Resize Image</h3>
                  <p className="text-slate-600 leading-relaxed">Click to optimize. The system will instantly apply the internal <strong>resize image</strong> algorithm, converting it precisely into the acceptable 20-50KB constraint for photos, or 10-20KB rule for signatures.</p>
                </div>
              </div>

              <div className="flex bg-slate-50 p-6 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">4</div>
                <div className="ml-5">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Download and Apply</h3>
                  <p className="text-slate-600 leading-relaxed">Download your successfully optimized files and use them securely for your SSC GD, SSC CGL or <strong>SSC Stenographer</strong> online application forms without fearing rejection.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </LandingPageTemplate>
  );
}
