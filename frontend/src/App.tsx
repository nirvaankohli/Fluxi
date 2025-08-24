import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import CardNav from './components/Components/CardNav/CardNav'; 
import logo from './assets/Subtract Logo2.svg';
import logotext from './assets/Fluxi Text BB.svg';
import DotGridBackground from "./components/Background/DotGridBackground";


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


  const items = [
    {
      label: "Getting Started",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Sign Up", ariaLabel: "Sign Up", href: "/sign-up" }
      ]
    },
    {
      label: "Why Us?",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: "What Makes Us Special", ariaLabel: "What Makes Us Special", href: "mailto:info@example.com" },
      ]
    },

    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "About Us", ariaLabel: "About Us", href: "/about" },
      ]
    }
  ];


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
    
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="flex justify-center items-center">

      
        <CardNav
        logo={logotext}
        logoAlt="Fluxi"
        items={items}
        className=""

        baseColor="#fff"
        menuColor="#000"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="back.out(1.7)"
      />

      </div>
    </div>
  );
};

export default App;

