/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// map component
import { APIProvider, Map } from '@vis.gl/react-google-maps';

// mui components
import { Box } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { styled } from '@mui/material/styles';

import TextField from '@mui/material/TextField';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';

const MeetBox = styled(Box)`
background-image: url("https://i.imgur.com/UHtnNpg.png");
background-size: cover;

`;

const SubmitButt = styled(Button)`
background-color: #5e5e5e;
color: #bbbbbb;
`;


/// ////////////////////////////////////////////////////////////////////////////////////////////////

const Meetups = (props) => {
  console.log('MEETUP PROPS', props);

  const [value, setValue] = useState(null);
  const [meetupName, setMeetupName] = useState('');
  const [location, setLocation] = useState('');

  /// /////////////////////////////////////////////////////////////////////////////////////////////

  const handleCreate = () => {
    if (value !== null && meetupName.length) {
      console.log(value.$d);
      const date = value.$d;
      console.log(date.toString());

      axios.post('/api/meetups', {
        host: props.user.googleId,
        meetupName,
        routine: props.user.saved_exercises,
        meetupLocation: location,
        meetupDate: date.toString(),
      });
      const updateMeetupResponse = async () => {
        const meetupResponse = await axios.get('/api/meetups');
        props.setMeetups(meetupResponse.data);
      };
      updateMeetupResponse();
    }
  };

  const handleNameChange = (e) => {
    setMeetupName(e.target.value);
    console.log('MEETUPNAME', meetupName);
  };
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    console.log('LOCATION', location);
  };
  /// ////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <MeetBox>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>

      <h1 style={ { color: 'orange', textAlign: 'center', paddingLeft: '20px' } }>MEETUPS</h1>

    </Box>

{/* ///////////////////////////////////////////////////////////////////////////////////////////// */}

{/* ///////////////////////////////////////////////////////////////////////////////////////////// */}
    <Box sx={{ display: 'flex', alignItems: 'center' }}>

      <TextField value={meetupName} label="Meetup Name" sx={ { padding: '15px', backgroundColor: 'grey' } } variant="filled" onChange={(e) => handleNameChange(e)}></TextField>

      <TextField value={location} label="Location" sx={ { padding: '15px', backgroundColor: 'grey' } } variant="filled" onChange={(e) => handleLocationChange(e)}></TextField>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer sx={ { transform: 'scale(.75)' } } components={['DateTimePicker']}>
          <DateTimePicker
          value={value}
          onChange={ (newValue) => setValue(newValue) }
          sx={ { background: 'grey' } }
          />

        {console.log('VALUE:', value)}
        </DemoContainer>
      </LocalizationProvider>
      < SubmitButt sx={{
        backgroundColor: '#5e5e5e',
        color: '#bbbbbb',
      }}
        onClick={handleCreate}
        >Create Meetup</SubmitButt>
    </Box>
{/* ///////////////////////////////////////////////////////////////////////////////////////////// */}

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Meetup Name</TableCell>
            <TableCell align="right">Date/Time</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Routine</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.meetups.map((meetup) => (
            <TableRow key={meetup.meetupName + meetup.meetupDate}>
              <TableCell component="th" scope="row">
                {meetup.meetupName}
              </TableCell>
              <TableCell align="right">{meetup.meetupDate}</TableCell>
              <TableCell align="right">{meetup.meetupLocation}</TableCell>
              <TableCell align="right">Doing {meetup.routine.length} exercises</TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>
    </TableContainer>

    </MeetBox>
  );
};
export default Meetups;
