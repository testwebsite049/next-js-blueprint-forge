
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Welcome to the Next.js Boilerplate</h1>
        <p className="text-xl text-muted-foreground mb-8">A powerful starter template with authentication, MongoDB integration, and CRUD operations.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Authentication</CardTitle>
              <CardDescription>Secure your application with JWT authentication</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Features include user registration, login, and protected routes.</p>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/login")}
              >
                Try Authentication
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Complete CRUD operations for users</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Create, read, update, and delete user records from MongoDB.</p>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="flex justify-center gap-4">
          <Button onClick={() => navigate("/login")}>Login</Button>
          <Button onClick={() => navigate("/register")} variant="outline">Register</Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
