import React from "react";
import { useHistory } from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import formatDate from "../utilities/formatDate";

// renders from PurchaseList
// displays table of purchaseId and date

function PurchaseCard({ purchaseId, date }) {
  const history = useHistory();
  date = formatDate(date);

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
