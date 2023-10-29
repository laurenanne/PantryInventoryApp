import React from "react";
import { useHistory } from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import formatDate from "../utilities/formatDate";

// renders from OrderList and ClientDetails
// displays table of orderId and date

function OrderCard({ orderId, date }) {
  const history = useHistory();
  date = formatDate(date);

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
