import React, { useContext } from "react";
import MapContext from "../../MapContext";

const UserProfile = () => {
  const { state } = useContext(MapContext);
  return (
    <div>
      <div className="top-spacer"></div>
      <h1>User Profile</h1>
      <p>{state.userProfile && state.userProfile.first_name}</p>
      <img src={state.userProfile && state.userProfile.profile_pic} alt="user" width="100px" />
    </div>
  );
};

export default UserProfile;
