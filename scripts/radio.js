var endpoint = "https://radio-api.mediaworks.nz/radio-api/v3/";

var currentStation = {};
var stations = {};

function initializeRadio() {
    populateStations();
}

function play(identifier) {
    var station = stations[identifier];
    if (!station) {
        updateStation(identifier);
        return;
    }

    if (!station.streams || station.streams.length === 0) {
        console.error("No streams available for Station");
        M.toast({html: "Error: No streams available for Station"});
        return;
    }

    var video = document.getElementById("video");
    if (!video || video.nodeName !== "VIDEO") {
        console.error("Failed to find video for radio");
        M.toast({html: "Error: Failed to find video for radio"});
        return;
    }

    var currentIdentifier = video.getAttribute("data-identifier");
    if (currentIdentifier) {
        if (currentIdentifier === identifier) {
            updateElement({
                identifier: identifier,
                icon: "pause"
            });
        }
    }

    if (video.hasAttribute("data-station") && video.getAttribute("data-station") === identifier) {
        return;
    }

    video.setAttribute("data-station", identifier);

    var source;
    for (var index = 0; index < station.streams.length; index++) {
        var stream = station.streams[index];
        if (stream.quality === "high") {
            source = stream.url;
            break;
        } else {
            source = stream.url;
        }
    }

    loadSource(source, function() {
        var currentIdentifier = video.getAttribute("data-identifier");
    }, function(data) {
        console.error(data);
        M.toast({html: "Error: " + data});
        updateIcons();
    });
    /*
    if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(source);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
            video.play();
            updateIcons(identifier);
        });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = source;
        video.addEventListener("loadedmetadata", function() {
            video.play();
            updateIcons(identifier);
        });
    } else {
        console.error("Your browser doesn't support HLS");
        M.toast({html: "Error: Your browser doesn't support HLS"});
        updateIcons();
    }
    */
}

function loadSource(source, success, failure) {
    if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(source);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
            video.play();
            success();
        });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = source;
        video.addEventListener("loadedmetadata", function() {
            video.play();
            success();
        });
    } else {
        failure("Your browser doesn't support HLS");
    }
}

function updateIcons(identifier) {
    var keys = Object.keys(stations);
    for (var index = 0; index < keys.length; index++) {
        var key = keys[index];
        var icon = "play_arrow";
        if (key === identifier) {
            icon = "pause";
        }

        updateElement({
            identifier: key,
            icon: icon
        });
    }
}

function createElement(data) {
    var card = document.createElement("div");
    card.classList.add("card", "small");
    document.getElementsByClassName("container")[0].appendChild(card);

    var cardImage = document.createElement("div");
    cardImage.classList.add("card-image", "waves-effect", "waves-block", "waves-dark");
    cardImage.addEventListener("click", function() {
        play(data.identifier);
    });

    card.appendChild(cardImage);

    var image = document.createElement("img");
    image.id = data.identifier + "-artwork";
    image.src = data.artwork;
    cardImage.appendChild(image);

    var button = document.createElement("a");
    button.classList.add("btn-floating", "z-depth-0");
    cardImage.appendChild(button);

    var icon = document.createElement("i");
    icon.classList.add("material-icons");
    icon.id = data.identifier + "-icon";
    icon.innerText = "play_arrow";
    button.appendChild(icon);

    var cardContent = document.createElement("div");
    cardContent.classList.add("card-content", "grey", "lighten-5");
    card.appendChild(cardContent);

    var primary = document.createElement("p");
    primary.classList.add("grey-text", "text-darken-4", "truncate");
    primary.id = data.identifier + "-name";
    primary.innerText = data.nowPlaying.name;
    cardContent.appendChild(primary);

    var secondary = document.createElement("p");
    secondary.classList.add("grey-text", "text-darken-2", "truncate");
    secondary.id = data.identifier + "-artist";
    secondary.innerText = data.nowPlaying.artist;
    cardContent.appendChild(secondary);
}

