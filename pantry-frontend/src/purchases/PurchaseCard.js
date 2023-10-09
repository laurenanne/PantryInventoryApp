import React from "react";
import { useHistory } from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

function PurchaseCard({ purchaseId, date }) {
  const history = useHistory();

  if (date) {
    date = date.toString().slice(0, 10);
  }

  const handleRowClick = () => {
    history.push(`/purchases/${purchaseId}`);
  };

  return (
    <TableRow onClick={() => handleRowClick()} key={purchaseId}>
      <TableCell>{purchaseId}</TableCell>
      <TableCell>{date}</TableCell>
    </TableRow>
  );
}

export default PurchaseCard;
