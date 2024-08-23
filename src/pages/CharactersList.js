"use client";

import { useEffect, useState } from "react";
import { GetCharacters, GetCharacterDetails, GetSpecies } from "@/api/charactersAPI";
import { Pagination } from "@/components/Pagination";
import { CharacterCard } from "@/components/CharacterCard";
import { getRandomColor } from "@/helpers/color";

export default function CharactersList() {
    const [page, setPage] = useState(1);
    const [charactersList, setCharactersList] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [speciesColors, setSpeciesColors] = useState({});

    const fetchSpeciesAndColors = async () => {
        let species = [];
        let pageNum = 1;

        while (true) {
            const response = await GetSpecies(pageNum);
            if (!response)
                break;

            species = [...species, ...response.results.map(s => s.name)];
            if (!response.next)
                break;

            pageNum++;
        }

        const colors = species.reduce((acc, species) => {
            if (!acc[species]) {
                acc[species] = getRandomColor();
            }
            return acc;
        }, {});

        setSpeciesColors(colors);
    };

    const fetchData = async () => {
        setLoading(true);

        try {
            const response = await GetCharacters(page);
            if (!response) {
                throw new Error("Failed to fetch characters");
            }

            const results = await Promise.all(
                response.results.map(async (character) => {
                    const speciesData = await Promise.all(
                        character.species.map((url) => GetCharacterDetails(url))
                    );
                    const species = speciesData.length > 0 ? speciesData[0].name : "Unknown";
                    return {...character, species, color: speciesColors[species] || "#000"};
                })
            );

            setCharactersList({ ...response, results });
            setLoading(false);
        } catch (err) {
            throw new Error(`Error: ${err.message}`);
        }
    };

    useEffect(() => {
        fetchSpeciesAndColors();
    }, []);

    useEffect(() => {
        if (Object.keys(speciesColors).length > 0)
            fetchData();
    }, [page, speciesColors]);

    const handleCharacterClick = (character) => {
        setSelectedCharacter(c => (c && c.name === character?.name ? null : character));
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-around p-10 lg:p-20">
            <h2 className={"text-3xl font-bold text-gray-900 text-center"}>Star Wars Characters</h2>
            {!loading ?
                (
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-10 py-10 lg:py-20 md:grid-cols-3 lg:mx-0
            lg:max-w-none lg:grid-cols-5">
                        {charactersList?.results.map((character) => (
                            <CharacterCard
                                key={character.name}
                                character={character}
                                onClick={handleCharacterClick}
                                selected={selectedCharacter}
                            />
                        ))}
                    </div>
                ) : (
                    <div className={"flex flex-col text-2xl text-center items-center justify-around p-52"}>
                        Loading...
                    </div>
                )}
            <Pagination
                page={page}
                changePage={setPage}
                isPrevDisabled={!charactersList?.previous}
                isNextDisabled={!charactersList?.next}
            />
        </main>
    );
}
