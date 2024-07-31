"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { Firestore } from "firebase/firestore";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { transform } from "next/dist/build/swc";

const style = {
  postion: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

export default function Home() {
  return (
    <Box>
      <Typography variant="h1">Pantry Tracker</Typography>
    </Box>
  );
}
