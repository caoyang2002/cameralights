// app/articles/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from 'date-fns';
import { getAllArticleSlugs, getArticleBySlug } from '@/lib/articles';
import { Markdown } from '@/components/markdown'; 

// 生成静态路径参数
export function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// 生成元数据
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  
  if (!article) {
    return {
      title: 'Article Not Found - PhotoMentor',
      description: 'The requested article could not be found.',
    };
  }

  return {
    title: `${article.title} - PhotoMentor`,
    description: article.content.substring(0, 155) + '...',
    openGraph: {
      title: article.title,
      description: article.content.substring(0, 155) + '...',
      images: [article.image],
    },
  };
}

// 文章页面组件
export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto">
        <Card className="overflow-hidden">
          <div className="relative h-[400px] w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.image}
              alt={article.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
              {article.category}
            </div>
          </div>
          
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            
            <div className="flex items-center text-muted-foreground mb-8">
              <span className="mr-4">By {article.author}</span>
              <span>{formatDistanceToNow(article.date, { addSuffix: true })}</span>
            </div>
            
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <Markdown content={article.content} />
            </div>
          </div>
        </Card>
      </article>
    </div>
  );
}