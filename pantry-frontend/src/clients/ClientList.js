import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PantryApi from "../pantryApi";
import ClientSearch from "./ClientSearch";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import Spinner from "../utilities/Spinner";

// Displays page with list of all clients
// On mount loads from API
// Re-loads filtered clients on submit of search form

// Routed to "/clients"
// Routes -> {ClientDetails, SearchForm, NewClientForm}
function ClientList() {
  const [clients, setClients] = useState(null);
  const history = useHistory();

  // upon loading, call API to get a list of all clents
  useEffect(() => {
    search();
  }, []);

  // Triggereed by searchForm submilt, reloads clients
  async function search(name) {
    try {
      let clients = await PantryApi.getClients(name);
      setClients(clients);
    } catch (err) {
      setClients(null);
    }
  }
  // On row click routes to ClientDetail
  const handleRowClick = (c) => {
    history.push(`/clients/${c.clientId}`);
  };

  // Triggered by button click. Loads new client creation form
  async function clientForm(event) {
    event.preventDefault();
    history.push("/clients/new");
  }

  if (!clients) return <Spinner />;
  return (
    <React.Fragment>
      <Box sx={{ display: "flex" }}></Box>

      <Box sx={{ mr: 3, ml: 3 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography sx={{ mb: 1, fontSize: "2rem", ml: 2, mt: 2 }}>
            Clients
          </Typography>

          <Typography sx={{ mb: 1, fontSize: "2rem", ml: 2, mt: 2 }}>
            <Button onClick={clientForm}>
              <span className="material-symbols-outlined">add</span>
            </Button>
          </Typography>
        </div>

        <div>
          <ClientSearch searchFor={search} />
        </div>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                Alternate First Name
              </TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                Alternate Last Name
              </TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                Alternate Phone
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((c) => (
              <TableRow onClick={() => handleRowClick(c)} key={c.clientId}>
                <TableCell>{c.firstName}</TableCell>
                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                  {c.altFirstName}
                </TableCell>
                <TableCell>{c.lastName}</TableCell>
                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                  {c.altLastName}
                </TableCell>
                <TableCell>{c.address}</TableCell>
                <TableCell>{c.phone}</TableCell>
                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                  {c.altPhone}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </React.Fragment>
  );
}

export default ClientList;
