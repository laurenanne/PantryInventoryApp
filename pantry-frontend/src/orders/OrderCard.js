import React from "react";
import { useHistory } from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

// renders from OrderList and ClientDetails
// displays table of orderId and date

function OrderCard({ orderId, date }) {
  const history = useHistory();

  if (date) {
    date = date.toString().slice(0, 10);
  }

  const handleRowClick = () => {
    history.push(`/orders/${orderId}`);
  };

  return (
    <TableRow onClick={() => handleRowClick()} key={orderId}>
      <TableCell>{orderId}</TableCell>
      <TableCell>{date}</TableCell>
    </TableRow>
  );
}

export default OrderCard;
