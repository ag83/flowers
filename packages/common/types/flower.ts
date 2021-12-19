export interface FlowerInfo {
    flowerId: number,
    floristId: number,
    stockLevel: number,
    tags: string[],
    image_urls: string[],
    storageLocation: [number, number],
    status: FlowerStockStatus
}

export type FlowerStockStatus = "in_stock" | "low_stock" | "out_of_stock";

export interface DeliveryUpdate {
    flowerId: number,
    amount: number,
    coordinates: [number, number],
    deliveryLocation: [number, number],
    status: FlowerDeliveryStatus
}

export type FlowerDeliveryStatus = `placed` | `en_route` | `delivered` | `unsuccessful`;

export interface FlowerInfoCreateRequest {
    floristId: number,
    stockLevel: number,
    tags: string[],
    image_urls: string[],
    storageLocation: [number, number],
    status: FlowerStockStatus
}

export interface FlowerStatus {
    stockLevel: number,
    status: FlowerStockStatus
}
export interface FlowerStatusEvent {
    flowerId: number,
    stockLevel: number,
    status: FlowerStockStatus
}

export interface FlowerStatusUpdate {
    stockLevel: number,
}

export interface FlowerStockRequest {
    floristId: number,
    flowerId: number,
    stockRequired: number,
}
