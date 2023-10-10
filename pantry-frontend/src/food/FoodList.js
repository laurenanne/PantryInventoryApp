import React from "react";
import { useHistory } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

// Displays page with all food items
// Routed as  "/food"
// Routes -> NewFoodForm
function FoodList(props) {
  const history = useHistory();
  const food = props.food;

  // On button click renders NewFoodForm
  async function foodForm(event) {
    event.preventDefault();
    history.push("/food/new");
  }

  if (!food) {
    return (
      <div>
        <CircularProgress color="secondary" />;
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <Box sx={{ mr: 3, ml: 3 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography sx={{ mb: 1, fontSize: "2rem", ml: 2, mt: 2 }}>
              Food Inventory
            </Typography>

            <Typography sx={{ mb: 1, fontSize: "2rem", ml: 2, mt: 2 }}>
              <Button onClick={foodForm}>
                <span className="material-symbols-outlined">add</span>
              </Button>
            </Typography>
          </div>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Inventory</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {food.map((f) => (
                <TableRow key={f.foodId}>
                  <TableCell>{f.name}</TableCell>
                  <TableCell>{f.inventory}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </React.Fragment>
    );
  }
}

export default FoodList;
