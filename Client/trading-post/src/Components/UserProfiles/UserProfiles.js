import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { Card, CardBody, Button } from "reactstrap";
import { GetProfileById } from "../../Managers/UserProfileManager.js";

export const UserProfile = (userProfileProp) => {
    const [userProfile,  setUserProfile] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const userProfile = await GetProfileById();
            setUserProfile(userProfile);
        };
    
        fetchUserProfile();
    }, []);     return (
        <Card className="profile">
            <CardBody>
                <div className="Profile-pic">
                    {userProfileProp.Profile}
                </div>
                <div>
                    <strong>Name:</strong>{userProfileProp.UserName}
                </div>
                <div>
                    <strong>Email:</strong>{userProfileProp.Email}
                </div>
                <Button onClick={() => navigate(`userProfile/edit/${userProfileProp.id}`)}>
                 Edit Profile
                </Button>
            </CardBody>
        </Card>
    )
}