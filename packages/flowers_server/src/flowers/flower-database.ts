
class FlowersDataBase {

    private items: FlowerInfo[]

    constructor() {
        this.items = [];
    }

    public saveFlower(flowerRequest: FlowerInfoCreateRequest): Promise<FlowerInfo> {
        return new Promise((resolve, reject) => {
            const newFlower: FlowerInfo = {
                flowerId: this.createFlowerId(),
                ...flowerRequest
            }
            this.items.push(newFlower);
            resolve(newFlower);
        })
    }

    public getFlowers(): Promise<FlowerInfo[]> {
        return new Promise((resolve, reject) => {
            resolve(this.items);
        })
    }

    public getFlowerById(id: number): Promise<FlowerInfo> {
        return new Promise((resolve, reject) => {
            const flower = this.items.find((item) => item.flowerId === id);
            if (flower) {
                resolve(flower);
            } else {
                reject('item not found')
            }
        })
    }

    public putFlower(flower: FlowerInfo): Promise<FlowerInfo> {
        return new Promise((resolve, reject) => {
            const flowerIndex = this.items.findIndex((item) => item.flowerId === flower.flowerId);
            if (flowerIndex !== -1) {
                this.items[flowerIndex] = flower;
                resolve(flower);
            } else {
                reject('item not found')
            }
        })
    }

    private createFlowerId(): number {
        if (this.items.length  !== 0) {
            return this.items[this.items.length - 1].flowerId + 1;
        } else {
            return 1;
        }
    }



}

export default new FlowersDataBase();