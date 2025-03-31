'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';

interface TestCase {
  id: string;
  name: string;
  description: string;
  steps: string[];
  expectedResult: string;
}

export default function TestCases() {
  const [activeTab, setActiveTab] = useState('scoring');
  
  const scoringTests: TestCase[] = [
    {
      id: 'test-001',
      name: 'Team Selection',
      description: 'Verify that teams can be selected from dropdowns',
      steps: [
        'Navigate to the Live Scoring dashboard',
        'Click on the Home Team dropdown',
        'Select a team from the list',
        'Click on the Away Team dropdown',
        'Select a different team from the list'
      ],
      expectedResult: 'Both teams should be selected and displayed correctly in the UI'
    },
    {
      id: 'test-002',
      name: 'Quarter Scoring Input',
      description: 'Verify that quarter scores can be entered and calculated',
      steps: [
        'Select home and away teams',
        'Enter points for each quarter (Q1-Q4) for both teams',
        'Check that total points are calculated correctly'
      ],
      expectedResult: 'Quarter points should be entered and total points should be the sum of all quarters'
    },
    {
      id: 'test-003',
      name: 'Player Stats Input',
      description: 'Verify that player statistics can be entered and fantasy points calculated',
      steps: [
        'Select a team',
        'Enter various statistics for players (points, rebounds, assists, etc.)',
        'Check that fantasy points are calculated correctly based on the formula'
      ],
      expectedResult: 'Player statistics should be entered and fantasy points should be calculated according to the scoring formula'
    },
    {
      id: 'test-004',
      name: 'Fantasy Points Comparison',
      description: 'Verify that fantasy points are compared correctly between teams',
      steps: [
        'Select home and away teams',
        'Enter player statistics for both teams',
        'Check the fantasy points summary'
      ],
      expectedResult: 'Fantasy points should be calculated for both teams and the difference should be displayed correctly'
    }
  ];
  
  const authTests: TestCase[] = [
    {
      id: 'test-005',
      name: 'User Registration',
      description: 'Verify that new users can register',
      steps: [
        'Navigate to the registration page',
        'Enter name, email, and password',
        'Submit the form'
      ],
      expectedResult: 'User should be registered and redirected to the dashboard'
    },
    {
      id: 'test-006',
      name: 'User Login',
      description: 'Verify that registered users can log in',
      steps: [
        'Navigate to the login page',
        'Enter email and password',
        'Submit the form'
      ],
      expectedResult: 'User should be logged in and redirected to the dashboard'
    },
    {
      id: 'test-007',
      name: 'Password Reset',
      description: 'Verify that users can reset their password',
      steps: [
        'Navigate to the login page',
        'Click on "Forgot password"',
        'Enter email address',
        'Submit the form'
      ],
      expectedResult: 'User should receive a confirmation message that a password reset email has been sent'
    }
  ];
  
  const subscriptionTests: TestCase[] = [
    {
      id: 'test-008',
      name: 'Subscription Plan Selection',
      description: 'Verify that users can select a subscription plan',
      steps: [
        'Navigate to the subscription page',
        'View available plans',
        'Select a plan',
        'Click on "Subscribe Now"'
      ],
      expectedResult: 'User should be redirected to the checkout page with the selected plan'
    },
    {
      id: 'test-009',
      name: 'Payment Processing',
      description: 'Verify that payments can be processed',
      steps: [
        'Navigate to the checkout page',
        'Enter payment details',
        'Submit the form'
      ],
      expectedResult: 'Payment should be processed and user should see a success message'
    },
    {
      id: 'test-010',
      name: 'Subscription Management',
      description: 'Verify that users can manage their subscription',
      steps: [
        'Navigate to the user dashboard',
        'Go to the subscription tab',
        'View subscription details',
        'Click on "Cancel Subscription"',
        'Confirm cancellation'
      ],
      expectedResult: 'Subscription should be canceled and status should be updated'
    }
  ];
  
  const getTestsForTab = () => {
    switch (activeTab) {
      case 'scoring':
        return scoringTests;
      case 'auth':
        return authTests;
      case 'subscription':
        return subscriptionTests;
      default:
        return [];
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Test Cases</h1>
        <p className="text-muted-foreground">
          Detailed test cases for verifying application functionality
        </p>
      </div>
      
      <Alert className="mb-6">
        <AlertDescription>
          These test cases should be executed to verify that all components of the application are working correctly before deployment.
        </AlertDescription>
      </Alert>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="scoring">Scoring Tests</TabsTrigger>
          <TabsTrigger value="auth">Authentication Tests</TabsTrigger>
          <TabsTrigger value="subscription">Subscription Tests</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab}>
          <div className="space-y-6 mt-6">
            {getTestsForTab().map((test) => (
              <Card key={test.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{test.name}</span>
                    <span className="text-sm text-muted-foreground">{test.id}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium">Description</h3>
                      <p>{test.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium">Steps</h3>
                      <ol className="list-decimal pl-5 space-y-1">
                        {test.steps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium">Expected Result</h3>
                      <p>{test.expectedResult}</p>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        Mark as Tested
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
