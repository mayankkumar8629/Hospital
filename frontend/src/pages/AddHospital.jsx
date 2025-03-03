import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddHospital = () => {
  const navigate = useNavigate();

  const [hospital, setHospital] = useState({
    name: "",
    address: "",
    contactNumber: "",
    capacity: "",
    specialties: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setHospital({ ...hospital, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/newhospital", {
        ...hospital,
        specialties: hospital.specialties.split(","), // Convert string to array
      });

      if (response.status === 201) {
        alert("Hospital added successfully!");
        navigate("/"); // Redirect to Home
      }
    } catch (error) {
      console.error("Error adding hospital:", error);
      alert("Failed to add hospital");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add New Hospital
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Name" name="name" fullWidth required onChange={handleChange} />
        <TextField label="Address" name="address" fullWidth required onChange={handleChange} />
        <TextField label="Contact Number" name="contactNumber" fullWidth required onChange={handleChange} />
        <TextField label="Capacity" name="capacity" fullWidth required type="number" onChange={handleChange} />
        <TextField label="Specialties (comma separated)" name="specialties" fullWidth required onChange={handleChange} />
        <TextField label="Image URL" name="imageUrl" fullWidth required onChange={handleChange} />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default AddHospital;
