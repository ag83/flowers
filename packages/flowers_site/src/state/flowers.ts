import { atom, selector,  selectorFamily, DefaultValue } from 'recoil';

import { getFlowers } from '../flowers-api';

export const fetchAllFlowers = selector<FlowerInfo[]>({
    key: 'allFlowersSelector',
    get: async ({ get}) => {
        return await getFlowers();
    }
});

export const allFlowers = atom<FlowerInfo[]>({
    key: 'allFlowers',
    default: fetchAllFlowers,
});


export const selectFlower = selectorFamily<FlowerInfo | null, number>({
    key: 'flowerSelector',
    get: (id: number) => async ({get}) => {
        const all = await get(allFlowers);
        const foundFlower = all.find((item: FlowerInfo) => item.flowerId === id);
        return foundFlower ? foundFlower : null;
    },
    set: (id: number) => ({set, get}, newValue) => {
        if (newValue !== null && !(newValue instanceof DefaultValue) && newValue.flowerId === id) {
            const all = get(allFlowers);
            const newAll = all.map((item) => {
                if (item.flowerId === id) {
                    return newValue;
                }
                return item;
            })
            set(allFlowers, newAll);
        }
    },

});
