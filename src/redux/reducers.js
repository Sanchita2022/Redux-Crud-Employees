const initialState = {
  employees: []
};

export const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_EMPLOYEES":
      return {
        ...state,
        employees: action.payload
      }
    case "CREATE_EMPLOYEE":
      return {
        ...state, 
        employees:[
          ...state.employees,
          action.payload
        ]
      };
    case "UPDATE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.map((employee) => 
          employee._id === action.payload._id ? action.payload : employee
        )
      }
    case "DELETE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.filter((employee) => employee._id !== action.payload)
      }
    default:
      return state;
  }
};
