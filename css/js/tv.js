let canais = [];
let canalAtual = 0;

fetch("canais.json")
  .then(res => res.json())
  .then(data => {
    canais = data;
    renderCanais();
    trocarCanal(0);
  });

function renderCanais() {
  const lista = document.getElementById("channel-list");
  lista.innerHTML = "";

  canais.forEach((canal, index) => {
    const div = document.createElement("div");
    div.className = "channel";
    div.innerHTML = `
      <img src="${canal.logo}">
      <span>${canal.nome}</span>
    `;

    div.onclick = () => trocarCanal(index);
    lista.appendChild(div);
  });
}

function trocarCanal(index) {
  canalAtual = index;
  document.getElementById("player").src = canais[index].player;

  document.querySelectorAll(".channel").forEach((el, i) => {
    el.classList.toggle("active", i === index);
  });
}

/* CONTROLE REMOTO / TECLADO */
document.addEventListener("keydown", e => {
  if (e.key === "ArrowDown") {
    canalAtual = (canalAtual + 1) % canais.length;
    trocarCanal(canalAtual);
  }

  if (e.key === "ArrowUp") {
    canalAtual = (canalAtual - 1 + canais.length) % canais.length;
    trocarCanal(canalAtual);
  }

  if (e.key === "Enter") {
    trocarCanal(canalAtual);
  }
});
