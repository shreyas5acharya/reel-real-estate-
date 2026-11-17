import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AlertCircle, CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';
import { COMPANY_CONFIG } from '../data/realEstateData';
import { MagneticButton } from './MagneticButton';

export interface ContactPrefill {
  interest?: string;
  marketOrProperty?: string;
  message?: string;
}

interface ContactSectionProps {
  prefill: ContactPrefill | null;
}

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  interest: string;
  market: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[\d\s().-]{7,20}$/;

export const ContactSection: React.FC<ContactSectionProps> = ({ prefill }) => {
  const [values, setValues] = useState<FormValues>({
    fullName: '',
    email: '',
    phone: '',
    interest: 'Schedule a Private Tour',
    market: 'New York, NY',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!prefill) return;
    setSubmitted(false);
    setValues((prev) => ({
      ...prev,
      interest: prefill.interest || prev.interest,
      market: prefill.marketOrProperty || prev.market,
      message: prefill.message || prev.message,
    }));
  }, [prefill]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (values.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    if (!EMAIL_REGEX.test(values.email.trim())) {
      nextErrors.email = 'Please provide a valid email address.';
    }
    if (!PHONE_REGEX.test(values.phone.trim())) {
      nextErrors.phone = 'Please enter a valid US or international telephone number.';
    }
    if (values.message.trim().length < 10) {
      nextErrors.message = 'Please share a brief note on your timeline or residence criteria.';
    }
    return nextErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrors({});
    setValues({
      fullName: '',
      email: '',
      phone: '',
      interest: 'Schedule a Private Tour',
      market: 'New York, NY',
      message: '',
    });
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-20 lg:py-28 bg-[#F7F5F0] text-[#0B1220]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Editorial Column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#C9A24B] font-medium mb-3">
                Private Consultation
              </p>
              <h2
                id="contact-heading"
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0B1220] mb-4"
              >
                Begin a Confidential Conversation
              </h2>
              <p className="text-base text-[#0B1220]/70 leading-relaxed">
                Arrange a private showing, request an off-market valuation, or speak directly with
                one of our regional managing partners.
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-[#0B1220]/10 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C9A24B] shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <p className="font-medium text-[#0B1220]">National Headquarters</p>
                  <p className="text-[#0B1220]/70">{COMPANY_CONFIG.headquarters}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#C9A24B] shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <p className="font-medium text-[#0B1220]">Private Client Desk</p>
                  <p className="text-[#0B1220]/70 tabular-nums">{COMPANY_CONFIG.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#C9A24B] shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <p className="font-medium text-[#0B1220]">Advisory Email</p>
                  <p className="text-[#0B1220]/70">{COMPANY_CONFIG.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form / Animated Success State */}
          <div className="lg:col-span-7 bg-white border border-[#0B1220]/10 rounded-sm p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="py-10 text-center space-y-5"
                  role="status"
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 20 }}
                    className="w-14 h-14 mx-auto rounded-full bg-[#0B1220] text-[#C9A24B] flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-7 h-7" />
                  </motion.div>
                  <h3 className="font-serif text-3xl font-medium text-[#0B1220]">
                    Inquiry Received
                  </h3>
                  <p className="text-sm text-[#0B1220]/75 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-medium text-[#0B1220]">{values.fullName}</span>.
                    Your request regarding{' '}
                    <span className="font-medium text-[#0B1220]">{values.interest}</span> ({values.market})
                    has been routed to our senior advisory desk. Expect a confidential response
                    within four business hours.
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-6 py-3 bg-[#0B1220] hover:bg-[#152036] text-[#F7F5F0] text-xs font-medium rounded-sm transition-colors cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-medium text-[#0B1220]/80 mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={values.fullName}
                        onChange={(e) => {
                          setValues((prev) => ({ ...prev, fullName: e.target.value }));
                          if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                        }}
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={errors.fullName ? 'error-name' : undefined}
                        placeholder="Eleanor Vance"
                        className={`w-full h-11 px-3.5 bg-[#F7F5F0] border rounded-sm text-sm text-[#0B1220] ${
                          errors.fullName ? 'border-red-600' : 'border-[#0B1220]/15 focus:border-[#C9A24B]'
                        }`}
                      />
                      {errors.fullName && (
                        <p id="error-name" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-medium text-[#0B1220]/80 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={values.email}
                        onChange={(e) => {
                          setValues((prev) => ({ ...prev, email: e.target.value }));
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'error-email' : undefined}
                        placeholder="eleanor@familyoffice.com"
                        className={`w-full h-11 px-3.5 bg-[#F7F5F0] border rounded-sm text-sm text-[#0B1220] ${
                          errors.email ? 'border-red-600' : 'border-[#0B1220]/15 focus:border-[#C9A24B]'
                        }`}
                      />
                      {errors.email && (
                        <p id="error-email" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-medium text-[#0B1220]/80 mb-2"
                      >
                        Telephone *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        value={values.phone}
                        onChange={(e) => {
                          setValues((prev) => ({ ...prev, phone: e.target.value }));
                          if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                        }}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? 'error-phone' : undefined}
                        placeholder="(212) 555-0182"
                        className={`w-full h-11 px-3.5 bg-[#F7F5F0] border rounded-sm text-sm text-[#0B1220] ${
                          errors.phone ? 'border-red-600' : 'border-[#0B1220]/15 focus:border-[#C9A24B]'
                        }`}
                      />
                      {errors.phone && (
                        <p id="error-phone" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                    {/* Advisory Interest */}
                    <div>
                      <label
                        htmlFor="contact-interest"
                        className="block text-xs font-medium text-[#0B1220]/80 mb-2"
                      >
                        Advisory Focus
                      </label>
                      <select
                        id="contact-interest"
                        value={values.interest}
                        onChange={(e) =>
                          setValues((prev) => ({ ...prev, interest: e.target.value }))
                        }
                        className="w-full h-11 px-3.5 bg-[#F7F5F0] border border-[#0B1220]/15 rounded-sm text-sm text-[#0B1220] focus:border-[#C9A24B]"
                      >
                        <option value="Schedule a Private Tour">Schedule a Private Tour</option>
                        <option value="Buying Representation">Buying Representation</option>
                        <option value="Selling / Property Valuation">Selling / Property Valuation</option>
                        <option value="Property Management">Property Management</option>
                        <option value="Investment Advisory">Investment Advisory</option>
                        <option value="Executive Relocation">Executive Relocation</option>
                      </select>
                    </div>
                  </div>

                  {/* Target Market / Property */}
                  <div>
                    <label
                      htmlFor="contact-market"
                      className="block text-xs font-medium text-[#0B1220]/80 mb-2"
                    >
                      Target Market or Residence
                    </label>
                    <input
                      id="contact-market"
                      type="text"
                      value={values.market}
                      onChange={(e) =>
                        setValues((prev) => ({ ...prev, market: e.target.value }))
                      }
                      placeholder="New York, NY / Coral Gables / Red Mountain"
                      className="w-full h-11 px-3.5 bg-[#F7F5F0] border border-[#0B1220]/15 rounded-sm text-sm text-[#0B1220] focus:border-[#C9A24B]"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-medium text-[#0B1220]/80 mb-2"
                    >
                      Criteria &amp; Preferred Timing *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={values.message}
                      onChange={(e) => {
                        setValues((prev) => ({ ...prev, message: e.target.value }));
                        if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                      }}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'error-message' : undefined}
                      placeholder="Share preferred architectural style, target neighborhood, or tour availability..."
                      className={`w-full p-3.5 bg-[#F7F5F0] border rounded-sm text-sm text-[#0B1220] resize-y ${
                        errors.message ? 'border-red-600' : 'border-[#0B1220]/15 focus:border-[#C9A24B]'
                      }`}
                    />
                    {errors.message && (
                      <p id="error-message" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                    <MagneticButton
                      type="submit"
                      className="bg-[#0B1220] hover:bg-[#152036] text-[#F7F5F0] text-xs font-medium px-8 py-4 rounded-sm tracking-wide"
                    >
                      Request Private Consultation
                    </MagneticButton>
                    <span className="text-xs text-[#0B1220]/55">
                      Protected under strict client NDA
                    </span>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
