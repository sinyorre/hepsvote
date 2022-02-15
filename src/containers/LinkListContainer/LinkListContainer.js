import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import LinkCard from "../../components/LinkCard/LinkCard";
import LinkListPagination from "../../components/LinkListPagination/LinkListPagination";
import {LATEST, LEAST_VOTES, MOST_VOTES} from "../../constants/OrderTypes";
import SubmitLink from "../../components/SubmitLink/SubmitLink";
import OrderSelect from "../../components/OrderSelect/OrderSelect";

function LinkListContainer({setPageType}) {
    const [links, setLinks] = useState([]);
    const [order, setOrder] = useState(LATEST);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(0);

    const compareFunction = (a, b) => {
        let lastVoteA = a.votes[a.votes.length - 1];
        let lastVoteB = b.votes[b.votes.length - 1];

        if (order === LATEST) {
            return new Date(b.creationDate) - new Date(a.creationDate);
        } else if (order === MOST_VOTES) {
            if (a.point === b.point) return new Date(lastVoteB.date) - new Date(lastVoteA.date);
            return b.point - a.point;
        } else if (order === LEAST_VOTES) {
            if (a.point === b.point) return new Date(lastVoteB.date) - new Date(lastVoteA.date);
            return a.point - b.point;
        }
    }

    const loadLinks = () => {
        const links = localStorage.getItem("links");
        if (links) {
            const parsedLinks = JSON.parse(links);
            const sortedLinks = parsedLinks.sort(compareFunction);
            const startIndex = (page - 1) * 5;
            const endIndex = startIndex + 5;
            const slicedLinks = sortedLinks.slice(startIndex, endIndex);
            setLinks(slicedLinks);
            let size = parsedLinks.length / 5;
            if (parsedLinks.length % 5 !== 0) size++;
            setSize(size);
        }
    }

    useEffect(loadLinks, []);
    useEffect(loadLinks, [order, page]);

    return (
        <Row>
            <SubmitLink setPageType={setPageType}/>
            <Col sm={{span: 4, offset: 4}}>
                <hr/>
            </Col>
            <OrderSelect order={order} setOrder={setOrder} />
            {
                links.map(link => (
                    <Col sm={{span: 4, offset: 4}} key={link.id}>
                        <LinkCard link={link} loadLinks={loadLinks}/>
                    </Col>
                ))
            }
            <Col sm={{span: 4, offset: 4}}>
                <hr/>
            </Col>
            <LinkListPagination page={page} size={size} setPage={setPage}/>
        </Row>
    );
}

export default LinkListContainer;