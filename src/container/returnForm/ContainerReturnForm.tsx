import {useEffect, useState} from "react";
import {FieldValues, useFieldArray, useForm} from "react-hook-form";
import ReturnForm from "../../components/returnForm/ReturnForm";
import {
    logisticans,
    orders,
    returnReasons,
    warehouses,
} from "../../data/constants";
import {deliveryType} from "../../data/enum";
import {validate as uuidValidate} from "uuid";
import {useDispatch} from "react-redux";
import {insertFormData} from "../../redux";
import {useRouter} from "next/router";
import {IReturnSkuItemModel,IFiledsetCheckControl} from "../../data/interface";

export default function ContainerReturnForm() {

    const dispatch = useDispatch();
    const router = useRouter();

    const {
        control,
        handleSubmit,
        reset,
        getValues,
        setValue,
        formState: {errors},
    } = useForm({});

    const {fields} = useFieldArray({control, name: "items"});
    const [deliveryText, setDeliveryText] = useState("Delivery Id");

    const [filedsetCheckControls, setFiledsetCheckControls] = useState<Array<IFiledsetCheckControl>>([]);

    const getCurrentDelivery = () => getValues("delivery");
    const getCurrentDeliveryId = () => getValues("deliveryId");

    useEffect(() => {
        reset({delivery: "DeliveryId"});
    }, []);  

    const deliveryCodeValidator = (value: any) => {
        const selectedDelivery = getCurrentDelivery();
        if (selectedDelivery == deliveryType.DeliveryId) return !isNaN(value);

        return uuidValidate(value);
    };

    const fillFiedlsetCheckBoxControlItems = (input: number) => {
        const fieldsetCheckItems = new Array(input).fill(null).map((_, index) => {
            return {index, status: false};
        });
        setFiledsetCheckControls([...fieldsetCheckItems]);
    };  

    const getSkuItemsBasedOnDeliveryId = () => {
        const products = orders
            .filter((order) => order.deliveryId == getCurrentDeliveryId())
            .map(({productId, quantity}) => {
                return {productId, quantity};
            });

        setValue("items", products);
        fillFiedlsetCheckBoxControlItems(products.length);
    };

    const getSkuItemsBasedOnDeliveryOrderId = () => {
        const products = orders
            .filter((order) => order.deliveryOrderId == getCurrentDeliveryId())
            .map(({productId, quantity}) => {
                return {productId, quantity};
            });

        setValue("items", products);
        fillFiedlsetCheckBoxControlItems(products.length);
    };

    const skuItemHandler = () => {
        if (!deliveryCodeValidator(getCurrentDeliveryId())) return;

        const selectedDelivery = getCurrentDelivery();
        if (selectedDelivery == deliveryType.DeliveryId) {
            getSkuItemsBasedOnDeliveryId();
            return;
        }

        getSkuItemsBasedOnDeliveryOrderId();
    };

    const onSubmit = (data: FieldValues) => {
        const logistican = logisticans.find((item) => item.id == data.logisticanId);
        const warehouse = warehouses.find((item) => item.id == data.warehouseId);

        data.items = data?.items?.map((item: IReturnSkuItemModel) => {
            const found = returnReasons.find((reson) => reson.id == item.reason);
            if (found) return {...item, reasonText: found.text};

            return item;
        });

        const result: FieldValues = {
            ...data,
            logisticanText: logistican?.text,
            warehouseText: warehouse?.text,
        };

        dispatch(insertFormData(result));
        router.push("/Summery");
    };

    return (
        <ReturnForm
            control={control}
            filedsetCheckControls={filedsetCheckControls}
            setFiledsetCheckControls={setFiledsetCheckControls} 
            errors={errors}
            setValue={setValue}
            returnReasons={returnReasons}           
            deliveryText={deliveryText}
            setDeliveryText={setDeliveryText}
            deliveryCodeValidator={deliveryCodeValidator}
            getCurrentDelivery={getCurrentDelivery}
            skuItemHandler={skuItemHandler}
            fields={fields}
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}         
        />
    );
}
