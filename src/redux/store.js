import { createStore } from 'redux';
import { employeeReducer } from './reducers';

const store = createStore(employeeReducer);

export default store;