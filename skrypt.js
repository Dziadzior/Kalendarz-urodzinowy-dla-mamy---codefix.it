const kalendarz = document.querySelector('.kalendarz'),
	data = document.querySelector('.data'),
	dniBlok = document.querySelector('.dni-rob'),
	poprzedni = document.querySelector('.przed'),
	nastepny = document.querySelector('.nast'),
	tutajPrzycisk = document.querySelector('.tutaj-przyc'),
	dzisiajPrzycisk = document.querySelector('.dzisiaj-przyc'),
	poleData = document.querySelector('.pole-data'),
	wydarzenieDzien = document.querySelector('.wydarzenie-tendzien'),
	wydarzenieData = document.querySelector('.wydarzenie-data'),
	wydarzeniaBlok = document.querySelector('.wydarzenia'),
	dodajWydarzeniePrzy = document.querySelector('.dodaj-wydarzenie-przycisk')

let dzisiaj = new Date()
let aktywnyDzien
let miesiac = dzisiaj.getMonth()
let rok = dzisiaj.getFullYear()

const miesiace = [
	'Styczeń',
	'Luty',
	'Marzec',
	'Kwiecień',
	'Maj',
	'Czerwiec',
	'Lipiec',
	'Sierpień',
	'Wrzesień',
	'Pażdziernik',
	'Listopad',
	'Grudzień',
]

// Domyslne wydarzenia
// const wydarzeniaWar = [
// 	{
// 		dzien: 01,
// 		miesiac: 02,
// 		rok: 2023,
// 		wydarzenia: [
// 			{
// 				tytul: 'Zaręczyny',
// 				czas: '20:00',
// 			},
// 			{
// 				tytul: 'Znalezienie brakującej połówki',
// 				czas: '21:00',
// 			},
// 		],
// 	},
// 	{
// 		dzien: 31,
// 		miesiac: 12,
// 		rok: 2023,
// 		wydarzenia: [
// 			{
// 				tytul: 'Urodziny Mamy',
// 				czas: '20:00',
// 			},
// 		],
// 	},
// ]

let wydarzeniaWar = []

wezWydarzenia()

function wKalendarzu() {
	// Widok miesiecy i dni
	const pierwszyDzien = new Date(rok, miesiac, 1)
	const ostatniDzien = new Date(rok, miesiac + 1, 0)
	const pokaOstatniDzien = new Date(rok, miesiac, 0)
	const pokaDni = pokaOstatniDzien.getDate()
	const ostatniaData = ostatniDzien.getDate()
	const dzien = pierwszyDzien.getDay()
	const nastepneDni = 7 - ostatniDzien.getDay() - 1

	// Zaktualizuj date na gorze kalendarza
	data.innerHTML = miesiace[miesiac] + ' ' + rok

	// Dodanie dni na dole
	let dni = ''

	// Widok miesiecy
	for (let x = dzien; x > 0; x--) {
		dni += `<div class="dzien poprzedni" >${pokaDni - x + 1}</div>`
	}

	// Obecne dni miesiaca
	for (let i = 1; i <= ostatniaData; i++) {
		// Sprawdz czy sa wydarzenia dla danego dnia
		let wydarzenie = false
		wydarzeniaWar.forEach(wydarzeniejObj => {
			if (wydarzeniejObj.dzien == i && wydarzeniejObj.miesiac == miesiac + 1 && wydarzeniejObj.rok == rok) {
				// Jesli sa jakies wydarzenia
				wydarzenie = true
			}
		})

		// Jesli dzien jest dzisiaj dodaj klase
		if (i == new Date().getDate() && rok == new Date().getFullYear() && miesiac == new Date().getMonth()) {
			aktywnyDzien = i
			wezAktywnyDzien(i)
			aktualizujWydarzenia(i)

			// Jesli sa wydarzenia rowniez dodaj wydarzenia klase
			if (wydarzenie) {
				dni += `<div class="dzien dzisiaj wydarzenie aktywny" >${i}</div>`
			} else {
				dni += `<div class="dzien dzisiaj aktywny" >${i}</div>`
			}
		}
		// Dodanie pozostalych dni
		else {
			if (wydarzenie) {
				dni += `<div class="dzien wydarzenie" >${i}</div>`
			} else {
				dni += `<div class="dzien" >${i}</div>`
			}
		}
	}

	// Nastepne dni miesiaca
	for (let j = 1; j <= nastepneDni; j++) {
		dni += `<div class="dzien nastepny" >${j}</div>`
	}

	dniBlok.innerHTML = dni
	// Dodaj funkcje nasluchu przed inicjalizacja kalendarza
	dodajNasluch()
}

