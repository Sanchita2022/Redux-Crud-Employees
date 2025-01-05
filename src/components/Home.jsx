import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEmployees, removeEmployee } from "../redux/actions";
import { fetchEmployeesAPI, deleteEmployeeAPI } from "../api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Avatar
} from "@mui/material";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employees = useSelector((state) => state.employees);

  // Fetch employees on component mount
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEmployeesAPI();
      dispatch(setEmployees(data)); // Dispatch plain object
    };
    fetchData();
  }, [dispatch]);

  // Handle delete
  const handleDelete = async (id) => {
    await deleteEmployeeAPI(id); // Perform API call
    dispatch(removeEmployee(id)); // Dispatch plain object
  };

  // Handle edit
  const handleEdit = (id) => {
    navigate(`/employee/${id}`);
  };

  // Handle create
  const handleCreate = () => {
    navigate(`/employee/new`); // Navigate to a new employee form
  }
  
  return (
    <div style={{ padding: "20px" }}>
      <h1>Employee List</h1>
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: "20px" }}
        onClick={handleCreate}
      >
        Create Employee
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee, index) => (
              <TableRow key={employee._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src={employee.image}
                      alt={employee.fullName}
                      style={{ marginRight: "10px" }}
                    />
                    {employee.fullName}
                  </div>
                </TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginRight: "10px" }}
                    onClick={() => handleEdit(employee._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleDelete(employee._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;
