'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface PricingTierProps {
  name: string;
  price: number;
  interval: string;
  description: string;
  features: string[];
  popular?: boolean;
  onSelectPlan: () => void;
}

function PricingTier({
  name,
  price,
  interval,
  description,
  features,
  popular,
  onSelectPlan
}: PricingTierProps) {
  return (
    <Card className={`w-full ${popular ? 'border-primary shadow-lg' : ''}`}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{name}</CardTitle>
          {popular && <Badge>Most Popular</Badge>}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <span className="text-3xl font-bold">${price}</span>
          <span className="text-muted-foreground">/{interval}</span>
        </div>
        
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4 text-green-500"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        
        <Button 
          className="w-full" 
          variant={popular ? 'default' : 'outline'}
          onClick={onSelectPlan}
        >
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
}

export default function SubscriptionPage() {
  const [loading, setLoading] = useState(false);
  
  const handleSelectPlan = (planId: string) => {
    setLoading(true);
    // In a real implementation, this would redirect to Stripe Checkout
    window.location.href = `/checkout?plan=${planId}`;
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">NBA Live Scoring Subscription</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Get access to real-time NBA fantasy scoring tools with one of our subscription plans
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <PricingTier
          name="Free Trial"
          price={0}
          interval="forever"
          description="Basic access to try out the NBA Live Scoring tools"
          features={[
            "Sample game access",
            "Limited team selection",
            "Basic scoring features",
            "No subscription required"
          ]}
          onSelectPlan={() => handleSelectPlan('free')}
        />
        
        <PricingTier
          name="Monthly"
          price={9.99}
          interval="month"
          description="Full access to NBA Live Scoring tools on a monthly basis"
          features={[
            "Live quarter-by-quarter scoring",
            "Player fantasy points tracking",
            "Team performance analytics",
            "Cancel anytime"
          ]}
          popular
          onSelectPlan={() => handleSelectPlan('monthly')}
        />
        
        <PricingTier
          name="Annual"
          price={99.99}
          interval="year"
          description="Full access to NBA Live Scoring tools for a full year (save 17%)"
          features={[
            "All Monthly plan features",
            "Historical data access",
            "Advanced analytics",
            "Priority support",
            "17% discount compared to monthly"
          ]}
          onSelectPlan={() => handleSelectPlan('annual')}
        />
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6 text-left">
          <div>
            <h3 className="text-lg font-medium">Can I cancel my subscription?</h3>
            <p className="text-muted-foreground">Yes, you can cancel your subscription at any time from your account dashboard. Your access will continue until the end of your billing period.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium">How is fantasy scoring calculated?</h3>
            <p className="text-muted-foreground">Our fantasy scoring follows standard NBA fantasy scoring rules, with points for various statistical categories including points, rebounds, assists, steals, blocks, and three-pointers.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Is there a mobile app?</h3>
            <p className="text-muted-foreground">Currently, we offer a responsive web application that works well on mobile devices. A dedicated mobile app is planned for future development.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
