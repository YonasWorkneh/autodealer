import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ModalProps {
  isVisible: boolean;
  title?: string;
  description?: string;
  isLoading?: boolean;
  confirmLable?: string;
  styles?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function Modal({
  isVisible,
  title = "Are you sure you want to continue ?",
  description = "Are you sure you want to delete the product? This action cannot be undone.",
  isLoading,
  confirmLable = "Confirm",
  onConfirm,
  onCancel,
  styles,
}: ModalProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
        <h3 className="text-lg font-bold mb-4">{title}</h3>
        <p className="text-sm text-gray-600 mb-6">{description}</p>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onCancel} className="w-[80px]">
            Cancel
          </Button>
          <Button
            type="submit"
            className={`rounded-md text-white p-0 min-w-[90px] cursor-pointer ${styles}`}
            disabled={isLoading}
            onClick={onConfirm}
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <p> {confirmLable} </p>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
