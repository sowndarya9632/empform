import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  Button, 
  Container, 
  Typography, 
  Paper, 
  TableContainer 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { Link } from 'react-router-dom';
import UserService from '../service/UserService';
import deleteIcon from './delete .png';
import editIcon from './edit.png';

const DisplayTable = () => {
  const navigate = useNavigate();
  const [employeeArray, setEmployeeArray] = useState([]);

  const update =(employeeId) => { 
          navigate(`update/${employeeId}`);
     
  };

  const remove = (employeeId) => {
    console.log(employeeId);
    var answer = window.confirm("Data once deleted cannot be restored!! Do you wish to continue ?");
        if(answer === true){
            UserService
                .deleteEmployee(employeeId)
                    .then((data) => {
              alert("Data deleted successfully!!");
              window.location.reload();
              employeeArray.getAllEmployees(); 
              
                    
            })
      .catch((error) => {
        console.log
        ("Something Went Wrong!");
      });
    }else{
      alert("Data Not Deleted")
    }
  };
 
  useEffect(() => {
    UserService.getAllUsers()
      .then((response) => {
        console.log(response.data);
        setEmployeeArray(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  

  return (
    <>
      <Container
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#F7F7F7',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Header />
        <Typography
          variant="h5"
          style={{
            color: '#333',
            fontWeight: 'bold',
            marginTop: '20px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          Employee Details
          <Button
            component={Link}
            to="/add"
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              marginBottom: '20px',
            }}
          >
            + Add User
          </Button>
        </Typography>
        <TableContainer
          component={Paper}
          style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#42515F' }}>
              <TableCell style={{ color: 'white', fontWeight: 'bold' }}></TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Gender</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Department</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Salary</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Start Date</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {employeeArray.length > 0 ? (
                employeeArray.map((employee, index) => (
                  <TableRow key={index}>
                    <TableCell><img src={employee.profileImage} style={{ height:'30px',fontWeight:'50%' ,borderRadius:'50%'}}></img></TableCell>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.gender}</TableCell>
                    <TableCell>{employee.department.join(', ')}</TableCell>
                    <TableCell>{employee.salary}</TableCell>
                    <TableCell>{employee.startDate}</TableCell>
                    <TableCell>
                      <img onClick={() => remove(employee.id)}
                      src={deleteIcon}
                      alt="delete"  style={{ height:'30px',width:'30px',cursor: 'pointer',
                          marginRight: '10px',}}/>
                    <img onClick={() => update(employee.id)}
                      src={editIcon}
                      alt="edit" style={{ height:'30px',width:'30px',cursor:'pointer'}}/>
                    </TableCell>   
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No employees found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default DisplayTable;
