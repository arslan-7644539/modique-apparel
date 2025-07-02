"use client";
import { X } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";

// Zod schema for validation
const discountSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9]+$/, "Phone number must contain only digits"),
});

const DiscountModal = ({
  show,
  onClose,
  onSubmit,
  logoSrc,
  discountText,
  buttonText,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  // React Hook Form setup
  const methods = useForm({
    resolver: zodResolver(discountSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  // Form submit handler
  const onFormSubmit = async (data) => {
    try {
      console.log("form is submitted", data);
      // Reset form after successful submission
      reset();
      enqueueSnackbar(
        " 🛍️ Congratulations! Enjoy a 5% discount on your purchase.",
        {
          variant: "success",
          autoHideDuration: 3000, // 3 seconds
        }
      );
      onSubmit();
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  // Handle modal close
  const handleClose = () => {
    reset(); // Reset form when closing modal
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {show && (
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 relative">
          {/* Modal content */}
        </div>
      )}
    </div>
  );
};

export default DiscountModal;
