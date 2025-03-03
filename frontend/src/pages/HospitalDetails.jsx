import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardMedia, CardContent, Typography, Button, Container } from "@mui/material";

const HospitalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hospital, setHospital] = useState(null);
  const backend_uri = import.meta.env.VITE_URI;
  useEffect(() => {
    axios
      .get(`${backend_uri}/hospitals/${id}`)
      .then((response) => setHospital(response.data))
      .catch((error) => console.error("Error fetching hospital:", error));
  }, [id]);

  if (!hospital) {
    return <Typography variant="h5" align="center">Loading...</Typography>;
  }

  // 🛑 Delete function
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this hospital?")) return; // Confirm delete

    try {
      await axios.delete(`${backend_uri}/hospitals/${id}`);
      alert("Hospital deleted successfully!");
      navigate("/"); // Redirect to Home page
    } catch (error) {
      console.error("Error deleting hospital:", error);
      alert("Failed to delete hospital!");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
        <CardMedia
          component="img"
          height="300"
          image={hospital.imageUrl || "https://via.placeholder.com/600"}
          alt={hospital.name}
          onError={(e) => (e.target.src = "https://via.placeholder.com/600")}
        />
        <CardContent>
          <Typography variant="h4">{hospital.name}</Typography>
          <Typography variant="body1" color="textSecondary">📍 {hospital.address}</Typography>
          <Typography variant="body1">📞 Contact: {hospital.contactNumber}</Typography>
          <Typography variant="body1">🏥 Capacity: {hospital.capacity} beds</Typography>
          <Typography variant="body1" color="primary">
            ⭐ Average Rating:{" "}
            {hospital.ratings.length > 0
              ? (hospital.ratings.reduce((a, b) => a + b, 0) / hospital.ratings.length).toFixed(1)
              : "No ratings yet"}{" "}
            / 5
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Specialties: {hospital.specialties ? hospital.specialties.join(", ") : "N/A"}
          </Typography>
        </CardContent>

        {/* Buttons */}
        <Container sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <Button variant="contained" color="primary" onClick={() => navigate(`/hospitals/${id}/edit`)}>
  ✏️ Edit
</Button>


         
          <Button variant="contained" color="error" onClick={handleDelete}>🗑️ Delete</Button>
        </Container>
      </Card>
    </Container>
  );
};

export default HospitalDetails;
