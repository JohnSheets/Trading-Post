import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const ItemForm = () => {
    const navigate = useNavigate()
    const [itmes, setItem] =useState()

    const [item, update] =useState({
        Description: "",
        Price: "",
        Trade: "",
        Picture: ""
    })

    const handelSaveButtonClick = (event) => {
        event.preventDefualt()

        const itemToSendToAPI = {
            Description: item.Description,
            Price: item.Price,
            Trade: item.Trade,
            Picture: item.Picture
        }
        return addItem(itemToSendToAPI).then(navigate(`/home`))
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
                        type="integer" //should this type be an integer? 
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
                    <input
                        required autoFocus
                        type="text" //"trade" is a boolean so how should this feildset be refactored? 
                        className="form-control"
                        placeholder="Description"
                        value={item.Trade}
                        onChange={ 
                            (event) => {
                            const copy = {...item}
                            copy.Trade = event.target.value 
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
                        type="text"
                        className="form-control"
                        placeholder="Description"
                        value={item.Picture}
                        onChange={ 
                            (event) => {
                            const copy = {...item}
                            copy.Picture = event.target.value 
                            update(copy)
                        } 
                    }
                />
                    </div>
                </fieldset>
            </form>
        </div>
    )
}