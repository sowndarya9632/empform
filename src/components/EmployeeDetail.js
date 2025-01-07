import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button,Container, Typography, Paper, TableContainer} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { Link } from 'react-router-dom'; 


const EmployeeDetail = () => {
  const rows = [
      { id: 1, name: 'Amarpa Shashanka Keerthi Kumar', gender: 'Female', department: ['Sales', 'HR', 'Finance'], salary: '₹10,000', startDate: '29 Oct 2019' },
      { id: 2, name: 'Mohammad Salman Iqbal Shaikh', gender: 'Female', department: ['Sales', 'HR', 'Finance'], salary: '₹20,000', startDate: '29 nov 2013' },
      { id: 3, name: 'Bubere Qais Mohammad Muzaffar', gender: 'Male', department: ['Sales', 'HR', 'Finance'], salary: '₹20,000', startDate: '29 Oct 2020' },
      { id: 4, name: ' Keerthi Kumar', gender: 'Female', department: ['Sales', 'HR', 'Finance'], salary: '₹10,000', startDate: '29 Oct 2019' },
      { id: 5, name: 'Mohan kumar', gender: 'male', department: ['Sales', 'HR', 'Finance'], salary: '₹10,000', startDate: '29 mar 2023' },
      { id: 6, name: 'sowndarya s gowda', gender: 'Female', department: ['Sales', 'HR', 'Finance'], salary: '₹30,000', startDate: '25 jan 2025' },
  ];

  return (
    <>
      <Container style={{ marginTop: '20px', padding: '20px', backgroundColor: '#F7F7F7', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <Header />
          <Typography variant="h5"  style={{ color: '#333', fontWeight:'bold',marginTop: '20px',marginBottom:'20px',display:'flex',alignItems:'center',justifyContent:'space-between' }}>
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
          <TableContainer component={Paper} style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <Table>
                  <TableHead>
                      <TableRow style={{ backgroundColor: '#42515F', color: 'white' }}>
                          <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                          <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Gender</TableCell>
                          <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Department</TableCell>
                          <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Salary</TableCell>
                          <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Start Date</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {rows.map((row) => (
                          <TableRow key={row.id}>
                              <TableCell>{row.name}</TableCell>
                              <TableCell>{row.gender}</TableCell>
                              <TableCell>{row.department.join(', ')}</TableCell>
                              <TableCell>{row.salary}</TableCell>
                              <TableCell>{row.startDate}</TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </TableContainer>
      </Container>
      </>
  );
};
export default EmployeeDetail;
