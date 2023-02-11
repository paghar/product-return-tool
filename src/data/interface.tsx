export interface ISelectBoxItem {
    id:number,
    text:string,
}

export interface IProduct{
    id:number,
    name:string,
    SKU:string,
}

export interface IOrder{
    id:number,
    deliveryId:number,
    deliveryOrderId:string,
    productId:number,
    quantity:number,
}

export interface IReturnSkuItemModel {
    isSelected: boolean;
    newQuantity: number;
    quantity:number
    reason: number;
    reasonText: string;
    annotation: string;
    productId:number
}

export interface IReturnModel {
    logisticanId: number;
    logisticanText?: string;
    warehouseId: number;
    warehouseText?: string;
    delivery: string;
    deliveryId: string;
    items: Array<IReturnSkuItemModel>;
}

export interface IFiledsetCheckControl{
    index:number,
    status:boolean,
}
