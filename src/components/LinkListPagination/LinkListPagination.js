import React from 'react';
import {Col, Pagination} from "react-bootstrap";

function LinkListPagination({page, size, setPage}) {
    const items = [];
    for (let number = 1; number <= size; number++) {
        items.push(
            <Pagination.Item key={number} active={number === page} onClick={(e) => setPage(parseInt(e.target.text))}>
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <Col sm={{span: 4, offset: 4}}>
            <Pagination style={{color: 'red'}}>{items}</Pagination>
        </Col>
    );
}

export default LinkListPagination;