wKalendarzu()

// Poprzedni miesiac
function poprzedniMiesiac() {
	miesiac--
	if (miesiac < 0) {
		miesiac = 11
		rok--
	}
	wKalendarzu()
}

// Nastepny miesiac
function nastepnyMiesiac() {
	miesiac++
	if (miesiac > 11) {
		miesiac = 0
		rok++
	}
	wKalendarzu()
}

// Dodanie funkcjonalnosci strzalkom
poprzedni.addEventListener('click', poprzedniMiesiac)
nastepny.addEventListener('click', nastepnyMiesiac)

// Dodanie dzisiajsza data i disiejszy dzien
dzisiajPrzycisk.addEventListener('click', () => {
	dzisiaj = new Date()
	miesiac = dzisiaj.getMonth()
	rok = dzisiaj.getFullYear()
	wKalendarzu()
})

poleData.addEventListener('input', e => {
	// Pozwol na tylko liczby, nic innego
	poleData.value = poleData.value.replace(/[^0-9/]/g, '')
	if (poleData.value.length == 2) {
		// Dodaj /, jesli beda wpisanie conajmniej dwie cyfry
		poleData.value += '/'
	}
	if (poleData.value.length > 7) {
		// Zabronione więcej niż 7 symboli
		poleData.value = poleData.value.slice(0, 7)
	}

	// Jesli spacja bedzie
	if (e.inputType == 'deleteContentBackward') {
		if (poleData.value.length == 3) {
			poleData.value = poleData.value.slice(0, 2)
		}
	}
})

tutajPrzycisk.addEventListener('click', idzData)

// Funkcja do przycisku Dalej
function idzData() {
	const dataWar = poleData.value.split('/')
	console.log(dataWar)
	// Weryfikacja pewnych danych
	if (dataWar.length == 2) {
		if (dataWar[0] > 0 && dataWar[0] < 13 && dataWar[1].length == 4) {
			miesiac = dataWar[0] - 1
			rok = dataWar[1]
			wKalendarzu()
			return
		}
	}

	// Jesli bedzie niepoprawna data
	alert('Nieprawidłowa data!')
}

const dodajWydarzeniePrzycisk = document.querySelector('.dodaj-wydarzenie-plus'),
	dodajWydarzenieBlok = document.querySelector('.dodaj-wydarzenie-blok'),
	dodajWydarzenieZamknijPrzycisk = document.querySelector('.zamknij'),
	dodajWydarzenieTytul = document.querySelector('.nazwa-wydarzenia'),
	dodajWydarzenieOd = document.querySelector('.wydarzenie-czas-od'),
	dodajWydarzenieDok = document.querySelector('.wydarzenie-czas-do')

dodajWydarzeniePrzycisk.addEventListener('click', () => {
	dodajWydarzenieBlok.classList.toggle('aktywny')
})
dodajWydarzenieZamknijPrzycisk.addEventListener('click', () => {
	dodajWydarzenieBlok.classList.remove('aktywny')
})

document.addEventListener('click', e => {
	// Jak klikniemy poza
	if (e.target != dodajWydarzeniePrzycisk && !dodajWydarzenieBlok.contains(e.target)) {
		dodajWydarzenieBlok.classList.remove('aktywny')
	}
})

// Pozwol na 60 wydarzen
dodajWydarzenieTytul.addEventListener('input', e => {
	dodajWydarzenieTytul.value = dodajWydarzenieTytul.value.slice(0, 60)
})

// Format czasu od i do
dodajWydarzenieOd.addEventListener('input', e => {
	// Usun wszystko poza cyframi
	dodajWydarzenieOd.value = dodajWydarzenieOd.value.replace(/[^0-9:]/g, '')
	// Jesli wpisane beda dwie wartosci dodaj :
	if (dodajWydarzenieOd.value.length == 2) {
		dodajWydarzenieOd.value += ':'
	}
	// Nie mozna wpisac wiecej niz 5 wartosci
	if (dodajWydarzenieOd.value.length > 5) {
		dodajWydarzenieOd.value = dodajWydarzenieOd.value.slice(0, 5)
	}
})

