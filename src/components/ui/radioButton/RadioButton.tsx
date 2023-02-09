import React, { useState } from "react";

interface IRadioButton {
  className?: string;
  name: string;
  selectedValue: string;
  items: Array<any>;
  onChange: (output: { value: string; text: any }) => any;
}

const RadioButton = ({
  items,
  className,
  selectedValue,
  name,
  onChange,
}: IRadioButton) => {
  const [selectedId, setSelectedId] = useState(selectedValue);

  const render = [...items].map((radio) => {
    return (
      <div className={className} key={radio.id}>
        <input
          type="radio"
          name={name}
          value={radio.id}
          checked={selectedId == radio.id}
          onChange={(e: any) => {
            const current = e.target.value;
            const { text } = [...items].find((item) => item.id == current);
            onChange({ value: current, text });
            setSelectedId(current);
          }}
        />
        {radio.text}
      </div>
    );
  });

  return <>{render}</>;
};

export default RadioButton;
