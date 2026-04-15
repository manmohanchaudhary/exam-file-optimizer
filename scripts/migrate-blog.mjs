import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogTsPath = path.join(__dirname, '../lib/blog.ts');
const blogTsContent = fs.readFileSync(blogTsPath, 'utf8');

const arrayStart = blogTsContent.indexOf('export const blogPosts: BlogPost[] = [');
if (arrayStart === -1) {
  console.error('Could not find blogPosts array');
  process.exit(1);
}

const arrayContentStr = blogTsContent.slice(arrayStart + 'export const blogPosts: BlogPost[] = '.length);
let cleanStr = arrayContentStr.trim();
if (cleanStr.endsWith(';')) {
  cleanStr = cleanStr.slice(0, -1);
}

try {
  const posts = new Function('return ' + cleanStr)();
  
  const contentDir = path.join(__dirname, '../content/blog');
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  posts.forEach(post => {
    const { slug, title, metaTitle, metaDescription, excerpt, date, content, image, faq } = post;
    
    let frontmatter = '---\n';
    frontmatter += `title: ${JSON.stringify(title)}\n`;
    if (metaTitle) frontmatter += `metaTitle: ${JSON.stringify(metaTitle)}\n`;
    if (metaDescription) frontmatter += `metaDescription: ${JSON.stringify(metaDescription)}\n`;
    frontmatter += `excerpt: ${JSON.stringify(excerpt)}\n`;
    frontmatter += `date: ${JSON.stringify(date)}\n`;
    if (image) frontmatter += `image: ${JSON.stringify(image)}\n`;
    
    if (faq && faq.length > 0) {
      frontmatter += `faq:\n`;
      faq.forEach(f => {
        frontmatter += `  - question: ${JSON.stringify(f.question)}\n`;
        frontmatter += `    answer: ${JSON.stringify(f.answer)}\n`;
      });
    }
    frontmatter += '---\n\n';
    
    let markdownContent = content;
    const tableRegex = /<div class="custom-responsive-table" data-headers='(.*?)' data-rows='(.*?)'><\/div>/g;
    markdownContent = markdownContent.replace(tableRegex, (match, headersStr, rowsStr) => {
      try {
        const headers = JSON.parse(headersStr);
        const rows = JSON.parse(rowsStr);
        
        let mdTable = '| ' + headers.join(' | ') + ' |\n';
        mdTable += '| ' + headers.map(() => '---').join(' | ') + ' |\n';
        
        rows.forEach(row => {
          mdTable += '| ' + row.join(' | ') + ' |\n';
        });
        
        return mdTable;
      } catch (e) {
        console.error('Failed to parse table for post', slug, e);
        return match;
      }
    });

    const filePath = path.join(contentDir, `${slug}.md`);
    fs.writeFileSync(filePath, frontmatter + markdownContent);
    console.log(`Created ${filePath}`);
  });
  
  console.log('Migration complete!');
} catch (e) {
  console.error('Failed to parse blog posts:', e);
}
