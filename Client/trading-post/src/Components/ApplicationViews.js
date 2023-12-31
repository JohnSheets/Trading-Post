import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import { UserProfile } from "./UserProfiles/UserProfiles";
import { HomePage } from "./HomePage";
import { ItemForm } from "./Items/ItemForm.js";
import { SingleItem } from "./Items/SingleItem.js";
import { Post } from "./PostPage.js";

export default function ApplicationViews() {

    return(
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/userProfile" element={<UserProfile />} />
            {/* <Route path="/home" element={<HomePage />} /> */}
            <Route path="/itemForm" element={<ItemForm />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/post/:id" element={<Post />} />
        </Routes>
    );
}