import React, { useEffect, useState } from 'react';
import Icon from '@mdi/react';
import { mdiWeightLifter, mdiPacMan, mdiFaceManShimmer } from '@mdi/js';

const Badges = ({ user }) => {
  const { badges, displayBadge } = user;
  console.log('user', user);

  const badgePaths = {
    'Fitness Master': mdiWeightLifter,
    'Exercise Saver': mdiPacMan,
    'New User': mdiFaceManShimmer,
  };

  return (
    <div>
      {console.log(badges)}
      <div>{displayBadge ? <Icon path={badgePaths[displayBadge] || mdiFaceManShimmer} size={1}/> : 'No display badge selected'}</div>

      <h1>Badges</h1>
      {badges && badges.length > 0 ? (
        badges.map((badge, index) => (
            <div key={index}>
              <div>{badge.name}</div>
              <div>{badge.description}</div>
              <div>{new Date(badge.earnedAt).toLocaleDateString()}</div>
              <div>
                <Icon path={badgePaths[badge.name]} size={1} />
              </div>
            </div>
        ))
      ) : (
        <p>No badges earned</p>
      )}
    </div>
  );
};

export default Badges;
