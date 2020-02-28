(function main() {

    // Globalne varijable
    let mjesec = 0;
    let sala = $('#sala').val();
    let pocetak = "";
    let kraj = "";
    let jePeriodicna = false;

    let div = document.getElementById('kalendar');

    let $btnSljedeci = $('#desni');
    let $btnPrethodni = $('#lijevi');
    $btnPrethodni.prop('disabled', true);

    // Pomocne funkcije
    function ucitavanjeCrtanje(zauzeca) {
        Kalendar.ucitajPodatke(zauzeca.periodicna, zauzeca.vanredna);
        Kalendar.iscrtajKalendar(div, mjesec);
    }

    function ucitavanjeBojenje(zauzeca) {
        Kalendar.ucitajPodatke(zauzeca.periodicna, zauzeca.vanredna);
        Kalendar.obojiZauzeca(div, mjesec, sala, pocetak, kraj);
    }

    Pozivi.dobaviZauzeca(ucitavanjeCrtanje);

    // Listeneri
    $('td').click(function (e) {
        // Da li su popunjena sva polja
        if (div != null && mjesec >= 0 && mjesec <= 11 && sala != '' && Kalendar.vrijemeOk(pocetak) && Kalendar.vrijemeOk(kraj)) {
            let celija = e.target;
            let klase = celija.classList;
            if (celija.classList.length === 0) {
                // Termin nije rezervisan, moguce ga je rezervisati

                // Periodicno zauzece van semestara nije dopusteno
                let semestar = ([0, 9, 10, 11].indexOf(mjesec) != -1) ? 'zimski' : '';
                if (semestar === '')
                    semestar = ([1, 2, 3, 4, 5].indexOf(mjesec) != -1) ? 'ljetni' : '';
                if (jePeriodicna && semestar === '') {
                    alert('Periodicno zauzece van zimskog i ljetnog semestra nije dopušteno');
                    return;
                }

                let dan = parseInt(celija.innerText);
                let godina = new Date().getFullYear();
                let danUSedmici = (new Date(godina, mjesec, dan).getDay() + 6) % 7;
                let datum = Kalendar.formirajDatum(dan, mjesec, godina);

                let daniPoruka = ['ponedjeljak', 'utorak', 'srijedu', 'cetvrtak', 'petak', 'subotu', 'nedjelju'];
                let poruka = jePeriodicna
                    ? `Da li želite izvrišiti rezervaciju sale ${sala} za ${danUSedmici == 2 || danUSedmici >= 5 ? "svaku" : "svaki"} ${daniPoruka[danUSedmici]} za ${semestar} semestar?`
                    : `Da li želite izvrišiti rezervaciju sale ${sala}, na datum ${datum}?`;

                let ok = confirm(poruka);
                if (ok == true) {
                    Pozivi.upisiZauzece(jePeriodicna, danUSedmici, semestar, datum, pocetak, kraj, sala, ucitavanjeBojenje);
                }
            }

            else {
                alert('Sala je vec rezervisana za navedeni termin!');
            }
        }

        else {
            alert('Nisu popunjeni svi podaci!');
        }


    });

    $btnSljedeci.click(function (e) {
        $btnPrethodni.prop('disabled', false);
        mjesec++;
        if (mjesec === 11)
            $btnSljedeci.prop('disabled', true);
        Kalendar.iscrtajKalendar(div, mjesec);
        Kalendar.obojiZauzeca(div, mjesec, sala, pocetak, kraj);
    });


    $btnPrethodni.click(function (e) {
        $btnSljedeci.prop('disabled', false);
        mjesec--;
        if (mjesec === 0)
            $btnPrethodni.prop('disabled', true);
        Kalendar.iscrtajKalendar(div, mjesec);
        Kalendar.obojiZauzeca(div, mjesec, sala, pocetak, kraj);
    });

    $('#sala').on('change', function (e) {
        sala = $(this).val();
        Kalendar.obojiZauzeca(div, mjesec, sala, pocetak, kraj);
    });

    $('#pocetak').on('change', function (e) {
        pocetak = $(this).val();
        Kalendar.obojiZauzeca(div, mjesec, sala, pocetak, kraj);
    });

    $('#kraj').on('change', function (e) {
        kraj = $(this).val();
        Kalendar.obojiZauzeca(div, mjesec, sala, pocetak, kraj);
    });

    $('#check').click(function (e) {
        jePeriodicna = !jePeriodicna;
    })
})();