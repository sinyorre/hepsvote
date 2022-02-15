import React from 'react';
import {ADD_PAGE} from "../../constants/PageTypes";
import {PlusLg} from "react-bootstrap-icons";
import {Col} from "react-bootstrap";
import styled from "styled-components";

const AddLinkWrapper = styled.div`
    display: flex;
    flex-direction: row;
    height: 100px;
    border-radius: 7;
    cursor: pointer;
    border solid 0.1px;
`;

const PlusIconWrapper = styled.div`
    display: flex;
    flex: 2;
    justify-content: center;
    align-items: center;
    margin-left: 5%;
`;

const AddLinkTextWrapper = styled.div`
    display: flex;
    flex: 8;
    justify-content: flex-start;
    align-items: center;
`;

function SubmitLink({setPageType}) {
    return (
        <Col sm={{span: 4, offset: 4}}>
            <AddLinkWrapper onClick={() => setPageType(ADD_PAGE)} data-testid="add-page">
                <PlusIconWrapper>
                    <PlusLg style={{width: "80%", height: "80%"}} data-testid="submit-link-icon"/>
                </PlusIconWrapper>
                <AddLinkTextWrapper>
                    <span style={{fontWeight: 'bold', fontSize: 32, color: '#000000'}} data-testid="submit-link">SUBMIT A LINK</span>
                </AddLinkTextWrapper>
            </AddLinkWrapper>
        </Col>
    );
}

export default SubmitLink;