import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { styled } from '@mui/material/styles';

import { Input } from '@mui/base/Input';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




const MeetBox = styled(Box)`
background-color: #f8f5ed

`;
///////////////////////////////////////////////////////////////////////////////////////////////////

const Meetups = (props) => {
  console.log("MEETUP PROPS", props);
  // const [meetupName, setMeetupName] = useState("");
  return (
    <MeetBox>
    <Box sx={{display: 'flex', alignItems: 'center'}}>

      <h1 style={ {color: 'orange', textAlign: 'center'} }>MEETUPS</h1>

      <Box sx={ {transform: 'scale(.15)'} }>
        <img style={ {float: 'right'} } src="https://imgs.search.brave.com/5GJzzBf2aRFfxylFL8b1IyXYeG9BNzy2PpX9fBh4g0I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kcmFn/b25iYWxsLmd1cnUv/d3AtY29udGVudC91/cGxvYWRzLzIwMjIv/MDIvSHlwZXJib2xp/Yy1UaW1lLUNoYW1i/ZXItQ2FsY3VsYXRv/ci04MjR4NDkwLmpw/Zw"/>
      </Box>
    </Box>

{/* ///////////////////////////////////////////////////////////////////////////////////////////// */}

{/* ///////////////////////////////////////////////////////////////////////////////////////////// */}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer sx={ {transform: 'scale(.75)'} } components={['DateTimePicker']}>
          <DateTimePicker sx={ {background: 'grey'} }/>
        </DemoContainer>
      </LocalizationProvider>

{/* ///////////////////////////////////////////////////////////////////////////////////////////// */}

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Meetup Name</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Routine</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        
            <TableRow >
              <TableCell component="th" scope="row">
                Bayou Bods
              </TableCell>
              <TableCell align="right">some stuff</TableCell>
              <TableCell align="right">more stuff</TableCell>
              <TableCell align="right">this stuff</TableCell>
              <TableCell align="right">other stuff</TableCell>
            </TableRow>
      
        </TableBody>
      </Table>
    </TableContainer>

    </MeetBox>
  );
};
export default Meetups;
