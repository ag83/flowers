import React, {FC, Suspense} from 'react';
import { useRecoilValue } from 'recoil';

import { fetchAllFlowers } from '../state/flowers';

const Flowers: FC = () => {
    return (
        <Suspense fallback={<div>Loading flowers...</div>}>
            <FlowersSuspense/>
        </Suspense>
    );
}

const FlowersSuspense: FC = () => {
    const flowers = useRecoilValue(fetchAllFlowers);

    return (
        <div>
            {
                flowers.map(item => (
                        <div key={item.flowerId}>
                            <p>
                                {`Status: ${item.status}`}. 
                            </p>
                        </div>
                    )
                )
            }
        </div>
    );
}

export default Flowers;