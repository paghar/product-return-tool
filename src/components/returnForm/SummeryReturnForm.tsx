import React from "react";
import style from "./SummeryForm.module.css";
import btnStyle from "./ReturnForm.module.css";
import {IReturnModel, IReturnSkuItemModel} from "../../data/interface";
import {returnReasons} from "../../data/constants";
import Button from "../ui/button/Button";

interface ISummeryReturnForm extends IReturnModel {
    onSendReturnData: () => void;
}

const SummeryReturnForm = (props: ISummeryReturnForm) => {
    const returnReason = (reasonsId: number) =>
        returnReasons.find((item) => item.id == reasonsId && item.id !== 0)?.text;

    const renderSkuItems = props?.items?.map(
        (item: IReturnSkuItemModel, index: number) => {
            if (item?.isSelected) {
                return (
                    <div key={index} className={style.contentWrapper}>
                        <span>
                            <b>Total Quantity:</b>
                            {item?.newQuantity}
                        </span>
                        <span>
                            <b>Selected Reason:</b>
                            {item?.reasonText}
                        </span>
                        <span>
                            <b>reason:</b>
                            {returnReason(item?.reason)}
                        </span>
                        <span>
                            <b>annotation:</b>
                            {item?.annotation}
                        </span>
                    </div>
                );
            }
        }
    );

    return (
        <>
            <div className={style.summeryStyle}>
                <span>
                    <b>Return Form Data</b>
                </span>
                <div className={style.contentWrapper}>
                    <span>
                        <b>logistican:</b>
                        {props.logisticanText}
                    </span>
                    <span>
                        <b>warehouse:</b>
                        {props.warehouseText}
                    </span>
                    <span>
                        <b>DeliveryType:</b>
                        {props.delivery}
                    </span>
                    <span>
                        <b>Delivery Item Id:</b>
                        {props.deliveryId}
                    </span>
                    {renderSkuItems}
                </div>
                <Button
                    type="button"
                    className={btnStyle.button}
                    onClick={props.onSendReturnData}
                >
                    Send Return Data
                </Button>
            </div>
        </>
    );
};

export default SummeryReturnForm;
