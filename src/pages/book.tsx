import { FormEvent, useEffect, useRef, useState } from "react";
import SiteLayout from "@/components/SiteLayout";
import { site } from "@/lib/site";

/** Keep in sync with the attachment limit of the configured form service. */
const MAX_IMAGE_SIZE_MB = 5;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

const tattooLocations = [
  "Arm (Upper)",
  "Arm (Lower/Forearm)",
  "Hand/Fingers",
  "Shoulder",
  "Chest",
  "Back (Upper)",
  "Back (Full/Lower)",
  "Ribs/Side",
  "Stomach/Abdomen",
  "Leg (Thigh)",
  "Leg (Calf/Shin)",
  "Foot/Ankle",
  "Neck",
  "Head/Face",
  "Other (describe in idea)",
];

const timeSlots = [
  "Morning (10:00 AM - 12:00 PM)",
  "Midday (12:00 PM - 2:00 PM)",
  "Afternoon (2:00 PM - 4:00 PM)",
  "Late Afternoon (4:00 PM - 6:00 PM)",
  "Evening (6:00 PM - 8:00 PM)",
  "Flexible / Artist's Choice",
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[+()\-\s\d]{7,20}$/;

const formatFileSize = (bytes: number) => {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const Book = () => {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    tattooLocation: "",
    timeSlot: "",
    description: "",
    imageUrl: "",
  });

  const hasImage = Boolean(formData.imageUrl.trim() || imageFile);

  useEffect(() => {
    if (!imageFile) {
      setImagePreview("");
      return;
    }

    const url = URL.createObjectURL(imageFile);
    setImagePreview(url);

    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageError("");

    const file = e.target.files?.[0];

    if (!file) {
      setImageFile(null);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setImageFile(null);
      e.target.value = "";
      setImageError("Please choose an image file.");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setImageFile(null);
      e.target.value = "";
      setImageError(`Image must be ${MAX_IMAGE_SIZE_MB} MB or smaller.`);
      return;
    }

    setImageFile(file);
  };

  const clearImageFile = () => {
    setImageFile(null);
    setImageError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setError("A valid email is required.");
      return;
    }
    if (!formData.name.trim()) {
      setError("Name is required.");
      return;
    }
    if (formData.phone.trim() && !phoneRegex.test(formData.phone.trim())) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (!formData.tattooLocation) {
      setError("Please select a tattoo location.");
      return;
    }
    if (!formData.timeSlot) {
      setError("Please select a preferred time slot.");
      return;
    }
    if (!hasImage && !formData.description.trim()) {
      setError(
        "Please provide either an image upload/link or a short description of your tattoo idea."
      );
      return;
    }
    if (imageFile && !site.booking.formEndpoint) {
      setError(
        "Image uploads aren't available right now. Please paste an image link instead."
      );
      return;
    }

    setStatus("submitting");

    const payload = {
      email: formData.email.trim(),
      name: formData.name.trim(),
      phone: formData.phone.trim() || "Not provided",
      tattooLocation: formData.tattooLocation,
      timeSlot: formData.timeSlot,
      description: formData.description.trim() || "No description provided",
      imageUrl:
        formData.imageUrl.trim() ||
        (imageFile ? "Uploaded file attached" : "No image provided"),
      imageFileName: imageFile?.name || "No file attached",
      subject: `Tattoo Consultation Request - ${formData.name.trim()}`,
    };

    try {
      if (site.booking.formEndpoint) {
        const headers: Record<string, string> = {
          Accept: "application/json",
        };
        let body: BodyInit;

        if (imageFile) {
          const data = new FormData();
          Object.entries(payload).forEach(([key, value]) => {
            data.append(key, value);
          });
          data.append("attachment", imageFile, imageFile.name);
          body = data;
        } else {
          headers["Content-Type"] = "application/json";
          body = JSON.stringify(payload);
        }

        const res = await fetch(site.booking.formEndpoint, {
          method: "POST",
          headers,
          body,
        });
        if (!res.ok) {
          throw new Error("Failed to submit request");
        }
      } else {
        // Fallback: open mailto if no form endpoint is configured
        const mailtoBody = [
          `Name: ${payload.name}`,
          `Email: ${payload.email}`,
          `Phone: ${payload.phone}`,
          `Tattoo Location: ${payload.tattooLocation}`,
          `Preferred Time Slot: ${payload.timeSlot}`,
          `Image: ${payload.imageUrl}`,
          "",
          "Tattoo Idea Description:",
          payload.description,
        ].join("\n");
        const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
          payload.subject
        )}&body=${encodeURIComponent(mailtoBody)}`;
        window.location.href = mailto;
      }
      setStatus("success");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <SiteLayout
        title="Request Sent"
        description="Your tattoo consultation request has been sent."
      >
        <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-5 py-24 text-center">
          <p className="eyebrow">Request sent</p>
          <h1 className="mt-4 font-display text-4xl text-bone sm:text-5xl">
            The artist will be in touch
          </h1>
          <p className="mt-4 max-w-md text-bone/50">
            Your consultation request has been submitted. The artist will review
            it and reach out via email to confirm or discuss your appointment.
          </p>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout
      title="Book"
      description="Request a tattoo consultation with CD Tattoos."
    >
      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <header className="max-w-2xl">
          <p className="eyebrow">Booking</p>
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.75fr]">
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-6 border border-white/10 bg-white/[0.02] p-6 sm:p-8"
            noValidate
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="email"
                  className="text-xs uppercase tracking-label text-bone/60"
                >
                  Email <span className="text-brass">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 w-full border border-white/10 bg-transparent px-4 py-3 text-sm text-bone placeholder:text-bone/30 focus:border-brass focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="text-xs uppercase tracking-label text-bone/60"
                >
                  Name <span className="text-brass">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-2 w-full border border-white/10 bg-transparent px-4 py-3 text-sm text-bone placeholder:text-bone/30 focus:border-brass focus:outline-none"
                  placeholder="Your name"
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="phone"
                  className="text-xs uppercase tracking-label text-bone/60"
                >
                  Phone Number <span className="text-bone/40">(optional)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-2 w-full border border-white/10 bg-transparent px-4 py-3 text-sm text-bone placeholder:text-bone/30 focus:border-brass focus:outline-none"
                  placeholder="(xxx) xxx-xxxx"
                />
              </div>
              <div>
                <label
                  htmlFor="tattooLocation"
                  className="text-xs uppercase tracking-label text-bone/60"
                >
                  Tattoo Location <span className="text-brass">*</span>
                </label>
                <select
                  id="tattooLocation"
                  name="tattooLocation"
                  required
                  value={formData.tattooLocation}
                  onChange={handleChange}
                  className="mt-2 w-full border border-white/10 bg-ink px-4 py-3 text-sm text-bone focus:border-brass focus:outline-none"
                >
                  <option value="" disabled>
                    Select location
                  </option>
                  {tattooLocations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="timeSlot"
                className="text-xs uppercase tracking-label text-bone/60"
              >
                Preferred Time Slot <span className="text-brass">*</span>
              </label>
              <select
                id="timeSlot"
                name="timeSlot"
                required
                value={formData.timeSlot}
                onChange={handleChange}
                className="mt-2 w-full border border-white/10 bg-ink px-4 py-3 text-sm text-bone focus:border-brass focus:outline-none"
              >
                <option value="" disabled>
                  Select time slot
                </option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs text-bone/40">
                Time slots are pulled from the artist&apos;s Google Workspace
                schedule. The artist will approve consultation requests via the
                Google app.
              </p>
            </div>

            <div>
              <label
                htmlFor="imageUrl"
                className="text-xs uppercase tracking-label text-bone/60"
              >
                Image Upload/Link{" "}
                <span className="text-bone/40">(optional)</span>
              </label>
              <input
                id="imageUrl"
                name="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={handleChange}
                className="mt-2 w-full border border-white/10 bg-transparent px-4 py-3 text-sm text-bone placeholder:text-bone/30 focus:border-brass focus:outline-none"
                placeholder="https://... (link to reference image)"
              />

              <div className="my-4 flex items-center gap-3 text-[10px] uppercase tracking-label text-bone/30">
                <span className="h-px flex-1 bg-white/10" />
                or upload from your device
                <span className="h-px flex-1 bg-white/10" />
              </div>

              <input
                ref={fileInputRef}
                id="imageFile"
                name="imageFile"
                type="file"
                accept="image/*"
                aria-label="Upload a reference image from your device"
                aria-describedby="imageFileHelp"
                onChange={handleFileChange}
                className="block w-full cursor-pointer text-sm text-bone/50 file:mr-4 file:cursor-pointer file:border file:border-bone/30 file:bg-transparent file:px-4 file:py-2.5 file:text-xs file:font-semibold file:uppercase file:tracking-label file:text-bone hover:file:border-bone hover:file:bg-bone/5"
              />
              <p id="imageFileHelp" className="mt-2 text-xs text-bone/40">
                One image max, {MAX_IMAGE_SIZE_MB} MB or smaller. JPG, PNG,
                WEBP, etc.
              </p>
              {imageError && (
                <p role="alert" className="mt-2 text-xs text-brass">
                  {imageError}
                </p>
              )}

              {imageFile && (
                <div className="mt-4 flex items-center gap-3 border border-white/10 bg-white/[0.02] p-3">
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Selected reference preview"
                      className="h-16 w-16 object-cover"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-bone">
                      {imageFile.name}
                    </p>
                    <p className="text-xs text-bone/40">
                      {formatFileSize(imageFile.size)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={clearImageFile}
                    className="text-xs uppercase tracking-label text-bone/50 transition hover:text-brass"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="text-xs uppercase tracking-label text-bone/60"
              >
                Tattoo Idea Description{" "}
                {!hasImage && <span className="text-brass">*</span>}
                {hasImage && (
                  <span className="text-bone/40">
                    (optional if image provided)
                  </span>
                )}
              </label>
              <textarea
                id="description"
                name="description"
                rows={6}
                value={formData.description}
                onChange={handleChange}
                className="mt-2 w-full border border-white/10 bg-transparent px-4 py-3 text-sm text-bone placeholder:text-bone/30 focus:border-brass focus:outline-none"
                placeholder="Size, style, details, references..."
              />
              <p className="mt-2 text-xs text-bone/40">
                If no image is uploaded, a short text description is required.
              </p>
            </div>

            {error && <p className="text-sm text-brass">{error}</p>}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center justify-center bg-bone px-7 py-4 text-xs font-semibold uppercase tracking-label text-ink transition hover:bg-brass disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "Sending..." : "Send Request"}
            </button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Book;
