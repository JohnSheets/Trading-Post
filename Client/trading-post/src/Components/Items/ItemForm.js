import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addItem, uploadImage } from "../../Managers/ItemManager.js"
import { Button } from "reactstrap"
import { UserProfile } from "../UserProfiles/UserProfiles.js"

export const ItemForm = () => {
    const navigate = useNavigate()
    const [itme, setItem] =useState()

    const [item, update] =useState({
        Description: "",
        Price: "",
        Trade: "",
        Picture: "",
        UserProfileId: "",
        SellerId: ""
    })

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const itemToSendToAPI = {
            Description: item.Description,
            Price: +item.Price,
            Trade: null,
            Picture: item.Picture,
            UserProfileId: +item.UserProfileId,
            SellerId: +item.SellerId
        }
        console.log("current items", itemToSendToAPI)
        return addItem(itemToSendToAPI).then(() => navigate(`/home`));

    }

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        try {
            const res = await uploadImage(file) 
            const data = await res.json()
            if(data.imageUrl) {
                const copy = {...item}
                copy.Picture = data.imageUrl
                update(copy)
            }
            else {
                alert("Image upload failed")
            }
        }
        catch (error) {
            console.error("error uploading image: ", error)
            alert("an error occured")
        }
    } 
    return (
        <div>
            <form className="itemForm">
                <h2>New Post</h2>
                <fieldset>
                    <div>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Description"
                        value={item.Description}
                        onChange={ 
                            (event) => {
                            const copy = {...item}
                            copy.Description = event.target.value 
                            update(copy)
                        } 
                    }
                />
                    </div>
                </fieldset>
                <fieldset>
                    <div>
                    <input
                        required autoFocus
                        type="number" 
                        className="form-control"
                        placeholder="Price"
                        value={item.Price}
                        onChange={ 
                            (event) => {
                            const copy = {...item}
                            copy.Price = event.target.value 
                            update(copy)
                        } 
                    }
                />
                    </div>
                </fieldset>
                <fieldset>
                    <div>
                        <h5>Open to Trades?</h5>
                    <input
                        required autoFocus
                        type="checkbox"
                        className="form-check-input"
                        value={item.Trade}
                        onChange={(event) => {
                            const copy = { ...item };
                            copy.Trade = event.target.checked; 
                            update(copy);
                        } 
                    }
                />
                    </div>
                </fieldset>
                <fieldset>
                    <div>
                    <label htmlFor="picture">Upload Picture:</label>
                    <input
                        required autoFocus
                        type="file"
                        className="form-control" 
                        id="picture"
                        onChange={ 
                            handleImageChange
                    }
                />
                    </div>
                </fieldset>
                <Button 
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
           Create
        </Button>

            </form>
        </div>
    )
}