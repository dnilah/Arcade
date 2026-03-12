const STORAGE_KEY = 'gameArcade';

function getData() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch (e) {
        console.error('Failed to parse storage data:', e);
        return {};
    }
}

function saveData(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('Failed to save storage data:', e);
        return false;
    }
}

export function getBestScore(gameId) {
    const data = getData();
    return data[gameId]?.bestScore || 0;
}

export function saveBestScore(gameId, score) {
    const data = getData();
    
    if (!data[gameId]) {
        data[gameId] = {};
    }
    if (score > (data[gameId].bestScore || 0)) {
        data[gameId].bestScore = score;
        saveData(data);
        return true;
    }

    return false;
}

export function getGameData(gameId , key) {
    const data = getData();
    return data[gameId]?.[key];
}

export function saveGameData(gameId, key, value) {
    const data = getData();
    if (!data[gameId]) {
        data[gameId] = {};
    }
    data[gameId][key] = value;
    saveData(data);
}

export function clearGameData(gameId) {
    const data = getData();
    delete data[gameId];
    saveData(data);
}

export function clearAllData() {
    localStorage.removeItem(STORAGE_KEY);
}
