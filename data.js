const tabelaDanych = [
  { metryka: 'staliKlienci', wartosci: [145, 178, 132, 156, 189, 167, 203, 148, 175, 192, 158, 181], etykiety: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'], komentarz: 'Stali klienci' },
  { metryka: 'ocenyGoogle', wartosci: [1, 2, 3, 4, 5], etykiety: ['1 gwiazdka', '2 gwiazdki', '3 gwiazdki', '4 gwiazdki', '5 gwiazdek'], komentarz: 'Oceny Google' },
  { metryka: 'zadowoleniKlienci', wartosci: [87, 92, 78, 95, 88, 91, 96, 84, 93, 89, 97, 86], etykiety: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'], komentarz: 'Zadowoleni klienci' },
  { metryka: 'miesiecznyDochod', wartosci: [12500, 9800, 15200, 11800, 13400, 14700, 11200, 13900, 12600, 15800, 14300, 13100], etykiety: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'], komentarz: 'Miesięczny dochód' },
  { metryka: 'tygodnioweZamowienia', wartosci: [195, 223, 187, 214, 201, 238, 192, 217, 205, 229, 198, 211], etykiety: ['Tydzień 1', 'Tydzień 2', 'Tydzień 3', 'Tydzień 4', 'Tydzień 5', 'Tydzień 6', 'Tydzień 7', 'Tydzień 8', 'Tydzień 9', 'Tydzień 10', 'Tydzień 11', 'Tydzień 12'], komentarz: 'Tygodniowe zamówienia' },
  { metryka: 'sredniaWartoscZamowienia', wartosci: [34, 29, 41, 37, 32, 39, 35, 43, 31, 38, 36, 40], etykiety: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'], komentarz: 'Średnia wartość zamówienia' }
];

function utworzWykresSlupkowy(idKontenera, dane, etykiety) {
  const kontener = document.getElementById(idKontenera);
  let kontenerWykresu = kontener.querySelector('.chart-container');
  if (!kontenerWykresu) {
    kontenerWykresu = document.createElement('div');
    kontenerWykresu.className = 'chart-container';
    kontenerWykresu.setAttribute('role', 'img');
    kontenerWykresu.setAttribute('aria-label', 'bar chart');
    kontener.appendChild(kontenerWykresu);
  } else {
    kontenerWykresu.innerHTML = '';
  }

  const wysokoscWykresu = kontenerWykresu.clientHeight || 180;
  const maxWartosc = Math.max(...dane, 1);

  const svg = document.createElement('div');
  svg.style.position = 'absolute';
  svg.style.top = '0';
  svg.style.left = '0';

  kontenerWykresu.appendChild(svg);

  dane.forEach((wartosc, indeks) => {
    const kolumna = document.createElement('div');
    kolumna.className = 'bar-col';
    kolumna.style.position = 'relative';
    kolumna.style.zIndex = '2';

    const slupek = document.createElement('div');
    slupek.className = 'bar';
    const dostepneDlaSlupka = Math.max(wysokoscWykresu - 28, 10);
    const piksele = (wartosc / maxWartosc) * dostepneDlaSlupka;
    slupek.style.height = piksele + 'px';
    slupek.style.backgroundColor = `hsl(${(indeks * 60) % 360}, 70%, 45%)`;
    slupek.title = `${etykiety[indeks]}: ${wartosc}`;

    const etykieta = document.createElement('div');
    etykieta.className = 'label';
    etykieta.textContent = etykiety[indeks];
    etykieta.style.position = 'relative';
    etykieta.style.zIndex = '2';

    kolumna.appendChild(slupek);
    kolumna.appendChild(etykieta);
    kontenerWykresu.appendChild(kolumna);
  });
}

function utworzWykresKolowy(idKontenera, dane, etykiety) {
  const kontener = document.getElementById(idKontenera);
  let wykresKolowy = kontener.querySelector('.pie');
  if (!wykresKolowy) {
    wykresKolowy = document.createElement('div');
    wykresKolowy.className = 'pie';
    wykresKolowy.setAttribute('role', 'img');
    wykresKolowy.setAttribute('aria-label', 'pie chart');
    kontener.appendChild(wykresKolowy);
  } else {
    wykresKolowy.style.backgroundImage = '';
  }

  const suma = dane.reduce((s, v) => s + v, 0) || 1;
  let skumulowane = 0;
  const stopnie = [];

  dane.forEach((wartosc, i) => {
    const procent = (wartosc / suma) * 100;
    const poczatek = skumulowane;
    const koniec = skumulowane + procent;
    const kolor = `hsl(${(i * 60) % 360}, 70%, 45%)`;
    stopnie.push(`${kolor} ${poczatek}% ${koniec}%`);
    skumulowane = koniec;
  });

  wykresKolowy.style.backgroundImage = `conic-gradient(${stopnie.join(', ')})`;
}

function utworzWykresLiniowy(idKontenera, dane, etykiety) {
  const kontener = document.getElementById(idKontenera);
  let kontenerWykresu = kontener.querySelector('.chart-container');
  if (!kontenerWykresu) {
    kontenerWykresu = document.createElement('div');
    kontenerWykresu.className = 'chart-container';
    kontenerWykresu.setAttribute('role', 'img');
    kontenerWykresu.setAttribute('aria-label', 'line chart');
    kontener.appendChild(kontenerWykresu);
  } else {
    kontenerWykresu.innerHTML = '';
  }

  const szerokosc = kontenerWykresu.offsetWidth;
  const wysokosc = kontenerWykresu.offsetHeight || 180;
  const max = Math.max(...dane);
  const min = Math.min(...dane);
  const zakres = max - min || 1;

  const punkty = dane.map((wartosc, i) => {
    const x = (i / (dane.length - 1)) * (szerokosc - 40) + 20;
    const y = wysokosc - ((wartosc - min) / zakres) * (wysokosc - 40) - 20;
    return { x, y };
  });

  for (let i = 0; i < punkty.length - 1; i++) {
    const p1 = punkty[i];
    const p2 = punkty[i + 1];
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const distance = Math.sqrt(dx*dx + dy*dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    const linia = document.createElement('div');
    linia.style.position = 'absolute';
    linia.style.transformOrigin = '0 0';
    linia.style.height = '3px';
    linia.style.background = 'hsl(200, 70%, 45%)';
    linia.style.left = p1.x + 'px';
    linia.style.top = p1.y + 'px';
    linia.style.width = distance + 'px';
    linia.style.transform = `rotate(${angle}deg)`;
    kontenerWykresu.appendChild(linia);
  }

  punkty.forEach((p, i) => {
    const punkt = document.createElement('div');
    punkt.style.position = 'absolute';
    punkt.style.left = (p.x - 4) + 'px';
    punkt.style.top = (p.y - 4) + 'px';
    punkt.style.width = '8px';
    punkt.style.height = '8px';
    punkt.style.borderRadius = '50%';
    punkt.style.background = 'hsl(200, 70%, 45%)';
    punkt.style.border = '2px solid #fff';
    kontenerWykresu.appendChild(punkt);

    const label = document.createElement('div');
    label.style.position = 'absolute';
    label.style.left = p.x + 'px';
    label.style.top = (wysokosc - 15) + 'px';
    label.style.transform = 'translateX(-50%)';
    label.style.fontSize = '12px';
    label.style.color = '#666';
    label.textContent = etykiety[i];
    kontenerWykresu.appendChild(label);
  });
}


function wypelnijPanel() {
  utworzWykresSlupkowy('wykres1', tabelaDanych[0].wartosci, tabelaDanych[0].etykiety);
  if (document.getElementById('opis1')) document.getElementById('opis1').textContent = tabelaDanych[0].komentarz;
  utworzWykresKolowy('wykres2', tabelaDanych[1].wartosci, tabelaDanych[1].etykiety);
  if (document.getElementById('opis2')) document.getElementById('opis2').textContent = tabelaDanych[1].komentarz;
  utworzWykresLiniowy('wykres3', tabelaDanych[2].wartosci, tabelaDanych[2].etykiety);
  if (document.getElementById('opis3')) document.getElementById('opis3').textContent = tabelaDanych[2].komentarz;
  utworzWykresLiniowy('wykres4', tabelaDanych[3].wartosci, tabelaDanych[3].etykiety);
  if (document.getElementById('opis4')) document.getElementById('opis4').textContent = tabelaDanych[3].komentarz;
  utworzWykresSlupkowy('wykres5', tabelaDanych[4].wartosci, tabelaDanych[4].etykiety);
  if (document.getElementById('opis5')) document.getElementById('opis5').textContent = tabelaDanych[4].komentarz;
  utworzWykresSlupkowy('wykres6', tabelaDanych[5].wartosci, tabelaDanych[5].etykiety);
  if (document.getElementById('opis6')) document.getElementById('opis6').textContent = tabelaDanych[5].komentarz;
}

window.addEventListener('load', function () {
  wypelnijPanel();
  ustawFormularzEdycji();
});

function ustawFormularzEdycji() {
  const polaEdycji = document.getElementById('polaEdycji');
  const etykiety = tabelaDanych[0].etykiety;
  const wartosci = tabelaDanych[0].wartosci;

  etykiety.forEach((etykieta, indeks) => {
    const elementEtykiety = document.createElement('label');
    elementEtykiety.textContent = etykieta;
    const pole = document.createElement('input');
    pole.type = 'number';
    pole.value = wartosci[indeks];
    pole.min = '0';
    pole.step = '1';
    elementEtykiety.appendChild(pole);
    polaEdycji.appendChild(elementEtykiety);
  });

  document.getElementById('formularzEdycji').addEventListener('submit', function (e) {
    e.preventDefault();
    const pola = polaEdycji.querySelectorAll('input');
    const noweWartosci = Array.from(pola).map(pole => parseInt(pole.value));
    tabelaDanych[0].wartosci = noweWartosci;
    utworzWykresSlupkowy('wykres1', noweWartosci, etykiety);
    alert('Wykres został zaktualizowany!');
  });
}
