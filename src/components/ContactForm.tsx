"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { contactTopics, profile, siteLinks } from "@/constants";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

type ContactFields = { name: string; email: string; topic: string; message: string };
const deliveryErrorMessage = "I couldn’t confirm your message was sent.";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFields>();

  async function submitMessage({ name, email, topic, message }: ContactFields) {
    const toastId = toast.loading("Sending your message…");

    try {
      const response = await fetch(siteLinks.formspree, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          ...(topic ? { topic } : {}),
          message: message.trim(),
        }),
        signal: AbortSignal.timeout(12_000),
      });

      if (!response.ok) throw new Error("Formspree rejected the submission");

      reset();
      toast.success("Thanks for your message.", { id: toastId });
    } catch {
      setError("root.delivery", { message: deliveryErrorMessage });
      toast.error(deliveryErrorMessage, { id: toastId });
    }
  }

  return (
    <form
      action={siteLinks.formspree}
      method="post"
      onSubmit={handleSubmit(submitMessage)}
      className="space-y-6"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-name">Name</label>
        <Input
          id="contact-name"
          required
          readOnly={isSubmitting}
          autoComplete="name"
          placeholder="Your name"
          className="bg-secondary/50 py-5 hover:border-primary/70"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          {...register("name", {
            validate: (value) => value.trim().length >= 2 || "Enter at least 2 characters.",
          })}
        />
        {errors.name && <p id="name-error" className="text-sm text-destructive">{errors.name.message}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email">Email</label>
        <Input
          id="contact-email"
          required
          readOnly={isSubmitting}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className="bg-secondary/50 py-5 hover:border-primary/70"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email", {
            validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) || "Enter a valid email address.",
          })}
        />
        {errors.email && <p id="email-error" className="text-sm text-destructive">{errors.email.message}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-topic">
          What are you reaching out about? <span className="text-sm text-muted-foreground">(optional)</span>
        </label>
        <select
          id="contact-topic"
          className="min-h-10 rounded-md border border-input bg-secondary/50 px-3 text-sm outline-none [color-scheme:dark] hover:border-primary/70 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 disabled:opacity-50"
          disabled={isSubmitting}
          {...register("topic")}
        >
          <option value="">Select a topic</option>
          {contactTopics.map((topic) => <option key={topic} value={topic}>{topic}</option>)}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message">Message</label>
        <Textarea
          id="contact-message"
          required
          readOnly={isSubmitting}
          placeholder="Your message..."
          className="min-h-37.5 bg-secondary/50 py-5 hover:border-primary/70"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message", {
            validate: (value) => value.trim().length >= 10 || "Enter at least 10 characters.",
          })}
        />
        {errors.message && <p id="message-error" className="text-sm text-destructive">{errors.message.message}</p>}
      </div>
      <Button className="w-full py-5" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send message"}
      </Button>
      {errors.root?.delivery && (
        <p className="text-sm text-destructive">
          {errors.root.delivery.message} You can <a href={profile.emailHref} className="underline">email me directly</a>.
        </p>
      )}
    </form>
  );
}
