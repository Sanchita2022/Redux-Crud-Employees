// api.js
import axios from "axios";

const BASE_URL = "https://interviewtesting.onrender.com/v1/users";

// Fetch employees
export const fetchEmployeesAPI = async () => {
  const response = await axios.get(`${BASE_URL}/employee/list`);
  return response.data.data;
};

// Create employee
export const createEmployeeAPI = async (employeeData) => {
  const response = await axios.post(`${BASE_URL}/employee/create`, employeeData);
  return response.data;
};

// Update employee
export const updateEmployeeAPI = async (id,updatedData) => {
  const response = await axios.put(`${BASE_URL}/employee-update/${id}`, updatedData);
  return response.data;
};

// Delete employee
export const deleteEmployeeAPI = async (id) => {
  const response = await axios.delete(`${BASE_URL}/employee-remove/${id}`);
  return response.data;
};
