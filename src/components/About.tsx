import { motion } from "framer-motion";
import { Code2, Rocket, Heart, Sparkles } from "lucide-react";

const About = () => {
  const highlights = [
    {
      icon: Code2,
      title: "Full-Stack Developer",
      description: "Building modern web apps with scalable architecture",
    },
    {
      icon: Rocket,
      title: "Problem Solver",
      description: "Strong DSA and algorithm skills for efficient solutions",
    },
    {
      icon: Heart,
      title: "Passionate Coder",
      description:
        "Writing clean, maintainable code across web and ML projects",
    },
    {
      icon: Sparkles,
      title: "Innovation Driven",
      description: "Exploring cutting-edge tech including ML, AI, and cloud",
    },
  ];

  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-section-title mb-6">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I'm <span className="text-primary font-semibold">Vikas Sharma</span>
            , a passionate full-stack developer skilled in building modern,
            user-centric web applications. I specialize in React, Node.js, and
            AI-powered solutions, combining clean code, problem-solving, and
            innovative digital experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card-glass group p-8"
              whileHover={{ y: -5 }}
            >
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-secondary p-0.5 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-full h-full bg-card rounded-2xl flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3 text-glow">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 max-w-3xl mx-auto text-center"
        >
          <p className="text-lg text-muted-foreground leading-relaxed">
            With a solid foundation in frontend and backend development, I bring
            ideas to life through clean code, intuitive design, and seamless
            user experiences. Outside of coding, I explore new technologies,
            contribute to open-source projects, and stay updated on the latest
            trends in web development and AI.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
