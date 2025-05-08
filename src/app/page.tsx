"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowDown, Microscope, Upload, Brain, Phone, ChevronUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 relative">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Navigation Pills */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 space-y-2">
        {["hero", "problem", "solution", "how-it-works", "impact"].map((section) => (
          <div
            key={section}
            onClick={() => scrollToSection(section)}
            className="w-3 h-3 rounded-full bg-blue-200 hover:bg-blue-600 cursor-pointer transition-colors duration-300"
            role="button"
            aria-label={`Navigate to ${section} section`}
          />
        ))}
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 z-40"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-6 h-6" />
      </motion.button>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-green-400 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 -top-48 -left-48 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute w-96 h-96 top-48 right-48 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        </div>

        <div className="absolute inset-0 opacity-20">
          <Image
            src="/blood-cells-bg.jpg"
            alt="Medical Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 text-center z-10"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative inline-block"
          >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-2xl transform -rotate-3" />
            <h1 className="relative text-5xl md:text-7xl font-bold text-white mb-6 px-8 py-4">
              Mobakar AI
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative max-w-2xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-400/10 backdrop-blur-sm rounded-lg transform rotate-1" />
            <p className="relative text-xl md:text-2xl text-white/90 mb-12 px-4 py-2">
              Saudi Arabia's first AI platform for early cancer detection
            </p>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center"
          >
            <Button
              variant="outline"
              onClick={() => scrollToSection("how-it-works")}
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 px-12 py-6 text-lg rounded-full backdrop-blur-sm hover:shadow-xl transition-all duration-300 group"
            >
              <span className="flex items-center">
                Learn More
                <motion.span
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-2"
                >
                  ↓
                </motion.span>
              </span>
            </Button>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
            onClick={() => scrollToSection("problem")}
          >
            <div className="relative group">
              <ArrowDown className="text-white/70 w-8 h-8 group-hover:text-white transition-colors duration-300" />
              <div className="absolute -inset-2 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
            </div>
          </motion.div>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          className="absolute bottom-10 right-10 bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
        >
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-white/80 text-sm">Real-time Analysis</span>
          </div>
        </motion.div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Card className="p-12 shadow-xl bg-gradient-to-br from-red-50 to-orange-50 border-none hover:shadow-2xl transition-shadow duration-300">
              <CardContent>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-16"
                >
                  <span className="inline-block px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-semibold mb-4">
                    Urgent Healthcare Challenge
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold text-red-900">
                    The Critical Challenge
                  </h2>
                  <p className="mt-4 text-lg text-red-700/80 max-w-2xl mx-auto">
                    Cancer detection in Saudi Arabia faces significant hurdles that impact survival rates
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/80 p-8 rounded-2xl backdrop-blur-sm hover:shadow-lg transition-all duration-300 border border-red-100"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-red-100 p-3 rounded-xl">
                        <svg
                          className="w-8 h-8 text-red-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-end space-x-2 mb-2">
                          <h3 className="text-5xl font-bold text-red-800">50%</h3>
                          <span className="text-red-600 mb-2">of cases</span>
                        </div>
                        <Progress value={50} className="h-2 mb-4 bg-red-100" />
                        <p className="text-lg text-gray-700">
                          of cancer cases in Saudi Arabia are detected at late stages, significantly reducing survival chances
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/80 p-8 rounded-2xl backdrop-blur-sm hover:shadow-lg transition-all duration-300 border border-red-100"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-red-100 p-3 rounded-xl">
                        <svg
                          className="w-8 h-8 text-red-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-end space-x-2 mb-2">
                          <h3 className="text-5xl font-bold text-red-800">13,400</h3>
                          <span className="text-red-600 mb-2">deaths</span>
                        </div>
                        <div className="h-2 w-full bg-red-100 rounded-full mb-4">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 1 }}
                            className="h-full bg-red-600 rounded-full"
                          />
                        </div>
                        <p className="text-lg text-gray-700">
                          preventable deaths in 2022 alone due to late detection and diagnosis
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="md:col-span-2 mt-8 bg-gradient-to-r from-red-100/50 to-orange-100/50 p-6 rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center justify-center space-x-2 text-red-800">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-sm font-medium">
                        Early detection can increase survival rates by up to 90% for most common cancers
                      </p>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-32 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
                Revolutionary Solution
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
                AI-Driven Early Detection
              </h2>
              <p className="text-lg text-blue-700/80 max-w-2xl mx-auto">
                Leveraging cutting-edge artificial intelligence to detect cancer at its earliest stages
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/80 p-8 rounded-2xl backdrop-blur-sm hover:shadow-xl transition-all duration-300 border border-blue-100"
                >
                  <div className="flex items-start space-x-6">
                    <div className="bg-blue-100 p-4 rounded-xl">
                      <svg
                        className="w-8 h-8 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-end space-x-2 mb-3">
                        <h3 className="text-5xl font-bold text-blue-800">95%</h3>
                        <span className="text-blue-600 mb-2">Increase</span>
                      </div>
                      <div className="h-2 w-full bg-blue-100 rounded-full mb-4">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "95%" }}
                          transition={{ duration: 1 }}
                          className="h-full bg-blue-600 rounded-full"
                        />
                      </div>
                      <p className="text-lg text-gray-700">
                        The cure rate increases by 95% when cancer is detected in early stages
                      </p>
                    </div>
                  </div>
                </motion.div>

                <Button
                  onClick={() => scrollToSection("how-it-works")}
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl group"
                >
                  <span className="flex items-center justify-center">
                    Discover How It Works
                    <svg
                      className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </Button>
              </div>

              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-green-400/20 rounded-2xl transform rotate-3 scale-95" />
                <div className="relative h-96 w-full">
                  <Image
                    src="/ai-analysis.jpg"
                    alt="AI Analysis"
                    fill
                    className="object-contain rounded-2xl"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-blue-900 mb-16 text-center"
            >
              The Process
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  title: "Sample Collection",
                  description: "Quick and efficient blood sample collection by certified clinicians",
                  icon: <Microscope className="w-12 h-12 text-blue-600" />,
                  color: "from-blue-50 to-purple-50"
                },
                {
                  title: "Lab Analysis",
                  description: "Advanced biomarker analysis including protein, genomic, and methylation",
                  icon: <Brain className="w-12 h-12 text-purple-600" />,
                  color: "from-purple-50 to-pink-50"
                },
                {
                  title: "Data Upload",
                  description: "Secure upload to our state-of-the-art AI platform",
                  icon: <Upload className="w-12 h-12 text-pink-600" />,
                  color: "from-pink-50 to-red-50"
                },
                {
                  title: "AI Analysis",
                  description: "Rapid and accurate cancer risk assessment",
                  icon: <Brain className="w-12 h-12 text-red-600" />,
                  color: "from-red-50 to-orange-50"
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group"
                >
                  <Card className={`p-8 h-full bg-gradient-to-br ${step.color} border-none transition-all duration-300 hover:shadow-xl`}>
                    <CardContent className="space-y-4">
                      <motion.div 
                        className="bg-white/50 p-4 rounded-full w-fit group-hover:bg-white transition-colors duration-300"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {step.icon}
                      </motion.div>
                      <h3 className="text-2xl font-semibold text-gray-900">
                        {step.title}
                      </h3>
                      <p className="text-gray-700">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-32 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">
                National Impact
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
                Supporting Saudi Vision 2030
              </h2>
              <p className="text-lg text-green-700/80 max-w-2xl mx-auto">
                Aligned with national healthcare transformation initiatives
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-7 space-y-8">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/80 p-8 rounded-2xl backdrop-blur-sm hover:shadow-xl transition-all duration-300 border border-green-100"
                >
                  <div className="flex items-start space-x-6">
                    <div className="bg-green-100 p-4 rounded-xl">
                      <svg
                        className="w-8 h-8 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-lg text-gray-700 mb-4">
                        Committed to preventing diseases like breast and colon cancer through early detection and innovative AI solutions.
                      </p>
                      <div className="h-1 w-32 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-6" />
                    </div>
                  </div>
                </motion.div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-xl border border-green-100/50 hover:shadow-lg transition-all duration-300"
                  >
                    <h4 className="text-lg font-semibold text-green-900 mb-2 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      Healthcare Innovation
                    </h4>
                    <p className="text-gray-600">Leading AI-driven healthcare transformation</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl border border-green-100/50 hover:shadow-lg transition-all duration-300"
                  >
                    <h4 className="text-lg font-semibold text-green-900 mb-2 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                      Global Impact
                    </h4>
                    <p className="text-gray-600">Setting new standards in cancer detection</p>
                  </motion.div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-lg px-8 py-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl group">
                      <span className="flex items-center justify-center">
                        <Phone className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                        Get in Touch
                        <svg
                          className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white p-8 rounded-2xl max-w-md mx-auto">
                    <div className="text-center mb-6">
                      <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Phone className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Contact Us</h3>
                      <p className="text-gray-600">We're here to answer your questions</p>
                    </div>
                    <Alert className="border-none bg-gradient-to-r from-green-50 to-blue-50">
                      <AlertDescription className="text-lg flex items-center justify-center space-x-2">
                        <svg
                          className="w-5 h-5 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-gray-700">munib@mobakar.com</span>
                      </AlertDescription>
                    </Alert>
                  </DialogContent>
                </Dialog>
              </div>

              <motion.div 
                className="md:col-span-5 relative"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-blue-400/20 rounded-2xl transform -rotate-3 scale-95" />
                <div className="relative h-80 w-full">
                  <Image
                    src="/saudi-vision-2030-seeklogo.png"
                    alt="Saudi Vision 2030"
                    fill
                    className="object-contain rounded-2xl"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
