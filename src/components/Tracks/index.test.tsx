import { fireEvent, render, screen } from "@testing-library/react";
import Tracks from "./";

test("tracks show the image", () => {
    render(
        <Tracks
            image={"/something"}
            title={"some title"}
            artist={"some name"}
        />
    );
    expect(screen.getByRole("img")).toHaveAttribute("src", "/something");
    expect(screen.getByTestId("artist")).toBeInTheDocument();
    expect(screen.getByTestId("title")).toBeInTheDocument();
});
