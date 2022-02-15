import React from 'react';
import {Col, Form} from "react-bootstrap";
import {LATEST, LEAST_VOTES, MOST_VOTES} from "../../constants/OrderTypes";

function OrderSelect({order, setOrder}) {
    return (
        <Col sm={{span: 4, offset: 4}}>
            <div>
                <Form.Select aria-label="Order By" onChange={e => setOrder(e.target.value)} value={order} data-testid="order-select">
                    <option value={LATEST}>Latest</option>
                    <option value={MOST_VOTES}>Most Voted (Z -> A)</option>
                    <option value={LEAST_VOTES}>Less Voted (A -> Z)</option>
                </Form.Select>
            </div>
        </Col>
    );
}

export default OrderSelect;