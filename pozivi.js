let Pozivi = (function () {
    function dobaviZauzeca(callback) {
        $.get('http://localhost:8080/zauzeca', function (data) {
            callback(data);
        })
    }

    function upisiZauzece(jePeriodicna, danZ, semestarZ, datumZ, pocetakZ, krajZ, nazivZ, callbackSucc) {
        // Opcije ajax poziva
        let options = {
            type: "POST",
            url: "",
            data: null,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) { callbackSucc(data) },
            error: function (err) {
                alert(err.responseJSON.message)
            }
        }
        // Za periodicnu i vanrednu samo se razlikuje url, i data
        if(jePeriodicna) {
                options.url = "http://localhost:8080/rezervacija-periodicna";
                options.data = JSON.stringify({
                    dan: danZ,
                    semestar: semestarZ,
                    pocetak: pocetakZ,
                    kraj: krajZ,
                    naziv: nazivZ,
                    predavac: "Neko Nekic"
                })
            }
        else {
                options.url = "http://localhost:8080/rezervacija-vanredna";
                options.data = JSON.stringify({
                    datum: datumZ,
                    pocetak: pocetakZ,
                    kraj: krajZ,
                    naziv: nazivZ,
                    predavac: "Neko Nekic"
                })
            }
        $.ajax(options);
        }

        return {
            dobaviZauzeca: dobaviZauzeca,
            upisiZauzece: upisiZauzece
        }

    }) ();