import React, { useState } from "react";
import {
  Avatar,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import axios from 'axios';
import "./item.css";

const Item = ({ user }) => {
  const [isHovering, setIsHovering] = useState(false);
  const buttonVal = [-50, -10, 10, 50];
  const [score, setScore] = useState(user.score);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const scoreHandler = async ({num}) => {
    setScore(score + num);
    try {
      await axios.post("https://prs-app-backend.onrender.com/api/users/" + user._id, {
        val: num,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card
      sx={{ display: "flex", flexDirection: "column", ml: 1, mb: 1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovering && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 1,
            display: "flex",
            justifyContent: "flex-end",
            pt: 1,
            pr: 1,
          }}
        >
          <IconButton aria-label="edit">
            <CreateIcon />
          </IconButton>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
      <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
        <Avatar
          sx={{ width: 56, height: 56 }}
          alt={user.name}
          src={user.profilePicture}
        />
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {user.name}
          </Typography>
          <Typography component="div" variant="subtitle1">
            {user.desc}
          </Typography>
          <div className="score">
            <Typography variant="h6" color="text.secondary" component="body1">
              {score}
            </Typography>
            <Typography className="category" variant="p" component="caption">
              {user.category}
            </Typography>
          </div>
        </CardContent>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          pl: 1,
          pb: 2,
          justifyContent: "center",
        }}
      >
        {buttonVal.map((num) => (
          <Box sx={{ mr: 1 }}>
            <Button
              color={num < 0 ? "error" : "success"}
              variant="contained"
              onClick={() => scoreHandler({ num })}
            >
              {num}
            </Button>
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default Item;
