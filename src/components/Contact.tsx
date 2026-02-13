import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Github,
  Linkedin,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    
    setIsSending(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setIsSuccess(true);
      toast({
        title: "Message Sent 🎉",
        description: "I'll get back to you as soon as possible.",
      });
      formRef.current.reset();
      
      // Reset success state after 5 seconds to allow new messages
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please email me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const contactData = [
    { 
      icon: Mail, 
      label: "Email", 
      value: "vikassharma141246@gmail.com", 
      href: "mailto:vikassharma141246@gmail.com",
      gradient: "from-blue-500 to-cyan-400" 
    },
    { 
      icon: Phone, 
      label: "Phone", 
      value: "+91 8368078785", 
      href: "tel:+918368078785",
      gradient: "from-purple-500 to-pink-400" 
    },
    { 
      icon: MapPin, 
      label: "Location", 
      value: "New Delhi, India", 
      href: "https://maps.google.com/?q=New+Delhi",
      gradient: "from-orange-500 to-yellow-400" 
    },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Refined Background Gradients */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Let's <span className="text-primary">Connect</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          {/* Contact Details (Left) */}
          <div className="lg:col-span-5 space-y-6">
            {contactData.map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group flex items-center gap-5 p-5 rounded-2xl bg-secondary/5 border border-white/5 hover:border-primary/50 hover:bg-secondary/10 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} p-[1px]`}>
                  <div className="w-full h-full bg-background rounded-[11px] flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                    {item.label}
                  </p>
                  <p className="text-lg font-medium">{item.value}</p>
                </div>
              </motion.a>
            ))}

            <div className="pt-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">Follow Me</p>
              <div className="flex gap-4">
                {[
                  { icon: Github, href: "https://github.com/Vikas-Sharma04" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/vikas-sharma-01851a344/" }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    whileHover={{ y: -4 }}
                    className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center border border-white/10 hover:border-primary transition-colors"
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form (Right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="lg:col-span-7"
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-secondary/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm relative"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium ml-1">Name</label>
                  <input
                    name="from_name"
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium ml-1">Email</label>
                  <input
                    name="from_email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2 mb-8">
                <label className="text-sm font-medium ml-1">Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="How can I help you?"
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSending || isSuccess}
                className="w-full relative py-4 bg-primary text-primary-foreground font-bold rounded-xl overflow-hidden group disabled:opacity-80"
              >
                <AnimatePresence mode="wait">
                  {isSending ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <Loader2 className="animate-spin" size={20} />
                      Sending Message...
                    </motion.div>
                  ) : isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 size={20} />
                      Sent Successfully!
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      Send Message
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;