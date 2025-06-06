const vvodZadachi = document.getElementById('vvodZadachi');
const knopkaDobavit = document.getElementById('knopkaDobavit');
const spisokZadach = document.getElementById('spisokZadach');
const progress = document.getElementById('progress');
const filtry = document.querySelectorAll('[data-filtr]');

let spisokMissiy = [];
let tekushchiyFiltr = 'vse';

knopkaDobavit.addEventListener('click', () => {
  const tekst = vvodZadachi.value.trim();
  if (tekst) {
    spisokMissiy.push({ tekst, vipolneno: false });
    vvodZadachi.value = '';
    obnovitOtobrazhenie();
  }
});

filtry.forEach(knopka => {
  knopka.addEventListener('click', () => {
    tekushchiyFiltr = knopka.getAttribute('data-filtr');
    filtry.forEach(btn => btn.classList.remove('aktivnyy'));
    knopka.classList.add('aktivnyy');
    obnovitOtobrazhenie();
  });
});

function obnovitOtobrazhenie() {
  spisokZadach.innerHTML = '';
  let otfiltr = [];

  if (tekushchiyFiltr === 'aktivnye') {
    otfiltr = spisokMissiy.filter(m => !m.vipolneno);
  } else if (tekushchiyFiltr === 'vypolnennye') {
    otfiltr = spisokMissiy.filter(m => m.vipolneno);
  } else {
    otfiltr = spisokMissiy;
  }

  otfiltr.forEach((missiya, index) => {
    const punkt = document.createElement('li');
    const chek = document.createElement('input');
    chek.type = 'checkbox';
    chek.checked = missiya.vipolneno;
    chek.addEventListener('change', () => {
      missiya.vipolneno = chek.checked;
      obnovitOtobrazhenie();
    });

    const tekst = document.createElement('span');
    tekst.textContent = missiya.tekst;
    if (missiya.vipolneno) tekst.style.textDecoration = 'line-through';

    const udalit = document.createElement('button');
    udalit.textContent = 'Удалить';
    udalit.addEventListener('click', () => {
      spisokMissiy.splice(index, 1);
      obnovitOtobrazhenie();
    });

    punkt.appendChild(chek);
    punkt.appendChild(tekst);
    punkt.appendChild(udalit);
    spisokZadach.appendChild(punkt);
  });

  const vipolneno = spisokMissiy.filter(m => m.vipolneno).length;
  progress.textContent = `Прогресс: ${vipolneno}/${spisokMissiy.length} — ${vipolneno === spisokMissiy.length && spisokMissiy.length > 0 ? 'шаражное чудо!' : 'ты на грани отчисления'}`;
}
