import { Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Item from "../item/Item";

const List = () => {

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const newUser = await axios.get("/users/");
      setUsers(newUser.data);
      console.log(newUser.data);
    };

    fetchUser();
  }, []);

  return (
    <>
      <div className="lists">
        <Grid container sx={{ m: 1, ml: 0 }}>
          {users.map((u) => (
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
