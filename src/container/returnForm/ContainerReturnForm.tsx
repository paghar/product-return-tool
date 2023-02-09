import { useEffect, useState } from "react";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import style from "../../components/returnForm/ReturnForm.module.css";
import Button from "../../components/ui/button/Button";
import RadioButton from "../../components/ui/radioButton/RadioButton";

import SelectBox from "../../components/ui/selectBox/SelectBox";
import TextBox from "../../components/ui/textBox/TextBox";

import {
  deliveryItems,
  logisticans,
  orders,
  returnReasons,
  warehouses,
} from "../../data/constants";
import { deliveryType } from "../../data/enum";

import { validate as uuidValidate } from "uuid";

import { useDispatch } from "react-redux";
import { insertFormData } from "../../redux";

import { useRouter } from "next/router";
import { IReturnModel, IReturnSkuItemModel } from "../../data/interface";
import SkuItem from "../../components/returnForm/SkuItem";

export default function ContainerReturnForm() {
  const model: IReturnModel = {} as IReturnModel;

  const dispatch = useDispatch();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({});

  const { fields } = useFieldArray({ control, name: "items" });
  const [deliveryText, setDeliveryText] = useState("Delivery Id");

  const [filedsetCheckControls, setFiledsetCheckControls] = useState<Array<any>>([]);

  useEffect(() => {
    reset({ delivery: "DeliveryId" });
  }, []);

  const deliveryCodeValidator = (value: any) => {
    const selectedDelivery = getCurrentDelivery();
    if (selectedDelivery == deliveryType.DeliveryId) return !isNaN(value);

    return uuidValidate(value);
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

  const getSkuItemsBasedOnDeliveryId = () => {
    const products = orders
      .filter((order) => order.deliveryId == getCurrentDeliveryId())
      .map(({ productId, quantity }) => {
        return { productId, quantity };
      });

    setValue("items", products);
    fillFiedlsetCheckBoxControlItems(products.length);
  };

  const getSkuItemsBasedOnDeliveryOrderId = () => {
    const products = orders
      .filter((order) => order.deliveryOrderId == getCurrentDeliveryId())
      .map(({ productId, quantity }) => {
        return { productId, quantity };
      });

    setValue("items", products);
    fillFiedlsetCheckBoxControlItems(products.length);
  };

  const fillFiedlsetCheckBoxControlItems = (input: number) => {
    const fieldsetCheckItems = new Array(input).fill(null).map((_, index) => {
      return { index, status: false };
    });
    setFiledsetCheckControls([...fieldsetCheckItems]);
  };

  const getCurrentDelivery = () => getValues("delivery");
  const getCurrentDeliveryId = () => getValues("deliveryId");

  const onSubmit = (data: any) => {
    const logistican = logisticans.find((item) => item.id == data.logisticanId);
    const warehouse = warehouses.find((item) => item.id == data.warehouseId);

    data.items = data.items.map((item: IReturnSkuItemModel) => {
      const found = returnReasons.find((reson) => reson.id == item.reason);
      if (found) return { ...item, reasonText: found.text };

      return item;
    });

    const result: IReturnModel = {
      ...data,
      logisticanText: logistican?.text,
      warehouseText: warehouse?.text,
    };

    dispatch(insertFormData(result));
    router.push("/Summery");
  };

  return (
    <form className={style.formStyle}>
      <div>
        <label>Logisticans:</label>
        <Controller
          control={control}
          name="logisticanId"
          defaultValue={""}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
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
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
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
            render={({ field: { onChange, onBlur, value } }) => (
              <RadioButton
                className={style.radioButton}
                name="delivery"
                items={deliveryItems}
                selectedValue={deliveryType.DeliveryId}
                onChange={({ value, text }) => {
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
            render={({ field: { onChange, onBlur, value } }) => (
              <TextBox
                className={style.input}
                value={value}
                type={getCurrentDelivery() == "DeliveryId" ? "number" : "text"}
                placeholder={deliveryText}
                onChange={(e: any) => {
                  const currentValue = e.target.value;
                  onChange(currentValue);
                  skuItemHandler();
                }}
              />
            )}
          />

          {errors.deliveryId && errors.deliveryId.type === "required" && (
            <small className={style.errorMsg}>
              Please Enter Your {`${deliveryText}`}
            </small>
          )}

          {errors.deliveryId && errors.deliveryId.type === "validate" && (
            <small className={style.errorMsg}>
              Check {`${deliveryText}`} Format.
            </small>
          )}
        </div>
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

      <Button
        type="button"
        className={style.button}
        onClick={handleSubmit(onSubmit)}
      >
        Show Summery
      </Button>
    </form>
  );
}
