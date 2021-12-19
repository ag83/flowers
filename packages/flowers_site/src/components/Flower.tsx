import React, {FC, Suspense, useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { Carousel, Image, Tag, Divider, Row, Col, InputNumber, Button, Space } from 'antd';

import { FlowerInfo } from '@flowers/common/types/flower';
import { SERVER_URL } from '@flowers/common/constants/constants';
import { selectFlower } from '../state/flowers';
import { changeFlowerStock } from '../flowers-api';

const Flower: FC = () => {
    return (
        <Suspense fallback={<div>Loading flower...</div>}>
            <FlowerSuspense/>
        </Suspense>
    );
}

const FlowerSuspense: FC = () => {

    const { flowerId } = useParams<{ flowerId: string }>();
    const [flower, setFlower] = useRecoilState(selectFlower(parseInt(flowerId)));
    const [stockValue, setStockValue] = useState<number>(() => {
        return flower?.stockLevel ? flower.stockLevel : 0;
    });

    useEffect(() => {
        setStockValue(() => {
            return flower?.stockLevel ? flower.stockLevel : 0;
        })
    }, [flower])
    

    const onStockChange = (newValue: number) => {
        setStockValue(newValue);
    }

    const onStockSave = () => {
        if (flower) {
            changeFlowerStock(flower.flowerId, stockValue).then((res: FlowerInfo) => {
                setFlower(res)
            })
        }
    }


    return (
        <Row justify="center">
            <Col xs={24} sm={16} md={8} lg={6}>
                <Carousel effect="fade">
                    {flower && flower.image_urls.map((url) => {
                        return (<Image
                                    alt="flower"
                                    key={url}
                                    width={400}
                                    src={ `${SERVER_URL}/public/${url}.jpg`}
                                />)
                    })}
                </Carousel>
                <Divider orientation="left">Tags</Divider>
                <div>
                    {flower && flower.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                </div>
                <Divider orientation="left">Status</Divider>
                <div>
                    {flower && flower.status}
                </div>
                <Divider orientation="left">Change Stock Level</Divider>
                <div>
                    <Space>
                        <InputNumber min={0} max={100000} value={stockValue} onChange={onStockChange} />
                        <Button
                            type="primary"
                            onClick={onStockSave}
                        >
                            Save
                        </Button>
                    </Space>
                </div>
            </Col>

        </Row>
    );
    

}

export default Flower;