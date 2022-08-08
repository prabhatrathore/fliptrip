import { createSlice } from '@reduxjs/toolkit'
import { rolesObj } from '../../../utils/roles'

let initialState = {
    employeesArr: [],
    employeeObj: {}
}

const employeeSlice = createSlice({
    name: "employee",
    initialState: initialState,
    reducers: {
        addEmployee: (state, { payload }) => {
            state.employeesArr = payload
        },
        returnAllEmployees: (state, { payload }) => {
            state.employeesArr = payload
        },
        getEmployeeById: (state, { payload }) => {
            state.employeeObj = state.employeesArr.find(el => el._id == payload)
        }
    }
})


export const { addEmployee, returnAllEmployees, getEmployeeById } = employeeSlice.actions;
export const getAllEmployees = (state) => state.employee.employeesArr
export const getAllTeamLeadsEmployees = (state) => state.employee.employeesArr.filter(el => el.role == rolesObj.TEAMLEAD)


export default employeeSlice.reducer

