import { ChangeEventHandler, useEffect, useState } from "react";
import { Tuple } from "../types";
import Pixel from "./Pixel";
import Button from "./Button";
import axios from "axios";
import Switch from "./Switch";

export type Value = 1 | 0;
export type TRow<T = Value> = Tuple<T, 28>;
export type TBoard<T = Value> = TRow<TRow<T>>;

const Board = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const defaultRow = Array(28).fill(0) as TRow;
  const defaultBoard = Array(28).fill(defaultRow) as TBoard;
  const [data, setData] = useState<TBoard>(defaultBoard);
  const [color, setColor] = useState("#000000");
  const [isClearing, setIsClearing] = useState(false);

  const handleUpdateBoard = (data: TBoard) => {
    setData(data);
  };

  const onChangeColor: ChangeEventHandler<HTMLInputElement> = (event) => {
    setColor(event.target.value);
  };

  const handleResetBoard = () => {
    setData(defaultBoard);
  };

  const onSubmit = () => {
    const payload = {
      inputs: [data],
    };
    axios
      .post("http://103.161.113.225:6000/invocations", payload)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const updateState = (rowId: number, index: number) => {
    const clone = [...data] as TBoard;
    clone[rowId] = [
      ...clone[rowId].slice(0, index),
      isClearing ? 0 : 255,
      ...clone[rowId].slice(index + 1),
    ] as TRow;
    handleUpdateBoard(clone);
  };

  const onClick = (rowId: number, index: number) => {
    const clone = [...data] as TBoard;
    clone[rowId] = [
      ...clone[rowId].slice(0, index),
      clone[rowId][index] ? 0 : 255,
      ...clone[rowId].slice(index + 1),
    ] as TRow;
    handleUpdateBoard(clone);
  };

  const onMouseDown = () => {
    setIsDrawing(true);
  };

  const onMouseUp = () => {
    setIsDrawing(false);
  };

  const onMouseOver = (rowId: number, index: number) => {
    if (isDrawing) {
      updateState(rowId, index);
    }
  };

  const renderRow = (data: TRow, rowId: number) => {
    return data.map((e, idx) => (
      <Pixel
        key={idx}
        fill={!!e}
        fillColor={color}
        updateState={() => {
          onClick(rowId, idx);
        }}
        onMouseOver={() => onMouseOver(rowId, idx)}
      />
    ));
  };

  const renderBoard = data.map((row, idx) => (
    <div key={idx} className="w-full flex">
      {renderRow(row, idx)}
    </div>
  ));

  useEffect(() => {
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div className="bg-white shadow-md shadow-slate-500 rounded overflow-hidden">
      <div className="flex gap-3 items-center mb-3 p-3 bg-indigo-950 w-full justify-between">
        <span className="flex gap-3 divide-x-2">
          <span className="flex items-center gap-3 text-white px-3 py-2 font-semibold">
            Color
            <input
              type="color"
              className="p-0"
              value={color}
              onChange={onChangeColor}
            />
          </span>
          <span className="flex items-center gap-3 text-white px-3 py-2 font-semibold">
            Eraser
            <Switch
              value={isClearing}
              onClick={() => setIsClearing(!isClearing)}
              className="border"
            />
          </span>
        </span>

        <span className="flex gap-3">
          <Button
            onClick={handleResetBoard}
            label="Reset"
            className="bg-red-500 border-0 text-white"
          />
          <Button onClick={onSubmit} label="Submit" />
        </span>
      </div>
      <div
        className="flex flex-col m-3"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        {renderBoard}
      </div>
    </div>
  );
};

export default Board;
