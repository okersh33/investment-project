interface Props {
  type: "success" | "warn" | "error";
  message: string;
}

export const Feedback: React.FC<Props> = ({ type, message }) => {
  return (
    <div
      className={`${type === "success" ? "bg-green-100 border-green-400 text-green-700" : type === "warn" ? "bg-yellow-100 border-yellow-400 text-yellow-700" : "bg-red-100 border-red-400 text-red-700"} border px-4 py-2 rounded mb-4`}
    >
      {message}
    </div>
  );
};
