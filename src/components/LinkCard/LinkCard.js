import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import {ArrowDown, ArrowUp, Trash} from "react-bootstrap-icons";
import styled from "styled-components";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import {toast} from "react-toastify";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    min-height: 170px;
    height: auto;
    padding: 10px;
    &:hover {
      background-color: #dce2f8;
    }
    border: 0.1px solid;
    border-radius: 10px;
    margin-top: 10px;
`;

const PointWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 3;
    justify-content: center;
    align-items: center; 
`;

const PointTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    height: 80%;
    width: 80%;
    border-radius: 7;
    background-color: #0d6efd;
`;

const PointText = styled.span`
    font-weight: bold;
    font-size: 48px;
    color: #ffffff;
`;

const PointDescriptionText = styled.span`
    font-weight: bold;
    font-size: 18px;
    color: #ffffff;
`;

const LinkWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 7;
    align-content: 'space-between';
    padding: 0px 0px 4px 6px;
`;

const LinkUpWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex: 7;
`;

const LinkDescriptionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 9;
`;

const DeleteLinkWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const VoteButtonsWrapper = styled.div`
    display: flex;
    flex: 3;
    justify-content: space-evenly;
    width: 70%;
    align-contents: center;
`;

const ButtonWrapper = styled.div`
`;

function LinkCard({link, loadLinks}) {
    const {id, point, name, url} = link;
    const [visible, setVisible] = useState(false);
    const [popup, setPopup] = useState({show: false, id: null});

    const deleteLink = () => {
        setPopup({show: true, name, id})
    }

    const confirmDelete = () => {
        const links = localStorage.getItem("links");
        if (links) {
            const parsedLinks = JSON.parse(links);
            const data = parsedLinks.filter(link => link.id !== id)
            localStorage.setItem("links", JSON.stringify(data));
            toast.success('Link Deleted', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            clearPopup();
            loadLinks();
        }
    }

    const clearPopup = () => {
        setPopup({
            show: false,
            name: null,
            id: null,
        });
    }

    const rejectDelete = () => {
        clearPopup();
    }

    const upVote = () => {
        const links = localStorage.getItem("links");
        if (links) {
            let data = JSON.parse(links);
            const today = new Date();
            data = data.map(s => s.id === id ? ({
                ...s,
                point: s.point + 1,
                updateDate: today,
                votes: [...s.votes, {date: today, uid: "uid"}]
            }) : s);
            localStorage.setItem("links", JSON.stringify(data));
            loadLinks();
        }
    }

    const downVote = () => {
        const links = localStorage.getItem("links");
        if (links) {
            let data = JSON.parse(links);
            const today = new Date();
            data = data.map(s => s.id === id ? ({
                ...s,
                point: point === 0 ? 0 : s.point - 1,
                updateDate: today,
                votes: [...s.votes, {date: today, uid: "uid"}]
            }) : s);
            localStorage.setItem("links", JSON.stringify(data));
            loadLinks();
        }
    }

    return (
        <Wrapper
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            <ConfirmModal popup={popup} name={name} confirm={confirmDelete} reject={rejectDelete}/>
            <PointWrapper>
                <PointTextWrapper>
                    <PointText data-testid="point">{point}</PointText>
                    <PointDescriptionText>Points</PointDescriptionText>
                </PointTextWrapper>
            </PointWrapper>
            <LinkWrapper>
                <LinkUpWrapper>
                    <LinkDescriptionWrapper>
                        <h3>{name}</h3>
                        {url && <span>({url})</span>}
                    </LinkDescriptionWrapper>
                    <DeleteLinkWrapper>
                        {
                            visible && (
                                <Button
                                    variant="danger"
                                    style={{cursor: 'pointer'}}
                                    onClick={deleteLink}
                                    data-testid="delete-button"
                                >
                                    <Trash/>
                                </Button>
                            )
                        }
                    </DeleteLinkWrapper>
                </LinkUpWrapper>
                <VoteButtonsWrapper>
                    <ButtonWrapper>
                        <Button variant="success" onClick={upVote} data-testid="up-vote-btn">
                            <ArrowUp/> Up Vote
                        </Button>
                    </ButtonWrapper>
                    <div>
                        <Button variant="danger" onClick={downVote} data-testid="down-vote-btn">
                            <ArrowDown/> Down Vote
                        </Button>
                    </div>
                </VoteButtonsWrapper>
            </LinkWrapper>
        </Wrapper>
    );
}

export default LinkCard;