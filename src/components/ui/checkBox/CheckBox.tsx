import React from "react";

interface ICheckBox {    
    id?: string,   
    className?:string,
    label:string,
    checked?:boolean,
    onChange:(e:any) => any,   
}

const CheckBox = (props:ICheckBox) => {
    return (
        <div className={props.className}>                       
            <input id={props.id} type="checkbox" checked={props.checked} onChange={(e)=>{
                props.onChange(e.target.checked);
            }}/>               
            {props.label}           
        </div>  
    );
};

export default CheckBox;