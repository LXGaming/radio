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
    //request.send(null);
    updateRadioStationTable('{"radio":[{"name":"RadioDunedin","website":"http://www.radiodunedin.co.nz/","stations":[{"location":"null","bitrate":96,"source":"http://icecast.mediaworks.co.nz:8000/Dunedin_96kbps","type":"audio/mpeg"}]},{"name":"TheEdge","website":"http://www.theedge.co.nz/","stations":[{"location":"null","bitrate":32,"source":"http://icecast.mediaworks.co.nz:8000/TheEdge_32kbps","type":"audio/mpeg"},{"location":"null","bitrate":96,"source":"http://icecast.mediaworks.co.nz:8000/theedge","type":"audio/mpeg"},{"location":"null","bitrate":128,"source":"http://icecast.mediaworks.co.nz:8000/theedge_128kbps","type":"audio/mpeg"}]},{"name":"TheRock","website":"http://www.therock.net.nz/","stations":[{"location":"null","bitrate":32,"source":"http://icecast.mediaworks.co.nz:8000/TheRock_32kbps","type":"audio/mpeg"},{"location":"null","bitrate":64,"source":"http://icecast.mediaworks.co.nz:8000/therock","type":"audio/mpeg"},{"location":"null","bitrate":96,"source":"http://icecast.mediaworks.co.nz:8000/therock_96kbps","type":"audio/mpeg"},{"location":"null","bitrate":128,"source":"http://icecast.mediaworks.co.nz:8000/therock_128kbps","type":"audio/mpeg"}]},{"name":"TheSound","website":"http://www.thesound.co.nz/","stations":[{"location":"null","bitrate":32,"source":"http://icecast.mediaworks.co.nz:8000/TheSound_32kbps","type":"audio/mpeg"},{"location":"null","bitrate":64,"source":"http://icecast.mediaworks.co.nz:8000/thesound","type":"audio/mpeg"},{"location":"null","bitrate":128,"source":"http://icecast.mediaworks.co.nz:8000/TheSound_128kbps","type":"audio/mpeg"}]},{"name":"TheBreeze","website":"http://www.thebreeze.co.nz/","stations":[{"location":"Auckland","bitrate":32,"source":"http://icecast.mediaworks.co.nz:8000/thebreezeakl_32kbps","type":"audio/mpeg"},{"location":"Auckland","bitrate":64,"source":"http://icecast.mediaworks.co.nz:8000/thebreezeakl","type":"audio/mpeg"},{"location":"Nelson","bitrate":64,"source":"http://icecast.mediaworks.co.nz:8000/breezenelson","type":"audio/mpeg"},{"location":"Christchurch","bitrate":96,"source":"http://icecast.mediaworks.co.nz:8000/breezechc","type":"audio/mpeg"},{"location":"Hamilton","bitrate":96,"source":"http://icecast.mediaworks.co.nz:8000/thebreezeham","type":"audio/mpeg"},{"location":"Manawatu","bitrate":96,"source":"http://icecast.mediaworks.co.nz:8000/breezemtu","type":"audio/mpeg"},{"location":"Wellington","bitrate":96,"source":"http://icecast.mediaworks.co.nz:8000/thebreezewgtn","type":"audio/mpeg"},{"location":"Auckland","bitrate":128,"source":"http://icecast.mediaworks.co.nz:8000/thebreezeakl_128kbps","type":"audio/mpeg"}]},{"name":"GeorgeFM","website":"http://www.georgefm.co.nz/","stations":[{"location":"null","bitrate":32,"source":"http://icecast.mediaworks.co.nz:8000/georgefm_32kbps","type":"audio/mpeg"},{"location":"null","bitrate":64,"source":"http://icecast.mediaworks.co.nz:8000/georgefm","type":"audio/mpeg"},{"location":"null","bitrate":128,"source":"http://icecast.mediaworks.co.nz:8000/georgefm_128kbps","type":"audio/mpeg"}]},{"name":"Magic","website":"http://www.magic.co.nz/","stations":[{"location":"Auckland","bitrate":32,"source":"http://icecast.mediaworks.co.nz:8000/magicakl_32kbps","type":"audio/mpeg"},{"location":"Christchurch","bitrate":32,"source":"http://icecast.mediaworks.co.nz:8000/magicchch_32kbps","type":"audio/mpeg"},{"location":"Wellington","bitrate":32,"source":"http://icecast.mediaworks.co.nz:8000/magicwgtn_32kbps","type":"audio/mpeg"},{"location":"Christchurch","bitrate":64,"source":"http://icecast.mediaworks.co.nz:8000/magic_christchurch","type":"audio/mpeg"},{"location":"Wellington","bitrate":64,"source":"http://icecast.mediaworks.co.nz:8000/magic_wellington","type":"audio/mpeg"},{"location":"Auckland","bitrate":96,"source":"http://icecast.mediaworks.co.nz:8000/magic_auckland","type":"audio/mpeg"}]},{"name":"MaiFM","website":"http://www.maifm.co.nz/","stations":[{"location":"null","bitrate":32,"source":"http://icecast.mediaworks.co.nz:8000/maifm_32kbps","type":"audio/mpeg"},{"location":"null","bitrate":64,"source":"http://icecast.mediaworks.co.nz:8000/maifm","type":"audio/mpeg"},{"location":"null","bitrate":128,"source":"http://icecast.mediaworks.co.nz:8000/maifm_128kbps","type":"audio/mpeg"}]},{"name":"MoreFM","website":"http://www.morefm.co.nz/","stations":[{"location":"Christchurch","bitrate":32,"source":"http://icecast.mediaworks.co.nz:8000/morefmchc_32kbps","type":"audio/mpeg"},{"location":"Wellington","bitrate":32,"source":"http://icecast.mediaworks.co.nz:8000/morefmwgtn_32kbps","type":"audio/mpeg"},{"location":"Blenheim","bitrate":64,"source":"http://icecast.mediaworks.co.nz:8000/morefmblm","type":"audio/mpeg"},{"location":"Gisborne","bitrate":64,"source":"http://icecast.mediaworks.co.nz:8000/morefmgis","type":"audio/mpeg"},{"location":"Orewa","bitrate":64,"source":"http://icecast.mediaworks.co.nz:8000/morefmorewa_64kbps","type":"audio/mpeg"},{"location":"Taupo","bitrate":64,"source":"http://icecast.mediaworks.co.nz:8000/morefmtaupo","type":"audio/mpeg"},{"location":"Auckland","bitrate":96,"source":"http://icecast.mediaworks.co.nz:8000/morefmakl","type":"audio/mpeg"},{"location":"Christchurch","bitrate":96,"source":"http://icecast.mediaworks.co.nz:8000/morefmchc","type":"audio/mpeg"},{"location":"Dunedin","bitrate":96,"source":"http://icecast.mediaworks.co.nz:8000/morefmdun","type":"audio/mpeg"},{"location":"Hamilton","bitrate":96,"source":"http://icecast.mediaworks.co.nz:8000/morefmham","type":"audio/mpeg"},{"location":"Hastings","bitrate":96,"source":"http://icecast.mediaworks.co.nz:8000/morefmhast","type":"audio/mpeg"},{"location":"Masterton","bitrate":96,"source":"http://icecast.mediaworks.co.nz:8000/morefmmast","type":"audio/mpeg"},{"location":"Manawatu","bitrate":96,"source":"http://icecast.mediaworks.co.nz:8000/morefmmtu","type":"audio/mpeg"},{"location":"Nelson","bitrate":96,"source":"http://icecast.mediaworks.co.nz:8000/morefmnel","type":"audio/mpeg"},{"location":"Southland","bitrate":96,"source":"http://icecast.mediaworks.co.nz:8000/morefmsouthland","type":"audio/mpeg"},{"location":"Tauranga","bitrate":96,"source":"http://icecast.mediaworks.co.nz:8000/morefmtga","type":"audio/mpeg"},{"location":"Taranaki","bitrate":96,"source":"http://icecast.mediaworks.co.nz:8000/morefmtkn","type":"audio/mpeg"},{"location":"Whangarei","bitrate":96,"source":"http://icecast.mediaworks.co.nz:8000/morefmwga","type":"audio/mpeg"},{"location":"Wellington","bitrate":96,"source":"http://icecast.mediaworks.co.nz:8000/morefmwgtn","type":"audio/mpeg"},{"location":"Auckland","bitrate":128,"source":"http://icecast.mediaworks.co.nz:8000/morefmakl_128kbps","type":"audio/mpeg"}]},{"name":"RadioLive","website":"http://www.radiolive.co.nz/","stations":[{"location":"null","bitrate":32,"source":"http://icecast.mediaworks.co.nz:8000/radiolive_32kbps","type":"audio/mpeg"},{"location":"null","bitrate":96,"source":"http://icecast.mediaworks.co.nz:8000/radiolive","type":"audio/mpeg"}]},{"name":"TimesFM","website":"http://www.timesfm.co.tz","stations":[{"location":"Orewa","bitrate":96,"source":"http://icecast.mediaworks.co.nz:8000/timesfmorewa","type":"audio/mpeg"}]}]}');
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