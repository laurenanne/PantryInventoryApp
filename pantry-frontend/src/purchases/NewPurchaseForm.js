import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import NewPurchaseItemForm from "./NewPurchaseItemForm";
import moment from "moment";
import PantryApi from "../pantryApi";

function NewPurchaseForm(props) {
  const food = props.food;
  const updateInv = props.updateInv;
  const history = useHistory();

  let date = moment();
  date = date.format("YYYY-MM-DD");

  const [formDate, setFormDate] = useState(date);
  const [showForm, setShowForm] = useState(false);
  const [purchase, setPurchase] = useState([]);

  const handleDateChange = (evt) => {
    setFormDate(evt.target.value);
  };

  async function addPurchase() {
    let purchase = await PantryApi.addPurchase({ date: formDate });

    if (purchase) {
      setShowForm(true);
      setPurchase(purchase);
    }
  }

  const handleSubmit = (evt) => {
    history.push("/purchases");
  };

  return (
    <Container component="main" maxWidth="xs">
      {!showForm ? (
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
            Create a New Purchase Order
          </Typography>
          <Box component="form" sx={{ mb: 1, fontSize: "2rem", ml: 2, mt: 2 }}>
            <TextField
              name="date"
              required
              InputLabelProps={{ shrink: true }}
              type="date"
              label="Date"
              id="date"
              value={formDate}
              onChange={handleDateChange}
            />
            <Button onClick={addPurchase}>
              <span className="material-symbols-outlined">add</span>
            </Button>
          </Box>
        </Box>
      ) : (
        ""
      )}

      {showForm ? (
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <span className="material-symbols-outlined">nutrition</span>
          </Avatar>
          <Typography component="h2" variant="h5" sx={{ textAlign: "center" }}>
            Add Items
          </Typography>
          <Typography component="h2" sx={{ textAlign: "center" }}>
            {date}
          </Typography>
          <Box sx={{ mt: 1 }}>
            {food.map((f) => (
              <NewPurchaseItemForm
                key={f.foodId}
                purchaseId={purchase.purchaseId}
                foodId={f.foodId}
                name={f.name}
                inventory={f.inventory}
                updateInv={updateInv}
              />
            ))}
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      ) : (
        " "
      )}
    </Container>
  );
}

export default NewPurchaseForm;
