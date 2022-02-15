import React from 'react';
import {Form} from "react-bootstrap";
import styled from "styled-components";

const Title = styled.h3`
`;

function AddLinkForm({name, url, setName, setUrl, onKeyPress}) {
    return (
        <Form>
            <Title>Add New Link</Title>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Link Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="e.g. Alphabet"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    data-testid="name-input"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Link URL</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="e.g. http://abc.xyz"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyPress={onKeyPress}
                    data-testid="url-input"
                />
            </Form.Group>
        </Form>
    );
}

export default AddLinkForm;