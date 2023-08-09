import { useEffect, useState } from "react";
import { getAllItems } from "../Managers/ItemManager.js";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

export const HomePage = () => {

    const [items, setItems] =useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllItems()
        .then((fetchItems) => setItems(fetchItems))
    })

    return (
        <div>
      <h1>All Items</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
             {item.Picture}<br />
            <strong>Price:</strong> {item.price}<br />
          </li>
        ))}
      </ul>
      <Button onClick={() => navigate(`/itemForm`)}>Create Post</Button>
    </div>
    );
};