import { FC } from "react";
import { Character } from "../api/api-client-generated";

export interface CharacterCardProps {
  character: Character;
}

export const CharacterCard: FC<CharacterCardProps> = (props) => {
  const { character } = props;

  return (
    <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out border">
      <img
        className="w-full h-48 object-cover"
        src={character.image}
        alt={character.name}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{character.name}</div>
        <p className="text-gray-300 text-base">
          {character.species} - {character.status}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {character.episode?.slice(0, 3).map((ep, index) => (
          <span
            key={index}
            className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-400 mr-2 mb-2"
          >
            #Episode {ep.split("/").pop()}
          </span>
        ))}
      </div>
    </div>
  );
};
