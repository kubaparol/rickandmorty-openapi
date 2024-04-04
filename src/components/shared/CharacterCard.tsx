import { Character } from "@/src/api";

export interface CharacterCardProps {
  character: Character;
}

export const CharacterCard = (props: CharacterCardProps) => {
  const { character } = props;

  return (
    <div className="flex flex-col relative overflow-hidden w-full aspect-square rounded-2xl">
      <img src={character.image} alt={character.name} />
      <div className="p-3 overflow-hidden backdrop-blur-md backdrop-saturate-150 absolute bg-black/40 bottom-2 left-2 right-2 z-10 rounded-2xl shadow-2xl">
        <h3 className="text-xl font-bold text-white">{character.name}</h3>
        <p className="text-md text-gray-300">
          {character.species} - {character.status}
        </p>
      </div>
    </div>
  );
};
