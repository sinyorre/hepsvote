import React, {useState} from 'react';
import {Container} from "react-bootstrap";
import AddLinkContainer from "../AddLinkContainer/AddLinkContainer";
import {ADD_PAGE, LIST_PAGE} from "../../constants/PageTypes";
import LinkListContainer from "../LinkListContainer/LinkListContainer";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function MainContainer() {
    const [pageType, setPageType] = useState(LIST_PAGE);
    return (
        <Container style={{marginTop: 10}} fluid>
            {pageType === ADD_PAGE ? <AddLinkContainer setPageType={setPageType}/> :
                <LinkListContainer setPageType={setPageType}/>}
            <ToastContainer/>
        </Container>
    );
}

export default MainContainer;