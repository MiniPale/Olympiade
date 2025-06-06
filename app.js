let players = ["Maxime", "Fabien", "Emilie", "Camille", "Charly", "Steven", "Quentin",
               "Mathilde", "Marine", "Fred", "Barbara", "Corentin", "Clément", "Margaux"];
let scores = Object.fromEntries(players.map(p => [p, 0]));
let equipes = [];
const epreuves = [{"nom": "Beer Pong", "regle": "Chaque joueur fait un lancer, l’un après l’autre. Seuls les tirs non contrés sont comptabilisés."}, {"nom": "Tossit", "regle": "Premier à 13 gagne."}, {"nom": "Mölkky", "regle": "Respecter les règles classiques."}, {"nom": "Blind Test", "regle": "Premier à 5 bonnes réponses gagne."}];
const defis = [{"nom": "Pile ou Face", "regle": "Chaque joueur choisit pile ou face. Une tentative. Celui qui devine juste gagne."}, {"nom": "Chifoumi", "regle": "Une manche de pierre-feuille-ciseaux. Gagnant = +3."}, {"nom": "Pompes", "regle": "Le plus de pompes en 30s gagne."}, {"nom": "Le Cri d’Animal", "regle": "Imitation d’animaux. Groupe vote pour le meilleur."}];

function lancerEpreuve() {
    const zone = document.getElementById("zone");
    zone.innerHTML = "";
    const shuffled = [...players].sort(() => 0.5 - Math.random());
    equipes = [
        shuffled.slice(0, 3),
        shuffled.slice(3, 6),
        shuffled.slice(6, 10),
        shuffled.slice(10, 14)
    ];
    const e1 = epreuves[Math.floor(Math.random() * epreuves.length)];
    const e2 = epreuves[Math.floor(Math.random() * epreuves.length)];
    zone.innerHTML += `<h2>Match 1</h2>
        <p><strong>Équipe 1 :</strong> ${equipes[0].join(", ")}</p>
        <p><strong>Équipe 2 :</strong> ${equipes[1].join(", ")}</p>
        <p><strong>Épreuve :</strong> ${e1.nom}<br><em>${e1.regle}</em></p>
        <label><input type="radio" name="m1" value="0"> Équipe 1</label>
        <label><input type="radio" name="m1" value="1"> Équipe 2</label>`;
    zone.innerHTML += `<h2>Match 2</h2>
        <p><strong>Équipe 3 :</strong> ${equipes[2].join(", ")}</p>
        <p><strong>Équipe 4 :</strong> ${equipes[3].join(", ")}</p>
        <p><strong>Épreuve :</strong> ${e2.nom}<br><em>${e2.regle}</em></p>
        <label><input type="radio" name="m2" value="2"> Équipe 3</label>
        <label><input type="radio" name="m2" value="3"> Équipe 4</label>`;
    const b = document.createElement("button");
    b.textContent = "Valider les résultats";
    b.onclick = enregistrerResultats;
    zone.appendChild(b);
}

function enregistrerResultats() {
    const m1 = document.querySelector('input[name="m1"]:checked');
    const m2 = document.querySelector('input[name="m2"]:checked');
    if (!m1 || !m2) return alert("Sélectionne un gagnant pour chaque match !");
    [m1.value, m2.value].map(v => equipes[v].forEach(p => scores[p] += 3));
    fin();
    proposerDefi();
}

function proposerDefi() {
    const zone = document.getElementById("zone");
    const [p1, p2] = [players[Math.floor(Math.random() * players.length)], players[Math.floor(Math.random() * players.length)]];
    if (p1 === p2) return proposerDefi();
    zone.innerHTML = `<h2>Défi interne</h2>
      <p><strong>${p1}</strong> défie <strong>${p2}</strong> !</p>
      <button onclick="defi('${p1}', '${p2}', true)">Accepter</button>
      <button onclick="defi('${p1}', '${p2}', false)">Refuser</button>`;
}

function defi(p1, p2, accepte) {
  let zone = document.getElementById("zone");
  if (accepte) {
    const defi = defis[Math.floor(Math.random() * defis.length)];
    zone.innerHTML = `<h2>Défi accepté</h2>
      <p><strong>Défi :</strong> ${defi.nom}</p>
      <p>${defi.regle}</p>
      <button onclick="afficherChoixGagnant('${p1}', '${p2}', '${defi.nom}')">Définir le gagnant</button>`;
  } else {
    scores[p1] += 1;
    scores[p2] -= 1;
    zone.innerHTML = `<p>${p2} refuse le défi. ${p1} +1 / ${p2} -1</p>`;
    fin();
  }
}

function afficherChoixGagnant(p1, p2, defiNom) {
  document.getElementById("zone").innerHTML = `
    <h2>Définir le gagnant</h2>
    <p>Défi : <strong>${defiNom}</strong></p>
    <button onclick="validerDefiManuel('${p1}', '${p2}', '${p1}', '${defiNom}')">${p1} a gagné</button>
    <button onclick="valide
