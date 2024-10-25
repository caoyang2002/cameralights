// lib/articles.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 定义文章目录路径
const articlesDirectory = path.join(process.cwd(), 'content/articles');

// 定义文章类型
export interface Article {
  slug: string;
  title: string;
  content: string;
  author: string;
  date: Date;
  image: string;
  category: string;
}

// 确保文章目录存在
function ensureArticlesDirectory() {
  try {
    if (!fs.existsSync(articlesDirectory)) {
      fs.mkdirSync(articlesDirectory, { recursive: true });
    }
  } catch (error) {
    console.error('Error ensuring articles directory exists:', error);
  }
}

// 获取所有文章的 slugs
export function getAllArticleSlugs(): string[] {
  ensureArticlesDirectory();
  try {
    const fileNames = fs.readdirSync(articlesDirectory);
    return fileNames
      .filter(fileName => {
        const fullPath = path.join(articlesDirectory, fileName);
        return fs.statSync(fullPath).isFile() && // 确保是文件
          (fileName.endsWith('.md') || fileName.endsWith('.mdx')); // 只包含 markdown 文件
      })
      .map(fileName => fileName.replace(/\.mdx?$/, '')); // 移除文件扩展名
  } catch (error) {
    console.error('Error getting article slugs:', error);
    return [];
  }
}

// 获取单个文章的数据
export function getArticleBySlug(slug: string): Article | undefined {
  ensureArticlesDirectory();
  try {
    // 尝试 .md 和 .mdx 扩展名
    let fullPath = path.join(articlesDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(articlesDirectory, `${slug}.mdx`);
    }

    // 如果文件不存在，返回临时数据（开发阶段使用）
    if (!fs.existsSync(fullPath)) {
      return {
        slug,
        title: 'Mastering Natural Light Photography',
        content: `
          Natural light is one of the most powerful tools in a photographer's arsenal. When used correctly,
          it can create stunning images that capture the true essence of your subject. In this comprehensive
          guide, we'll explore various techniques for working with natural light in different conditions.
          
          ## Key topics we'll cover:
          - Understanding the quality of light at different times of day
          - How to use reflectors and diffusers effectively
          - Working with backlighting and rim lighting
          - Managing harsh midday sun
          - Creating mood with window light
        `,
        author: 'Sarah Johnson',
        date: new Date('2024-03-15'),
        image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80',
        category: 'Technique',
      };
    }

    // 读取文件内容
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // 使用 gray-matter 解析 frontmatter
    const { data, content } = matter(fileContents);

    // 验证必需字段
    if (!data.title || !data.author || !data.date || !data.image || !data.category) {
      throw new Error(`Missing required fields in ${slug}`);
    }

    // 返回文章数据
    return {
      slug,
      title: data.title,
      content: content,
      author: data.author,
      date: new Date(data.date),
      image: data.image,
      category: data.category,
    };
  } catch (error) {
    console.error(`Error getting article ${slug}:`, error);
    return undefined;
  }
}

// 获取所有文章数据
export function getAllArticles(): Article[] {
  const slugs = getAllArticleSlugs();
  const articles = slugs
    .map(slug => getArticleBySlug(slug))
    .filter((article): article is Article => !!article); // 过滤掉 undefined

  // 按日期排序，最新的文章排在前面
  return articles.sort((a, b) => b.date.getTime() - a.date.getTime());
}