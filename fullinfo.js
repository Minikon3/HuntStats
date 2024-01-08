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
        const playerBountyExtracted = xmlDoc.querySelector(`[name$="${playerId}_bountyextracted"]`).getAttribute('value');
        const playerBountyPickedUp = xmlDoc.querySelector(`[name$="${playerId}_bountypickedup"]`).getAttribute('value');
        const playerDownedByMe = xmlDoc.querySelector(`[name$="${playerId}_downedbyme"]`).getAttribute('value');
        const playerDownedByTeammate = xmlDoc.querySelector(`[name$="${playerId}_downedbyteammate"]`).getAttribute('value');
        const playerDownedMe = xmlDoc.querySelector(`[name$="${playerId}_downedme"]`).getAttribute('value');
        const playerDownedTeammate = xmlDoc.querySelector(`[name$="${playerId}_downedteammate"]`).getAttribute('value');
        const playerHadWellspring = xmlDoc.querySelector(`[name$="${playerId}_hadWellspring"]`).getAttribute('value');
        const playerHadBounty = xmlDoc.querySelector(`[name$="${playerId}_hadbounty"]`).getAttribute('value');
        const playerIsPartner = xmlDoc.querySelector(`[name$="${playerId}_ispartner"]`).getAttribute('value');
        const playerIsSoulSurvivor = xmlDoc.querySelector(`[name$="${playerId}_issoulsurvivor"]`).getAttribute('value');
        const playerKilledByMe = xmlDoc.querySelector(`[name$="${playerId}_killedbyme"]`).getAttribute('value');
        const playerKilledByTeammate = xmlDoc.querySelector(`[name$="${playerId}_killedbyteammate"]`).getAttribute('value');
        const playerKilledMe = xmlDoc.querySelector(`[name$="${playerId}_killedme"]`).getAttribute('value');
        const playerKilledTeammate = xmlDoc.querySelector(`[name$="${playerId}_killedteammate"]`).getAttribute('value');
        const playerProfileID = xmlDoc.querySelector(`[name$="${playerId}_profileid"]`).getAttribute('value');
        const playerProximity = xmlDoc.querySelector(`[name$="${playerId}_proximity"]`).getAttribute('value');
        const playerProximityToMe = xmlDoc.querySelector(`[name$="${playerId}_proximitytome"]`).getAttribute('value');
        const playerProximityToTeammate = xmlDoc.querySelector(`[name$="${playerId}_proximitytoteammate"]`).getAttribute('value');
        const playerSkillBased = xmlDoc.querySelector(`[name$="${playerId}_skillbased"]`).getAttribute('value');
        const playerTeamExtraxtion = xmlDoc.querySelector(`[name$="${playerId}_teamextraction"]`).getAttribute('value');
        

        const card = document.createElement('div');
        card.classList.add('card', `card-gradient-${index % 2 + 1}`);
        card.innerHTML = `
            <h3>Игрок ${index + 1}</h3>
            <p>Никнейм игрока: "${playerName}"</p>
            <p>Рейтинг игрока: "${playerMMR}"</p>
            ${playerBountyExtracted === 1 ? '<p>Игрок вышел с наградой</p>' : ''}
            ${playerBountyPickedUp === 1 ? '<p>Игрок подобрал награду</p>' : ''}
            ${playerDownedByMe === 1 ? '<p>Игрок повален Вами</p>' : ''}
            ${playerDownedByTeammate === 1 ? '<p>Игрок повален Вашим союзником</p>' : ''}
            ${playerDownedMe === 1 ? '<p>Игрок повалил Вас</p>' : ''}
            ${playerDownedTeammate === 1 ? '<p>Игрок повалил Вашего союзника</p>' : ''}
            ${playerHadWellspring === "true" ? '<p>Игрок имел источник (быстрая игра)</p>' : ''}
            ${playerHadBounty === "true" ? '<p>Игрок имел награду</p>' : ''}
            ${playerIsPartner === "true" ? '<p>Игрок Ваш союзник</p>' : ''}
            ${playerIsSoulSurvivor === "true" ? '<p>Игрок остался последним выжившим (быстрая игра)</p>' : ''}
            ${playerBountyPickedUp === 1 ? '<p>Игрок убил Вас</p>' : ''}
            ${playerBountyPickedUp === 1 ? '<p>Игрок убил Вашего союзника</p>' : ''}
            ${playerKilledByMe === 1 ? '<p>Игрок убит Вами</p>' : ''}
            ${playerKilledByTeammate === 1 ? '<p>Игрок убит Вашим союзником</p>' : ''}
            ${playerKilledMe === 1 ? '<p>Игрок убил Вас</p>' : ''}
            ${playerKilledTeammate === 1 ? '<p>Игрок убил Вашего союзника</p>' : ''}            
            <p>ID игрока в игре: "${playerProfileID}"</p>
            ${playerProximity === "true" ? '<p>У вас один и тот же IP с этим игроком</p>' : ''}
            <p>Подбор игрока: "${playerSkillBased === "true" ? 'По рейтингу' : 'Без рейтинга'}"</p>
            ${playerTeamExtraxtion === "true" ? '<p>Команда вышла</p>' : ''}
        `;
        index = index+1;

        playersContainer.appendChild(card);
    });
}
