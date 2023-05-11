type Props = {
  fill: boolean;
  fillColor?: string;
  updateState: () => void;
  onMouseOver: () => void;
};

export default function Pixel({
  fill = false,
  fillColor = "#000000",
  updateState,
  onMouseOver,
}: Props) {
  const updateValue = () => {
    updateState();
  };
  return (
    <span
      className={`min-w-[15px] min-h-[15px] max-w-[25px] max-h-[25px] h-[2vw] w-[2vw] border-1 border-[0.5px]`}
      onClick={updateValue}
      onMouseOver={onMouseOver}
      style={{ backgroundColor: fill ? fillColor : "white" }}
    />
  );
}
