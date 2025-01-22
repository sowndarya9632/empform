import React, { useState,useEffect } from 'react';
import Header from './Header';
import img1 from './person1.jpg';
import img2 from './person2.jpg';
import img3 from './person3.jpg';
import img4 from './person4.jpg';
import UserService from '../service/UserService';
import { useParams, Link } from 'react-router-dom';
import {
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  Container,
  Checkbox,
} from '@mui/material';
import { data, useNavigate } from 'react-router-dom';

const EmployeeForm = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [formData, setFormData] = useState({
    name: "",
    profileImage: "",
    gender: "",
    department: [],
    salary: "",
    startDate: "",
    notes: "",
    isUpdate: false,
  });

  useEffect(() => {
    if (params.id) {
      UserService.getUser(params.id)
        .then((response) => {
          const userData = response.data;
          setFormData({
            ...formData,
            ...userData,
            isUpdate: true,
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [params.id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      department: checked
        ? [...prevData.department, value]
        : prevData.department.filter((dept) => dept !== value),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { isUpdate, ...data } = formData;

    if (isUpdate) {
      if (window.confirm("Data once modified cannot be restored. Continue?")) {
        UserService.updateEmployee(params.id, data)
          .then(() => {
            alert("Data updated successfully!");
            navigate("/"); // Redirect or refresh
          })
          .catch((error) => {
            console.error("Error updating data:", error);
            alert("Error updating data!");
          });
      }
    } else {
      UserService.addUser(data,formData.profileImage).then((response) => {
        console.log('User Added:', response.data);
      }).catch((error) => {
        console.error('Error adding user:', error);
      });
    };
  };

  const handleReset = () => {
    setFormData({
      name: "",
      profileImage: "",
      gender: "",
      department: [],
      salary: "",
      startDate: "",
      notes: "",
      isUpdate: formData.isUpdate,
    });
  };
  const handleClear = () => {
    setFormData({
      name: '',
      profileImage: '',
      gender: '',
      department: [],
      salary: '',
      startDate: '',
      notes: '',
    });
    console.log('Form cleared');
  };
  return (
    <>
      <Container
        style={{
          padding: '20px',
          backgroundColor: '#F7F7F7',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          maxWidth: '89%',
        }}
      >
        <Header />
        <Container
          style={{
            padding: '30px' ,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            maxWidth: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop:'20px'
          }}
        >
          <Typography variant="h6" gutterBottom style={{ color: '#42515F', marginBottom: '20px', fontWeight: 'bold' }}>
            Employee Payroll Form
          </Typography>
          <form id="employee-form" onSubmit={handleSubmit} >
            <div style={{ display: 'flex', alignItems: 'center',justifyItems:'center' }}>
          <Typography variant="subtitle1" gutterBottom style={{ display: 'inline-block', marginRight: '20px',fontSize:'18px'}}>
            Name
            </Typography> 
          <TextField style={{ display: 'flex', alignItems: 'center',justifyItems:'center' }}
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              
            />
            </div>
            <Typography variant="subtitle1" gutterBottom style={{ display: 'inline-block', marginRight: '20px',gap:'20px' ,paddingTop:'30px'}}>
              Profile image
            </Typography>
            <RadioGroup
              row style={{ display: 'contents', alignItems: 'center' }}
              name="profileImage"
              value={formData.profileImage}
              onChange={handleChange}
            >
              <FormControlLabel value='./person1.jpg' control={<Radio />} label={<img src={img1} alt="Avatar 1" style={{ width: 45, height: 45, borderRadius: '50%' }} />} />
              <FormControlLabel value="./person2.jpg" control={<Radio />} label={<img src={img2} alt="Avatar 2" style={{ width: 45, height: 45, borderRadius: '50%' }} />} />
              <FormControlLabel value="./person3.jpg" control={<Radio />} label={<img src={img3} alt="Avatar 3" style={{ width: 45, height: 45, borderRadius: '50%' }} />} />
              <FormControlLabel value="./person4.jpg" control={<Radio />} label={<img src={img4} alt="Avatar 4" style={{ width: 45, height: 45, borderRadius: '50%' }} />} />
            </RadioGroup>
            <br></br>
            <Typography variant="subtitle1" gutterBottom style={{ display: 'inline-block', marginRight: '20px',gap:'90px',paddingTop:'30px' }}>
              Gender
            </Typography>
            <RadioGroup
              row style={{ display: 'contents', alignItems: 'center' }}
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup>
            <br></br>
            <Typography variant="subtitle1" gutterBottom style={{ display: 'inline-block', marginRight: '20px',paddingTop:'30px' }}>
              Department
            </Typography>
            {['HR', 'Sales', 'Finance', 'Engineer', 'Others'].map((dept) => (
              <FormControlLabel  style={{ display: 'contents', alignItems: 'center' }}
                key={dept}
                control={
                  <Checkbox
                    value={dept}
                    checked={formData.department.includes(dept)}
                    onChange={handleCheckboxChange}
                  />
                }
                label={dept}
              />
            ))}
            <div style={{ display: 'flex', alignItems: 'center',justifyItems:'center' }}>
            <Typography variant="subtitle1" gutterBottom style={{ display: 'inline-block', marginRight: '20px',paddingTop:'30px' }}>
              Salary
            </Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel>Salary</InputLabel>
              <Select
                name="salary"
                value={formData.salary}
                onChange={handleChange}
              >
                <MenuItem value="₹20k">₹20k</MenuItem>
                <MenuItem value="₹40k">₹40k</MenuItem>
                <MenuItem value="₹60k">₹60k</MenuItem>
                <MenuItem value="₹80k">₹80k</MenuItem>
              </Select>
            </FormControl>
            </div>
            <div style={{ display: 'flex', alignItems: 'center',justifyItems:'center' }}>
            <Typography variant="subtitle1" gutterBottom style={{ display: 'inline-block', marginRight: '20px',paddingTop:'30px' }}>
              Start Date
            </Typography>
            <TextField
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              type="date"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            </div>
            <div style={{ display: 'flex', alignItems: 'center',justifyItems:'center' }}>
            <Typography variant="subtitle1" gutterBottom style={{ display: 'inline-block', marginRight: '20px',paddingTop:'30px' }}>
              Notes
            </Typography>
            <TextField
              label="Notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              multiline
              rows={2}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            </div>
            <div style={{ marginTop: '20px',dispaly:'flex',alignItems:'center' }}>
              <Button variant="contained" style={{ marginLeft: '10px', color: '#969696',backgroundColor: '#DEDEDE',width:'80px' }} onClick={handleClear}>
                Clear
              </Button>
              <div style={{marginLeft:'350px',display:'inline-flex',alignItems:'end',}}>
              <Button variant="contained" style={{ backgroundColor: '#4CAF50', color:'#969696',backgroundColor: '#DEDEDE',width:'80px' }} type="submit">
                Submit
              </Button>
              <Button variant="contained" style={{ marginLeft: '10px', borderColor: '#ccc', backgroundColor: '#DEDEDE',color:'#969696',width:'80px' }} type="reset" onClick={handleReset}>
                Reset
              </Button>
            </div>
            </div>
          </form>
        </Container>
      </Container>
    </>
  );
};

export default EmployeeForm;
