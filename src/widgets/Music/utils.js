const spotifyTrack = /open\.spotify\.com\/track\/([\w\d]+)/
const spotifyPlaylist = /open\.spotify\.com\/playlist\/([\w\d]+)/
const spotifyAlbum = /open\.spotify\.com\/album\/([\w\d]+)/

export default function getIFrameURL(originalLink) {
  if (originalLink.match(spotifyTrack)) {
    return (
      'https://open.spotify.com/embed/track/' +
      originalLink.match(spotifyTrack)[1]
    )
  } else if (originalLink.match(spotifyPlaylist)) {
    return (
      'https://open.spotify.com/embed/playlist/' +
      originalLink.match(spotifyPlaylist)[1]
    )
  } else if (originalLink.match(spotifyAlbum)) {
    return (
      'https://open.spotify.com/embed/album/' +
      originalLink.match(spotifyAlbum)[1]
    )
  }

  return originalLink
}
