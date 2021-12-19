import flowersDataBase from "./flower-database";
import { FlowerInfoCreateRequest } from '@flowers/common/types/flower';

export function autoFill() {
    Promise.all(data.map((item) => flowersDataBase.saveFlower(item)))
}

const data: FlowerInfoCreateRequest[] = [
    {
        "floristId": 123,
        "stockLevel": 21,
        "tags": [
            "red",
            "romance"
          ],
        "image_urls": [
          "images/orange",
          "images/orange"
        ],
        "storageLocation": [51.7014, 0.1619],
        "status": "in_stock"
    },
    {
        "floristId": 123,
        "stockLevel": 91,
        "tags": [
            "red",
            "romance"
          ],
        "image_urls": [
          "images/blue",
          "images/blue"
        ],
        "storageLocation": [51.5014, 0.1419],
        "status": "in_stock"
    },
    {
        "floristId": 123,
        "stockLevel": 5,
        "tags": [
            "red",
            "romance"
          ],
        "image_urls": [
          "images/purple",
          "images/purple"
        ],
        "storageLocation": [51.3014, 0.1119],
        "status": "low_stock"
    }
]