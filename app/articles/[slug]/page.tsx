import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from 'date-fns';

// This would typically come from a CMS or API
const articles = {
  'mastering-natural-light-photography': {
    title: 'Mastering Natural Light Photography',
    content: `
      Natural light is one of the most powerful tools in a photographer's arsenal. When used correctly,
      it can create stunning images that capture the true essence of your subject. In this comprehensive
      guide, we'll explore various techniques for working with natural light in different conditions.

      Key topics we'll cover:
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
  },
  // Add other articles here
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = articles[params.slug as keyof typeof articles];
  
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

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles[params.slug as keyof typeof articles];

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
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
        </Card>
      </article>
    </div>
  );
}