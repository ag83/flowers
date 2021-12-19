import axios from 'axios';

import { FlowerInfo, FlowerStatusUpdate } from '@flowers/common/types/flower';
import { SERVER_URL } from '@flowers/common/constants/constants';

const instance = axios.create({
    baseURL:  SERVER_URL,
    timeout: 5000
  });

export async function getFlowers(): Promise<FlowerInfo[]> {
    try {
        const response = await instance.get(`/flowers`);
        return response.data as FlowerInfo[];
    } catch(error){
        console.error(error);
        return [];
    }
}

export async function changeFlowerStock(id: number, amount: number): Promise<FlowerInfo> {
    try {
        const request: FlowerStatusUpdate = {stockLevel: amount};
        const response = await instance.patch(`/flowers/${id}/status`, request);
        return response.data as FlowerInfo;
    } catch(error){
        throw error;
    }
}
