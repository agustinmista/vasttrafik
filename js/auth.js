function Auth(){

    var vasttrafikURL = "https://api.vasttrafik.se/token";

    // key:secret encoded base64 string
    var token = "dGtXRm1oQ3I0TVFaTGt6aXF3RF9Nc3NlcGNZYTp4c2Q4aDZ3c0tvRWRYT3dwWjdRNUVjSHp1N29h";

    this.getAccessToken = function(callback) {
        var requestData = {
            grant_type: "client_credentials",
            scope: "device_0001",
            format: "json",
        };

        $.ajax({
            type: "POST",
            url: vasttrafikURL,
            beforeSend: function(xhr) { xhr.setRequestHeader("Authorization", "Basic " + token); },
            data: requestData,
            dataType: "json",
            asyc: true,
            success: function(result) { if (callback !== undefined) { callback(result); } },
            error: function(xhr, ajaxOptions, thrownError) { alert(xhr.status + " " + thrownError); }
        });
    };
}
