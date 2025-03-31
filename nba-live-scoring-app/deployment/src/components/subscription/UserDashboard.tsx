'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useAuth } from '../auth/AuthProvider';

interface SubscriptionDetails {
  plan: string;
  status: string;
  startDate: string;
  nextBillingDate: string;
  amount: number;
}

interface PaymentHistory {
  id: string;
  date: string;
  amount: number;
  status: string;
}

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('subscription');
  
  // Mock subscription data
  const [subscription, setSubscription] = useState<SubscriptionDetails>({
    plan: 'Monthly',
    status: 'Active',
    startDate: '2025-03-01',
    nextBillingDate: '2025-04-01',
    amount: 9.99
  });
  
  // Mock payment history
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([
    {
      id: 'pay_123456',
      date: '2025-03-01',
      amount: 9.99,
      status: 'Succeeded'
    }
  ]);
  
  const handleCancelSubscription = async () => {
    // In a real implementation, this would call the Stripe API
    // For now, we'll simulate a successful cancellation
    if (confirm('Are you sure you want to cancel your subscription?')) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubscription({
        ...subscription,
        status: 'Canceled'
      });
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Account Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your subscription and account settings
          </p>
        </div>
        <Button variant="outline" onClick={logout}>
          Sign Out
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
          <TabsTrigger value="settings">Account Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Details</CardTitle>
              <CardDescription>
                Manage your NBA Live Scoring subscription
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Plan</p>
                    <p className="text-lg font-medium">{subscription.plan}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className={`text-lg font-medium ${
                      subscription.status === 'Active' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {subscription.status}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="text-lg font-medium">{formatDate(subscription.startDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Next Billing Date</p>
                    <p className="text-lg font-medium">{formatDate(subscription.nextBillingDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="text-lg font-medium">${subscription.amount.toFixed(2)}/month</p>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  {subscription.status === 'Active' ? (
                    <Button variant="destructive" onClick={handleCancelSubscription}>
                      Cancel Subscription
                    </Button>
                  ) : (
                    <Button onClick={() => window.location.href = '/subscription'}>
                      Reactivate Subscription
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>
                View your past payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              {paymentHistory.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Amount</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Invoice</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentHistory.map((payment) => (
                        <tr key={payment.id} className="border-b">
                          <td className="py-3 px-4">{formatDate(payment.date)}</td>
                          <td className="py-3 px-4">${payment.amount.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-xs ${
                              payment.status === 'Succeeded' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {payment.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="link" size="sm">
                              Download
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No payment history available
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="text-lg font-medium">{user?.name || 'Demo User'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-lg font-medium">{user?.email || 'demo@example.com'}</p>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <Button variant="outline">
                    Change Password
                  </Button>
                  <Button variant="outline">
                    Update Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
