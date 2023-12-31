import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PantryApi from "../pantryApi";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import OrderCard from "../orders/OrderCard";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { TableBody } from "@mui/material";
import ClientCard from "./ClientCard";
import moment from "moment";
import Spinner from "../utilities/Spinner";

// Client Detail page
// Renders information about each client, along with their order history
// Routed at /clients/:clientId

// Routes -> {ClientCard, OrderCard, NewOrderForm}
function ClientDetail() {
  const { clientId } = useParams();
  const history = useHistory();
  const [client, setClient] = useState(null);
  const date = moment();
  const currDate = date.format("YYYY-MM-DD");

  // On mount loads Client Detail from API
  useEffect(() => {
    async function getClient() {
      try {
        setClient(await PantryApi.getClient(clientId));
      } catch (err) {
        setClient(null);
      }
    }
    getClient();
  }, [clientId]);

  // On Button click creates a new order number for the client
  // And updates the lastVisit date for the client
  // Routes to the NewOrder Form
  async function newOrder() {
    let order = await PantryApi.addOrder(clientId);
    if (order) {
      let update = await PantryApi.editClient(clientId, {
        lastVisit: currDate,
      });

      if (update) {
        history.push(`/clients/${clientId}/orders/${order.orderId}/new`);
      }
    }
  }

  if (!client) return <Spinner />;
  return (
    <React.Fragment>
      <ClientCard client={client} />

      <Box sx={{ mr: 3, ml: 3, mt: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
            // flexDirection: "row",
          }}
        >
          <Box sx={{ ml: 1, mb: 0 }}>
            <Typography variant="contained">History</Typography>
          </Box>
          <Box sx={{ ml: 2 }}>
            <Button onClick={newOrder} variant="contained">
              New Order
            </Button>
          </Box>
        </Box>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Order Id</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {client.orders.map((co) => (
              <OrderCard
                key={co.orderId}
                orderId={co.orderId}
                clientId={co.clientId}
                date={co.date}
              />
            ))}
          </TableBody>
        </Table>
      </Box>
    </React.Fragment>
  );
}

export default ClientDetail;
