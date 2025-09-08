import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to partner dashboard on load
    navigate("/individual/dashboard");
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Redirecting to Partner Dashboard...</h1>
        <p className="text-xl text-muted-foreground">Please wait while we redirect you.</p>
      </div>
    </div>
  );
};

export default Index;