function updateElement(data) {
    if (data.artwork) {
        var image = document.getElementById(data.identifier + "-artwork");
        image.src = data.artwork;
    }

    if (data.icon) {
        var icon = document.getElementById(data.identifier + "-icon");
        icon.innerText = data.icon;
    }

    if (data.nowPlaying && data.nowPlaying.name) {
        var primary = document.getElementById(data.identifier + "-name");
        primary.innerText = data.nowPlaying.name;
    }

    if (data.nowPlaying && data.nowPlaying.artist) {
        var secondary = document.getElementById(data.identifier + "-artist");
        secondary.innerText = data.nowPlaying.artist;
    }
}

function check() {
    var station = stations["theedge"];
    var date = new Date(nowPlaying.played_date + " " + nowPlaying.played_time);
    var nextUpdate = Math.round(date) + parseInt(nowPlaying.length_in_secs);
    console.log("Next update at " + new Date(nextUpdate).toLocaleString() + " - " + nextUpdate);
}

function populateStations() {
    getStations(function(data) {
        for (var index = 0; index < data.stations.length; index++) {
            var station = data.stations[index];
            if (!station.identifier) {
                continue;
            }

            var artwork = "images/unknown.png";
            if (station.assets && station.assets.carouselNowPlayingLogo) {
                artwork = station.assets.carouselNowPlayingLogo.substring(0, station.assets.carouselNowPlayingLogo.lastIndexOf("?"));
            }

            createElement({
                identifier: station.identifier,
                artwork: artwork,
                nowPlaying: {
                    artist: station.nowPlaying.artist,
                    name: station.nowPlaying.name,
                },
            });
        }
    }, function(error) {
        console.error(error);
        M.toast({html: "Error: " + error});
    });
}

function updateStations() {
    getStations(function(data) {
        for (var index = 0; index < data.stations.length; index++) {
            var station = data.stations[index];
            if (!station.identifier) {
                continue;
            }

            updateElement({
                identifier: station.identifier,
                nowPlaying: {
                    artist: station.nowPlaying.artist,
                    name: station.nowPlaying.name,
                },
            });
        }
    }, function(error) {
        console.error(error);
        M.toast({html: "Error: " + error});
    });
}

function getStations(success, error) {
    getRequest(endpoint + "stations", function(data) {
        success(JSON.parse(data));
    }, error);
}

function updateStation(identifier) {
    getStation(identifier, function(data) {
        //TODO Check stream size
        var streams = [];
        for (var index = 0; index < data.audioRenditions.length; index++) {
            var stream = data.audioRenditions[index];
            if (!stream.url || !stream.quality) {
                continue;
            }
            
            streams.push({
                url: stream.url.replace("http://", "https://"),
                quality: stream.quality
            });
        }

        stations[identifier] = {
            streams: streams,
            previouslyPlayed: data.previouslyPlayed
        };

        if (data.nowPlaying.length === 1) {
            var nowPlaying = data.nowPlaying[0];
            var artwork = "images/unknown.png";
            if (nowPlaying.artwork) {
                artwork = nowPlaying.artwork.substring(0, nowPlaying.artwork.lastIndexOf("?"));
            }

            console.log(artwork);
            updateElement({
                identifier: "now-playing",
                artwork: artwork,
                nowPlaying: {
                    name: nowPlaying.name,
                    artist: nowPlaying.artist,
                    position: new Date() - new Date(nowPlaying.played_date + " " + nowPlaying.played_time),
                    length: parseInt(nowPlaying.length_in_secs) * 1000,
                    status: nowPlaying.status
                }
            });
        } else {
            console.debug("Unexpected nowPlaying size for Station " + identifier);
            console.debug(data.nowPlaying);
        }

        console.log(data);

        play(identifier);
    }, function(error) {
        console.error(error);
        M.toast({html: "Error: " + error});
    });
}

function getStation(identifier, success, error) {
    getRequest(endpoint + "station/" + identifier + "/web", function(data) {
        success(JSON.parse(data));
    }, error);
}

function getRequest(url, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send();
    xhr.onreadystatechange = function(event) {
        if (xhr.readyState !== 4) {
            return;
        }

        if (xhr.status === 200) {
            success(xhr.responseText);
        } else {
            error("An error occurred");
        }
    };
}

initializeRadio();