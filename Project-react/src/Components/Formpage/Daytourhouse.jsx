import React, { useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../Api/GlobalStateContext";

const DayTourHouse = ({ activity, price, image }) => {
  const navigate = useNavigate();

  const {
    userData,
    setUserData,
    setBookingData,
    formData,
    setFormData,
    openConfirmModal,
    setOpenConfirmModal,
    openSuccessModal,
    setOpenSuccessModal,
  } = useGlobalState();

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      totalPrice: price * prevData.peopleCount,
    }));
  }, [formData.peopleCount, price]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenConfirmModal(true);
  };

  const handleCancel = () => {
    setOpenConfirmModal(false);
  };

  const handleConfirm = () => {
    setOpenConfirmModal(false);

   
    setUserData({
      ...userData,
      bookingDetails: formData,
    });

    setBookingData((prevData) => [
      ...prevData,
      {
        activity,
        price,
        formData,
      },
    ]);

    setOpenSuccessModal(true);
  };

  const handleSuccessClose = () => {
    setOpenSuccessModal(false);
    navigate("/");
  };

  return (
    <Box className="form-container">
      <Typography className="form-container-title" variant="h4">
        {activity}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            required
            fullWidth
            label="Namn"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            required
            fullWidth
            label="E-post"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
          />
        </Box>
        <Box mb={2}>
          <TextField
            required
            fullWidth
            label="Telefonnummer"
            variant="outlined"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            type="tel"
          />
        </Box>
        <Box mb={2}>
          <TextField
            required
            fullWidth
            label="Välj datum"
            variant="outlined"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </Box>
        {formData.date && (
          <Box mb={2}>
            <FormControl required fullWidth>
              <InputLabel>Välj tid</InputLabel>
              <Select
                required
                label="Välj tid"
                name="time"
                value={formData.time}
                onChange={handleChange}
              >
                <MenuItem value="10">10:00</MenuItem>
                <MenuItem value="12">12:00</MenuItem>
                <MenuItem value="14">14:00</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}
        <Box mb={2}>
          <TextField
            required
            fullWidth
            label="Antal personer"
            variant="outlined"
            name="peopleCount"
            value={formData.peopleCount?.toString() || ''}
            onChange={handleChange}
            type="number"
          />
        </Box>

        <Box mb={2}>
          <FormControl required fullWidth>
            <InputLabel>Välj boende</InputLabel>
            <Select
              required
              label="Välj boende"
              name="house"
              value={formData.house || ''}
              onChange={handleChange}
            >
              <MenuItem value="Stuga">Stuga</MenuItem>
              <MenuItem value="Hus">Hus</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box mt={2} className="booking-form-totalprice">
          <Typography variant="h6">
            Totalpris: <span className="red-span">{formData.totalPrice}</span>{" "}
            SEK
          </Typography>
        </Box>
        <Box className="form-footer">
          <Button
            className="form-button-submit"
            variant="contained"
            type="submit"
          >
            Boka nu
          </Button>
        </Box>
      </form>

      <Dialog
        open={openConfirmModal}
        onClose={() => setOpenConfirmModal(false)}
      >
        <DialogTitle>Bekräfta bokning</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Är du säker på att du vill boka denna aktivitet och boende?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Avbryt
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Bekräfta
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openSuccessModal} onClose={handleSuccessClose}>
        <DialogTitle>Bokning bekräftad</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Din bokning för {activity} är bekräftad! <br />
            Namn: {formData.name} <br />
            E-post: {formData.email} <br />
            Telefonnummer: {formData.phone} <br />
            Datum: {formData.date} <br />
            Tid: {formData.time} <br />
            Antal personer: {formData.peopleCount} <br />
            Boende: {formData.house} <br />
            Totalpris: {formData.totalPrice} SEK <br />
            En bekräftelse på bokningen har skickats till {formData.email}.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSuccessClose} color="primary">
            Okej
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DayTourHouse;
