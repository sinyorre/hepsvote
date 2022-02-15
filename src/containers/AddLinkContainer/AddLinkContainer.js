import React, {useState} from 'react';
import {Col, Row} from "react-bootstrap";
import styled from "styled-components";
import {LIST_PAGE} from "../../constants/PageTypes";
import {v4 as uuidv4} from 'uuid';
import {toast} from "react-toastify";
import AddLinkForm from "../../components/AddLinkForm/AddLinkForm";

const AddButton = styled.button`
  background-color: #0d6efd;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  width: 100%;
  border-radius: 50px;
`;

const Back = styled.label`
  cursor: pointer;
`;

function AddLinkContainer({setPageType}) {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');

    const saveLink = () => {
        const today = new Date();
        const link = {
            id: uuidv4(),
            name,
            url,
            point: 1,
            creationDate: today,
            votes: [{date: today, uid: 'uid'}],
        }
        let links = JSON.parse(localStorage.getItem("links"));
        links = links ? [...links, link] : [link];
        localStorage.setItem("links", JSON.stringify(links));
        toast.success('Link Added', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setPageType(LIST_PAGE);
    }

    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            saveLink();
        }
    }

    return (
        <Row>
            <Col sm={{span: 4, offset: 4}}>
                <Back onClick={() => setPageType(LIST_PAGE)}>&larr; Return to List</Back>
                <AddLinkForm url={url} name={name} setName={setName} setUrl={setUrl} onKeyPress={onKeyPress} />
                <AddButton onClick={saveLink} data-testid="add-button">ADD</AddButton>
            </Col>
        </Row>
    );
}

export default AddLinkContainer;