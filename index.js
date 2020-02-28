const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}...`)
    console.log('-------------------------------');
});

// Rute

app.get('/', function (req, res) {
    res.redirect('/rezervacija');
});

app.get('/sale', function (req, res) {
    res.sendFile(__dirname + '/sale.html');
});

app.get('/unos', function (req, res) {
    res.sendFile(__dirname + '/unos.html');
});

app.get('/rezervacija', function (req, res) {
    res.sendFile(__dirname + '/rezervacija.html');
});

app.get('/pocetna', function (req, res) {
    res.sendFile(__dirname + '/pocetna.html');
});

// Zadatak 1  - slanje podataka o zauzecima
app.get('/zauzeca', function (req, res) {
    res.sendFile(__dirname + '/zauzeca.json');
});

// Zadatak 3 - 

app.post('/rezervacija-periodicna', function (req, res) {
    let zauzece = req.body;
    if (zauzeceOk(zauzece,'p')) {
        fs.readFile(__dirname + '/zauzeca.json', function (err, data) {
            let json = JSON.parse(data);
            let periodicna = json.periodicna;
            let jeZauzeto = false;
            // Provjera na serveru
            for (let i = 0; i < periodicna.length; i++) {
                if (zauzecaSePoklapaju(zauzece,periodicna[i],'p')) {
                    jeZauzeto = true;
                    break;
                }
            }
            if (!jeZauzeto) {
                // Upisujemo zauzece
                periodicna.push(zauzece);
                fs.writeFile(__dirname + '/zauzeca.json', JSON.stringify(json), (err) => {
                    if (err) throw err;
                    // Slanje svih zauzeca
                    res.json(json);
                });
            }
            else {
                // Slanje poruke o greski
                res.status(400).send({message:"Nije moguce izvrisiti periodicno zauzece jer je termin vec zauzet!"});
            }
        })
    }
    else {
        res.status(400).send({message:"Format zauzeca nije validan!"});
    }
});

app.post('/rezervacija-vanredna', function (req, res) {
    let zauzece = req.body;
    if (zauzeceOk(zauzece,'v')) {
        fs.readFile(__dirname + '/zauzeca.json', function (err, data) {
            let json = JSON.parse(data);
            let vanredna = json.vanredna;
            let jeZauzeto = false;
            // Provjera na serveru
            for (let i = 0; i < vanredna.length; i++) {
                if (zauzecaSePoklapaju(zauzece,vanredna[i],'v')) {
                    jeZauzeto = true;
                    break;
                }
            }
            if (!jeZauzeto) {
                // Upisujemo zauzece
                vanredna.push(zauzece);
                fs.writeFile(__dirname + '/zauzeca.json', JSON.stringify(json), (err) => {
                    if (err) throw err;
                    // Slanje svih zauzeca
                    res.json(json);
                });
            }
            else {
                // Slanje poruke o greski
                let poruka = `Nije moguce izabrati salu ${zauzece.naziv} za navedeni datum ${zauzece.datum} i termin od ${zauzece.pocetak} do ${zauzece.kraj}!`;
                res.status(400).send({message:poruka});
            }
        })
    }
    else {
        res.status(400).send({message:"Format zauzeca nije validan!"});
    }
    
});

function datumOk(datum) {
    const regex = RegExp('^([0-3][0-9])\.([0-1][0-9])\.([0-9]{4})$')
    if (regex.test(datum)) {
        const d = datum.split('.');
        return (Date.parse(`${d[2]}-${d[1]}-${d[0]}`)) ? true : false;
    }
    return false;
}

function formirajDatum(dan, mjesec, godina) {
    mjesec++;
    return '' + ((dan < 10) ? '0' + dan : dan) + '.' + ((mjesec < 10) ? '0' + mjesec : mjesec) + '.' + godina;
}

function vrijemeOk(vrijeme) {
    const regex = RegExp('^([0-1][0-9]|2[0-3]):[0-5][0-9]$');
    return regex.test(vrijeme);
}

function zauzecaSePoklapaju(zauzeceNovo, zauzeceStaro, tip) {
    // Periodicna
    if (tip === 'p') {
        return zauzeceNovo.dan === zauzeceStaro.dan &&
            zauzeceNovo.semestar === zauzeceStaro.semestar &&
            zauzeceNovo.naziv === zauzeceStaro.naziv &&
            !(zauzeceNovo.pocetak >= zauzeceStaro.kraj || zauzeceNovo.kraj <= zauzeceStaro.pocetak)
    }
    // Vanredna
    if (tip === 'v') {
        return zauzeceNovo.naziv === zauzeceStaro.naziv &&
            zauzeceNovo.datum === zauzeceStaro.datum &&
            !(zauzeceNovo.pocetak >= zauzeceStaro.kraj || zauzeceNovo.kraj <= zauzeceStaro.pocetak)
    }
}

function zauzeceOk(zauzece, tip) {
    if (tip === 'p' || tip === 'v') {
        if (!vrijemeOk(zauzece.pocetak) ||
            !vrijemeOk(zauzece.kraj) ||
            zauzece.kraj <= zauzece.pocetak) {
            return false;
        }
        if (tip === 'p') {
            if (zauzece.dan < 0 || zauzece.dan > 6 || ['zimski', 'ljetni'].indexOf(zauzece.semestar) == -1)
                return false;
        }
        if (tip === 'v') {
            if (!datumOk(zauzece.datum))
                return false;
        }
        return true;
    }
}
