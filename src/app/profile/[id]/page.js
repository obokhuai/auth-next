import React from "react";

function UserProfile({ params }) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile page{" "}
        <span className="p-2 rounded bg-orange-500 text-black ml-2">
          {params.id}
        </span>
      </p>
    </div>
  );
}

export default UserProfile;
