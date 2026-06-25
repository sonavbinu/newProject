import React from "react";
import { useDispatch } from "react-redux";
import { setPrimaryColor } from "../../slices/themeSlice";

const colors = ["#3b82f6", "#ef4444", "#22c55e", "#f59e0b"];

const ColorPicker = () => {
  const dispatch = useDispatch();
  return (
    <div>
      {colors.map((color) => (
        <button
          key={color}
          style={{
            background: color,
            width: "30px",
            height: "30px",
          }}
          onClick={() => dispatch(setPrimaryColor(color))}
        ></button>
      ))}
    </div>
  );
};

export default ColorPicker;
