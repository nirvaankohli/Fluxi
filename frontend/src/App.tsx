import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import PillNav from './components/Components/PillNav/PillNav'; 
import logo from './assets/Subtract Logo.png';


const WelcomeContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
}));

const WelcomePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[10],
}));

interface ApiResponse {
  message: string;
  timestamp?: number;
  status?: string;
}

const App: React.FC = () => {
  const [apiMsg, setApiMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        const apiKey = import.meta.env.VITE_API_KEY as string | undefined;
        if (!apiKey) {
          throw new Error("API key not configured");
        }

        const response = await fetch("http://127.0.0.1:5001/api/hello", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": apiKey,
          },
          mode: "cors",
          credentials: "omit",
          cache: "no-cache",
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Authentication failed");
          } else if (response.status === 404) {
            throw new Error("API endpoint not found");
          } else if (response.status >= 500) {
            throw new Error("Server error occurred");
          } else {
            throw new Error(`Request failed with status ${response.status}`);
          }
        }

        const data: ApiResponse = await response.json();
        if (!data.message) {
          throw new Error("Invalid response format");
        }

        setApiMsg(data.message);
      } catch (error: unknown) {
        console.error("API call failed:", error);
        setHasError(true);

        if (error instanceof Error) {
          if (error.message.includes("fetch")) {
            setApiMsg("Unable to connect to server. Please try again later.");
          } else {
            setApiMsg("Service temporarily unavailable. Please try again later.");
          }
        } else {
          setApiMsg("An unexpected error occurred. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100"> {/* Tailwind wrapper */}

      <PillNav
        logo={logo}
        logoAlt="Company Logo"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Why Us?', href: '/about' },
          { label: 'About', href: '/services' },
          
        ]}
        activeHref="/"
        className=""
        ease="power2.easeInOut"
        baseColor="#ffffff"
        pillColor="#ffffff"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#2962FF"
        
      />



      


    </div>
  );
};

export default App;

