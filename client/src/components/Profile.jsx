import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';


const Profile = (props) => {

  useEffect(() => {
    axios.get('/api/friends')
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(`Error on request in profile, requesting friends.`)
      })
  }, [])

  function removeFriend(id){
    axios.delete(`/api/friends/${id}`)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.error(`Error on delete request in profile, removing friend #${id}.`)
      })
  }

  return (
    <div id="profilePage">
      { props.user ?
        <div id="profileInfo">
          <table>
            <thead>
              <tr>
                <th>Account Information</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ID: </td>
                <td>#{props.user.googleId}</td>
              </tr>
              <tr>
                <td>Name: </td>
                <td>{props.user.nameFirst} {props.user.nameLast}</td>
              </tr>
              <tr>
                <td>Email: </td>
                <td>{props.user.email}</td>
              </tr>
            </tbody>
          </table>
          { props.user.friends_list && props.user.friends_list.length > 0 ?
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              { 
                props.user.friends_list.map((friend) => (
                  <ListItem alignItems="flex-start" key={friend.googleId}>
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${friend.nameFirst} ${friend.nameLast}`}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ color: 'text.primary', display: 'inline'}}
                            >
                            {`${friend.email}`}
                            <br></br>
                          </Typography>
                          {
                            `
                            Goal weight: ${friend.goal_weight ? friend.goal_weight : 'N/A'} | Exercises: ${friend.saved_exercises ? friend.saved_exercises.length : 0} | Friends: ${friend.friends_list ? friend.friends_list.length : 0}
                            `
                          }
                        </React.Fragment>
                      }
                      />
                    <ListItemButton><PersonRemoveIcon onClick={() => removeFriend(friend.googleId)}/></ListItemButton>
                  </ListItem>
                ))
              }
            </List>
            :
            <div>
              You have not added any friends.
            </div> 
          }
        </div>
        :
        <div>
          401; user is not authenticated.
        </div>        
      }
    </div>
  )

}

export default Profile;

  // return (
  //   <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
  //     <ListItem alignItems="flex-start">
  //       <ListItemAvatar>
  //         <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
  //       </ListItemAvatar>
  //       <ListItemText
  //         primary={`${friend.nameFirst} ${friend.nameLast}`}
  //         secondary={
  //           <React.Fragment>
  //             <Typography
  //               component="span"
  //               variant="body2"
  //               sx={{ color: 'text.primary', display: 'inline' }}
  //             >
  //               {friend.email}
  //             </Typography>
  //             {`Goal weight: ${friend.goal_weight} | Exercises: ${friend.saved_exercises.length} | Friends: ${friend.friends_list}`}
  //           </React.Fragment>
  //         }
  //       />
  //     </ListItem>
  //     <Divider variant="inset" component="li" />
  //   </List>
  // );

  // { props.user.friends_list && props.user.friends_list.length > 0 ?