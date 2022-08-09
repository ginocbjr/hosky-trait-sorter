import { CardGroup, Row } from "react-bootstrap";
import HoskyPool, { HoskyPoolProps } from "./HoskyPool";

function Pools(props: PoolsProps) {
    return (
        <Row xs={1} md={2} className="g-4">
            {props.hoskies.map((hosky) => (
                <HoskyPool key={hosky.name}
                    hoskies={hosky.hoskies}
                    name={hosky.name}
                />
            ))}
        </Row>
    )
}

export default Pools;

export type PoolsProps = {
    hoskies: HoskyPoolProps[];
}
