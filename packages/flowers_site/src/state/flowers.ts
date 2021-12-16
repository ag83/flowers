import { selector,  RecoilValueReadOnly } from 'recoil';
import axios from 'axios'

import { SERVER_URL } from '../constants';

export const fetchAllFlowers: RecoilValueReadOnly<FlowerInfo[]> = selector({
    key: 'allFlowersSelector',
    get: async ({ get }) => {
        try{
            const response = await axios.get(`${SERVER_URL}/flowers`);
            return response.data as FlowerInfo[];
        }catch(error){
            throw error;
        }
    }
});