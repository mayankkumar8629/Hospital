import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Container, Typography } from "@mui/material";

const EditHospitalForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hospital, setHospital] = useState({
    name: "",
    address: "",
    contactNumber: "",
    capacity: "",
    specialties: "",
    imageUrl: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/hospitals/${id}`)
      .then((response) => {
        const data = response.data;
        setHospital({
          name: data.name,
          address: data.address,
          contactNumber: data.contactNumber,
          capacity: data.capacity,
          specialties: data.specialties.join(", "), // Convert array to string
          imageUrl: data.imageUrl,
        });
      })
      .catch((error) => console.error("Error fetching hospital:", error));
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setHospital({ ...hospital, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/hospitals/${id}`, {
        ...hospital,
        specialties: hospital.specialties.split(",").map((s) => s.trim()), // Convert back to array
      });
      alert("Hospital updated successfully!");
      navigate(`/hospitals/${id}`); // Redirect to details page
    } catch (error) {
      console.error("Error updating hospital:", error);
      alert("Failed to update hospital!");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center">Edit Hospital</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" label="Name" name="name" value={hospital.name} onChange={handleChange} required />
        <TextField fullWidth margin="normal" label="Address" name="address" value={hospital.address} onChange={handleChange} required />
        <TextField fullWidth margin="normal" label="Contact Number" name="contactNumber" value={hospital.contactNumber} onChange={handleChange} required />
        <TextField fullWidth margin="normal" type="number" label="Capacity" name="capacity" value={hospital.capacity} onChange={handleChange} required />
        <TextField fullWidth margin="normal" label="Specialties (comma-separated)" name="specialties" value={hospital.specialties} onChange={handleChange} required />
        <TextField fullWidth margin="normal" label="Image URL" name="imageUrl" value={hospital.imageUrl} onChange={handleChange} required />

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Save Changes</Button>
      </form>
    </Container>
  );
};

export default EditHospitalForm;
