import { Card, ListGroup } from "react-bootstrap";

function HoskyPool(props: HoskyPoolProps) {
    return (
        <Card style={{ width: '30rem'}}>
            <Card.Body>
                <Card.Header>{`${props.name} (${props.hoskies.length})`}</Card.Header>
                <ListGroup>
                    {getHoskies(props.hoskies)}
                </ListGroup>
            </Card.Body>
        </Card>
    );
}

function getHoskies(hoskies: CgNftType[]) {
    return hoskies.map((hosky) => (
        <ListGroup.Item key={hosky.fingerprint}>{hosky.name}</ListGroup.Item>
    ))
}

export default HoskyPool;

export type CgNftType = {
    name: string;
    fingerprint: string;
}

export type HoskyPoolProps = {
    name: string;
    hoskies: CgNftType[];
}
