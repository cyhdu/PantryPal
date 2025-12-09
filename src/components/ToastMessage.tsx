import { useEffect } from "react";

type ToastType = "success" | "error" | "warning";

type ToastMessageProps = {
  message: string;
  type?: ToastType;
  onClose: () => void;
};

export default function ToastMessage({
  message,
  type = "success",
  onClose,
}: ToastMessageProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors: Record<ToastType, string> = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
  };

  return (
    <div className="fixed top-6 right-6 z-50 animate-slide-in">
      <div
        className={`${colors[type]} text-white px-4 py-3 rounded-lg shadow-lg min-w-[200px]`}
      >
        {message}
      </div>
    </div>
  );
}