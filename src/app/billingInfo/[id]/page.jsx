"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import { ChevronDown, CreditCard, X } from "lucide-react";
import DiscountModal from "@/components/DiscountModal";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { ProductsContext } from "@/components/context/product-provider";
import { useParams } from "next/navigation";

const CheckoutPage = () => {
  const param = useParams();
  const id = param.id;
  const { particulatProduct } = useContext(ProductsContext);
  // -------------------------------
  const { enqueueSnackbar } = useSnackbar();
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState([]);
  console.log("🚀 ~ CheckoutPage ~ product:", product);

  // ------------------------------------------------------
  const schema = z
    .object({
      email: z.string().email("Invalid email address"),
      country: z.string().min(1, "Please select a country"),
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required"),
      address: z.string().min(1, "Address field is required"),
      whatsapp: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .regex(
          /^[0-9+\s-]+$/,
          "Phone number must contain only digits, +, spaces, and hyphens"
        ),
      city: z.string().min(1, "City is required"),
      postalCode: z.string().min(1, "Postal code is required"),
      // for payment method
      paymentMethod: z.enum(["cod", "card"], {
        required_error: "Please select a payment method",
      }),
      cardNumber: z.string().optional(),
      expiryDate: z.string().optional(),
      securityCode: z.string().optional(),
      nameOnCard: z.string().optional(),
    })
    // Card Number validation
    .refine(
      (data) => {
        if (data.paymentMethod === "card") {
          return data.cardNumber && data.cardNumber.trim().length >= 13;
        }
        return true;
      },
      {
        message: "Card number must be at least 13 digits",
        path: ["cardNumber"],
      }
    )
    // Expiry Date validation
    .refine(
      (data) => {
        if (data.paymentMethod === "card") {
          return data.expiryDate && data.expiryDate.trim().length > 0;
        }
        return true;
      },
      {
        message: "Expiry date is required",
        path: ["expiryDate"],
      }
    )
    // Security Code validation
    .refine(
      (data) => {
        if (data.paymentMethod === "card") {
          return data.securityCode && data.securityCode.trim().length >= 3;
        }
        return true;
      },
      {
        message: "Security code must be at least 3 digits",
        path: ["securityCode"],
      }
    )
    // Name on Card validation
    .refine(
      (data) => {
        if (data.paymentMethod === "card") {
          return data.nameOnCard && data.nameOnCard.trim().length > 0;
        }
        return true;
      },
      {
        message: "Name on card is required",
        path: ["nameOnCard"],
      }
    );

  const defaultValues = useMemo(
    () => ({
      email: "",
      country: "",
      firstName: "",
      lastName: "",
      address: "",
      whatsapp: "",
      city: "",
      postalCode: "",
      paymentMethod: "cod",
      cardNumber: "",
      expiryDate: "",
      securityCode: "",
      nameOnCard: "",
    }),
    []
  );

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const {
    reset,
    watch,
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = methods;

  const watchedPaymentMethod = watch("paymentMethod");

  const onSubmit = async (data) => {
    debugger;

    try {
      console.log("Form is submitted", data);

      enqueueSnackbar("Order Placed Successfully!", {
        variant: "success",
        autoHideDuration: 3000,
      });

      if (data.paymentMethod === "card") {
        handleOpen();
      }

      reset();
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error: Please try again", error);
      enqueueSnackbar("Error occurred. Please try again", {
        variant: "error",
      });
    }
  };

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleSubmitDiscount = () => {
    setShowModal(false);
  };

  // fetching the product details from context
  useEffect(() => {
    const getProduct = () => {
      try {
        // setLoading(true);
        // Convert string ID to number
        const demoPruduct = particulatProduct(parseInt(id));
        console.log("🚀 ~ getProduct ~ demoPruduct:", demoPruduct);
        // ✅ Check if product exists
        if (!demoPruduct) {
          console.warn("Product not found for ID:", id);
          // Handle product not found case
        }
        setProduct(demoPruduct);
        // setLoading(false); // ✅ Set loading to false on success
      } catch (error) {
        console.log("🚀 ~ getProduct ~ error:", error);
        // setLoading(false);
      }
    };

    if (id) {
      // ✅ Only run if ID exists
      getProduct();
    }
  }, [id, particulatProduct]); // ✅ Include both dependencies

  const contactInfo = (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Contact Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Contact</h2>
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors?.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors?.email?.message}
              </p>
            )}
          </div>

          {/* Delivery Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Delivery</h2>
            <div className="space-y-4">
              {/* Country/Region Dropdown */}
              <div className="relative">
                <select
                  {...register("country")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Country/Region</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                {errors?.country && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors?.country?.message}
                  </p>
                )}
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    {...register("firstName")}
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors?.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors?.firstName?.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register("lastName")}
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors?.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors?.lastName?.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div>
                <input
                  {...register("address")}
                  type="text"
                  placeholder="Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors?.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors?.address?.message}
                  </p>
                )}
              </div>

              {/* Whatsapp number */}
              <div>
                <input
                  {...register("whatsapp")}
                  type="text"
                  placeholder="Whatsapp (format: +XX XXX XXXXXXX)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors?.whatsapp && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors?.whatsapp?.message}
                  </p>
                )}
              </div>

              {/* City and Postal Code */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    {...register("city")}
                    type="text"
                    placeholder="City"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    {...register("postalCode")}
                    type="text"
                    placeholder="Postal Code"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.postalCode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.postalCode.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Method */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Shipping method</h2>
            <div className="border border-gray-300 rounded-md bg-[#F9F9F9] p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">
                    Free Delivery Available | Fast & express delivery 2-3 hrs
                    (workdays)
                  </p>
                  <p className="text-sm text-gray-500">
                    $500+ DELIVERY & QUALITY ASSURED
                  </p>
                </div>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Payment</h2>
            <div className="space-y-4">
              {/* Cash on Delivery */}
              <div className="border border-gray-300 bg-[#F9F9F9] rounded-md p-4">
                <div className="flex items-center">
                  <input
                    {...register("paymentMethod")}
                    type="radio"
                    id="cod"
                    value="cod"
                    className="mr-3"
                  />
                  <label htmlFor="cod" className="font-medium">
                    CASH ON DELIVERY
                  </label>
                </div>
              </div>

              {/* Credit Card */}
              <div className="border border-gray-300 bg-[#F9F9F9] rounded-md p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <input
                      {...register("paymentMethod")}
                      type="radio"
                      id="card"
                      value="card"
                      className="mr-3"
                    />
                    <label htmlFor="card" className="font-medium">
                      <span className="whitespace-nowrap">
                        CREDIT CARD / DEBIT CARD
                      </span>
                      <span className="whitespace-nowrap text-sm text-gray-500 block">
                        (for international customers only)
                      </span>
                    </label>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <img
                      src="/visa-icon.svg"
                      alt="visa-card"
                      className="w-8 h-5 rounded"
                    />
                    <img
                      src="/masterCard-icon.svg"
                      alt="masterCard-icon"
                      className="w-8 h-5 rounded"
                    />
                  </div>
                </div>
              </div>

              {/* Card fields */}
              {watchedPaymentMethod === "card" && (
                <div className="space-y-4">
                  <div>
                    <input
                      {...register("cardNumber")}
                      type="text"
                      placeholder="Card Number"
                      maxLength="19"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors?.cardNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors?.cardNumber?.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        {...register("expiryDate")}
                        type="text"
                        placeholder="Expiry Date: MM/YY"
                        maxLength="5"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors?.expiryDate && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors?.expiryDate?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        {...register("securityCode")}
                        type="text"
                        placeholder="Security Code : CVV"
                        maxLength="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors?.securityCode && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors?.securityCode?.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <input
                      {...register("nameOnCard")}
                      type="text"
                      placeholder="Name on Card"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors?.nameOnCard && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors?.nameOnCard?.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            {errors.paymentMethod && (
              <p className="text-red-500 text-sm mt-2">
                {errors.paymentMethod.message}
              </p>
            )}
          </div>

          {/* Pay Now Button */}
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full bg-black text-white py-4 rounded-md font-semibold hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "PROCESSING..." : "PAY NOW"}
          </button>
        </div>
      </form>
    </FormProvider>
  );

  const orderDetails = (
    <div className="bg-gray-100 rounded-lg p-6">
      <div className="p-6">
        {/* Product Item */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 rounded-lg flex items-center justify-center relative">
            <img
              src={product?.images?.[0]}
              alt="selected-product-image"
              className="w-full h-full object-cover rounded-lg"
            />
            <span className="absolute -top-2 -right-2 bg-gray-600/90 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              1
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">
              Aura Floral Lace Long Dress
            </h3>
            <p className="text-sm text-gray-500">XS</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-4 border-t pt-4">
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">{product?.price} </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium text-green-600">Free</span>
          </div>
          <div className="flex justify-between text-lg font-semibold py-2">
            <span>Total</span>
            <span>{product?.price}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-auto bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form section */}
          {contactInfo}

          {/* Right Column - Order Summary */}
          {orderDetails}
        </div>
      </div>

      {/* Discount Modal */}
      <DiscountModal
        show={showModal}
        onClose={handleClose}
        onSubmit={handleSubmitDiscount}
        logoSrc="/header/header-logo.svg"
        discountText="Enjoy 5% off on your first purchase"
        buttonText="CLAIM DISCOUNT"
      />
    </div>
  );
};

export default CheckoutPage;
