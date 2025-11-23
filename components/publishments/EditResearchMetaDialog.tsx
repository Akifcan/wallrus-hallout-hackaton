import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "@/lib/api";
import { toast } from "sonner";
import * as yup from "yup";

const metaSchema = yup.object().shape({
  contact_name: yup
    .string()
    .max(100, "Contact name must be at most 100 characters"),
  contact_email: yup
    .string()
    .email("Invalid email format")
    .max(255, "Email must be at most 255 characters"),
  contact_number: yup
    .string()
    .min(10, "Contact number must be at least 10 characters")
    .max(20, "Contact number must be at most 20 characters"),
});

interface EditResearchMetaDialogProps {
  isOpen: boolean;
  onClose: () => void;
  slug: string;
  initialData?: {
    contact_name?: string;
    contact_email?: string;
    contact_number?: string;
  };
}

export default function EditResearchMetaDialog({
  isOpen,
  onClose,
  slug,
  initialData,
}: EditResearchMetaDialogProps) {
  const queryClient = useQueryClient();
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update form fields when dialog opens or initialData changes
  useEffect(() => {
    if (isOpen) {
      setContactName(initialData?.contact_name || "");
      setContactEmail(initialData?.contact_email || "");
      setContactNumber(initialData?.contact_number || "");
      setErrors({});
    }
  }, [isOpen, initialData]);

  const updateMutation = useMutation({
    mutationFn: async (data: {
      contact_name: string;
      contact_email: string;
      contact_number: string;
    }) => {
      const response = await instance.put(`/api/project/${slug}/update-meta`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Research metadata updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      onClose();
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.details?.[0] || "Failed to update research metadata";
      toast.error(errorMessage);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      await metaSchema.validate(
        {
          contact_name: contactName,
          contact_email: contactEmail,
          contact_number: contactNumber,
        },
        { abortEarly: false }
      );

      updateMutation.mutate({
        contact_name: contactName,
        contact_email: contactEmail,
        contact_number: contactNumber,
      });
    } catch (error: any) {
      const validationErrors: Record<string, string> = {};
      error.inner.forEach((err: any) => {
        if (err.path) {
          validationErrors[err.path] = err.message;
        }
      });
      setErrors(validationErrors);
      toast.error("Please fix validation errors");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="border-4 border-black bg-white max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="border-b-4 border-black bg-black p-4">
            <h2 className="font-mono text-xl font-bold uppercase tracking-wider text-white">
              EDIT RESEARCH METADATA
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Info Message */}
            <div className="border-2 border-black bg-yellow-50 p-4">
              <div className="flex gap-3">
                <span className="text-xl flex-shrink-0">ℹ️</span>
                <div className="space-y-1">
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-black">
                    IMPORTANT INFORMATION
                  </p>
                  <p className="font-mono text-xs text-black/80 leading-relaxed">
                    When you make this research public, people will be able to see this contact information.
                    Filling in these fields is optional.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-mono text-sm font-bold uppercase tracking-wider text-black block">
                Contact Name
              </label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className={`w-full border-2 ${
                  errors.contact_name ? "border-red-500" : "border-black"
                } p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-black`}
                placeholder="Enter contact name (optional)"
                maxLength={100}
              />
              {errors.contact_name && (
                <p className="font-mono text-xs text-red-500">
                  {errors.contact_name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="font-mono text-sm font-bold uppercase tracking-wider text-black block">
                Contact Email
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className={`w-full border-2 ${
                  errors.contact_email ? "border-red-500" : "border-black"
                } p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-black`}
                placeholder="Enter contact email (optional)"
                maxLength={255}
              />
              {errors.contact_email && (
                <p className="font-mono text-xs text-red-500">
                  {errors.contact_email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="font-mono text-sm font-bold uppercase tracking-wider text-black block">
                Contact Number
              </label>
              <input
                type="tel"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className={`w-full border-2 ${
                  errors.contact_number ? "border-red-500" : "border-black"
                } p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-black`}
                placeholder="Enter contact number (optional)"
                minLength={10}
                maxLength={20}
              />
              {errors.contact_number && (
                <p className="font-mono text-xs text-red-500">
                  {errors.contact_number}
                </p>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 font-mono text-sm font-bold uppercase tracking-wider border-2 border-black bg-white text-black px-4 py-3 hover:bg-black hover:text-white transition-colors"
              >
                CANCEL
              </button>
              <button
                type="submit"
                disabled={updateMutation.isPending}
                className="flex-1 font-mono text-sm font-bold uppercase tracking-wider border-2 border-black bg-black text-white px-4 py-3 hover:bg-white hover:text-black transition-colors disabled:opacity-50"
              >
                {updateMutation.isPending ? "SAVING..." : "SAVE"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
