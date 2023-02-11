import {
    Control,
    Controller,
    FieldErrors,
    FieldValues,
    SubmitHandler,
    UseFormHandleSubmit,
    UseFormSetValue
} from "react-hook-form";
import style from "./ReturnForm.module.css";
import Button from "../ui/button/Button";
import RadioButton from "../ui/radioButton/RadioButton";
import SelectBox from "../ui/selectBox/SelectBox";
import TextBox from "../ui/textBox/TextBox";
import {
    deliveryItems,
    logisticans,
    warehouses,    
} from "../../data/constants";
import {deliveryType} from "../../data/enum";
import SkuItem from "./SkuItem";
import {IFiledsetCheckControl,ISelectBoxItem} from "../../data/interface";

interface Props {
    control: Control<FieldValues, any>;
    filedsetCheckControls: IFiledsetCheckControl[];
    setFiledsetCheckControls: (value:IFiledsetCheckControl[])=>void;
    errors: FieldErrors<FieldValues>;
    returnReasons: ISelectBoxItem[];
    setValue:  UseFormSetValue<FieldValues>;    
    deliveryText:string;
    setDeliveryText:(value:string)=>void;
    deliveryCodeValidator:(value: any) => boolean,
    getCurrentDelivery: () => string,
    skuItemHandler: () => void,
    fields:any
    onSubmit: SubmitHandler<FieldValues>,
    handleSubmit:UseFormHandleSubmit<FieldValues>
}

const ReturnForm =({
    control,
    filedsetCheckControls,
    errors,
    setValue,
    returnReasons, 
    setFiledsetCheckControls, 
    deliveryText,
    setDeliveryText,
    deliveryCodeValidator,
    getCurrentDelivery,
    skuItemHandler,
    fields,
    onSubmit,
    handleSubmit
}:Props)=>{

    return(
        <form className={style.formStyle}>

            <div>
                <label>Logisticans:</label>
                <Controller
                    control={control}
                    name="logisticanId"
                    defaultValue={""}
                    rules={{required: true}}
                    render={({field: {onChange}}) => (
                        <SelectBox
                            id="logisticanId"
                            className={style.input}
                            items={logisticans}
                            onChange={(event) => onChange(event)}
                        />
                    )}
                />
                {errors.logisticanId && (
                    <small className={style.errorMsg}>Please Select One Item.</small>
                )}
            </div>

            <div>
                <label>Warehouses:</label>
                <Controller
                    control={control}
                    name="warehouseId"
                    defaultValue={""}
                    rules={{required: true}}
                    render={({field: {onChange}}) => (
                        <SelectBox
                            id="warehouseId"
                            className={style.input}
                            items={warehouses}
                            onChange={(event) => onChange(event)}
                        />
                    )}
                />
                {errors.warehouseId && (
                    <small className={style.errorMsg}>Please Select One Item.</small>
                )}
            </div>

            <div className={style.deliveryWrapper}>
                <div className={style.radioButtonWrapper}>
                    <Controller
                        control={control}
                        name="delivery"
                        defaultValue={deliveryType.DeliveryId}
                        render={({field: {onChange}}) => (
                            <RadioButton
                                className={style.radioButton}
                                name="delivery"
                                items={deliveryItems}
                                selectedValue={deliveryType.DeliveryId}
                                onChange={({value, text}) => {
                                    setValue("deliveryId", undefined);
                                    onChange(value);
                                    setDeliveryText(text);
                                }}
                            />
                        )}
                    />
                </div>

                <div>
                    <Controller
                        control={control}
                        name="deliveryId"
                        defaultValue={""}
                        rules={{
                            required: true,
                            validate: deliveryCodeValidator,
                        }}
                        render={({field: {onChange,value}}) => (
                            <TextBox
                                className={style.input}
                                value={value}
                                type={getCurrentDelivery() == "DeliveryId" ? "number" : "text"}
                                placeholder={deliveryText}
                                onChange={(e: any) => {                                  
                                    onChange(e.target.value);
                                    skuItemHandler();
                                }}
                            />
                        )}
                    />

                    {errors.deliveryId && errors.deliveryId.type === "required" && (
                        <small className={style.errorMsg}>Please Enter Your {`${deliveryText}`}</small>
                    )}

                    {errors.deliveryId && errors.deliveryId.type === "validate" && (
                        <small className={style.errorMsg}>Check {`${deliveryText}`} Format.</small>
                    )}
                </div>

                {fields.map((skuItem: any, index: number) => (
                    <SkuItem
                        key={`SkuWrapper${index}`}
                        index={index}
                        skuItem={skuItem}
                        control={control}
                        filedsetCheckControls={filedsetCheckControls}
                        errors={errors}
                        returnReasons={returnReasons}
                        setValue={setValue}
                        setFiledsetCheckControls={setFiledsetCheckControls}
                    />
                ))}

            </div>
           

            <Button
                type="button"
                className={style.button}
                onClick={handleSubmit(onSubmit)}
            >
                Show Summery
            </Button>

        </form>
    );
};

export default ReturnForm;