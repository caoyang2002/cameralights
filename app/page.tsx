import { Button } from "@/components/ui/button";
import { Camera, Users, BookOpen, Award } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatDistanceToNow } from 'date-fns';

// This would typically come from a CMS or API
const latestArticles = [
  {
    id: 1,
    title: 'Mastering Natural Light Photography',
    excerpt: 'Learn how to harness natural light to create stunning photographs in any condition.',
    author: 'Sarah Johnson',
    date: new Date('2024-03-15'),
    slug: 'mastering-natural-light-photography',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'Essential Camera Settings for Beginners',
    excerpt: 'A comprehensive guide to understanding your camera\'s basic settings.',
    author: 'Michael Chen',
    date: new Date('2024-03-14'),
    slug: 'essential-camera-settings-beginners',
    image: 'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&q=80',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-accent">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-primary mb-6">
            Master Photography with Expert Guidance
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Learn from professional photographers, share your work, and join a community of passionate creators.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/courses">Explore Courses</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/community">Join Community</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card">
              <Camera className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert-Led Courses</h3>
              <p className="text-muted-foreground">
                Learn from industry professionals with years of experience
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Vibrant Community</h3>
              <p className="text-muted-foreground">
                Connect with fellow photographers and share your journey
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card">
              <BookOpen className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Practical Projects</h3>
              <p className="text-muted-foreground">
                Apply your skills with hands-on assignments and feedback
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-accent/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Latest Articles</h2>
            <Button variant="outline" asChild>
              <Link href="/articles">View All Articles</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latestArticles.map((article) => (
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
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                    <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>{article.author}</span>
                      <span>{formatDistanceToNow(article.date, { addSuffix: true })}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-accent">
        <div className="max-w-7xl mx-auto text-center">
          <Award className="h-16 w-16 mx-auto text-primary mb-6" />
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of photographers who have transformed their skills with PhotoMentor
          </p>
          <Button size="lg" asChild>
            <Link href="/courses">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}