// To samo, ale odnosi sie do
dodajWydarzenieDok.addEventListener('input', e => {
	// Usun wszystko poza cyframi
	dodajWydarzenieDok.value = dodajWydarzenieDok.value.replace(/[^0-9:]/g, '')
	// Jesli wpisane beda dwie wartosci dodaj :
	if (dodajWydarzenieDok.value.length == 2) {
		dodajWydarzenieDok.value += ':'
	}
	// Nie mozna wpisac wiecej niz 5 wartosci
	if (dodajWydarzenieDok.value.length > 5) {
		dodajWydarzenieDok.value = dodajWydarzenieDok.value.slice(0, 5)
	}
})

// Dodanie funkcji dla sluchania na dni po zaladowaniu
function dodajNasluch() {
	const dni = document.querySelectorAll('.dzien')
	dni.forEach(dzien => {
		dzien.addEventListener('click', e => {
			// Ustaw obecny dzien jako aktywny
			aktywnyDzien = Number(e.target.innerHTML)

			// Aktywny dzien po kliknieciu
			wezAktywnyDzien(e.target.innerHTML)
			aktualizujWydarzenia(Number(e.target.innerHTML))

			// Usun aktywny z dnia
			dni.forEach(dzien => {
				dzien.classList.remove('aktywny')
			})

			// Jesli poprzedni miesiac kliknelismy idz do poprzedniego miesiaca i dodaj aktywny
			if (e.target.classList.contains('poprzedni')) {
				poprzedniMiesiac()

				setTimeout(() => {
					// Wybierz wszystkie dni w miesiacu
					const dni = document.querySelectorAll('.dzien')

					// Przed przejsciem do poprzedniego miesiaca dodaj aktywny
					dni.forEach(dzien => {
						if (!dni.classList.contains('poprzedni') && dni.innerHTML == e.target.innerHTML) {
							dzien.classList.add('aktywny')
						}
					})
				}, 100)
				// Tak samo z nastepnymi miesiacami
			} else if (e.target.classList.contains('nastepny')) {
				nastepnyMiesiac()

				setTimeout(() => {
					// Wybierz wszystkie dni w miesiacu
					const dni = document.querySelectorAll('.dzien')

					// Przed przejsciem do poprzedniego miesiaca dodaj aktywny
					dni.forEach(dzien => {
						if (!dni.classList.contains('nastepny') && dni.innerHTML == e.target.innerHTML) {
							dzien.classList.add('aktywny')
						}
					})
				}, 100)
			} else {
				e.target.classList.add('aktywny')
			}
		})
	})
}

// Pokaz aktywne wydarzenia dnia i date na gorze

function wezAktywnyDzien(data) {
	const dzien = new Date(rok, miesiac, data)
	const nazwaDnia = dzien.toString().split(' ')[0]
	wydarzenieDzien.innerHTML = nazwaDnia
	wydarzenieData.innerHTML = data + ' ' + miesiace[miesiac] + ' ' + rok
}

// Funkcja do pokazania wydarzen danego dnia
function aktualizujWydarzenia(data) {
	let wydarzenia = ''
	wydarzeniaWar.forEach(wydarzenie => {
		// Tylko dany dzien wydarzenia
		if (data == wydarzenie.dzien && miesiac + 1 == wydarzenie.miesiac && rok == wydarzenie.rok) {
			// Potem pokaz wydarzenie w kalendarzu
			wydarzenie.wydarzenia.forEach(wydarzenie => {
				wydarzenia += `
				<div class="wydarzenie">
					<div class="tytul">
						<i class="fa-regular fa-circle-dot"></i>
						<h3 class="wydarzenie-tytul">${wydarzenie.tytul}</h3>
					</div>
					<div class="wydarzenie-czas">
						<span class="wydarzenie-czas">${wydarzenie.czas}</span>
					</div>
				</div>
				`
			})
		}
	})

	// Jesli nic nie bedzie
	if (wydarzenia == '') {
		wydarzenia = `<div class="nie-wydarzenie">
		<h3>Nie ma wydarzenia</h3>
	</div>`
	}

	wydarzeniaBlok.innerHTML = wydarzenia
	zapiszWydarzenia()
}

