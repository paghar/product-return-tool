import {deliveryType} from "./enum";

export const logisticans = [
    {id: 0, text: "Please Select logistican"},
    {id: 1, text: "Finecom"},
    {id: 2, text: "Best Solutions"},
    {id: 3, text: "Self Service"},
];

export const warehouses = [
    {id: 0, text: "Please Select Warehouses"},
    {id: 1, text: "Hamburg"},
    {id: 2, text: "Berlin"},
    {id: 3, text: "Plattling"},
    {id: 4, text: "Gelsenkirchen"},
    {id: 5, text: "Aschaffenburg"},
];

export const deliveryItems = [
    {
        id: deliveryType.DeliveryId,
        text: "Delivery Id",
    },
    {
        id: deliveryType.DeliveryOrderId,
        text: "Delivery Order Id",
    },
];

export const returnReasons = [
    {id: 0, text: "Please Select Reason"},
    {id: 1, text: "Not required"},
    {id: 2, text: "Damaged in transport"},
    {id: 3, text: "Faulty"},
    {id: 4, text: "Incorrect"},
    {id: 5, text: "Other"},
];

export const products = [
    {id: 1, name: "product 1", sku: "4567222300101"},
    {id: 2, name: "product 2", sku: "4567222300102"},
    {id: 3, name: "product 3", sku: "4567222300103"},
    {id: 4, name: "product 4", sku: "4567222300104"},
    {id: 5, name: "product 5", sku: "4567222300105"},
    {id: 6, name: "product 6", sku: "4567222300106"},
    {id: 7, name: "product 7", sku: "4567222300107"},
    {id: 8, name: "product 8", sku: "4567222300108"},
    {id: 9, name: "product 9", sku: "4567222300109"},
    {id: 10, name: "product 10", sku: "4567222300110"},
];

export const orders = [
    {
        id: 1,
        deliveryId: 1,
        deliveryOrderId: "6b2a61f2-44ef-4934-b4c7-5ab08e6e02c3",
        productId: 1,
        quantity: 3,
    },
    {
        id: 1,
        deliveryId: 1,
        deliveryOrderId: "6b2a61f2-44ef-4934-b4c7-5ab08e6e02c3",
        productId: 2,
        quantity: 10,
    },
    {
        id: 1,
        deliveryId: 1,
        deliveryOrderId: "6b2a61f2-44ef-4934-b4c7-5ab08e6e02c3",
        productId: 3,
        quantity: 6,
    },
    {
        id: 1,
        deliveryId: 1,
        deliveryOrderId: "6b2a61f2-44ef-4934-b4c7-5ab08e6e02c3",
        productId: 5,
        quantity: 12,
    },

    {
        id: 1,
        deliveryId: 2,
        deliveryOrderId: "bc5f4253-47c5-4ae8-bd41-7f13c5994ea5 ",
        productId: 4,
        quantity: 10,
    },
    {
        id: 1,
        deliveryId: 2,
        deliveryOrderId: "bc5f4253-47c5-4ae8-bd41-7f13c5994ea5 ",
        productId: 1,
        quantity: 8,
    },
    {
        id: 1,
        deliveryId: 2,
        deliveryOrderId: "bc5f4253-47c5-4ae8-bd41-7f13c5994ea5 ",
        productId: 2,
        quantity: 7,
    },
    {
        id: 1,
        deliveryId: 2,
        deliveryOrderId: "bc5f4253-47c5-4ae8-bd41-7f13c5994ea5 ",
        productId: 5,
        quantity: 1,
    },

    {
        id: 1,
        deliveryId: 3,
        deliveryOrderId: "85b472a5-514a-4378-bf14-43c09f3ab3d6 ",
        productId: 10,
        quantity: 30,
    },
    {
        id: 1,
        deliveryId: 3,
        deliveryOrderId: "85b472a5-514a-4378-bf14-43c09f3ab3d6 ",
        productId: 7,
        quantity: 18,
    },

    {
        id: 1,
        deliveryId: 4,
        deliveryOrderId: "84cdd845-3453-49ae-9d97-12bd7af7e37e",
        productId: 5,
        quantity: 1,
    },
    {
        id: 1,
        deliveryId: 4,
        deliveryOrderId: "84cdd845-3453-49ae-9d97-12bd7af7e37e",
        productId: 6,
        quantity: 10,
    },
];
