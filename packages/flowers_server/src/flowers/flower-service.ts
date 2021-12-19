import Ajv, {ValidateFunction} from "ajv";
import axios from 'axios';

import flowersDataBase from "./flower-database";
import { PROVIDER_URL } from "@flowers/common/constants/constants";
import { FlowerInfo, DeliveryUpdate, FlowerStatusUpdate, FlowerStatus, FlowerInfoCreateRequest, FlowerStockRequest } from '@flowers/common/types/flower';

class FlowerService {

    private ajv: Ajv;
    private flowerValidator: ValidateFunction<unknown>;
    private updateValidator: ValidateFunction<unknown>;
    private statusValidator: ValidateFunction<unknown>;


    constructor() {
        this.ajv = new Ajv();
        const flowerSchema = {
            type: "object",
            properties: {
                floristId: {type: "integer"},
                stockLevel: {type: "integer"},
                tags: {type: "array",
                    "items" : {
                        type: "string"
                    }},
                image_urls: {type: "array",
                    "items" : {
                        type: "string"
                    }},
                storageLocation:  {type: "array",
                    maxItems: 2,
                    minItems: 2,
                    "items" : {
                        type: "number"
                    }
                },
                status: {enum: ["in_stock", "low_stock", "out_of_stock"]},
            },
            required: ["floristId", "stockLevel", "tags", "image_urls", "storageLocation", "status"],
            additionalProperties: false
        };
        this.flowerValidator = this.ajv.compile(flowerSchema);

        const updateSchema = {
            type: "object",
            properties: {
                flowerId: {type: "integer"},
                amount: {type: "integer"},
                coordinates:  {type: "array",
                    maxItems: 2,
                    minItems: 2,
                    "items" : {
                        type: "number"
                    }
                },
                deliveryLocation:  {type: "array",
                    maxItems: 2,
                    minItems: 2,
                    "items" : {
                        type: "number"
                    }
                },
                status: {enum: [`placed`, `en_route`, `delivered`, `unsuccessful`]},
            },
            required: ["flowerId", "amount", "status"],
            additionalProperties: false
        };
        this.updateValidator = this.ajv.compile(updateSchema);

        const statusSchema = {
            type: "object",
            properties: {
                stockLevel: {type: "integer"},
            },
            required: ["stockLevel"],
            additionalProperties: false
        };

        this.statusValidator = this.ajv.compile(statusSchema);

    }

    public validateFlowerRequest(flower: FlowerInfoCreateRequest): boolean {
        if (this.flowerValidator(flower)) {
            return true;
        } else {
            return false;
        }
    }

    public validateFlowerUpdate(update: DeliveryUpdate) {
        if (this.updateValidator(update)) {
            return true;
        } else {
            return false;
        }
    }

    public validateFlowerStatus(update: FlowerStatusUpdate) {
        if (this.statusValidator(update)) {
            return true;
        } else {
            return false;
        }
    }

    public async saveFlower(flowerRequest: FlowerInfoCreateRequest): Promise<FlowerInfo> {
        const newFlower = await flowersDataBase.saveFlower(flowerRequest);
        return newFlower;
    }

    public async getFlowers(): Promise<FlowerInfo[]> {
        const flowers = await flowersDataBase.getFlowers();
        return flowers;
    }

    public async getFlowerStatus(id: number): Promise<FlowerStatus> {
        const flower = await flowersDataBase.getFlowerById(id);
        return {
            stockLevel: flower.stockLevel,
            status: flower.status
        };
    }

    public async updateFlowerStatus(update: DeliveryUpdate): Promise<FlowerInfo> {
        let flower = await flowersDataBase.getFlowerById(update.flowerId);
        if (update.status === 'delivered') {
            let newAmount = flower.stockLevel + update.amount;
            let newStatus = flower.status;
            if (newAmount <= 10) {
                newStatus = "low_stock";
            }
            if (newAmount <= 0) {
                newStatus = "out_of_stock";
                newAmount = 0;
            }
            const updatedFlower = {
                ...flower,
                status: newStatus,
                stockLevel: newAmount
            };
            return await flowersDataBase.putFlower(updatedFlower);
        } else {
            return flower;
        } 
    }

    public async patchFlowerStatus(id: number, update: FlowerStatusUpdate) {
        let flower = await flowersDataBase.getFlowerById(id);
        let newStatus = flower.status;
        if (update.stockLevel <= 10) {
            this.notifyProvider(flower.flowerId, flower.floristId, 10); // notify provider
            newStatus = "low_stock";
        }
        if (update.stockLevel <= 0) {
            this.notifyProvider(flower.flowerId, flower.floristId, 10);
            newStatus = "out_of_stock";
        }
        const updatedFlower = {
            ...flower,
            stockLevel: update.stockLevel >= 0 ? update.stockLevel : 0,
            status: newStatus,
        };
        return await flowersDataBase.putFlower(updatedFlower);
    }

    private notifyProvider(flowerId: number, floristId: number, stock: number) {
        const request: FlowerStockRequest = {
            floristId: flowerId,
            flowerId: floristId,
            stockRequired: stock,
        };
        axios.post(PROVIDER_URL, request)
    }



}

export default new FlowerService();