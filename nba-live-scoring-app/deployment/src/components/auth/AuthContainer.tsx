'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import Login from './Login';
import Register from './Register';
import PasswordReset from './PasswordReset';

export default function AuthContainer() {
  const [activeTab, setActiveTab] = useState<string>('login');
  const [showPasswordReset, setShowPasswordReset] = useState<boolean>(false);

  const handleLoginSuccess = () => {
    // In a real implementation, this would redirect to the dashboard
    console.log('Login successful');
    window.location.href = '/dashboard';
  };

  const handleRegisterSuccess = () => {
    // In a real implementation, this would redirect to the dashboard
    console.log('Registration successful');
    window.location.href = '/dashboard';
  };

  const handlePasswordResetSuccess = () => {
    // Show success message and return to login
    setShowPasswordReset(false);
    setActiveTab('login');
  };

  const handleForgotPasswordClick = () => {
    setShowPasswordReset(true);
  };

  const handleBackToLoginClick = () => {
    setShowPasswordReset(false);
  };

  if (showPasswordReset) {
    return (
      <PasswordReset
        onSuccess={handlePasswordResetSuccess}
        onLoginClick={handleBackToLoginClick}
      />
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">NBA Live Scoring</CardTitle>
        <CardDescription className="text-center">
          Access real-time NBA fantasy scoring tools
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Login
              onSuccess={handleLoginSuccess}
              onRegisterClick={() => setActiveTab('register')}
              onForgotPasswordClick={handleForgotPasswordClick}
            />
          </TabsContent>
          <TabsContent value="register">
            <Register
              onSuccess={handleRegisterSuccess}
              onLoginClick={() => setActiveTab('login')}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
