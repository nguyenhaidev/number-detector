type Props = {
  className?: string;
  onClick?: () => void;
  backgroundColor?: string;
  label?: string;
};

export default function Button({ className, onClick, label }: Props) {
  return (
    <button
      className={
        `border rounded py-2 px-4 bg-white hover:shadow-xl font-semibold hover:opacity-95 active:scale-95 ` +
        className
      }
      onClick={onClick}
    >
      {label}
    </button>
  );
}
