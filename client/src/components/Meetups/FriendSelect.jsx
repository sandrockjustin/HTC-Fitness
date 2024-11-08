import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

export default function FriendSelect(props) {
  const friends = props.friends.map((friend) => friend);

  const [selectedFriend, setSelectedFriend] = useState({});

  const handleChange = (event) => {
    setSelectedFriend(event.target.value);
  };

  // console.log('FRIENDS LIST', friendsList);

  return (
    <Box sx={{ minWidth: 200, backgroundColor: 'grey' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Friends</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={handleChange}
          value={selectedFriend}
        >
        {
          friends.map((friend, i) => (

            <MenuItem key={i} value={friend}>
            {console.log('FRIEND', `${friend.nameFirst} ${friend.nameLast}`)}
            {`${friend.nameFirst} ${friend.nameLast}`}
            </MenuItem>

          ))
        }
        </Select>

      </FormControl>
    </Box>
  );
}
