import { CardBody } from "reactstrap";
import React, { useEffect } from "react";


export const Listing = ({ itemProp }) => {

console.log(itemProp);
  
// useEffect(() => {
//     uploadImage()
// })

return (
        
        <CardBody>
            <div>
                <strong className="item-description">
                    {itemProp.description}
                </strong>
                <div>
                    ${itemProp.price}
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