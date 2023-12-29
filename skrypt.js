    const kalendarz = document.querySelector('.kalendarz'),
        data = document.querySelector('.data'),
        dniBlok = document.querySelector('.dni-rob'),
        poprzedni = document.querySelector('.przed'),
        nastepny = document.querySelector('.nast'),
        tutajPrzycisk = document.querySelector('.tutaj-przyc'),
        dzisiajPrzycisk = document.querySelector('.dzisiaj-przyc');
    
    
    let dzisiaj = new Date();
    let aktywnyDzien;
    let miesiac = dzisiaj.getMonth();
    let rok = dzisiaj.getFullYear();

    const miesiace = [
        "Styczeń",
        "Luty",
        "Marzec",
        "Kwiecień",
        "Maj",
        "Czerwiec",
        "Lipiec",
        "Sierpień",
        "Wrzesień",
        "Pażdziernik",
        "Listopad",
        "Grudzień",
    ];

    function wKalendarzu() {
        // Widok miesiecy i dni
        const pierwszyDzien = new Date(rok, miesiac, 1);
        const ostatniDzien = new Date(rok, miesiac + 1, 0);
        const pokaOstatniDzien = new Date(rok, miesiac, 0);
        const pokaDni = pokaOstatniDzien.getDate();
        const ostatniaData = ostatniDzien.getDate();
        const dzien = pierwszyDzien.getDay();
        const nastepneDni = 7 - ostatniDzien.getDay() - 1;

        // Zaktualizuj date na gorze kalendarza
        data.innerHTML = miesiace[miesiac] + " " + rok;

        // Dodanie dni na dole
        let dni = "";

        // Widok miesiecy
        for (let x = dzien; x > 0;x--) {
            dni += `<div class="dzien poprzedni" >${pokaDni - x + 1}</div>`;
        }

        // Obecne dni miesiaca
        for (let i = 1; i <= ostatniaData; i++) {
            // Jesli dzien jest dzisiaj dodaj klase
            if ( 
                i == new Date().getDate() &&
                rok == new Date().getFullYear() &&
                miesiac == new Date().getMonth()
            ) {
                dni += `<div class="dzien dzisiaj" >${i}</div>`;
            }
            // Dodanie pozostalych dni
            else {
                dni += `<div class="dzien dzisiaj" >${i}</div>`;
            }
            }

            // Nastepny miesiac
            for (let j = 1; j <= nastepneDni; j++) {
                dni += `<div class="dzien nastepny" >${j}</div>`
            }

            dniBlok.innerHTML = dni;
        }
        

    wKalendarzu();

// Poprzedni miesiac
function poprzedniMiesiac() {
    miesiac--;
    if (miesiac < 0) {
        miesiac = 11;
        rok--;
    }
    wKalendarzu();
}

// Nastepny miesiac
function nastepnyMiesiac() {
    miesiac++;
    if (miesiac > 11) {
        miesiac = 0;
        rok++;
    }
    wKalendarzu();
}

// Dodanie funkcjonalnosci strzalkom
poprzedni.addEventListener("click", poprzedniMiesiac);
nastepny.addEventListener("click", nastepnyMiesiac);