import { IconButton, InputBase, Paper } from "@mui/material";
import { CiSearch } from "react-icons/ci";

export const Inputbuscar = () => {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: 50,
        background: "F2F2F2",
        borderRadius: 2,
      }}
    >
      <IconButton sx={{ p: "10px" }} aria-label="menu">
      <CiSearch />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search for a dish"
        inputProps={{ "aria-label": "Search for a dish" }}
      />
    </Paper>
  );
};
