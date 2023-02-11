import React from "react";
import style from "../returnForm/ReturnForm.module.css";
import {
    Controller,
    useWatch,
    FieldValues,
    Control,
    FieldErrors,
    UseFormSetValue,
} from "react-hook-form";
import CheckBox from "../ui/checkBox/CheckBox";
import TextBox from "../ui/textBox/TextBox";
import SelectBox from "../ui/selectBox/SelectBox";
import {IFiledsetCheckControl, IReturnSkuItemModel, ISelectBoxItem} from "../../data/interface";
import {products} from "../../data/constants";

interface Props {
    index: number;
    control: Control<FieldValues, any>;
    filedsetCheckControls: IFiledsetCheckControl[];
    setFiledsetCheckControls: (value:IFiledsetCheckControl[])=>void;
    errors: FieldErrors<FieldValues>;
    returnReasons: ISelectBoxItem[];
    setValue: UseFormSetValue<FieldValues>;
    skuItem:IReturnSkuItemModel;   
}

const SkuItem = ({
    index,
    control,
    filedsetCheckControls,
    setFiledsetCheckControls,
    errors,
    setValue,
    returnReasons,
    skuItem,    
}: Props) => {

    const QuantityValidate = ({itemIndex}: {itemIndex: number;}) =>{
        const item = useWatch({control, name: `items[${itemIndex}]`});
        let message = ``;
        if (item.isSelected && item.newQuantity > item.quantity)
            message = "quantity must be less or equal the shipped quantity";

        return <small className={style.errorMsg}>{message}</small>;
    };  

    const sku = (productId:number) => products.find(item => item.id == productId)?.sku;

    return (
        <fieldset
            disabled={!filedsetCheckControls[index].status}
            className={style.fieldset}
        >
            <legend>
                <Controller
                    control={control}
                    name={`items[${index}].isSelected`}
                    defaultValue={""}   
                    rules={{
                        required: false,
                        validate:()=>(filedsetCheckControls.filter(item => item.status).length >= 1)
                    }}              
                    render={({field: {onChange}}) => (
                        <CheckBox
                            className={style.radioButton}
                            label={`Product Sku (${sku(skuItem.productId)}) - Quantity (${skuItem.quantity})`}
                            onChange={(value: boolean) => {
                                onChange(value);

                                setFiledsetCheckControls(
                                    filedsetCheckControls.map((item: any) => {
                                        if (item.index == index) return {...item, status: value};
                                        return {...item};
                                    })
                                );

                                if (!value) {
                                    setValue(`items[${index}]`, {
                                        newQuantity: "",
                                        reason: undefined,
                                        annotation: "",
                                        isSelected: false,
                                    });
                                }
                            }}
                        />
                    )}
                />
            </legend>

            <Controller
                control={control}
                name={`items[${index}].newQuantity`}
                defaultValue={""}
                rules={{
                    required: filedsetCheckControls[index].status,
                }}
                render={({field: {onChange,value}}) => (
                    <TextBox
                        className={style.input}
                        value={value}
                        type="number"
                        onChange={(e) => {
                            const currentValue = e.target.value;
                            onChange(currentValue);
                        }}
                        placeholder="New Quantity"
                    />
                )}
            />

            <QuantityValidate
                key={`QuantityValidate-${index}`}               
                itemIndex={index}
            ></QuantityValidate>

            {errors.items && (errors as any).items[index]?.newQuantity && (
                <small className={style.errorMsg}>Please Enter The Quantity</small>
            )}

            <Controller
                control={control}
                name={`items[${index}].reason`}
                defaultValue={""}
                rules={{required: filedsetCheckControls[index].status}}
                render={({field: {onChange}}) => (
                    <SelectBox
                        className={style.input}
                        items={returnReasons}
                        onChange={(event) => {
                            onChange(event.target.value);
                        }}
                    />
                )}
            />
            {errors.items && (errors as any).items[index]?.reason && (
                <small className={style.errorMsg}>Please Select One Item.</small>
            )}

            <Controller
                control={control}
                name={`items[${index}].annotation`}
                defaultValue={""}
                rules={{
                    required: false,
                }}
                render={({field: {onChange,value}}) => (
                    <TextBox
                        className={style.input}
                        value={value}
                        type="textArea"
                        onChange={(e) => {
                            const currentValue = e.target.value;
                            onChange(currentValue);
                        }}
                        placeholder="Annotation"
                    />
                )}
            />

            {errors.items && (errors as any).items[index]?.annotation && (
                <small className={style.errorMsg}>Please Enter The Annotation</small>
            )}
        </fieldset>
    );
};

export default SkuItem;
