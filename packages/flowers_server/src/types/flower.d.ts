declare interface FlowerInfo {
    flowerId: number,
    floristId: number,
    stockLevel: number,
    tags: string[],
    image_urls: string[],
    storageLocation: [number, number],
    status: FlowerStockStatus
}

type FlowerStockStatus = "in_stock" | "low_stock" | "out_of_stock";

declare interface DeliveryUpdate {
    flowerId: number,
    amount: number,
    coordinates: [number, number],
    deliveryLocation: [number, number],
    status: FlowerDeliveryStatus
}

type FlowerDeliveryStatus = `placed` | `en_route` | `delivered` | `unsuccessful`;

declare interface FlowerInfoCreateRequest {
    floristId: number,
    stockLevel: number,
    tags: string[],
    image_urls: string[],
    storageLocation: [number, number],
    status: FlowerStockStatus
}

declare interface FlowerStatus {
    stockLevel: number,
    status: FlowerStockStatus
}
declare interface FlowerStatusEvent {
    flowerId: number,
    stockLevel: number,
    status: FlowerStockStatus
}

declare interface FlowerStatusUpdate {
    stockLevel: number,
}

declare interface FlowerStockRequest {
    floristId: number,
    flowerId: number,
    stockRequired: number,
}
