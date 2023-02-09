import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SummeryReturnForm from "../components/returnForm/SummeryReturnForm";

const summery = () => {
  const {
    form: { formData },
  } = useSelector((state) => state as any);

  const onSendReturnData = () => {
    alert("send data to api.");
  };

  console.log(formData);

  return (
    <SummeryReturnForm {...formData} onSendReturnData={onSendReturnData} />
  );
};

export default summery;
