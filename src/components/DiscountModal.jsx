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
    <>
      {show && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 relative">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-8 flex flex-col items-start space-y-6">
              {/* Logo */}
              <div>
                <img
                  src={logoSrc}
                  alt="Brand Logo"
                  className="w-24 h-24 object-contain"
                />
              </div>

              {/* Offer Text */}
              <h3 className="text-xl font-semibold text-gray-800">
                {discountText}
              </h3>

              {/* Form */}
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onFormSubmit)}
                  className="space-y-4 w-full"
                  noValidate
                >
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div>
                      <input
                        {...register("firstName")}
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm w-full"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        {...register("lastName")}
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm w-full"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone with Country Code */}
                  <div>
                    <div className="flex w-full">
                      <div className="flex items-center px-3 py-3 border border-r-0 border-gray-300 rounded-l-md bg-gray-50">
                        <img
                          src="https://flagcdn.com/w40/pk.png"
                          alt="PK Flag"
                          className="w-5 h-4 mr-2"
                        />
                        <span className="text-sm text-gray-600">+92</span>
                      </div>
                      <input
                        {...register("phone")}
                        type="tel"
                        name="phone"
                        placeholder="Phone number"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors text-sm tracking-wide disabled:opacity-50"
                  >
                    {isSubmitting ? "Processing..." : buttonText}
                  </button>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DiscountModal;
