export interface PokemonDetail {
  id: number;
  name: string;
  types: [
    { slot: number; type: { name: string; url: string } },
    { slot: number; type: { name: string; url: string } }
  ];
  abilities: [
    {
      ability: { name: string; url: string };
      is_hidden: boolean;
      slot: number;
    },
    { ability: { name: string; url: string }; is_hidden: boolean; slot: number }
  ];
  base_experience: number;
  game_indices: [];
  height: number;
  weight: number;
  held_items: [];
  is_default: boolean;
  location_area_encounters: string;
  moves: [];
  order: number;
  past_abilities: [];
  past_types: [];
  species: {};
  sprites: {
    back_default: string;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
    other: {};
    versions: {};
  };
  stats: [];
}
