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

export interface ISkuItem {
    deliveryId:number,
    deliveryOrderId:string,
    id:number,
    name?:number,
    productId:number,
    quantity:number,
    sku?:string, 

    skuChecked:boolean,
    newQuantity:string,
    reasonsId:number,
    annotations:string        
}

export interface IReturnFormData{
    logidticansId:number,
    warehouseId:number,
    deliveryId:number,
    deliveryOrderId:string,
    skuData:ISkuItem[],
}

export interface IFormValidate{
    isError:boolean,
    error:string,
    elementId:string

}





export interface IReturnModel {
    logisticanId: number;
    logisticanText: number;
    warehouseId: number;
    warehouseText: number;
    delivery: string;
    deliveryId: string;
    items: Array<IReturnSkuItemModel>;
  }
  
  export interface IReturnSkuItemModel {
    isSelected: boolean;
    newQuantity: number;
    reason: number;
    reasonText: number;
    annotation: string;
  }