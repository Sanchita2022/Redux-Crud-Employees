
// Fetch employees
export const setEmployees = (employees) => ({
  type: "FETCH_EMPLOYEES",
  payload: employees,
});

// Create employee
export const addEmployee = (employee) => ({
  type: "CREATE_EMPLOYEE",
  payload: employee,
});

// Update employee
export const updateEmployee = (employee) => ({
  type: "UPDATE_EMPLOYEE",
  payload: employee,
});

// Delete employee
export const removeEmployee = (id) => ({
  type: "DELETE_EMPLOYEE",
  payload: id,
});
