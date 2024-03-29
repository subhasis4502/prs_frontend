import axios from "axios";
import "./topbar.css";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useState, useRef, useEffect } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Topbar = ({ onSearch }) => {
  const search = useRef();
  const name = useRef();
  const desc = useRef();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const newPerson = {
      name: name.current.value,
      desc: desc.current.value,
      category: selectedCategory,
      score: 100,
    };
    console.log(name);
    try {
      await axios.post("https://prs-app-backend.onrender.com/api/users/register", newPerson);
    } catch (err) {
      console.log(err);
    }
    window.location.reload(false);
  };

  const handleSearch = () => {
    setSearchTerm(search.current.value);
  };

  useEffect(() => { 
    console.log(searchTerm);
    onSearch(searchTerm);
  }, [searchTerm]);

  return (
    <Box sx={{ flexGrow: 1 }} className="topbar">
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            PRS
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputRef={search}
              onChange={handleSearch}
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <IconButton size="large" color="inherit" onClick={handleClickOpen}>
            <PersonAddIcon />
          </IconButton>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Register</DialogTitle>
            <DialogContent>
              <TextField
                id="outlined-basic"
                inputRef={name}
                label="Name"
                variant="outlined"
              />
              <br />
              <br />
              <TextField
                id="outlined-basic"
                inputRef={desc}
                label="Desciption"
                variant="outlined"
              />
              <br />
              <br />
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category-select"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  label="Category"
                >
                  <MenuItem value="Family">Family</MenuItem>
                  <MenuItem value="Relative">Relative</MenuItem>
                  <MenuItem value="Friend">Friend</MenuItem>
                  <MenuItem value="Collegue">Collegue</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Topbar;
