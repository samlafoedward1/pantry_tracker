"use client";

import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const Welcome: React.FC = () => {
  const router = useRouter();

  const handleStart = () => {
    router.push("/inventory"); // Redirect to the main inventory page
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      gap={2}
    >
      <Typography variant="h1" color={"#333"}>
        Welcome to the Pantry Tracker
      </Typography>
      <Button variant="contained" onClick={handleStart}>
        Get Started
      </Button>
    </Box>
  );
};

export default Welcome;
