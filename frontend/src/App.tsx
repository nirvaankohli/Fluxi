import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import CardNav from './components/Components/CardNav/CardNav';
import Hero from './components/Hero/Hero';
import logotext from './assets/Fluxi Text BB.svg';
import DotGridBackground from "./components/Background/DotGridBackground";
import "./App.css";

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
    <div style={{
      width: '100%',
      height: '100vh',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>


      <CardNav
        logo={logotext}
        logoAlt="Fluxi"
        items={items}
        baseColor="#F8F8F8"
        menuColor="#000"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="back.out(1.7)"
      />
      
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        position: 'relative',
        zIndex: 1,
        marginTop: '80px',
        paddingLeft: '0'

      }}>
        <Hero />
      </div>

      

      <DotGridBackground 
        dotColor="rgba(0, 0, 0, 0.15)"
        dotSize={1}
        dotSpacing={20}
      />
      
      
    </div>
  );
};

export default App;
