import React from "react";
import style from "../returnForm/ReturnForm.module.css";
import {
  Controller,
  useWatch,
  FieldValues,
  Control,
} from "react-hook-form";
import CheckBox from "../ui/checkBox/CheckBox";
import TextBox from "../ui/textBox/TextBox";
import SelectBox from "../ui/selectBox/SelectBox";

interface Props {
  index: number;
  control: any;
  filedsetCheckControls: any;
  errors: any;
  returnReasons: any[];
  setValue: any;
  skuItem:any;
  setFiledsetCheckControls: any;
}

const SkuItem = ({
  index,
  control,
  filedsetCheckControls,
  errors,
  setValue,
  returnReasons,
  skuItem,
  setFiledsetCheckControls,
}: Props) => {

  const QuantityValidate = ({
    control,
    index,
  }: {
    control: Control<FieldValues, any>;
    index: number;
  }) => {
    const item = useWatch({ control, name: `items[${index}]` });

    let message = ``;
    if (item.isSelected && item.newQuantity > item.quantity)
      message = "quantity must be less or equal the shipped quantity";

    return <small className={style.errorMsg}>{message}</small>;
  };

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
          render={({ field: { onChange, onBlur, value } }) => (
            <CheckBox
              className={style.radioButton}
              label={`Product Quantit (${skuItem.quantity})`}
              onChange={(value: boolean) => {
                onChange(value);

                setFiledsetCheckControls(
                  filedsetCheckControls.map((item: any) => {
                    if (item.index == index) return { ...item, status: value };
                    return { ...item };
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
        render={({ field: { onChange, onBlur, value } }) => (
          <TextBox
            className={style.input}
            value={value}
            type="text"
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
        control={control}
        index={index}
      ></QuantityValidate>

      {errors.items && (errors as any).items[index]?.newQuantity && (
        <small className={style.errorMsg}>Please Enter The Quantity</small>
      )}

      <Controller
        control={control}
        name={`items[${index}].reason`}
        defaultValue={""}
        rules={{ required: filedsetCheckControls[index].status }}
        render={({ field: { onChange, onBlur, value } }) => (
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
          required: filedsetCheckControls[index].status,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
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
