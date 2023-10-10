import React, { useState } from "react";
import PantryApi from "../pantryApi";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import { styled } from "@mui/material/styles";
import { useHistory } from "react-router-dom";

// Detailed information about the Client
// Routes - > EditClientForm
function ClientCard({ client }) {
  const history = useHistory();
  const [expanded, setExpanded] = useState(false);

  interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }
  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // On button click renders EditClientForm
  const editClient = () => {
    history.push(`/clients/${client.clientId}/edit`, { params: client });
  };

  // On button click calls API to delete cient from client list
  async function deleteClient(evt) {
    evt.preventDefault();
    try {
      await PantryApi.removeClient(client.clientId);
      history.push("/clients");
    } catch (err) {
      console.log(err);
    }
  }

  if (!client) {
    return (
      <div>
        <CircularProgress color="secondary" />;
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <Box sx={{ mr: 3, ml: 3, mt: 3 }}>
          <Card
            variant="outlined"
            sx={{
              boxShadow: 4,
              borderBottomColor: "secondary.main",
              bgcolor: "#fff",
              borderRadius: 2,
            }}
          >
            <CardHeader
              subheaderTypographyProps={{
                gutterBottom: true,
                color: "secondary.dark",
              }}
              sx={{ color: "secondary.dark" }}
              avatar={
                <Avatar
                  sx={{ m: 1, bgcolor: "secondary.main" }}
                  aria-label="lastName"
                >
                  {client.lastName[0]}
                </Avatar>
              }
              action={
                <Box>
                  <IconButton onClick={editClient} aria-label="settings">
                    <span className="material-symbols-outlined">edit</span>
                  </IconButton>
                  <IconButton onClick={deleteClient} aria-label="settings">
                    <span className="material-symbols-outlined">delete</span>
                  </IconButton>
                </Box>
              }
              title={`${client.firstName} ${client.lastName}`}
              subheader={`${client.altFirstName} ${client.altLastName}`}
            />

            <CardActions disableSpacing>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <span className="material-symbols-outlined">expand_more</span>
              </ExpandMore>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography variant="body2">Phone: {client.phone}</Typography>
                <Typography variant="body2">
                  Alternate Phone: {client.altPhone}
                </Typography>
                <Typography variant="body2">
                  Address: {client.address}
                </Typography>
                <Typography variant="body2">
                  Number of Adults in the Family: {client.numberAdultsInFamily}
                </Typography>
                <Typography variant="body2">
                  Number of Kids in the Family: {client.numberKidsInFamily}
                </Typography>
                <Typography variant="body2">
                  Receive Benefits?: {client.receiveBenefits}
                </Typography>

                <Typography variant="body2">
                  Is Client Elgible?:
                  {client.isEligible ? "Yes" : " No"}
                </Typography>

                <Typography variant="body2">Race: {client.race}</Typography>
                <Typography variant="body2">
                  Is Hispanic: {client.isHispanic}
                </Typography>
                {client.createDate ? (
                  <Typography variant="body2">
                    Creation Date: {client.createDate.toString().slice(0, 10)}
                  </Typography>
                ) : (
                  <Typography variant="body2">Creation Date: </Typography>
                )}

                {client.lastVisitDate ? (
                  <Typography variant="body2">
                    Last Visit Date: {client.lastVisit.toString().slice(0, 10)}
                  </Typography>
                ) : (
                  <Typography variant="body2">Last Visit Date:</Typography>
                )}
              </CardContent>
            </Collapse>
          </Card>
        </Box>
      </React.Fragment>
    );
  }
}

export default ClientCard;
