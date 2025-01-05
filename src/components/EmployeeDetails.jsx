import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee, updateEmployee } from "../redux/actions";
import { fetchEmployeesAPI, createEmployeeAPI, updateEmployeeAPI } from "../api";
import { Button, TextField, Avatar, Paper, Box, Typography, Divider } from "@mui/material";

const EmployeeDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Local state to manage form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    image: "",
    age: "",
    salary: ""
  });
  
  const employee = useSelector((state) =>
    state.employees.find((emp) => emp._id === id)
  );

  useEffect(() => {
    if (id && employee) {
      // If it's an edit, populate form with existing data
      setFormData({
        fullName: employee.fullName,
        email: employee.email,
        phone: employee.phone,
        image: employee.image,
        age: employee.age,
        salary: employee.salary
      });
    }
  }, [id, employee]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle save (create or update employee)
  const handleSave = async () => {
    if (id == "new") {
      const data = await createEmployeeAPI(formData);
      dispatch(addEmployee(data));
    } else {
      const data = await updateEmployeeAPI(id,formData);
      dispatch(updateEmployee(data));
    }
    navigate("/"); // Redirect to Home after saving
  };

  // Handle back button (navigate to Home)
  const handleBack = () => {
    navigate("/");
  };

  return (
    <Box padding="20px">
      <h1>{id !== "new" ? "Edit Employee" : "Create New Employee"}</h1>
      
      {/* Header Section */}
      {id !== "new" && 
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Box display="flex" alignItems="center">
          <Avatar
            src={employee?.image || "https://dummyimages.com/100x100/000/fff"}
            alt={employee?.fullName}
            style={{ width: "80px", height: "80px", marginRight: "20px" }}
          />
          <Typography variant="h4">{employee?.fullName}</Typography>
        </Box>
      </Paper>}

      <Divider style={{ marginBottom: "20px" }} />

      {/* Form Section */}
      <Paper elevation={3} style={{ padding: "20px" }}>
        <form>
          <TextField
            fullWidth
            margin="normal"
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Profile Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
          />
          <Box display="flex" justifyContent="space-between" marginTop="20px">
            <Button variant="contained" color="secondary" onClick={handleBack}>
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={!formData.fullName}
            >
              Save
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default EmployeeDetails;
