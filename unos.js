/*
let data = `Ime,Prezime,Adresa,Broj telefona
Rijad,Fejzic,Adresa 1,000
Jasmin,Caluk,Adresa 2,111
asmin,Caluk,Adresa 2,111`;

function napraviTabeluHTML (data) {
    
    function napraviTabelu(data) {
        return `<table>\n${data}\n</table>`
    }

    function napraviRed(data) {
        return `<tr>\n${data}\n</tr>`;
    }

    let redovi = data.split('\n');
    
    let htmlHeader = napraviRed(redovi[0].split(',').map(val => `<th>${val}</th>`).join('\n'));
    let htmlRedovi = redovi.slice(1).map(red => {
        return napraviRed(red.split(',').map(val => `<td>${val}</td>`).join('\n'));
    }).join('\n');

    return napraviTabelu(`${htmlHeader}\n${htmlRedovi}`);
}

let tabela = napraviTabeluHTML(data);
let div = document.createElement('div');
div.innerHTML = tabela;
document.getElementsByClassName('sadrzaj')[0].appendChild(div);
*/

let ime = 'caki'
/*
function printString(string){
    setTimeout(() => {console.log(string)}, 
      Math.floor(Math.random() * 100) + 1
    )
}
*/
/*
function printString(string, callback) {
    setTimeout(
        () => {
            console.log(string)
            callback()
        },
        Math.floor(Math.random() * 100) + 1
    )
}

function printAll(){
    printString("A", () => {
      printString("B", () => {
        printString("C", () => {console.log('nesta');})
      })
    })
  }

  printAll();
*/

function printString(string) {
    return new Promise((resolve, reject) => {
        setTimeout(
            () => {
                console.log(string)
                resolve()
            },
            Math.floor(Math.random() * 100) + 1
        )
    })
}

function printAll() {
    printString("A")
        .then(() => {
            return printString("B")
        })
        .then(() => {
            return printString("C")
        })
}
printAll()