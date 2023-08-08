import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import { Login } from "./Login.js";
import { UserProfile } from "./UserProfiles/UserProfiles";

export default function ApplicationViews() {

    return(
        <Routes>
            <Route path="/" element={<Hello />} />
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/userProfile" element={<UserProfile />} />
            {/* <Route path="/userProdile/edit/:userProfileId" element={} /> */}
        </Routes>
    );
}