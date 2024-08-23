import { useEffect, useState } from "react";
import { GetCharacterDetails } from "@/api/charactersAPI";

export const CharacterDetails = ({ onClose, character }) => {
    const [createdDate, setCreatedDate] = useState(() => {
        const date = new Date(character.created);
        return date.toLocaleDateString("es-CL");
    });
    const [homeworld, setHomeworld] = useState(null);

    useEffect(() => {
        const fetchHomeworld = async () => {
            try {
                const response = await GetCharacterDetails(character.homeworld);
                setHomeworld(response);
            } catch (error) {
                console.error('Error fetching data:', error);
                alert("Error fetching data. Try later, please")
            }
        };

        fetchHomeworld();
    }, [character.homeworld]);

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center p-4 bg-gray-500 bg-opacity-75">
            {
                homeworld !== null ? (
                    <div className="p-6 min-w-80 max-w-lg rounded-lg bg-white">
                        <h2 className="text-2xl font-semibold text-gray-900 text-center">
                            {character.name}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-x-6">
                            <p className="mt-2 text-gray-500">Height: {character.height / 100} m</p>
                            <p className="mt-2 text-gray-500">Mass: {character.mass}</p>
                            <p className="mt-2 text-gray-500">Added: {createdDate}</p>
                            <p className="mt-2 text-gray-500">Films: {character.films.length}</p>
                            <p className="mt-2 text-gray-500">Birth year: {character.birth_year}</p>
                        </div>
                        <h3 className="mt-3 text-xl font-semibold text-gray-900 text-center">Homeworld</h3>
                        <div className="grid md:grid-cols-2 gap-x-6">
                            <p className="mt-2 text-gray-500">Name: {homeworld?.name}</p>
                            <p className="mt-2 text-gray-500">Terrain: {homeworld?.terrain}</p>
                            <p className="mt-2 text-gray-500">Climate: {homeworld?.climate}</p>
                            <p className="mt-2 text-gray-500">Residents: {homeworld?.residents.length}</p>
                        </div>
                        <div className="pt-4 flex justify-end">
                            <button
                                onClick={onClose}
                                className="w-full sm:w-auto bg-white text-sm text-gray-900 px-3 py-2 font-semibold rounded-md
                        border-2 border-gray-300 hover:bg-gray-100"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                ) : <div className={"flex flex-col text-2xl text-center items-center"}>Loading...</div>
            }
        </div>
    );
};
