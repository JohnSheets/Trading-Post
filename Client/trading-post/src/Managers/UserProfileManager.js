const apiUrl = "https://localhost:7086";

export const login = (userObject) => {
  return fetch(`${apiUrl}/api/UserProfile/getByEmail/${userObject.email}`)
  .then((r) => r.json())
    .then((userProfile) => {
      if(userProfile.id){
        localStorage.setItem("userProfile", JSON.stringify(userProfile));
        return userProfile
      }
      else{
        return undefined
      }
    });
};

export const logout = () => {
      localStorage.clear()
};

export const GetProfileById = (id) => {
  return fetch(`${apiUrl}/api/UserProfile/${id}`).then((response) => response.json());
}
