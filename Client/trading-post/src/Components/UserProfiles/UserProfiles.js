import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, Button } from "reactstrap";
import { GetProfileById } from "../../Managers/UserProfileManager.js";

export const UserProfile = () => {
    const [userProfile, setUserProfile] = useState({});
    const navigate = useNavigate();
    const localTradingPostUser = localStorage.getItem("userProfile");
    const tradingPostUserObject = JSON.parse(localTradingPostUser)

    useEffect(() => {
        GetProfileById(tradingPostUserObject.id)
        .then((fetchprofiles) => setUserProfile(fetchprofiles))
    }, [tradingPostUserObject.id])

    return (
        <Card className="profile">
            <CardBody>
                <div className="Profile-pic">
                    {userProfile?.Profile}
                </div>
                <div>
                    <strong>Name:</strong>{userProfile?.userName}
                </div>
                <div>
                    <strong>Email:</strong>{userProfile?.email}
                </div>
                <Button onClick={() => navigate(`userProfile/edit/${tradingPostUserObject.id}`)}>
                    Edit Profile
                </Button>
            </CardBody>
        </Card>
    )
}
