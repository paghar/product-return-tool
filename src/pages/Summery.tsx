import React from "react";
import {useSelector} from "react-redux";
import SummeryReturnForm from "../components/returnForm/SummeryReturnForm";

const summery = () => {
    const {
        form: {formData},
    } = useSelector((state) => state as any);

    const onSendReturnData = () => {
        alert("send data to api.");
    }; 

    return (
        <SummeryReturnForm {...formData} onSendReturnData={onSendReturnData} />
    );
};

export default summery;
