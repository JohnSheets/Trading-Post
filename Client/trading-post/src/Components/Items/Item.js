import { useEffect } from "react";
import { CardBody } from "reactstrap";
import { getItemById } from "../../Managers/ItemManager.js";
import React from "react";


export const Item = ({item}) => {

    useEffect(() => {
        getItemById(item.id).then((fetchedItem) => {

        })
    }, [item.id])
    return (
        <CardBody>
            <div>
                <strong className="item-description">
                    {item.Description}
                </strong>
                <div>
                    {item.Price}
                </div>
                <div>
                    {item.Trade}
                </div>
                <div>
                    {item.Picture}
                </div>
            </div>
        </CardBody>
    );
}