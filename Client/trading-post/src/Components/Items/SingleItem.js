import { CardBody } from "reactstrap";
import React from "react";


export const SingleItem = ({ itemProp }) => {

console.log(itemProp);
  
    return (
        
        <CardBody>
            <div>
                <strong className="item-description">
                    {itemProp.description}
                </strong>
                <div>
                    {itemProp.price}
                </div>
                <div>
                    {itemProp.trade}
                </div>
                <div>
                    {itemProp.picture}
                </div>
            </div>
         </CardBody>
    );
}