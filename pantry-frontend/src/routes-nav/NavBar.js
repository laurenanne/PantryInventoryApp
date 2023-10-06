import React, { useContext } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";

function NavBar() {
  // const { currentUser } = useContext(UserContext);
  // console.debug("Navigation", "currentUser=", currentUser);

  // if (currentUser) {
  return (
    <React.Fragment>
      <ListItemButton>
        <NavLink style={{ textDecoration: "none" }} to="/home" underline="none">
          <ListItemIcon>
            <span className="material-symbols-outlined">dashboard</span>
          </ListItemIcon>
        </NavLink>
        <NavLink style={{ textDecoration: "none" }} to="/home" underline="none">
          <ListItemText primary="Dashboard" />
        </NavLink>
      </ListItemButton>
      <ListItemButton>
        <NavLink style={{ textDecoration: "none" }} to="/clients">
          <ListItemIcon>
            <span className="material-symbols-outlined">groups</span>
          </ListItemIcon>
        </NavLink>
        <NavLink style={{ textDecoration: "none" }} to="/clients">
          <ListItemText primary="Clients" />
        </NavLink>
      </ListItemButton>
      <ListItemButton>
        <NavLink style={{ textDecoration: "none" }} to="/orders">
          <ListItemIcon>
            <span className="material-symbols-outlined">shopping_cart</span>
          </ListItemIcon>
        </NavLink>
        <NavLink style={{ textDecoration: "none" }} to="/orders">
          <ListItemText primary="Orders" />
        </NavLink>
      </ListItemButton>
      <ListItemButton>
        <NavLink style={{ textDecoration: "none" }} to="/food">
          <ListItemIcon>
            <span className="material-symbols-outlined">inventory</span>
          </ListItemIcon>
        </NavLink>
        <NavLink style={{ textDecoration: "none" }} to="/food">
          <ListItemText primary="Inventory" />
        </NavLink>
      </ListItemButton>
      <ListItemButton>
        <NavLink style={{ textDecoration: "none" }} to="/purchases">
          <ListItemIcon>
            <span className="material-symbols-outlined">add</span>
          </ListItemIcon>
        </NavLink>
        <NavLink style={{ textDecoration: "none" }} to="/purchases">
          <ListItemText primary="Purchases" />
        </NavLink>
      </ListItemButton>
    </React.Fragment>
  );
  // } else {
  //   return null;
  // }
}

// export const secondaryListItems = (
//   <React.Fragment>
//     <ListSubheader component="div" inset>
//       Saved reports
//     </ListSubheader>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Logout" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItemButton>
//   </React.Fragment>
// );

export default NavBar;
