"use client";
import { useMemo, useState } from "react";
import { ChevronDown, CreditCard, X } from "lucide-react";
import DiscountModal from "@/components/DiscountModal";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";

const CheckoutPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  // ----------------------------------
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [showModal, setShowModal] = useState(false);
  const [discount, setDiscount] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Country/Region");
  const [selectedCard, setSelectedCard] = useState("Card Number");

  // ------------------------------------------------------
  const schema = z
    .object({
      email: z.string().email("Invalid email address"),
      country: z.enum(
        ["United States", "Canada", "United Kingdom", "Australia"],
        { errorMap: () => ({ message: "Please select a country" }) }
      ),
      firstName: z.string().min(1, "first name is required"),
      lastName: z.string().min(1, "last name is required"),
      address: z.string().min(1, "address field is required"),
      whatsapp: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .regex(/^[0-9]+$/, "Phone number must contain only digits"),
      city: z.string().min(1, "city is required"),
      postalCode: z.coerce.number().min(1, "postal code is required"),
      // for payment methd
      paymentMethod: z.enum(["cod", "card"], {
        required_error: "Please select a payment method",
      }),
      cardNumber: z
        .union([
          z.string().min(1, "Card number is required"),
          z.number().min(1, "Card number is required"),
        ])
        .optional(),
      expiryDate: z.string().optional(),
      securityCode: z.string().optional(),
      nameOnCard: z.string().optional(),
    })
    // ✅ Card Number validation
    .refine(
      (data) => {
        if (data.paymentMethod === "card") {
          return data.cardNumber && data.cardNumber.toString().length > 0;
        }
        return true; // cod selected to ye required nahi
      },
      {
        message: "All card details are required when card is selected",
        path: ["cardNumber"], // error show at this field
      }
    )
    // ✅ Expiry Date validation
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
    // ✅ Security Code validation
    .refine(
      (data) => {
        if (data.paymentMethod === "card") {
          return data.securityCode && data.securityCode.trim().length > 0;
        }
        return true;
      },
      {
        message: "Security code is required",
        path: ["securityCode"],
      }
    )
    // ✅ Name on Card validation
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
      paymentMethod: "",
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
    mode: "onSubmit", // Change to onSubmit to prevent double validation
    reValidateMode: "onChange", // Only revalidate on change
  });

  const {
    reset,
    watch,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      if (data.paymentMethod === "card") {
        if (
          !data.cardNumber ||
          !data.expiryDate ||
          !data.securityCode ||
          !data.nameOnCard
        ) {
          enqueueSnackbar("Please fill in all the card details to proceed.", {
            variant: "error",
          });
          // return;
        }
      }
      console.log("form is submitted", data);
      reset();
      enqueueSnackbar("Order Placed Successfully!", {
        variant: "success",
        autoHideDuration: 3000, // 3 seconds
      });
      // Enjoy a discount on your first purchase!
      if (data.paymentMethod === "card") {
        handleOpen(); // ✅ only open DiscountModal if card is selected
      }
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error: Pleas try again", error);
      // enqueueSnackbar("onSubmit ~ error: Pleas try again", {
      //   variant: "error",
      // });
    }
  };

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleSubmitDiscount = () => {
    // alert("Discount Claimed!");
    setShowModal(false);
  };

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
              name="email"
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
                  <p className="text-red-500">{errors?.country?.message}</p>
                )}
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    {...register("firstName")}
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors?.firstName && (
                    <p className="text-red-500">{errors?.firstName?.message}</p>
                  )}
                </div>
                <div>
                  <input
                    {...register("lastName")}
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors?.lastName && (
                    <p className="text-red-500">{errors?.lastName?.message}</p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div>
                <input
                  {...register("address")}
                  type="text"
                  name="address"
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
                {" "}
                <input
                  {...register("whatsapp")}
                  type="text"
                  name="whatsapp"
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
                    name="city"
                    placeholder="City"
                    className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                {/* postal code */}
                <div>
                  <input
                    {...register("postalCode")}
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          <div>
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
                        className="mr-3"
                        value="card"
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
                        className="w-8 h-5  rounded"
                      ></img>
                      <img
                        src="/masterCard-icon.svg"
                        alt="masterCard-icon"
                        className="w-8 h-5 rounded"
                      ></img>
                    </div>
                  </div>
                </div>

                {/* cred card info  */}
                {watch("paymentMethod") === "card" && (
                  <div>
                    <div className="space-y-4">
                      {/* Card Number Dropdown */}

                      {/* ------------ */}
                      <input
                        {...register("cardNumber")}
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors?.cardNumber && (
                        <p className="text-red-500">
                          {errors?.cardNumber?.message}
                        </p>
                      )}

                      {/* Expiry and Security Code */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          {...register("expiryDate")}
                          type="text"
                          name="expiryDate"
                          placeholder="Expiry Date"
                          className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors?.expiryDate && (
                          <p className="text-red-500">
                            {errors?.expiryDate?.message}
                          </p>
                        )}

                        {/* ---------------------- */}
                        <input
                          {...register("securityCode")}
                          type="text"
                          name="securityCode"
                          placeholder="Security Code"
                          className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors?.securityCode && (
                          <p className="text-red-500">
                            {errors?.securityCode?.message}
                          </p>
                        )}
                      </div>

                      {/* Name on Card */}
                      <input
                        {...register("nameOnCard")}
                        type="text"
                        name="nameOnCard"
                        placeholder="Name on Card"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors?.nameOnCard && (
                        <p className="text-red-500">
                          {errors?.nameOnCard?.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {errors.paymentMethod && (
              <p className="text-red-500">{errors.paymentMethod.message}</p>
            )}
          </div>

          {/* Pay Now Button */}
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full bg-black text-white py-4 rounded-md font-semibold hover:bg-gray-800 transition-colors cursor-pointer"
          >
            {isSubmitting ? "PROCESSING..." : "PAY NOW"}
          </button>
        </div>
      </form>
    </FormProvider>
  );

  const orderDetails = (
    <div className="bg-gray-100 rounded-lg p-6">
      <div className="  p-6 ">
        {/* Product Item */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20  rounded-lg flex items-center justify-center relative">
            <img
              src="https://maajisafashion.com/images/product/sub_images/2023/12/hermitage-roz-mehar-pakistani-style-cotton-ladies-suit-supplier-2023-6-2023-12-13_13_08_30.jpeg"
              alt="selected-product-image"
              className="w-full h-full object-cover rounded-lg"
            />
            {/* total lenth of order */}
            <span className="absolute -top-2 -right-2 bg-gray-600/90 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              1
            </span>
          </div>
          <div className="flex-1">
            {/* product name */}
            <h3 className="font-medium text-gray-900">
              Aura Floral Lace Long Dress
            </h3>
            {/* product size */}
            <p className="text-sm text-gray-500">XS</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-4 border-t pt-4">
          {/* subTotol amount */}
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">Rs 49,750.00</span>
          </div>
          {/* shipping amount */}
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium text-green-600">Free</span>
          </div>
          {/* total amount */}
          <div className="flex justify-between text-lg font-semibold py-2">
            <span>Total</span>
            <span>Rs 49,750.00</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-auto bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column -  Form  section*/}
          {contactInfo}
          {/* -------------------------- */}

          {/* Right Column - Order Summary */}
          {orderDetails}
          {/* -------------------------- */}
        </div>
      </div>

      {/* Enjoy a discount on your first purchase! */}
      <DiscountModal
        show={showModal}
        onClose={handleClose}
        onSubmit={handleSubmitDiscount}
        logoSrc="/header/header-logo.svg" // change here
        discountText="Enjoy 5% off on your first purchase"
        buttonText="CLAIM DISCOUNT"
      />
    </div>
  );
};

export default CheckoutPage;
