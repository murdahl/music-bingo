function fetchArtists(bearer) {
  const options = {
    hostname: "www.google.com",
    port: 80,
    path: "/upload",
    method: "GET",
    headers: {
      "User-Agent": "my request",
      Authorization: "Bearer " + bearer,
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  };
}
