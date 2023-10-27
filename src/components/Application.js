import * as React from 'react';
import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Container, Paper } from '@mui/material';
import { fontSize, textAlign } from '@mui/system';
import { render } from '@testing-library/react';


//Everything to do with making an application
export default function Application() {
  const paperStyle = { padding: '20px 20px', width: 500, height: 300, margin: '20px auto' };
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('');
  const [applications, setApplications] = useState([]);

  const containerStyle = {
    padding: '10px 10px',
    width: 600,
    margin: '20px auto',
    //backgroundColor: '#cfe8fc',
    height: 800
  };

  //Submit button handler
  const handleClick=(e)=>{
    e.preventDefault();
    const application = {company, position, status};
    console.log(application);

    //map this to the postmapping /app/add in spring project
    fetch("http://localhost:8080/app/add",{
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(application)
    }).then(()=>{
      console.log("New application added");
      render();
    });
    
  }

  useEffect(()=>{
    fetch("http://localhost:8080/app/getAll")
    .then(res=>res.json())
    .then((result)=>{
      setApplications(result);
    });
  },[]);
    


  return (
    <Container style={containerStyle}>
      <Paper style={paperStyle}>
        <h1 style = {{fontSize: 20}}><u>Add Application</u></h1>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '20ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField 
            id="company-box" 
            label="Company" 
            variant="outlined" 
            value={company} 
            onChange={(e)=>setCompany(e.target.value)}/>

          <TextField 
            id="position-box" 
            label="Position" 
            variant="outlined"
            value={position}
            onChange={(e)=>setPosition(e.target.value)} />

          <TextField 
            id="status-box" 
            label="Status" 
            variant="outlined" 
            value = {status}
            onChange={(e)=>setStatus(e.target.value)}/>

          <Button id="submit-application" variant="outlined" onClick={handleClick}>
            Submit
          </Button>

        </Box>
      </Paper>
      
      <Paper elevation={3} style ={paperStyle}>
        
        
        {applications.map(application=>(
            <Paper elevation={6} sytle = {{style: "10px", margin:"15px", textAlign:"left"}} key ={application.id}>
              <div style = {{fontSize: "12pt"}}>
              Id: {application.id}
              Company: {application.company}
              Position: {application.position}
              Status: {application.status}
              </div>
            </Paper>
          ))}

      </Paper>
    </Container>
  );

  // WOW THAT ARRAY LOOKS AWFUL!
  //TODO: Make it better and implement deletion and editing. 
}