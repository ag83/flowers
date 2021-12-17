import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { SERVER_URL } from '../constants';
import { allFlowers } from '../state/flowers';

export const useFlowerEvents = () => {

    const [flowers, setFlowers] = useRecoilState(allFlowers);

    useEffect(() => {
        const source = new EventSource(`${SERVER_URL}/flowers/updates`);
        console.log('subscribe');
        source.onopen = () => console.log("Connected");
        source.onerror = console.error;
        source.onmessage = event => {
            const flowerUpdate = JSON.parse(event.data) as FlowerStatusEvent;
            const foundFlowerIndex = flowers.findIndex((item) => item.flowerId === flowerUpdate.flowerId);
            if (foundFlowerIndex !== -1) {
                const foundFlower = flowers[foundFlowerIndex ];
                const updatedFlower = {
                    ...foundFlower,
                    stockLevel: flowerUpdate.stockLevel,
                    status: flowerUpdate.status,
                };

                const updatedFlowers = flowers.map((item) => {
                    return {...item}
                });
                updatedFlowers[foundFlowerIndex ] = updatedFlower;
                setFlowers(updatedFlowers)
            }
        }

        return () => {
            console.log('unsubscribe');
            source.close();
        };

    }, []);

};