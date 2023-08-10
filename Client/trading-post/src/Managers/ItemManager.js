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
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error adding item:', error);
    });
}
export const getItemById = (id) => {
    return fetch(`${apiUrl}/api/Item/${id}`).then((res) => res.json())
}

export const uploadImage = (itemImage) => {
    const formData = new FormData();
    formData.append("image", itemImage)
    return fetch(`${apiUrl}/api/Item/imageupload`, {
        method: "POST",
        body: formData,
        
    })
};