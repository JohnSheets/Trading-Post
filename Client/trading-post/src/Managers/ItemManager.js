const apiUrl = "https://localhost:7086";

export const getAllItems = () => {
    return fetch(`${apiUrl}/api/Item`)
    .then((response) => response.json())
}

export const addItem = (singleItem) => {
    return fetch(`${apiUrl}/api/Item`, { 
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(singleItem),
    });
}

export const getItemById = (id) => {
    return fetch(`${apiUrl}/api/Item/${id}`).then((res) => res.json())
}
