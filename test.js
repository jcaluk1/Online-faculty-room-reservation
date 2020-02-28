let assert = chai.assert;

beforeEach(function () {
    document.getElementById("kalendar").innerHTML = "";
});

describe('Kalendar', function () {
    describe('obojiZauzece()', function () {
        it('ne treba obojiti nijedan dan ako podaci nisu ucitani', function () {
            Kalendar.iscrtajKalendar(document.getElementById("kalendar"), 10);
            Kalendar.obojiZauzeca(document.getElementById("kalendar"), 10, "0-01", "9:00", "10:00");

            let obojeniDaniRedovno = document.getElementsByClassName("zauzeto");
            let obojeniDaniVanredno = document.getElementsByClassName("zauzetoVanredno");

            assert.equal(obojeniDaniRedovno.length + obojeniDaniVanredno.length, 0, "Duzina niza treba biti 0.");
        });

        it('treba obojiti duple vrijednosti', function () {
            const testRedovnih = [
                {
                    dan: 0,
                    semestar: "zimski",
                    pocetak: "12:00",
                    kraj: "13:00",
                    naziv: "0-01",
                    predavac: "V. Ljubovic"
                },
                {
                    dan: 0,
                    semestar: "zimski",
                    pocetak: "10:00",
                    kraj: "14:00",
                    naziv: "0-01",
                    predavac: "V. Ljubovic"
                }
            ];

            const testVanrednih = [];

            Kalendar.ucitajPodatke(testRedovnih, testVanrednih);
            Kalendar.iscrtajKalendar(document.getElementById("kalendar"), 10);
            Kalendar.obojiZauzeca(document.getElementById("kalendar"), 10, "0-01", "08:00", "23:00");
            let obojeniDaniRedovno = document.getElementsByClassName("zauzeto");
            let obojeniDaniVanredno = document.getElementsByClassName("zauzetoVanredno");

            assert.equal(obojeniDaniRedovno.length + obojeniDaniVanredno.length, 5, "Treba biti 5 obojenih dana/celija.");
        });

        it('ako je zauzece u ljetnom semestru, ne treba ga prikazati u zimskim mjesecima, npr. u novembru', function () {
            const testRedovnih = [
                {
                    dan: 0,
                    semestar: "ljetni",
                    pocetak: "12:00",
                    kraj: "13:00",
                    naziv: "0-01",
                    predavac: "V. Ljubovic"
                }
            ];

            const testVanrednih = [];

            Kalendar.ucitajPodatke(testRedovnih, testVanrednih);
            Kalendar.iscrtajKalendar(document.getElementById("kalendar"), 10);
            Kalendar.obojiZauzeca(document.getElementById("kalendar"), 10, "0-01", "08:00", "23:00");
            let obojeniDaniRedovno = document.getElementsByClassName("zauzeto");
            let obojeniDaniVanredno = document.getElementsByClassName("zauzetoVanredno");

            assert.equal(obojeniDaniRedovno.length + obojeniDaniVanredno.length, 0, "Dani ne trebaju biti obojeni.");
        });

        it('ako je zauzece u drugom mjesecu, ne treba ga prikazati u zadanom', function () {
            const testRedovnih = [];

            const testVanrednih = [
                {
                    datum: "13.05.2019",
                    pocetak: "09:00",
                    kraj: "11:00",
                    naziv: "0-01",
                    predavac: "B. Mesihovic"
                }
            ];

            Kalendar.ucitajPodatke(testRedovnih, testVanrednih);
            Kalendar.iscrtajKalendar(document.getElementById("kalendar"), 10);
            Kalendar.obojiZauzeca(document.getElementById("kalendar"), 10, "0-01", "08:00", "23:00");
            let obojeniDaniRedovno = document.getElementsByClassName("zauzeto");
            let obojeniDaniVanredno = document.getElementsByClassName("zauzetoVanredno");

            assert.equal(obojeniDaniRedovno.length + obojeniDaniVanredno.length, 0, "Dani ne trebaju biti obojeni.");
        });

        it('treba obojiti sve dane ako su svi termini zauzeti', function () {
            const testRedovnih = [
                {
                    dan: 0,
                    semestar: "ljetni",
                    pocetak: "12:00",
                    kraj: "13:00",
                    naziv: "0-01",
                    predavac: "V. Ljubovic"
                },
                {
                    dan: 1,
                    semestar: "ljetni",
                    pocetak: "12:00",
                    kraj: "13:00",
                    naziv: "0-01",
                    predavac: "V. Ljubovic"
                },
                {
                    dan: 2,
                    semestar: "ljetni",
                    pocetak: "12:00",
                    kraj: "13:00",
                    naziv: "0-01",
                    predavac: "V. Ljubovic"
                },
                {
                    dan: 3,
                    semestar: "ljetni",
                    pocetak: "12:00",
                    kraj: "13:00",
                    naziv: "0-01",
                    predavac: "V. Ljubovic"
                },
                {
                    dan: 4,
                    semestar: "ljetni",
                    pocetak: "12:00",
                    kraj: "13:00",
                    naziv: "0-01",
                    predavac: "V. Ljubovic"
                },
                {
                    dan: 5,
                    semestar: "ljetni",
                    pocetak: "12:00",
                    kraj: "13:00",
                    naziv: "0-01",
                    predavac: "V. Ljubovic"
                },
                {
                    dan: 6,
                    semestar: "ljetni",
                    pocetak: "12:00",
                    kraj: "13:00",
                    naziv: "0-01",
                    predavac: "V. Ljubovic"
                }
            ];

            const testVanrednih = [];

            Kalendar.ucitajPodatke(testRedovnih, testVanrednih);
            Kalendar.iscrtajKalendar(document.getElementById("kalendar"), 3);
            Kalendar.obojiZauzeca(document.getElementById("kalendar"), 3, "0-01", "08:00", "23:00");
            let obojeniDaniRedovno = document.getElementsByClassName("zauzeto");
            let obojeniDaniVanredno = document.getElementsByClassName("zauzetoVanredno");

            assert.equal(obojeniDaniRedovno.length + obojeniDaniVanredno.length, 30, "Sve celije trebaju biti obojene.");
        });

        it('broj obojenih dana treba biti nepromijenjen nakon drugog poziva funkcije', function () {
            const testRedovnih = [
                {
                    dan: 2,
                    semestar: "ljetni",
                    pocetak: "12:00",
                    kraj: "13:00",
                    naziv: "0-01",
                    predavac: "V. Ljubovic"
                }
            ];

            const testVanrednih = [];

            Kalendar.ucitajPodatke(testRedovnih, testVanrednih);
            Kalendar.iscrtajKalendar(document.getElementById("kalendar"), 3);
            Kalendar.obojiZauzeca(document.getElementById("kalendar"), 3, "0-01", "08:00", "23:00");
            const obojeniDaniRedovno = document.getElementsByClassName("zauzeto");
            const obojeniDaniVanredno = document.getElementsByClassName("zauzetoVanredno");
            const ukupnoObojenihPrviPut = obojeniDaniRedovno.length + obojeniDaniVanredno.length;

            Kalendar.obojiZauzeca(document.getElementById("kalendar"), 3, "0-01", "08:00", "23:00");
            const obojeniDaniRedovnoDrugi = document.getElementsByClassName("zauzeto");
            const obojeniDaniVanrednoDrugi = document.getElementsByClassName("zauzetoVanredno");
            const ukupnoObojenihDrugiPut = obojeniDaniRedovnoDrugi.length + obojeniDaniVanrednoDrugi.length;

            assert.equal(ukupnoObojenihPrviPut, ukupnoObojenihDrugiPut, "Broj obojenih dana treba biti nepromijenjen.");
        });

        it('trebaju se promijeniti obojeni dani nakon promjene podataka', function () {
            let testRedovnih = [];

            let testVanrednih = [
                {
                    datum: "13.05.2019",
                    pocetak: "09:00",
                    kraj: "11:00",
                    naziv: "0-01",
                    predavac: "B. Mesihovic"
                }
            ];

            Kalendar.ucitajPodatke(testRedovnih, testVanrednih);
            Kalendar.iscrtajKalendar(document.getElementById("kalendar"), 4);
            Kalendar.obojiZauzeca(document.getElementById("kalendar"), 4, "0-01", "08:00", "23:00");
            const obojeniDaniRedovno = document.getElementsByClassName("zauzeto");
            const obojeniDaniVanredno = document.getElementsByClassName("zauzetoVanredno");
            const ukupnoObojenihPrviPut = obojeniDaniRedovno.length + obojeniDaniVanredno.length;
            assert.equal(ukupnoObojenihPrviPut, 1, "Prvi podaci boje samo jednu celiju.");

            testRedovnih = [];
            testVanrednih = [
                {
                    datum: "14.05.2019",
                    pocetak: "09:00",
                    kraj: "11:00",
                    naziv: "0-01",
                    predavac: "B. Mesihovic"
                },
                {
                    datum: "15.05.2019",
                    pocetak: "09:00",
                    kraj: "11:00",
                    naziv: "0-01",
                    predavac: "B. Mesihovic"
                },
                {
                    datum: "13.05.2019",
                    pocetak: "09:00",
                    kraj: "11:00",
                    naziv: "0-01",
                    predavac: "B. Mesihovic"
                }
            ];

            Kalendar.ucitajPodatke(testRedovnih, testVanrednih);
            Kalendar.iscrtajKalendar(document.getElementById("kalendar"), 4);
            Kalendar.obojiZauzeca(document.getElementById("kalendar"), 4, "0-01", "08:00", "23:00");
            Kalendar.obojiZauzeca(document.getElementById("kalendar"), 4, "0-01", "08:00", "23:00");
            const obojeniDaniRedovnoDrugi = document.getElementsByClassName("zauzeto");
            const obojeniDaniVanrednoDrugi = document.getElementsByClassName("zauzetoVanredno");
            const ukupnoObojenihDrugiPut = obojeniDaniRedovnoDrugi.length + obojeniDaniVanrednoDrugi.length;

            assert.equal(ukupnoObojenihDrugiPut, 3, "Drugi podaci boje tri celije.");

            assert.notEqual(ukupnoObojenihPrviPut, ukupnoObojenihDrugiPut, "Broj obojenih celija treba biti razlicit.");
        });

        it('dva vanredna termina u istom danu boje samo jednu celiju', function () {
            let testRedovnih = [];

            let testVanrednih = [
                {
                    datum: "13.05.2019",
                    pocetak: "09:00",
                    kraj: "11:00",
                    naziv: "0-01",
                    predavac: "B. Mesihovic"
                },
                {
                    datum: "13.05.2019",
                    pocetak: "11:30",
                    kraj: "12:30",
                    naziv: "0-01",
                    predavac: "B. Mesihovic"
                }
            ];

            Kalendar.ucitajPodatke(testRedovnih, testVanrednih);
            Kalendar.iscrtajKalendar(document.getElementById("kalendar"), 4);
            Kalendar.obojiZauzeca(document.getElementById("kalendar"), 4, "0-01", "08:00", "23:00");
            const obojeniDaniRedovno = document.getElementsByClassName("zauzeto");
            const obojeniDaniVanredno = document.getElementsByClassName("zauzetoVanredno");
            const ukupnoObojenih = obojeniDaniRedovno.length + obojeniDaniVanredno.length;
            assert.equal(ukupnoObojenih, 1, "Treba biti obojena samo jedna celija.");
        });

        it('treba obojiti zadnji dan u mjesecu', function () {
            let testRedovnih = [];

            let testVanrednih = [
                {
                    datum: "31.01.2019",
                    pocetak: "09:00",
                    kraj: "11:00",
                    naziv: "0-01",
                    predavac: "B. Mesihovic"
                }
            ];

            Kalendar.ucitajPodatke(testRedovnih, testVanrednih);
            Kalendar.iscrtajKalendar(document.getElementById("kalendar"), 0);
            Kalendar.obojiZauzeca(document.getElementById("kalendar"), 0, "0-01", "08:00", "23:00");

            const zadnjiDan = document.getElementsByClassName("zauzetoVanredno")[0];
            assert.equal(zadnjiDan.innerText, "31", "Treba sadrzaj celije biti broj 31");
        });
    });

    describe('iscrtajKalendar()', function () {
        it('treba prikazati mjesec od 30 dana, npr. april', function () {
            Kalendar.iscrtajKalendar(document.getElementById("kalendar"), 3);
            let brojDana = document.getElementById("kalendar").children[1].getElementsByTagName('td').length;

            assert.equal(brojDana, 30, "Broj dana treba biti 30.");
        });

        it('treba prikazati mjesec od 31 dana, npr. juli', function () {
            Kalendar.iscrtajKalendar(document.getElementById("kalendar"), 6);
            let brojDana = document.getElementById("kalendar").children[1].getElementsByTagName('td').length;

            assert.equal(brojDana, 31, "Broj dana treba biti 31.");
        });

        it('prvi dan trenutnog mjeseca (novembra) treba biti u petak', function () {
            Kalendar.iscrtajKalendar(document.getElementById("kalendar"), 10);
            // Petak je 5. dan u sedmici, indeks je 4
            let dani = document.getElementById("kalendar").children[1].getElementsByTagName('td');
            // U danima su ukljucena i prazna mjesta na početku mjeseca
            assert.equal(dani[4].innerText, 1, "Tekst treba biti 1");
        });

        it('30. dan trenutnog mjeseca (novembra) treba biti u subotu', function () {
            Kalendar.iscrtajKalendar(document.getElementById("kalendar"), 10);
            // Subota je 6. dan u sedmici, indeks je 5, a ima 5 sedmica
            // Dakle, trazeni indeks je 7*4 + 5 = 33
            let dani = document.getElementById("kalendar").children[1].getElementsByTagName('td');
            // U danima su ukljucena i prazna mjesta na početku mjeseca
            assert.equal(dani[33].innerText, 30, "Tekst treba biti 30");
        });

        it('januar treba imati dana od 1 do 31, pocevsi od utorka', function () {
            Kalendar.iscrtajKalendar(document.getElementById("kalendar"), 0);
            // Indeks utorka je 1
            let dani = document.getElementById("kalendar").children[1].getElementsByTagName('td');

            assert.equal(dani[1].innerText, 1, "Prvi dan je u utorak");
            assert.equal(dani[dani.length-1].innerText, 31, "Posljedni dan je 31.");

        });

        it('februar treba imati 28 dana', function () {
            Kalendar.iscrtajKalendar(document.getElementById("kalendar"), 1);
            let dani = document.getElementById("kalendar").children[1].getElementsByTagName('td');

            assert.equal(dani[dani.length-1].innerText, 28, "Posljedni dan je 28.");

        });

        it('peti dan u julu treba biti petak', function () {
            Kalendar.iscrtajKalendar(document.getElementById("kalendar"), 6);
            // Obzirom da mjesec pocinje u ponedjeljak i nema sakrivenih celija na pocetku,
            // indeks dana treba biti 5 - 1 = 4 posto indeksiranje pocinje od nule
            let dani = document.getElementById("kalendar").children[1].getElementsByTagName('td');
            assert.equal(dani[4].innerText, 5, "Celija treba imati vrijednost 5.");
        });
    });
});
