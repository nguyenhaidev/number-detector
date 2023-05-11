type Props = {
  className?: string;
  onClick?: () => void;
  backgroundColor?: string;
  value?: boolean;
};

export default function Switch({ className, onClick, value = false }: Props) {
  return (
    <div
      onClick={onClick}
      className={
        `h-[100%] min-w-[50px] rounded-full bg-white p-1 shadow-lg flex duration-300 ${
          value ? "justify-end" : "justify-start"
        } ` + className
      }
    >
      <div
        className={`h-[20px] w-[20px] rounded-full duration-300 ${
          value ? "bg-blue-500" : "bg-gray-300"
        }`}
      ></div>
    </div>
  );
}