// Funkcja stworzenia wydarzenia
dodajWydarzeniePrzy.addEventListener('click', () => {
	const wydarzenieTytul = dodajWydarzenieTytul.value
	const wydarzenieCzasOd = dodajWydarzenieOd.value
	const wydarzenieCzasDo = dodajWydarzenieDok.value

	// Kilka weryfikacji
	if (wydarzenieTytul == '' || wydarzenieCzasOd == '' || wydarzenieCzasDo == '');
	{
		alert('Prosze wypełnij wszystkie pola')
	}

	const czasOdWar = wydarzenieCzasOd.split(':')
	const czasDoWar = wydarzenieCzasDo.split(':')

	if (
		czasOdWar.length != 2 ||
		czasDoWar.length != 2 ||
		czasOdWar[0] > 23 ||
		czasOdWar[1] > 59 ||
		czasDoWar[0] > 23 ||
		czasDoWar[1] > 59
	) {
		alert('Niepoprawny format daty')
	}

	const czasOd = convertTime(wydarzenieCzasOd)
	const czasDo = convertTime(wydarzenieCzasDo)

	const noweWydarzenie = {
		tytul: wydarzenieTytul,
		czas: czasOd + ' - ' + czasDo,
	}

	let wydarzenieDodane = false

	// Sprawdz czy wydarzeniaWar jest puste
	if (wydarzeniaWar.length > 0) {
		// Sprawdz jesli w obecnym dniu jest dodanie wydarzenie
		wydarzeniaWar.forEach(item => {
			if (item.dzien == aktywnyDzien && item.miesiac == miesiac + 1 && item.rok == rok) {
				item.wydarzenia.push(noweWydarzenie)
				wydarzenieDodane = true
			}
		})
	}

	// Jesli jest puste albo w obecnym dniu nie ma wydarzenia stworz je
	if (!wydarzenieDodane) {
		wydarzeniaWar.push({
			dzien: aktywnyDzien,
			miesiac: miesiac + 1,
			rok: rok,
			wydarzenia: [noweWydarzenie],
		})
	}

	// Usun aktywny z dodanie wydarzenia
	dodajWydarzenieBlok.classList.remove('aktywny')
	// Wyczysc
	dodajWydarzenieTytul.value = ''
	dodajWydarzenieOd.value = ''
	dodajWydarzenieDok.value = ''

	// Pokaz dodane wydarzenie
	aktualizujWydarzenia(aktywnyDzien)

	// Rowniez dodaj wydarzenie do nowo dodanego jesli nie jest
	const aktywnyDzienElement = document.querySelector('.dzien.aktywny')
	if (!aktywnyDzienElement.classList.contains('wydarzenie')) {
		aktywnyDzienElement.classList.add('wydarzenie')
	}
})

function convertTime(czas) {
	let czasWar = czas.split(':')
	let czasGodzina = czasWar[0]
	let czasMinuta = czasWar[1]
	let czasFormat = czasGodzina >= 12
	czasGodzina = czasGodzina % 12 || 12
	czas = czasGodzina + ':' + czasMinuta + ' ' + czasFormat
	return czas
}

// Dodaj funkcje do usuwania wydarzen na klik
wydarzeniaBlok.addEventListener('click', e => {
	if (e.target.classList.contains('wydarzenie')) {
		const wydarzenieTytul = e.target.children[0].children[1].innerHTML
		wydarzenie.forEach(wydarzenie => {
			if (wydarzenie.dzien == aktywnyDzien && wydarzenie.miesiac == miesiac + 1 && wydarzenie.rok == rok) {
				wydarzenie.wydarzenia.forEach((item, index) => {
					if (item.tytul == wydarzenieTytul) {
						wydarzenie.wydarzenia.splice(index, 1)
					}
				})

				if (wydarzenie.wydarzenia.length == 0) {
					wydarzeniaWar.splice(wydarzeniaWar.indexOf(wydarzenie), 1)

					const aktywnyDzienElement = document.querySelector('.dzien.aktywny')
					if (aktywnyDzienElement.classList.contains('wydarzenie')) {
						aktywnyDzienElement.classList.remove('wydarzenie')
					}
				}
			}
		})
		aktualizujWydarzenia(aktywnyDzien)
	}
})

function zapiszWydarzenia() {
	localStorage.setItem('wydarzenia', JSON.stringify(wydarzeniaWar))
}

function wezWydarzenia() {
	if (localStorage.getItem('wydarzenia' != null)) {
		return
	}

	wydarzeniaWar.push(...JSON.parse(localStorage.getItem('wydarzenia')))
}
