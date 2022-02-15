import {fireEvent, render, screen} from '@testing-library/react';
import LinkCard from "../LinkCard";

const mockedLoadLinks = jest.fn();

const MockedLinkCard = () => {
    return (
        <LinkCard
            link={{
                id: "id",
                point: 1,
                name: "Name",
                url: "URL"
            }}
            loadLinks={mockedLoadLinks}
        />
    )
};


describe("Link Card Component", () => {
    it('should render card element', () => {
        render(
            <MockedLinkCard/>
        );
        const name = screen.getByText(/Name/i);
        const url = screen.getByText(/URL/i);
        const point = screen.getByText(/1/i);
        expect(name).toBeInTheDocument();
        expect(url).toBeInTheDocument();
        expect(point).toBeInTheDocument();
    });

    it('when click up vote', () => {
        render(
            <LinkCard
                link={{
                    id: "id",
                    point: 1,
                    name: "Name",
                    url: "URL"
                }}
                loadLinks={mockedLoadLinks}
            />
        );
        const upVoteButton = screen.getByTestId("up-vote-btn");
        fireEvent.click(upVoteButton);
        expect(mockedLoadLinks).toBeCalledTimes(0);
    });

    it('when click down vote', () => {
        render(
            <MockedLinkCard/>
        );
        const downVoteButton = screen.getByTestId("down-vote-btn");
        fireEvent.click(downVoteButton);
        expect(mockedLoadLinks).toBeCalledTimes(0);
    });

    it('should delete button un-visible', () => {
        render(
            <MockedLinkCard/>
        );
        const deleteButton = screen.queryByTestId("delete-button");
        expect(deleteButton).toBeNull()
    });

    it('should have buttons', () => {
        render(
            <MockedLinkCard/>
        );
        const upVote = screen.getByRole('button', {
            name: /Up Vote/i
        });
        const downVote = screen.getByRole('button', {
            name: /Down Vote/i
        });
        expect(upVote).toBeInTheDocument();
        expect(downVote).toBeInTheDocument();
    })
});