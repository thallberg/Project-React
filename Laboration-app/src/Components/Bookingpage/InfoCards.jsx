import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid2,
  Box,
} from "@mui/material";
import React from "react";
import Infocard from "../../api/Infocard.json";
import { Link } from "react-router-dom";

const InfoCards = () => {
  return (
    <Grid2
      container
      rowSpacing={4}
      columnSpacing={{ xs: 1, sm: 0, md: 0 }}
      className="Info-card-grid"
    >
      {Infocard.map((card, index) => (
        <Grid2 size={{ xs: 12, sm: 6, md: 12 }} key={index}>
          <Card className="Info-card-content">
            <CardMedia
              className="info-card-image"
              component="img"
              image={card.image}
              loading="lazy"
              alt="Bild på kortets innehåll"
            />
            <CardContent>
              <Typography className="Info-card-title card-title2" variant="h2">
                {card.title}
              </Typography>
              <Typography className="Info-card-text card-title3" variant="h3">
                {card.subtitle}
              </Typography>
              <Typography className="Info-card-text" variant="body2">
                {card.description}
              </Typography>
              <Typography className="Info-card-text boldtext" variant="body2">
                Från: <span className="red-span">{card.price}</span> /person
              </Typography>
              <Box className="card-button-wrapper">
                <Button className="Info-card-link" variant="contained">
                  {card.link}
                </Button>
                <Button
                  component={Link}
                  to={"/Booking-form/" + card.id}
                  state={{
                    id: card.id,
                    activity: card.title,
                    price: card.price,
                    description: card.description,
                    image: card.image,
                  }}
                  className="Info-card-link info-button-link"
                  variant="contained"
                >
                  {card.booking}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default InfoCards;