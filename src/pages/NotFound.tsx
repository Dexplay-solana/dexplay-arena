
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MainNavbar } from "@/components/MainNavbar";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-dexplay-darkPurple">
      <MainNavbar />
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="text-center max-w-xl">
          <div className="text-8xl font-bold gradient-text mb-6">404</div>
          <h1 className="text-3xl font-bold text-white mb-4">Page Not Found</h1>
          <p className="text-gray-400 text-lg mb-8">
            The page you're looking for doesn't exist or has been moved.
            Explore our other sections to discover web3 gaming content.
          </p>
          <Link to="/">
            <Button className="bg-dexplay-purple hover:bg-dexplay-brightPurple text-white px-8 py-6 text-lg">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
