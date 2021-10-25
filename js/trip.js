function CreateTripCard(vAPI, cardId, lineId, depId, depTrack, destId, destTrack) {

    var card = document.querySelector(cardId);
    card.classList.add("item");

    var wrap = document.createElement("div");
    wrap.classList.add("testimony-wrap");
    wrap.classList.add("py-4");
    card.appendChild(wrap);

    var loadingMsg = document.createElement("p");
    loadingMsg.classList.add("h2");
    loadingMsg.innerHTML = "Loading...";
    wrap.appendChild(loadingMsg);

    FindTrips(vAPI, lineId, depId, depTrack, destId, destTrack, trips => {
        wrap.removeChild(loadingMsg);

        if (trips.length === 0) {
            wrap.innerHTML = "Couldn't load any trip!";
        } else {

            var line = document.createElement("p");
            line.classList.add("h1");
            line.innerHTML = lineId;
            line.style.color = trips[0].fgColor;
            line.style.borderRadius = "0.25rem";
            line.style.background = trips[0].bgColor;
            wrap.appendChild(line);

            lines = [
                trips[0].departureStation + " (" + depTrack + ")",
                "to",
                trips[0].arrivalStation + " (" + destTrack + ")"
            ];
            lines.forEach(line => {
                var p = document.createElement("p");
                p.classList.add("name");
                p.style.color = "black";
                p.innerHTML = line;
                wrap.appendChild(p);
            });

            wrap.appendChild(document.createElement("br"));

            var table = CreateTable(trips);
            wrap.appendChild(table);
        }

    });

}


function FindTrips(vAPI, lineId, depId, depTrack, destId, destTrack, callback) {
    var now = new Date().toISOString();
    var dateNow = now.slice(0,10);
    var timeNow = now.slice(11,16);
    var timeSpan = 240;

    depData  = {date: dateNow, time: timeNow, id: depId,  timeSpan: timeSpan};
    destData = {date: dateNow, time: timeNow, id: destId, timeSpan: timeSpan + 60};

    vAPI.getDepartureBoard(depData, departures => {
        vAPI.getArrivalBoard(destData, arrivals => {

            var filteredDepartures = departures.filter(departure => departure.sname == lineId && departure.track === depTrack);
            var filteredArrivals   = arrivals.filter(arrival => arrival.sname == lineId && arrival.track == destTrack);

            var trips = new Array();
            filteredDepartures.forEach(departure => {
                const arrival = filteredArrivals.find(arrival => arrival.journeyNumber === departure.journeyNumber);
                const trip = {
                    sname: departure.sname,
                    bgColor: departure.bgColor,
                    fgColor: departure.fgColor,
                    departureTime: departure.time,
                    departureTimeRT: departure.rtTime,
                    departureStation: departure.stop.substr(0, departure.stop.indexOf(",")),
                    arrivalTime:    (arrival ? arrival.time : "unknown"),
                    arrivalTimeRT:  (arrival ? arrival.rtTime : "unknown"),
                    arrivalStation: (arrival ? arrival.stop.substr(0, arrival.stop.indexOf(",")) : "unknown")
                };
                trips.push(trip);

            });
            if (callback !== undefined) {
                callback(trips);
            }
        });
    });
}


function CreateCell(text, color) {
    var cell = document.createElement("td");
    cell.style.color = color;
    cell.appendChild(document.createTextNode(text));
    cell.classList.add("text-center");
    return cell;
}


function CreateRow(trip) {
    var row = document.createElement("tr");
    // Departure
    row.appendChild(
        CreateCell(
            trip.departureTimeRT ? trip.departureTimeRT : trip.departureTime,
            trip.departureTimeRT ? "red" : "black"
        ));
    // Arrow
    row.appendChild(
        CreateCell(
            "⇨",
            "black"
        ));
    // Arrival
    row.appendChild(
        CreateCell(
            trip.arrivalTimeRT ? trip.arrivalTimeRT : trip.arrivalTime,
            trip.arrivalTimeRT ? "red" : "black"
        ));
    return row;
}


function CreateTable(trips) {

    var table = document.createElement("table");

    var headers = ["Departure", "⇨", "Arrival"];
    var headerRow = document.createElement("tr");

    headers.forEach(headerText => {
        var header = document.createElement("th");
        var textNode = document.createTextNode(headerText);
        header.style.width = "50px";
        header.appendChild(textNode);
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);

    trips.forEach(trip => {
        table.appendChild(CreateRow(trip));
    });

    return table;
}
