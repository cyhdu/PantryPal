import { useEffect } from "react";

export default function ToastMessage({ message, type = "success", onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2500); // auto-close

        return () => clearTimeout(timer);
    }, [onClose]);

    const colors = {
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