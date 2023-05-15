import { useEffect, useRef, useState } from "react";
import Dialog from '@mui/material/Dialog';


export default function Employees() {
    const query = 'https://hub.dummyapis.com/employee?noofRecords=10&idStarts=1001';
    // const query = 'https://dummy.restapiexample.com/api/v1/employees';
    const [employeeData, setEmployeeData] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState();
    const [show, setShow] = useState(false);
    const firstNameRef = useRef();
    const emailRef = useRef();
    const addressRef = useRef();
    const firstNameAddRef = useRef();
    const emailAddRef = useRef();
    const addressAddRef = useRef();

    useEffect(() => {
        fetch(query).then((res) => res.json()).then(resData => {
            setEmployeeData(resData)
        })
    }, [query])
    function openForm(e, email) {
        setSelectedEmployee(email);
        setShow(prev => true);
    }

    function closeForm() {
        setShow(false)
    }

    function saveEmployee(){
        const list = [];
        for(let emp of employeeData){
            if(emp.email === selectedEmployee){
                emp.firstName = firstNameRef.current.value;
                emp.email = emailRef.current.value;
                emp.address = addressRef.current.value;
            }
            list.push(emp);
        }
        setEmployeeData(list);
    }

    function addEmployee(){
        const emp = {};
        emp.firstName = firstNameAddRef.current.value;
                emp.email = emailAddRef.current.value;
                emp.address = addressAddRef.current.value;
        setEmployeeData([...employeeData,emp])
    }

    function deleteEmployee(e,email){
        const list = [];
        for(let emp of employeeData){
            if(emp.email !== email){
                list.push(emp);
            }
            
        }
        setEmployeeData(list);
    }

    return (
        <>
            {show && (
                <div className="modal" id="myForm">
                    <div className="form-container">
                        <label for="name"><b>Name</b></label>
                        <input type="text" ref={firstNameRef} placeholder="Enter Name" name="name" required />

                        <label for="email"><b>Email</b></label>
                        <input type="text" ref={emailRef} placeholder="Enter Email" name="email" required />

                        <label for="address"><b>Address</b></label>
                        <input type="text" ref={addressRef} placeholder="Enter Address" name="address" required />

                        <button className="savebtn" onClick={saveEmployee}>Save</button>
                        <button type="button"  onClick={closeForm}>Cancel</button>
                    </div>

                </div>
            )}
            <table>
                <th>Employee Name</th>
                <th>email</th>
                {/* <th>Gender</th>
                <th>phone</th> */}
                <th>address</th>
                <th>action</th>
                {employeeData.map(emp => {
                    return (
                        <tr key={emp.email}>
                            <td>{emp.firstName} </td>
                            <td>{emp.email}</td>
                            <td>{emp.address}</td>
                            <td>
                                <button onClick={(e) => { openForm(e, emp.email) }}>Edit</button>
                                <button onClick={(e) => { deleteEmployee(e, emp.email) }}>Delete</button>
                                
                            </td>

                        </tr>

                    )
                })}
            </table>

            <div>
                    <div className="form-container">
                        <label for="name"><b>Name</b></label>
                        <input type="text" ref={firstNameAddRef} placeholder="Enter Name" name="name" required />

                        <label for="email"><b>Email</b></label>
                        <input type="text" ref={emailAddRef} placeholder="Enter Email" name="email" required />

                        <label for="address"><b>Address</b></label>
                        <input type="text" ref={addressAddRef} placeholder="Enter Address" name="address" required />

                        <button class="btn" onClick={addEmployee}>Add Employee</button>
                    </div>

                </div>
        </>
    )
}