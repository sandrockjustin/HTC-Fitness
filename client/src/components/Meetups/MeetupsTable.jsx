import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// delete icon for meetup entries
import ClearIcon from '@mui/icons-material/Clear';

const MeetupTable = ({ meetups, setMeetups, user }) => {
/// ////////////////////////////////////////////////////////////////
  // console.log('Table , ;
  const handleDelete = (e) => {
    console.log('target meetup', meetups[e]);

    axios.put('/api/meetups/delete', meetups[e])
      .then((data) => console.log('PUT DATA', data))
      .catch((err) => {
        console.error(err);
      });
    setMeetups(meetups.filter((meetup) => meetup._id !== meetups[e]._id));
  };
  /// ////////////////////////////////////////////////////////////
  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Meetup Name</TableCell>
          <TableCell align="right"><h3>Date/Time</h3></TableCell>
          <TableCell align="right"><h3>Location</h3></TableCell>
          <TableCell align="right"><h3>Routine</h3></TableCell>
          <TableCell align="right"><h3>Host</h3></TableCell>
          <TableCell align="right"><h3>Attendees</h3></TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {meetups.map((meetup, i) => (

          <TableRow key={meetup.meetupName + meetup.meetupDate}>
            <TableCell component="th" scope="row">
              {meetup.meetupName}
            </TableCell>
            <TableCell align="right">{meetup.meetupDate}</TableCell>
            <TableCell align="right">{meetup.meetupLocation}</TableCell>

            <TableCell align="right">
              {

                    meetup.routine.map((exercise, indx) => (
                        <p key={indx}>{exercise.name}</p>
                    ))

              }

              </TableCell>

            <TableCell align="right">{`${user.nameFirst} ${user.nameLast}`}</TableCell>

            <TableCell align="right">

              {
              meetup.attendees.map((attendee, ind) => (
                      <p key={ind}>{attendee}</p>
              ))

              }

            </TableCell>

            <TableCell align="right">
              <ClearIcon sx={{ paddingTop: '10px', '&:hover': { color: 'rgba(200, 75, 75, .8)' } }} onClick={() => handleDelete(i)}/>
            </TableCell>
          </TableRow>

        ))}

      </TableBody>
    </Table>
  </TableContainer>
  );
};

export default MeetupTable;
