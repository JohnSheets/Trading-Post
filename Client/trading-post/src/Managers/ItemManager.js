const apiUrl = "https://localhost:7086";

export const getAllItems = () => {
    return fetch(`${apiUrl}/api/Item`)
    .then((response) => response.json())
}