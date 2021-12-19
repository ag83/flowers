import React, {FC, Suspense} from 'react';
import { useRecoilValue } from 'recoil';
import { Card, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

import { SERVER_URL } from '@flowers/common/constants/constants';
import { allFlowers } from '../state/flowers';

const Flowers: FC = () => {
    return (
        <Suspense fallback={<div>Loading flowers...</div>}>
            <FlowersSuspense/>
        </Suspense>
    );
}

const FlowersSuspense: FC = () => {
    const flowers = useRecoilValue(allFlowers);
    return (
        <Row  justify="center">
            {
                flowers.map(item => (
                    <Col key={item.flowerId} xs={20} sm={12} md={8} lg={6} style={{ padding: '2rem' }}>
                        <Link to={`/${item.flowerId}`}>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={
                                    item.image_urls.length > 0 ? <img alt="flower" src={ `${SERVER_URL}/public/${item.image_urls[0]}.jpg`} /> : null
                                }
                                >
                                <p>Stock: {item.stockLevel}</p>
                                <p>Status: {item.status}</p>
                            </Card>
                        </Link>
                    </Col>
                    )
                )
            }
        </Row>
    );
}

export default Flowers;