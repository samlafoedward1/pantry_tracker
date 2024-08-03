import React, { useState, useEffect } from "react";
import { TextField, Box } from "@mui/material";

interface Item {
  name: string;
  quantity: number;
}

interface SearchProps {
  items: Item[];
  onSearch: (filteredItems: Item[]) => void;
}

const Search: React.FC<SearchProps> = ({ items, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    onSearch(filteredItems);
  }, [searchTerm, items, onSearch]);

  return (
    <Box display="flex" gap={2} mt={2}>
      <TextField
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        InputProps={{
          style: {
            backgroundColor: "white",
          },
        }}
      />
    </Box>
  );
};

export default Search;
