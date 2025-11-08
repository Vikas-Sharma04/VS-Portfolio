import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Github,
  Linkedin,
  Twitter,
  Loader2,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null); // ✅ Add type here
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return; // ✅ Safety check
    setIsSending(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current, // ✅ Now TypeScript knows it's not undefined
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          toast({
            title: "Message Sent 🎉",
            description: "Your message has been successfully delivered.",
          });
          formRef.current?.reset(); // ✅ Optional chaining (extra safety)
          setIsSending(false);
        },
        (error) => {
          console.error("Email sending failed:", error.text);
          toast({
            title: "Error ❌",
            description: "Failed to send your message. Please try again later.",
            variant: "destructive",
          });
          setIsSending(false);
        }
      );
  };

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-section-title mb-6">
            Let's Create Something Amazing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's collaborate and build the
            future together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 max-w-6xl mx-auto px-4 sm:px-6">
          {/* Contact Info */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-bold mb-8">Get In Touch</h3>

            <div className="space-y-4 sm:space-y-6">
              {/* Email */}
              <motion.div
                className="flex flex-wrap sm:flex-nowrap items-center gap-4 p-4 card-glass cursor-hover"
                whileHover={{ x: 10, scale: 1.02 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium break-words leading-snug">
                    vikassharma141246@gmail.com
                  </p>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                className="flex flex-wrap sm:flex-nowrap items-center gap-4 p-4 card-glass cursor-hover"
                whileHover={{ x: 10, scale: 1.02 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-secondary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium break-words leading-snug">
                    +91 8368078785
                  </p>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div
                className="flex flex-wrap sm:flex-nowrap items-center gap-4 p-4 card-glass cursor-hover"
                whileHover={{ x: 10, scale: 1.02 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-accent to-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium break-words leading-snug">
                    New Delhi, India
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <h4 className="text-lg font-semibold mb-4">Connect With Me</h4>
              <div className="flex gap-4">
                {[
                  {
                    icon: Github,
                    href: "https://github.com/Vikas-Sharma04",
                    color: "hover:text-primary",
                  },
                  {
                    icon: Linkedin,
                    href: "https://www.linkedin.com/in/vikas-sharma-01851a344/",
                    color: "hover:text-secondary",
                  },
                ].map(({ icon: Icon, href, color }, index) => (
                  <motion.a
                    key={index}
                    href={href}
                    className={`w-12 h-12 bg-muted/20 rounded-lg flex items-center justify-center text-muted-foreground transition-colors cursor-hover ${color}`}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="card-glass p-6 sm:p-8 mt-8 lg:mt-0"
          >
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <motion.div whileFocus={{ scale: 1.02 }}>
                <input
                  type="text"
                  name="from_name"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 bg-muted/20 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </motion.div>
              <motion.div whileFocus={{ scale: 1.02 }}>
                <input
                  type="email"
                  name="from_email"
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 bg-muted/20 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </motion.div>

              <motion.div whileFocus={{ scale: 1.02 }}>
                <textarea
                  rows={6}
                  name="message"
                  placeholder="Your Message"
                  required
                  className="w-full px-4 py-3 bg-muted/20 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSending}
                className={`w-full btn-secondary cursor-hover group transition-all ${
                  isSending ? "opacity-70 cursor-not-allowed" : ""
                }`}
                whileHover={{ scale: isSending ? 1 : 1.02 }}
                whileTap={{ scale: isSending ? 1 : 0.98 }}
              >
                <span className="flex items-center justify-center gap-2">
                  {isSending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      Send Message
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-accent/10 to-primary/10 rounded-full blur-3xl animate-float"></div>
    </section>
  );
};

export default Contact;
