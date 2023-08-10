import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addItem } from "../../Managers/ItemManager.js"
import { Button } from "reactstrap"

export const ItemForm = () => {
    const navigate = useNavigate()
    const [itme, setItem] =useState()

    const [item, update] =useState({
        Description: "",
        Price: "",
        Trade: "",
        Picture: ""
    })

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const itemToSendToAPI = {
            Description: item.Description,
            Price: item.Price,
            Trade: item.Trade,
            Picture: item.Picture
        }
        return addItem(itemToSendToAPI).then(() => navigate(`/home`));
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
                            copy.Trade = event.target.checked; // Update boolean value
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
                            (event) => {
                            const copy = {...item}
                            copy.Picture = event.target.files[0]
                            update(copy)
                        } 
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