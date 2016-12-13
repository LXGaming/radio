var stations;
var stationCount;
var tableSort;

function onLoad() {
    getNZRadioStations("https://lxgaming.github.io/radio/stations.json");
}

function updateRadioStationTable(data) {
    var table = document.getElementById("radioTable");
    clearRows(table);
    var jsonObject = JSON.parse(data);
    stations = jsonObject["stations"];
    stationCount = 0;
    for (var key in stations) {
        createRow(table, table.rows.length, key, stations[key].name, stations[key].url, stations[key].website, stations[key].bitrate, stations[key].source, stations[key].type);
        stationCount += 1;
    }
    if (tableSort == null) {
        tableSort = new Tablesort(table);
    }
    tableSort.refresh();
    document.getElementById("stationTotal").innerHTML = "<span style='color:deepskyblue'>" + stationCount + "</span> Radio stations.";
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

function createRow(table, index, id, name, url, website, bitrate, source, type) {
    var row = table.insertRow(index);
    var stationName = row.insertCell(0);
    var stationWebsite = row.insertCell(1);
    var stationBitrate = row.insertCell(2);
    var stationMedia = row.insertCell(3);

    stationName.innerHTML = "<p style='color:white;padding:10px;'>" + name + "</p>";
    stationWebsite.innerHTML = "<p style='color:white;padding:10px;'><a href='" + url + "' style='color:deepskyblue;text-decoration:none;'>" + website + "</a></p>";
    stationBitrate.innerHTML = "<p style='color:white;padding:10px;'>" + bitrate + "</p>";
    stationMedia.innerHTML = "<audio controls preload='none' class='" + id + "' onPlay='playAudio(" + id + ")' onPause='pauseAudio(" + id + ")' style='width:100%;' src='" + source + "' type='" + type + "'></audio>";
    stationMedia.setAttribute("data-sort", index);
}

function clearRows(table) {
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
}

function playAudio(id) {
    for (var key in stations) {
        if (key != id) {
            document.getElementsByClassName(key)[0].pause();
        }
    }
    setTimeout(function() {
        if (!document.getElementsByClassName(id)[0].paused) {
            document.getElementById("stationStatus").innerHTML = "Now playing - <span style='color:deepskyblue'>" + stations[id].name + "</span>";
        }
    }, 1000);
}

function pauseAudio(id) {
    var radio = document.getElementsByClassName(id)[0];
    var stationMedia = radio.parentElement;
    radio.src = "";
    radio.load();
    radio.remove();
    stationMedia.innerHTML = "<audio controls preload='none' class='" + id + "' onPlay='playAudio(" + id + ")' onPause='pauseAudio(" + id + ")' style='width:100%;' src='" + stations[id].source + "' type='" + stations[id].type + "'></audio>";
    document.getElementById("stationStatus").innerHTML = "Paused";
}