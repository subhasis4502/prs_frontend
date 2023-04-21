import { Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Item from "../item/Item";
import './list.css';

const List = ({ searchTerm }) => {

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const newUser = await axios.get("http://localhost:8800/api/users/");
      setUsers(newUser.data);
    };

    fetchUser();
  }, []);

  const filteredUsers = users.filter(u => {
    if (!searchTerm) {
      return true;
    } else {
      return u.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });
  return (
    <>
      <div className="lists">
        <Grid container sx={{ m: 1, ml: 0 }}>
          {filteredUsers.map((u) => (
            <Grid item lg={3} sm={6} xs={12}>
              <Item key={u._id} user={u} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default List;