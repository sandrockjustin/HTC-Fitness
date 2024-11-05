import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
          <form>
            <label>
              Search users:
              <input type="text" name="name" />
            </label>
            <input type="submit" value="Submit" />
          </form>
          { props.user.friends_list && props.user.friends_list.length > 0 ?
            <div style={{paddingTop: "35px"}}>
              <table>
                <thead>
                  <tr>
                    <th>Friend Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    props.user.friends_list.map( (friend) => {
                      return (
                        <tr key={friend.googleId}>
                          <td>{friend.nameFirst} {friend.nameLast}</td>
                          <td>{friend.email}</td>
                          <td><button type='button' onClick={() => removeFriend(friend.googleId)}>Remove Friend</button></td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
            :
            <div>
              You have {props.user.friends_list.length} friends; consider adding friends to your friends list.
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