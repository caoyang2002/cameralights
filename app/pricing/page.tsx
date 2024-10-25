"use client";

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';

export default function PricingPage() {
  const { setPaymentStatus } = useAuth();
  const router = useRouter();

  const handlePayment = async () => {
    // In a real app, this would integrate with PayPal
    setPaymentStatus(true);
    toast({
      title: "Success",
      description: "Payment processed successfully. You now have full access!",
    });
    router.push('/community');
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground">
            Get access to all features and join our community
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="relative">
            <CardHeader>
              <h3 className="text-2xl font-bold">Basic</h3>
              <p className="text-muted-foreground">For hobbyists</p>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-6">$9.99</div>
              <ul className="space-y-3">
                {['Basic courses', 'Community access', 'Monthly webinars'].map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button onClick={handlePayment} className="w-full">
                Get Started
              </Button>
            </CardFooter>
          </Card>

          <Card className="relative border-primary">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm rounded-bl-lg">
              Popular
            </div>
            <CardHeader>
              <h3 className="text-2xl font-bold">Pro</h3>
              <p className="text-muted-foreground">For enthusiasts</p>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-6">$19.99</div>
              <ul className="space-y-3">
                {[
                  'All Basic features',
                  'Advanced courses',
                  'Priority support',
                  'Workshop access',
                ].map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button onClick={handlePayment} className="w-full">
                Get Started
              </Button>
            </CardFooter>
          </Card>

          <Card className="relative">
            <CardHeader>
              <h3 className="text-2xl font-bold">Expert</h3>
              <p className="text-muted-foreground">For professionals</p>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-6">$39.99</div>
              <ul className="space-y-3">
                {[
                  'All Pro features',
                  '1-on-1 mentoring',
                  'Custom courses',
                  'Commercial license',
                ].map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button onClick={handlePayment} className="w-full">
                Get Started
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}