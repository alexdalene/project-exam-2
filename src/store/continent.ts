import { create } from 'zustand';

type Continent = {
  id: number;
  name: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
};

type ContinentStore = {
  continent: Continent;
  setContinent: (continents: Continent) => void;
  nextContinent: () => void;
  prevContinent: () => void;
};

const continents = [
  {
    id: 0,
    name: 'Europe',
    position: { x: 0.82, y: 4.3, z: -0.09 },
  },
  {
    id: 1,
    name: 'Asia',
    position: { x: 0, y: 0, z: 0 },
  },
  {
    id: 2,
    name: 'Africa',
    position: { x: 0, y: 0, z: 0 },
  },
  {
    id: 3,
    name: 'North America',
    position: { x: 0, y: 0, z: 0 },
  },
  {
    id: 4,
    name: 'South America',
    position: { x: 0, y: 0, z: 0 },
  },
  {
    id: 5,
    name: 'Oceania',
    position: { x: 0, y: 0, z: 0 },
  },
];

const getContinent = (currentId: number, offset: number) => {
  const index = (currentId + offset + continents.length) % continents.length;
  return continents[index];
};

const useContinentStore = create<ContinentStore>((set) => ({
  continent: continents[0],
  setContinent: (continent) => set({ continent }),
  nextContinent: () =>
    set((state) => ({
      continent: getContinent(state.continent.id, 1),
    })),
  prevContinent: () =>
    set((state) => ({
      continent: getContinent(state.continent.id, -1),
    })),
}));

export { useContinentStore };
