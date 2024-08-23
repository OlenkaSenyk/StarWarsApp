const url_api = "https://swapi.dev/api"

export async function GetCharacters(page = 1) {
    const res = await fetch(`${url_api}/people/?page=${page}`);
    if (!res.ok) throw new Error('Error');
    return await res.json();
}

export async function GetCharacterDetails(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Error');
    return await res.json();
}

export async function GetSpecies(page = 1) {
    const res = await fetch(`${url_api}/species/?page=${page}`);
    if (!res.ok) throw new Error('Error');
    return await res.json();
}