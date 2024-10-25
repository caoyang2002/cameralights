import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { formatDistanceToNow } from 'date-fns';

export const metadata: Metadata = {
  title: 'Photography Articles - PhotoMentor',
  description: 'Read the latest photography tips, tutorials, and insights from industry experts.',
  openGraph: {
    title: 'Photography Articles - PhotoMentor',
    description: 'Read the latest photography tips, tutorials, and insights from industry experts',
    images: ['/og-image.jpg'],
  },
};

// This would typically come from a CMS or API
const articles = [
  {
    id: 1,
    title: 'Mastering Natural Light Photography',
    excerpt: 'Learn how to harness natural light to create stunning photographs in any condition.',
    author: 'Sarah Johnson',
    date: new Date('2024-03-15'),
    slug: 'mastering-natural-light-photography',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80',
    category: 'Technique',
  },
  {
    id: 2,
    title: 'Essential Camera Settings for Beginners',
    excerpt: 'A comprehensive guide to understanding your camera\'s basic settings.',
    author: 'Michael Chen',
    date: new Date('2024-03-14'),
    slug: 'essential-camera-settings-beginners',
    image: 'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&q=80',
    category: 'Basics',
  },
  {
    id: 3,
    title: 'Advanced Composition Techniques',
    excerpt: 'Take your photography to the next level with these composition tips.',
    author: 'Emma Davis',
    date: new Date('2024-03-13'),
    slug: 'advanced-composition-techniques',
    image: 'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&q=80',
    category: 'Composition',
  },
];

export default function ArticlesPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Photography Articles</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link href={`/articles/${article.slug}`} key={article.id}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={article.image}
                      alt={article.title}
                      className="object-cover w-full h-full rounded-t-lg"
                    />
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                      {article.category}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-2 line-clamp-2">{article.title}</h2>
                  <p className="text-muted-foreground line-clamp-3">{article.excerpt}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <div className="flex justify-between items-center w-full text-sm text-muted-foreground">
                    <span>{article.author}</span>
                    <span>{formatDistanceToNow(article.date, { addSuffix: true })}</span>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}