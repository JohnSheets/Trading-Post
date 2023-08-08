import React, { useState} from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { register } from "../Managers/UserProfileManager";


export default function Register({setIsLoggedIn}) {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [displayName, setDisplayName] = useState();
  const [email, setEmail] = useState();
  const [imageLocation, setImageLocation] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [userType, setUserType] = useState("");
  const [userTypeId, setUserTypeId] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (!userType) {
      alert("Please select a User Type (Admin or Author).");
      return;
    }

    //password was not active in this application
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");

    } else {
      const userProfile = { firstName, lastName, displayName, imageLocation, email, userType, userTypeId};
    //   register(userProfile, password)
    //     .then(() => {
    //       setIsLoggedIn(true)
    //       navigate('/')
    //     });
    }
 };

 //This is makes it so a new user can register as an author or admin. People wouldn't normally be given this ability in a real app and would need permissions. We could always uncomment the hard code in the userprofilecontroller in c# to automatically register authors. I found that You still have to have this function though for it to have something to send that can be overwritten
  const adminOrAuthor = (e) => {
    e.preventDefault();
    const userTypeValue = parseInt(e.target.value);
    if (userTypeValue === 1){
      setUserType({ id: 1, name: "Admin"})
      setUserTypeId(1)
    } else if (userTypeValue === 2) {
      setUserType({ id: 2, name: "Author"})
      setUserTypeId(2)
    } else {
      alert("Please enter '1' or '2'.")
      setUserType("")
    }
  }

  return (
    <Form onSubmit={registerClick}>
      <fieldset>
        <FormGroup>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" type="text" onChange={e => setFirstName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" type="text" onChange={e => setLastName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="imageLocation">Profile Image URL</Label>
          <Input id="imageLocation" type="text" onChange={e => setImageLocation(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Button>Register</Button>
        </FormGroup>
      </fieldset>
    </Form>
  );
}
