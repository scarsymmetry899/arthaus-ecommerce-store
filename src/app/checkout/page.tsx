"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";

type Step = 1 | 2 | 3;

const STEPS = [
  { num: 1, label: "Information" },
  { num: 2, label: "Shipping" },
  { num: 3, label: "Payment" },
];

const SHIPPING_OPTIONS = [
  {
    id: "standard",
    label: "Standard Delivery",
    desc: "5–10 business days",
    price: 0,
    condition: "Free over $150",
  },
  {
    id: "express",
    label: "Express Delivery",
    desc: "2–3 business days",
    price: 18,
    condition: null,
  },
  {
    id: "white-glove",
    label: "White Glove Service",
    desc: "Scheduled delivery, installation available",
    price: 65,
    condition: null,
  },
];

function FloatingInput({
  label,
  type = "text",
  value,
  onChange,
  required = false,
  className = "",
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  className?: string;
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div className={`relative ${className}`}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full pt-5 pb-2 px-3 text-[14px] border rounded-[3px] outline-none transition-colors peer"
        style={{
          borderColor: focused ? "#C5A572" : "var(--border-color)",
          backgroundColor: "var(--bg)",
          color: "var(--text)",
        }}
        placeholder=" "
      />
      <label
        className="absolute left-3 transition-all duration-200 pointer-events-none"
        style={{
          top: focused || hasValue ? "6px" : "50%",
          transform: focused || hasValue ? "translateY(0) scale(0.8)" : "translateY(-50%)",
          transformOrigin: "left",
          color: focused ? "#C5A572" : "var(--muted)",
          fontSize: focused || hasValue ? "11px" : "14px",
        }}
      >
        {label}
        {required && " *"}
      </label>
    </div>
  );
}

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

