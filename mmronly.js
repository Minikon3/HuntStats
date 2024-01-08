function parseXML() {
    const fileInput = document.getElementById('fileInput');
    const playersContainer = document.getElementById('playersContainer');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const xmlString = e.target.result;
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

            displayPlayers(xmlDoc);
        };

        reader.readAsText(file);
    } else {
        alert('Выберите XML файл');
    }
}

function displayPlayers(xmlDoc) {
    const playersContainer = document.getElementById('playersContainer');
    playersContainer.innerHTML = '';
    index = 0
    const playerNodes = xmlDoc.querySelectorAll('Attr[name$="_blood_line_name"]');
    playerNodes.forEach((playerNode) => {
        const playerId = playerNode.getAttribute('name').match(/\d+/g).join('_');
        const playerName = playerNode.getAttribute('value');
        const playerMMR = xmlDoc.querySelector(`[name$="${playerId}_mmr"]`).getAttribute('value');

        const card = document.createElement('div');
        card.classList.add('card', `card-gradient-${index % 2 + 1}`);
        card.innerHTML = `
            <h3>Игрок ${index + 1}</h3>
            <p>Никнейм игрока: "${playerName}"</p>
            <p>Рейтинг игрока: "${playerMMR}"</p>
        `;
        index = index+1;

        playersContainer.appendChild(card);
    });
}
