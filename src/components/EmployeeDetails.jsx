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
    age: "14",
    salary: "0"
  });
  
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    image: "",
    age: "",
    salary: ""
  });

  const [isFormValid,setIsFormValid] = useState(false);
  
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

      let error = (
        validateFullName(employee.fullName) || 
        validateEmail(employee.email) ||
        validatePhone(employee.phone) ||
        validateImageURL(employee.image) ||
        validateAge(employee.age) ||
        validateSalary(employee.salary)
      );
      setIsFormValid(!error);
    }
  }, [id, employee]);

  
  const validateFullName = (fullName) => {
    let error = "";
    if (!fullName?.trim()) {
      error = "Full name is required.";
    } else if (fullName.trim().length < 3) {
      error = "Full name must be at least 3 characters long.";
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      fullName: error,
    }));
    return error;
  };
  
  const validateEmail = (email) => {
    let error = "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email?.trim()) {
      error = "Email is required.";
    } else if (!emailRegex.test(email)) {
      error = "Invalid email format.";
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: error,
    }));
    return error;
  };
  
  const validatePhone = (phone) => {
    let error = "";
    const phoneRegex = /^\+?[1-9]\d{9}$/;
    if (!phone?.trim()) {
      error = "Phone number is required.";
    } else if (!phoneRegex.test(phone)) {
      error = "Invalid phone number format. Enter a 10-digit phone number.";
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      phone: error,
    }));
    return error;
  };
  
  const validateImageURL = (image) => {
    let error = "";
    if (!image?.trim()) {
      error = "Image URL is required.";
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      image: error,
    }));
    return error;
  };
  
  const validateAge = (age) => {
    let error = "";
    if (!age) {
      error = "Age is required.";
    }
    let intAge = Number.parseInt(age);
    if (isNaN(intAge) || intAge <= 14 || intAge > 120) {
      error = "Age must be a number between 15 and 120.";
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      age: error,
    }));
    return error;
  };
  
  const validateSalary = (salary) => {
    let error = "";
    if (!salary || isNaN(salary)) {
      error = "Salary is required.";
    }
    let intSalary = Number.parseInt(salary);
    if (isNaN(intSalary) || intSalary < 0) {
      error = "Salary must be a positive number.";
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      salary: error,
    }));
    return error;
  };  
  
  
  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    let error;
    if (name === "fullName") error = validateFullName(value);
    if (name === "email") error = validateEmail(value);
    if (name === "phone") error = validatePhone(value);
    if (name === "image") error = validateImageURL(value);
    if (name === "age") error = validateAge(value);
    if (name === "salary") error = validateSalary(value);
    setIsFormValid(error == "");
  };

  // Handle save (create or update employee)
  const handleSave = async () => {
    let data;
    try {
      if (id == "new") {
        data = await createEmployeeAPI(formData);
        dispatch(addEmployee(data));
      } else {
        data = await updateEmployeeAPI(id, formData);
        dispatch(updateEmployee(data));
      }
      navigate("/");
    } catch (e) {
      alert(e?.response.data.message)
    }
  };

  // Handle back button (navigate to Home)
  const handleBack = () => {
    navigate("/");
  };

  return (
    <Box padding="20px">
      <h1>{id !== "new" ? "Edit Employee" : "Create New Employee"}</h1>
      {id !== "new" && (
        <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
          <Box display="flex" alignItems="center">
            <Avatar
              src={employee?.image || "https://dummyimages.com/100x100/000/fff"}
              alt={employee?.fullName}
              style={{ width: "80px", height: "80px", marginRight: "20px" }}
            />
            <Typography variant="h4">{employee?.fullName}</Typography>
          </Box>
        </Paper>
      )}
      <Divider style={{ marginBottom: "20px" }} />
      <Paper elevation={3} style={{ padding: "20px" }}>
        <form>
          <TextField
            fullWidth
            margin="normal"
            label="Full Name"
            name="fullName"
            required={true}
            value={formData.fullName}
            onChange={handleChange}
            error={"" != errors.fullName}
            helperText={errors.fullName}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            required={true}
            value={formData.email}
            onChange={handleChange}
            error={"" != errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone"
            name="phone"
            required={true}
            value={formData.phone}
            onChange={handleChange}
            error={"" != errors.phone}
            helperText={errors.phone}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Profile Image URL"
            name="image"
            required={true}
            value={formData.image}
            onChange={handleChange}
            error={"" != errors.image}
            helperText={errors.image}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Age"
            name="age"
            type="number"
            required={true}
            value={formData.age}
            onChange={handleChange}
            error={"" != errors.age}
            helperText={errors.age}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Salary"
            name="salary"
            required={true}
            value={formData.salary}
            onChange={handleChange}
            error={"" != errors.salary}
            helperText={errors.salary}
          />
          <Box display="flex" justifyContent="space-between" marginTop="20px">
            <Button variant="contained" color="secondary" onClick={handleBack}>
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={!isFormValid}
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
