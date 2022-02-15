import {fireEvent, render, screen} from '@testing-library/react';
import React from "react";
import MainContainer from "../MainContainer";

describe("Main Container", () => {
    it('should have submit link icon', () => {
        render(
            <MainContainer/>
        );
        const submitLinkIcon = screen.getByTestId('submit-link-icon')
        expect(submitLinkIcon).toBeInTheDocument();
    });

    it('should have submit link', () => {
        render(
            <MainContainer/>
        );
        const submitLink = screen.getByTestId('submit-link')
        expect(submitLink).toBeInTheDocument();
    });

    it('should have latest select', () => {
        render(
            <MainContainer/>
        );
        const select = screen.getByTestId('order-select')
        expect(select[0].selected).toBeTruthy();
        expect(select[1].selected).toBeFalsy();
        expect(select[2].selected).toBeFalsy();
    });

    it('should be change page when click add link', () => {
        render(
            <MainContainer/>
        );
        const addPage = screen.getByTestId('add-page');
        fireEvent.click(addPage);
        const returnToList = screen.getByText(/Return to List/i);
        expect(returnToList).toBeInTheDocument();
    })

    it('should be show when page added', () => {
        render(
            <MainContainer/>
        );
        const addPage = screen.getByTestId('add-page');
        fireEvent.click(addPage);
        const nameInputElement = screen.getByTestId('name-input');
        fireEvent.click(nameInputElement);
        fireEvent.change(nameInputElement, {target: {value: 'Google'}});

        const urlInputElement = screen.getByTestId('url-input');
        fireEvent.click(urlInputElement);
        fireEvent.change(urlInputElement, {target: {value: "www.google.com"}});

        const addButton = screen.getByTestId('add-button');
        fireEvent.click(addButton);

        const name = screen.getByRole('heading', {
            text: /Google/i
        });
        const url = screen.getByText(/www.google.com/i);
        expect(name).toBeInTheDocument();
        expect(url).toBeInTheDocument();
    })


    it('should be decrease point', () => {
        render(
            <MainContainer/>
        );
        const addPage = screen.getByTestId('add-page');
        fireEvent.click(addPage);
        const nameInputElement = screen.getByTestId('name-input');
        fireEvent.click(nameInputElement);
        fireEvent.change(nameInputElement, {target: {value: 'Google'}});

        const urlInputElement = screen.getByTestId('url-input');
        fireEvent.click(urlInputElement);
        fireEvent.change(urlInputElement, {target: {value: "www.google.com"}});

        const addButton = screen.getByTestId('add-button');
        fireEvent.click(addButton);

        const downVoteButton = screen.getByTestId("down-vote-btn");
        fireEvent.click(downVoteButton);

        let point = screen.getByTestId("point");
        expect(point).toHaveTextContent("0");
    })

    it('should be increase point', () => {
        render(
            <MainContainer/>
        );
        const addPage = screen.getByTestId('add-page');
        fireEvent.click(addPage);
        const nameInputElement = screen.getByTestId('name-input');
        fireEvent.click(nameInputElement);
        fireEvent.change(nameInputElement, {target: {value: 'Google'}});

        const urlInputElement = screen.getByTestId('url-input');
        fireEvent.click(urlInputElement);
        fireEvent.change(urlInputElement, {target: {value: "www.google.com"}});

        const addButton = screen.getByTestId('add-button');
        fireEvent.click(addButton);

        const upVoteButton = screen.getByTestId("up-vote-btn");
        fireEvent.click(upVoteButton);

        let point = screen.getByTestId("point");
        expect(point).toHaveTextContent("2");
    })
});