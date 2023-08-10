import { useEffect, useState } from "react";
import { getAllItems } from "../Managers/ItemManager";
import { useNavigate } from "react-router-dom";
import { Button, Container, Card, Col, Row } from "reactstrap";
import { SingleItem } from "./Items/SingleItem";
export const HomePage = () => {

    const [items, setItems] =useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllItems()
        .then((fetchItems) => setItems(fetchItems))
    }, [])

    return (
        <>
        <Container>
      <h1>All Items</h1>
      <Row>

        {items.map((item) => (
            <Col key={item.id}>
             {/* {item.Picture}<br /> */}
            {/* <strong>Price:</strong> {item.price}<br /> */}
            <Button onClick={() => navigate(`/item`)}>View Post</Button>
            <Card>
            <SingleItem key={item.id} itemProp={item} />
                </Card>

          </Col>
          
          ))}
      </Row>
      <Button onClick={() => navigate(`/itemForm`)}>Create Post</Button>
    </Container>
          </>
    );
};