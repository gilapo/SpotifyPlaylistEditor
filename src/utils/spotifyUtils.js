const spaceDelimiter = "%20";
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const scopes = [
    "user-read-private",
    "playlist-modify-private",
    "playlist-read-private",
];
const spotifyUtils = {
    authorizeClientId: clientId,
    authorizeEndpoint: "https://accounts.spotify.com/authorize",
    authorizeRedirectUrl: "https://spotify-clone-olive.vercel.app/login",
    authorizeScopesUrlParams: scopes.join(spaceDelimiter),
};

export { spotifyUtils };
