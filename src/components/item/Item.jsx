import React, { useState } from "react";
import {
  Avatar,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import axios from "axios";

const Item = ({ user }) => {
  const [score, setScore] = useState(user.score);
  const scoreHandler = async (num) => {
    setScore(score+num);
    try {
      await axios.post("https://prs-app-backend.onrender.com/api/users/" + user._id, {
        val: num,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card sx={{ display: "flex", flexDirection: "column", ml: 1, mb: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", ml: 1}}>
        <Avatar
          sx={{ width: 56, height: 56 }}
          alt={user.name}
          src={user.profilePicture}
        />
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {user.name}
          </Typography>
          <Typography variant="h6" color="text.secondary" component="div">
            {score}
          </Typography>
        </CardContent>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 2, justifyContent: "center" }}>
        <Box sx={{ mr: 1 }}>
          <Button color="error" variant="contained" onClick={()=> scoreHandler(-50)}>
            -50
          </Button>
        </Box>
        <Box sx={{ mr: 1 }}>
          <Button color="error" variant="contained" onClick={()=> scoreHandler(-10)}>
            -10
          </Button>
        </Box>
        <Box sx={{ mr: 1 }}>
          <Button color="success" variant="contained" onClick={()=> scoreHandler(10)}>
            +10
          </Button>
        </Box>
        <Button color="success" variant="contained" onClick={()=> scoreHandler(50)}>
          +50
        </Button>
      </Box>
    </Card>
  );
};

export default Item;
