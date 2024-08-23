import { CharacterDetails } from "@/components/CharacterDetails";

export function CharacterCard({ character, onClick, selected }) {
    return (
        <>
            <div
                key={character.name}
                onClick={() => onClick(character)}
                className={"rounded-lg text-center min-h-20 p-7 border-solid border-4 flex flex-col gap-2 relative " +
                    "bg-white cursor-pointer hover:drop-shadow-2xl hover:bg-blue-50"}
                style={{borderColor: character.color}}
            >
                <div className="absolute top-0 left-0 w-0 h-0 border-t-[50px] border-r-[50px] border-r-transparent"
                     style={{borderTopColor: character.color}}/>
                <h2 className={"text-xl"}>{character.name}</h2>
                <p>Specie: {character.species}</p>
            </div>
            {selected && selected.name === character.name && (
                <CharacterDetails onClose={() => onClick(null)} character={selected}/>
            )}
        </>
    );
}
