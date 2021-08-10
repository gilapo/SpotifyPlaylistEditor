import React from "react";

interface Props {
    image: string;
    title: string;
    artist: string;
}

const Tracks: React.FC<Props> = ({ image, title, artist }) => {
    return (
        <div>
            <img src={image} data-testid="image" alt="gambar album" />
            <p data-testid="title">judul lagu: {title}</p>
            <p data-testid="artist">nama artis : {artist}</p>
        </div>
    );
};

export default Tracks;
