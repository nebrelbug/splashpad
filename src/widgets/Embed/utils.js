export function spotifyTrack(originalLink) {
  let getTrackID = /open\.spotify\.com\/track\/([\w\d])+/

  let trackID = getTrackID.match(originalLink)

  return 'https://open.spotify.com/embed/track/' + trackID
}

export function spotifyPlaylist(originalLink) {
  let getPlaylistID = /open\.spotify\.com\/playlist\/([\w\d])+/

  let playlistID = getPlaylistID.match(originalLink)

  return 'https://open.spotify.com/embed/playlist/' + playlistID
}
