# Exam File Optimizer

Instantly convert photos and documents for exam forms. Optimize file size, dimensions, and format for SSC, UPSC, Banking, and other exams.

## Features

- **File Upload System**: Drag and drop support for photos (JPG, PNG), signatures, and documents (PDF) up to 10MB.
- **Preset Exam Requirements**: Built-in presets for SSC, UPSC, Banking, NEET, and Passport photos.
- **Custom Mode**: Enter custom width, height, max file size, and output format.
- **Image Processing Engine**: Automatically resizes, compresses, and converts formats using `sharp`.
- **Signature Optimizer**: Enhances contrast and converts background to white for signatures.
- **Document Optimizer**: Compresses PDF files using `pdf-lib`.
- **Security**: Files are processed in-memory and never permanently stored.
- **SEO Ready**: Includes dedicated landing pages for high-traffic keywords.
- **Monetization Ready**: Includes placeholders for Google AdSense.
- **Analytics**: Google Analytics integration ready.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI, Lucide Icons)
- **Image Processing**: `sharp`
- **PDF Processing**: `pdf-lib`
- **Deployment**: Vercel / Cloud Run

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment Instructions (Vercel)

This project is optimized for deployment on Vercel.

1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and sign in.
3. Click "Add New..." > "Project".
4. Import your GitHub repository.
5. Vercel will automatically detect Next.js and configure the build settings.
6. Click "Deploy".

### Environment Variables

If you are using Google Analytics, update the `G-XXXXXXXXXX` tracking ID in `app/layout.tsx`.

## Future Enhancements (Phase 2)

- **Face Detection**: Automatically center the photo using MediaPipe or TensorFlow.js.
- **Background Cleaning**: Remove background and replace with white.
- **Auto Cropping**: Crop image to correct portrait dimensions automatically.
