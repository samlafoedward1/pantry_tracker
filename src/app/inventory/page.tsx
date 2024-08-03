"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Modal,
  TextField,
  AppBar,
  Toolbar,
} from "@mui/material";
import { firestore } from "@/app/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import Search from "../search";

// Define an interface for the inventory items
interface InventoryItem {
  name: string;
  quantity: number;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [filteredInventory, setFilteredInventory] = useState<InventoryItem[]>(
    []
  );
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [itemName, setItemName] = useState<string>("");
  const [updateItemName, setUpdateItemName] = useState<string>("");
  const [updateItemQuantity, setUpdateItemQuantity] = useState<number>(0);

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList: InventoryItem[] = []; // Explicitly type the inventoryList variable
    docs.forEach((doc) => {
      const data = doc.data();
      inventoryList.push({ name: doc.id, quantity: data.quantity });
    });
    setInventory(inventoryList);
    setFilteredInventory(inventoryList);
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const addItem = async (item: string) => {
    const normalizedItemName = item.toLowerCase();
    const docRef = doc(collection(firestore, "inventory"), normalizedItemName);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  };

  const removeItem = async (item: string) => {
    const normalizedItemName = item.toLowerCase();
    const docRef = doc(collection(firestore, "inventory"), normalizedItemName);
    await deleteDoc(docRef);
    await updateInventory();
  };

  const handleUpdateItem = async (item: string, quantity: number) => {
    const normalizedItemName = item.toLowerCase();
    const docRef = doc(collection(firestore, "inventory"), normalizedItemName);
    await setDoc(docRef, { quantity });
    await updateInventory();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleUpdateOpen = (item: InventoryItem) => {
    setUpdateItemName(item.name);
    setUpdateItemQuantity(item.quantity);
    setUpdateOpen(true);
  };
  const handleUpdateClose = () => setUpdateOpen(false);

  const handleSearch = useCallback((filteredItems: InventoryItem[]) => {
    setFilteredInventory(filteredItems);
  }, []);

  return (
    <Box bgcolor={"#000000"} height="100vh">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Pantry Tracker App</Typography>
        </Toolbar>
      </AppBar>
      <Box
        bgcolor={"#6B6D76"}
        height="calc(100vh - 64px)"
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={2}
        padding={2}
      >
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Item
            </Typography>
            <Stack width="100%" direction={"row"} spacing={2}>
              <TextField
                id="outlined-basic"
                label="Item"
                variant="outlined"
                fullWidth
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <Button
                variant="outlined"
                onClick={() => {
                  addItem(itemName);
                  setItemName("");
                  handleClose();
                }}
              >
                Add
              </Button>
            </Stack>
          </Box>
        </Modal>

        <Modal
          open={updateOpen}
          onClose={handleUpdateClose}
          aria-labelledby="update-modal-title"
          aria-describedby="update-modal-description"
        >
          <Box sx={style}>
            <Typography id="update-modal-title" variant="h6" component="h2">
              Update Item Quantity
            </Typography>
            <Stack width="100%" direction={"row"} spacing={2}>
              <TextField
                id="outlined-basic"
                label="Quantity"
                variant="outlined"
                fullWidth
                type="number"
                value={updateItemQuantity}
                onChange={(e) => setUpdateItemQuantity(Number(e.target.value))}
              />
              <Button
                variant="outlined"
                onClick={() => {
                  handleUpdateItem(updateItemName, updateItemQuantity);
                  handleUpdateClose();
                }}
              >
                Update
              </Button>
            </Stack>
          </Box>
        </Modal>

        <Button variant="contained" onClick={handleOpen}>
          Add New Item
        </Button>
        <Box
          bgcolor={"white"}
          border={"1px solid #333"}
          borderRadius={3}
          padding={4}
          width="60vw"
          style={{ resize: "both", overflow: "auto" }}
        >
          <Box
            width="100%"
            height="100px"
            bgcolor={"#ADD8E6"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            marginBottom={2}
          >
            <Typography variant={"h2"} color={"#333"} textAlign={"center"}>
              Inventory Items
            </Typography>
          </Box>
          <Search items={inventory} onSearch={handleSearch} />
          <Stack width="100%" spacing={2} overflow={"auto"} marginTop={2}>
            {filteredInventory.map(({ name, quantity }) => (
              <Box
                key={name}
                width="100%"
                minHeight="150px"
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                bgcolor={"#f0f0f0"}
                paddingX={5}
              >
                <Typography variant={"h3"} color={"#333"} textAlign={"center"}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
                <Typography variant={"h3"} color={"#333"} textAlign={"center"}>
                  Quantity: {quantity}
                </Typography>
                <Box display="flex" flexDirection="column" gap={1}>
                  <Button variant="contained" onClick={() => removeItem(name)}>
                    Remove
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleUpdateOpen({ name, quantity })}
                  >
                    Update
                  </Button>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
