import { useEffect, useState } from "react";
import { getItemById } from "../Managers/ItemManager.js";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "reactstrap";
import { Listing } from "./Listing.js";

export const Post = () => {
    const [item, setItem] = useState(null); // Initialize with null, since you expect a single item
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getItemById(id)
        .then((fetchItem) => setItem(fetchItem))
    }, [id])

    return (
        <>
        <Container>
          <h1>Post</h1>
          <Row>
            <Col>
              {item ? (
                <Card>
                  <Listing key={item.id} itemProp={item} />
                </Card>
              ) : (
                <p>Loading...</p>
              )}
              <Button>Add To Cart</Button>
              <Button>Offer Trade</Button>
            </Col>
          </Row>
        </Container>
        </>
    );
};
