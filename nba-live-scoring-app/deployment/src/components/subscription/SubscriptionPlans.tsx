'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { useAuth } from '../auth/AuthProvider';

interface PlanOption {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  description: string;
  features: string[];
}

export default function SubscriptionPlans() {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const plans: PlanOption[] = [
    {
      id: 'monthly',
      name: 'Monthly',
      price: 9.99,
      interval: 'month',
      description: 'Full access to NBA Live Scoring tools on a monthly basis',
      features: [
        'Live quarter-by-quarter scoring',
        'Player fantasy points tracking',
        'Team performance analytics',
        'Cancel anytime'
      ]
    },
    {
      id: 'yearly',
      name: 'Annual',
      price: 99.99,
      interval: 'year',
      description: 'Full access to NBA Live Scoring tools for a full year (save 17%)',
      features: [
        'All Monthly plan features',
        'Historical data access',
        'Advanced analytics',
        'Priority support',
        '17% discount compared to monthly'
      ]
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleSubscribe = async () => {
    if (!selectedPlan) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // In a real implementation, this would call the Stripe API
      // For now, we'll simulate a successful subscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to checkout page
      window.location.href = `/checkout?plan=${selectedPlan}`;
    } catch (err) {
      console.error('Subscription error:', err);
      setError('Failed to process subscription. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Choose Your Subscription Plan</h1>
        <p className="text-muted-foreground mt-2">
          Get full access to NBA Live Scoring tools with one of our subscription plans
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.id}
            className={`${selectedPlan === plan.id ? 'border-2 border-primary' : ''}`}
          >
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground">/{plan.interval}</span>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
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
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={selectedPlan === plan.id ? 'default' : 'outline'}
                onClick={() => handleSelectPlan(plan.id)}
              >
                {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        {error && (
          <div className="p-3 mb-4 text-sm text-red-500 bg-red-50 border border-red-200 rounded">
            {error}
          </div>
        )}
        
        <Button
          size="lg"
          disabled={!selectedPlan || loading}
          onClick={handleSubscribe}
        >
          {loading ? 'Processing...' : 'Subscribe Now'}
        </Button>
        
        <p className="text-sm text-muted-foreground mt-4">
          You can cancel your subscription at any time from your account dashboard.
        </p>
      </div>
    </div>
  );
}
