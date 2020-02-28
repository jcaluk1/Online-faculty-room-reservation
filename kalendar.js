let Kalendar = (function () {
    // Atributi
    const godina = new Date().getFullYear();
    let nizRedovnih = [];
    let nizVanrednih = [];

    // Privatne metode
    function dajPrviDan(godina, mjesec) {
        return (new Date(godina, mjesec).getDay() + 6) % 7;
    }

    function dajBrojDana(godina, mjesec) {
        return new Date(godina, mjesec + 1, 0).getDate();
    }

    function datumOk(datum) {
        const regex = RegExp('^([0-3][0-9])\.([0-1][0-9])\.([0-9]{4})$')
        if (regex.test(datum)) {
            const d = datum.split('.');
            return (Date.parse(`${d[2]}-${d[1]}-${d[0]}`)) ? true : false;
        }
        return false;
    }

    function formirajDatum (dan, mjesec, godina) {
        mjesec++;
        return '' + ((dan < 10) ? '0' + dan : dan) + '.' + ((mjesec < 10) ? '0' + mjesec : mjesec) + '.' + godina;
    }

    function vrijemeOk(vrijeme) {
        const regex = RegExp('^([0-1][0-9]|2[0-3]):[0-5][0-9]$');
        return regex.test(vrijeme);
    }

    // Javne metode
    function ucitajPodatke(periodicna, vanredna) {
        nizRedovnih = Array.from(periodicna);
        nizVanrednih = Array.from(vanredna);
    }

    function iscrtajKalendar(kalendarRef, mjesec) {
        // Postavljanje imena mjeseca
        const imena_mjeseci = ["Januar", "Februar", "Mart", "April", "Maj", "Juni", "Juli", "August", "Septembar", "Oktobar", "Novembar", "Decembar"];
        kalendarRef.querySelector('#imeMjeseca').innerText = imena_mjeseci[mjesec];

        const prviDan = dajPrviDan(godina, mjesec);
        const brojDana = dajBrojDana(godina, mjesec);
        
        // Niz celija kalendara
        const dani = Array.from(kalendarRef.querySelectorAll('td'));

        // Ukloni sve klase na celijama
        dani.forEach(celija => celija.classList = '');

        // Crtanje kalendara, sakrivanje celija
        dani.forEach((celija, indeks) => {
            if (indeks < prviDan || indeks > prviDan + brojDana - 1)
                celija.classList.add('izbaci');
            else
                celija.innerText = indeks - prviDan + 1;
        });
    };

    function obojiZauzeca(kalendarRef, mjesec, sala, pocetak, kraj) {
        if (kalendarRef != null && mjesec >= 0 && mjesec <= 11 && sala != '' && vrijemeOk(pocetak) && vrijemeOk(kraj)) {
            // Niz celija kalendara
            const dani = Array.from(kalendarRef.querySelectorAll('td'));
            
            // Ukloni stara zauzeca
            dani.forEach(dan => dan.classList.remove('zauzeto','zauzetoVanredno'));

            const zimskiMjeseci = [0, 9, 10, 11];
            const ljetniMjeseci = [1, 2, 3, 4, 5];
            
            // Oboji redovna zauzeca
            nizRedovnih.forEach(redovno => {
                if (vrijemeOk(redovno.pocetak) && vrijemeOk(redovno.kraj) && redovno.naziv === sala &&
                    redovno.pocetak >= pocetak && redovno.kraj <= kraj &&
                    (redovno.semestar === 'zimski' && zimskiMjeseci.indexOf(mjesec) != -1 ||
                        redovno.semestar === 'ljetni' && ljetniMjeseci.indexOf(mjesec) != -1)) {
                    // Bojenje redovnih, dodavanje klase zauzeto
                    dani.filter((dan, i) => !dan.classList.contains('izbaci') && i % 7 === redovno.dan)
                        .forEach(dan => dan.classList.add('zauzeto'));
                }
            });
            
            // Oboji vanredno
            nizVanrednih.forEach(vanredno => {
                // mjesec pocinje od 0, a vanrednoMjesec od 1, zato vanrednoMjesec--
                let [vanrednoDan, vanrednoMjesec] = vanredno.datum.split('.').map(string => parseInt(string));
                vanrednoMjesec--;
                if (datumOk(vanredno.datum) && vanrednoMjesec === mjesec && vrijemeOk(vanredno.pocetak) && vrijemeOk(vanredno.kraj) &&
                    vanredno.naziv === sala && vanredno.pocetak >= pocetak && vanredno.kraj <= kraj) {
                    const indeks = dajPrviDan(godina, mjesec) - 1 + vanrednoDan;
                    dani[indeks].classList.add('zauzetoVanredno');
                }

            })
        }
    }
    return {
        ucitajPodatke: ucitajPodatke,
        iscrtajKalendar: iscrtajKalendar,
        obojiZauzeca: obojiZauzeca,
        datumOk: datumOk,
        vrijemeOk: vrijemeOk,
        dajPrviDan: dajPrviDan,
        formirajDatum: formirajDatum,
    }
})();