function StepIndicator({ current, completed }: { current: Step; completed: Step[] }) {
  return (
    <div className="flex items-center gap-0">
      {STEPS.map((step, i) => {
        const isCompleted = completed.includes(step.num as Step);
        const isActive = current === step.num;
        return (
          <div key={step.num} className="flex items-center">
            {i > 0 && (
              <div
                className="w-12 md:w-20 h-px"
                style={{ backgroundColor: isCompleted ? "#C5A572" : "var(--border-color)" }}
              />
            )}
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-medium transition-all"
                style={{
                  backgroundColor: isCompleted
                    ? "#C5A572"
                    : isActive
                    ? "#0A0A0A"
                    : "transparent",
                  color: isCompleted
                    ? "#0A0A0A"
                    : isActive
                    ? "#FAF8F5"
                    : "var(--muted)",
                  border: isActive ? "none" : `1px solid ${isCompleted ? "#C5A572" : "var(--border-color)"}`,
                }}
              >
                {isCompleted ? <Check size={14} /> : step.num}
              </div>
              <span
                className="text-[11px] uppercase tracking-[0.1em] hidden sm:block"
                style={{ color: isActive ? "var(--text)" : "var(--muted)" }}
              >
                {step.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function CheckoutPage() {
  const { items, getSubtotal } = useCart();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [completedSteps, setCompletedSteps] = useState<Step[]>([]);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    phone: "",
  });

  const [shippingMethod, setShippingMethod] = useState("standard");
  const [includeInsurance, setIncludeInsurance] = useState(false);

  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [cardName, setCardName] = useState("");

  const subtotal = getSubtotal();
  const selectedShipping = SHIPPING_OPTIONS.find((o) => o.id === shippingMethod);
  const shippingCost = selectedShipping ? (subtotal >= 150 && shippingMethod === "standard" ? 0 : selectedShipping.price) : 0;
  const insuranceCost = includeInsurance ? 12 : 0;
  const total = subtotal + shippingCost + insuranceCost;

  const goToStep = (step: Step) => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prev) => [...prev, currentStep]);
    }
    setCurrentStep(step);
  };

  const updateForm = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      goToStep((currentStep + 1) as Step);
    }
  };

  const slideVariants = {
    enter: { x: 40, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -40, opacity: 0 },
  };

  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "100vh" }}>
      {/* Header */}
      <div
        className="border-b py-5 px-6"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div className="max-w-[1100px] mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-[20px]"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            ARTHAUS
          </Link>
          <StepIndicator current={currentStep} completed={completedSteps} />
          <div className="w-24 hidden md:block" />
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left — Form */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {/* Step 1 — Information */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2
                    className="text-[24px] mb-6"
                    style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                  >
                    Contact & Shipping Information
                  </h2>

                  <div className="space-y-4">
                    <FloatingInput
                      label="Email address"
                      type="email"
                      value={formData.email}
                      onChange={(v) => updateForm("email", v)}
                      required
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FloatingInput
                        label="First name"
                        value={formData.firstName}
                        onChange={(v) => updateForm("firstName", v)}
                        required
                      />
                      <FloatingInput
                        label="Last name"
                        value={formData.lastName}
                        onChange={(v) => updateForm("lastName", v)}
                        required
                      />
                    </div>

                    <FloatingInput
                      label="Address"
                      value={formData.address1}
                      onChange={(v) => updateForm("address1", v)}
                      required
                    />
                    <FloatingInput
                      label="Apartment, suite, etc. (optional)"
                      value={formData.address2}
                      onChange={(v) => updateForm("address2", v)}
                    />

                    <div className="grid grid-cols-3 gap-4">
                      <FloatingInput
                        label="City"
                        value={formData.city}
                        onChange={(v) => updateForm("city", v)}
                        required
                        className="col-span-1"
                      />
                      <FloatingInput
                        label="State"
                        value={formData.state}
                        onChange={(v) => updateForm("state", v)}
                        required
                      />
                      <FloatingInput
                        label="ZIP"
                        value={formData.zip}
                        onChange={(v) => updateForm("zip", v)}
                        required
                      />
                    </div>

                    <FloatingInput
                      label="Phone (optional)"
                      type="tel"
                      value={formData.phone}
                      onChange={(v) => updateForm("phone", v)}
                    />
                  </div>

                  <button
                    onClick={handleNext}
                    className="mt-8 w-full py-4 text-[13px] uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-all hover:brightness-110"
                    style={{ backgroundColor: "#C5A572", color: "#0A0A0A" }}
                  >
                    Continue to Shipping
                    <ChevronRight size={16} />
                  </button>
                </motion.div>
              )}

              {/* Step 2 — Shipping */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2
                    className="text-[24px] mb-6"
                    style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                  >
                    Shipping Method
                  </h2>

                  {/* Address summary */}
                  <div
                    className="p-4 rounded-[3px] border mb-6"
                    style={{ borderColor: "var(--border-color)" }}
                  >
                    <p className="text-[13px]" style={{ color: "var(--text)" }}>
                      {formData.firstName} {formData.lastName} · {formData.address1}, {formData.city} {formData.state} {formData.zip}
                    </p>
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="text-[12px] mt-1 transition-colors hover:text-[#C5A572]"
                      style={{ color: "#C5A572" }}
                    >
                      Edit
                    </button>
                  </div>

                  {/* Shipping options */}
                  <div className="space-y-3 mb-6">
                    {SHIPPING_OPTIONS.map((opt) => (
                      <label
                        key={opt.id}
                        className="flex items-center gap-4 p-4 border rounded-[3px] cursor-pointer transition-colors"
                        style={{
                          borderColor: shippingMethod === opt.id ? "#C5A572" : "var(--border-color)",
                          backgroundColor: shippingMethod === opt.id ? "rgba(197,165,114,0.05)" : "transparent",
                        }}
                      >
                        <input
                          type="radio"
                          name="shipping"
                          value={opt.id}
                          checked={shippingMethod === opt.id}
                          onChange={() => setShippingMethod(opt.id)}
                          className="hidden"
                        />
                        <div
                          className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                          style={{ borderColor: shippingMethod === opt.id ? "#C5A572" : "var(--border-color)" }}
                        >
                          {shippingMethod === opt.id && (
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#C5A572" }} />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-[14px] font-medium" style={{ color: "var(--text)" }}>{opt.label}</p>
                          <p className="text-[12px]" style={{ color: "var(--muted)" }}>{opt.desc}</p>
                        </div>
                        <p className="text-[14px] font-medium" style={{ color: opt.price === 0 && subtotal >= 150 ? "#C5A572" : "var(--text)" }}>
                          {opt.price === 0 && subtotal >= 150 ? "Free" : opt.price === 0 ? opt.condition : `$${opt.price}`}
                        </p>
                      </label>
                    ))}
                  </div>

                  {/* Insurance toggle */}
                  <label className="flex items-center gap-3 cursor-pointer mb-8">
                    <div
                      className="w-5 h-5 border rounded-[2px] flex items-center justify-center transition-colors"
                      style={{
                        borderColor: includeInsurance ? "#C5A572" : "var(--border-color)",
                        backgroundColor: includeInsurance ? "#C5A572" : "transparent",
                      }}
                      onClick={() => setIncludeInsurance((v) => !v)}
                    >
                      {includeInsurance && <Check size={12} color="#0A0A0A" />}
                    </div>
                    <span className="text-[13px]" style={{ color: "var(--text)" }}>
                      Add shipping insurance (+$12) — covers loss, damage, and theft
                    </span>
                  </label>

                  <button
                    onClick={handleNext}
                    className="w-full py-4 text-[13px] uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-all hover:brightness-110"
                    style={{ backgroundColor: "#C5A572", color: "#0A0A0A" }}
                  >
                    Continue to Payment
                    <ChevronRight size={16} />
                  </button>
                </motion.div>
              )}

              {/* Step 3 — Payment */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2
                    className="text-[24px] mb-6"
                    style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
                  >
                    Payment
                  </h2>

                  {/* Express pay row */}
                  <div className="flex gap-3 mb-6">
                    {["Apple Pay", "Google Pay", "PayPal"].map((method) => (
                      <button
                        key={method}
                        className="flex-1 py-3 border rounded-[3px] text-[12px] font-medium transition-colors hover:border-[#C5A572]"
                        style={{ borderColor: "var(--border-color)", color: "var(--text)" }}
                      >
                        {method}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex-1 h-px" style={{ backgroundColor: "var(--border-color)" }} />
                    <span className="text-[12px] uppercase tracking-[0.1em]" style={{ color: "var(--muted)" }}>
                      or pay with card
                    </span>
                    <div className="flex-1 h-px" style={{ backgroundColor: "var(--border-color)" }} />
                  </div>

                  {/* Card form */}
                  <div className="space-y-4">
                    <FloatingInput
                      label="Name on card"
                      value={cardName}
                      onChange={setCardName}
                      required
                    />
                    <FloatingInput
                      label="Card number"
                      value={cardNumber}
                      onChange={setCardNumber}
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FloatingInput
                        label="MM / YY"
                        value={cardExpiry}
                        onChange={setCardExpiry}
                        required
                      />
                      <FloatingInput
                        label="CVC"
                        value={cardCVC}
                        onChange={setCardCVC}
                        required
                      />
                    </div>
                  </div>

                  <Link
                    href="/checkout/confirmation"
                    className="mt-8 w-full py-4 text-[13px] uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-all hover:brightness-110"
                    style={{ backgroundColor: "#C5A572", color: "#0A0A0A" }}
                  >
                    Place Order — ${total}
                    <ChevronRight size={16} />
                  </Link>

                  <p className="text-[12px] text-center mt-4" style={{ color: "var(--muted)" }}>
                    Your payment info is encrypted and secure.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right — Order summary */}
          <div className="w-full lg:w-[360px] shrink-0">
            <div
              className="rounded-[4px] border p-6 sticky top-[80px]"
              style={{ borderColor: "var(--border-color)" }}
            >
              <h3
                className="text-[18px] mb-5"
                style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
              >
                Order Summary
              </h3>

              {/* Items */}
              <div className="space-y-3 mb-5">
                {items.slice(0, 3).map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-12 h-14 rounded-[2px] overflow-hidden shrink-0" style={{ backgroundColor: "var(--cream)" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.product.images.primary} alt={item.product.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] truncate" style={{ color: "var(--text)" }}>{item.product.title}</p>
                      <p className="text-[12px]" style={{ color: "var(--muted)" }}>{item.selected_size.label} · ×{item.quantity}</p>
                    </div>
                    <p className="text-[13px] shrink-0" style={{ color: "var(--text)" }}>${item.total_price}</p>
                  </div>
                ))}
                {items.length > 3 && (
                  <p className="text-[12px]" style={{ color: "var(--muted)" }}>+{items.length - 3} more items</p>
                )}
              </div>

              {/* Pricing */}
              <div
                className="border-t pt-4 space-y-2"
                style={{ borderColor: "var(--border-color)" }}
              >
                <div className="flex justify-between text-[13px]">
                  <span style={{ color: "var(--muted)" }}>Subtotal</span>
                  <span style={{ color: "var(--text)" }}>${subtotal}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span style={{ color: "var(--muted)" }}>Shipping</span>
                  <span style={{ color: shippingCost === 0 ? "#C5A572" : "var(--text)" }}>
                    {shippingCost === 0 ? "Free" : `$${shippingCost}`}
                  </span>
                </div>
                {includeInsurance && (
                  <div className="flex justify-between text-[13px]">
                    <span style={{ color: "var(--muted)" }}>Insurance</span>
                    <span style={{ color: "var(--text)" }}>${insuranceCost}</span>
                  </div>
                )}
                <div
                  className="flex justify-between text-[15px] font-medium pt-2 border-t"
                  style={{ borderColor: "var(--border-color)", color: "var(--text)" }}
                >
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
