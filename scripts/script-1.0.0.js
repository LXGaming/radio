var radio;
var stationCount = 0;
var tableSort;

function onLoad() {
    getNZRadioStations("https://lxgaming.github.io/radio/stations.json");
}

function updateRadioStationTable(data) {
    var table = document.getElementById("radioTable");
    clearRows(table);
    var jsonObject = JSON.parse(data);
    radio = jsonObject["radio"];
    for (var key in radio) {
        createRow(table, table.rows.length, key, radio[key].name, radio[key].website, radio[key].stations);
    }
    if (tableSort == null) {
        tableSort = new Tablesort(table);
    }
    tableSort.refresh();
    document.getElementById("radioTotal").innerHTML = "<span style='color:deepskyblue'>" + stationCount + "</span> Radio stations.";
    document.getElementById("radioStatus").innerHTML = "Paused";
}

function getNZRadioStations(url) {
    var request = new XMLHttpRequest();
    request.overrideMimeType("application/json");
    request.open("GET", url, true);
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == "200") {
            updateRadioStationTable(request.responseText);
        }
    }
    request.send(null);
}

function createRow(table, index, id, name, website, stations) {
    var row = table.insertRow(index);
    var radioName = row.insertCell(0);
    var radioStation = row.insertCell(1);
    var radioMedia = row.insertCell(2);

    radioName.innerHTML = "<p style='color:white;padding:10px;'><a href='" + website + "' style='color:deepskyblue;text-decoration:none;'>" + name + "</a></p>";

    var options = "";
    for (var station in stations) {
        var name = "";
        options += "<option location='" + stations[station].location + "' bitrate='" + stations[station].bitrate + "'>%name%</option>";
        if (stations[station].location != "null") {
            name += stations[station].location + " - ";
        } 
        if (stations[station].bitrate != null) {
            name += stations[station].bitrate + "kbps";
        }
        options = options.replace("%name%", name);
        stationCount += 1;
        if (radioMedia.innerHTML == "") {
            radioMedia.innerHTML = "<audio controls preload='none' class='media" + id + "' onPlay='onPlay(" + id + ")' onPause='onPause(" + id + ")' style='width:100%;' src='" + stations[station].source + "' type='" + stations[station].type + "'></audio>";
        }
    }

    radioStation.innerHTML = "<select class='station" + id + "' onChange='onChange(" + id + ")'>" + options + "</select>";
    radioMedia.setAttribute("data-sort", index);
}

function clearRows(table) {
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
}

function onChange(id) {
    pauseAll(id);
    onPause(id);
    document.getElementsByClassName("media" + id)[0].play();
}

function onPlay(id) {
    pauseAll(id);
    setTimeout(function() {
        if (!document.getElementsByClassName("media" + id)[0].paused) {
            document.getElementById("radioStatus").innerHTML = "Now playing - <span style='color:deepskyblue'>" + radio[id].name + "</span>";
        }
    }, 1000);
}

function onPause(id) {
    var audio = document.getElementsByClassName("media" + id)[0];
    var media = audio.parentElement;
    var station = getStation(id, getSelectedStationLocation(id), getSelectedStationBitrate(id))
    audio.src = "";
    audio.load();
    audio.remove();
    media.innerHTML = "<audio controls preload='none' class='media" + id + "' onPlay='onPlay(" + id + ")' onPause='onPause(" + id + ")' style='width:100%;' src='" + station.source + "' type='" + station.type + "'></audio>";
    document.getElementById("radioStatus").innerHTML = "Paused";
}

function pauseAll(id) {
    for (var key in radio) {
        if (key != id) {
            document.getElementsByClassName("media" + key)[0].pause();
        }
    }
}

function getStation(id, location, bitrate) {
    var stations = radio[id].stations;
    for (station in stations) {
        if (stations[station].location == location && stations[station].bitrate == bitrate.replace("kbps", "")) {
            return stations[station];
        }
    }
    return "null";
}

function getSelectedStationLocation(id) {
    var station = document.getElementsByClassName("station" + id)[0].value;
    if (station.includes(" - ")) {
        return station.split(" - ")[0];
    } else {
        return "null";
    }
}

function getSelectedStationBitrate(id) {
    var station = document.getElementsByClassName("station" + id)[0].value;
    if (station.includes(" - ")) {
        return station.split(" - ")[1];
    } else {
        return station;
    }
}