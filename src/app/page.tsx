"use client";
import { useEffect, useState } from "react";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { Code2, Brain, Terminal, Smartphone, Gamepad, Users } from "lucide-react";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  const [status, setStatus] = useState<"before" | "live" | "ended">("before");
 
  const [floatingObjects, setFloatingObjects] = useState<any[]>([]);

  useEffect(() => {
    const startDate = new Date(Date.UTC(2025, 2, 27, 17, 30, 0)).getTime();
    const endDate = new Date(Date.UTC(2025, 2, 31, 13, 0, 0)).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();

      if (now < startDate) {
        setStatus("before");
        const distance = startDate - now;
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else if (now >= startDate && now <= endDate) {
        setStatus("live");
        const distance = endDate - now;
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setStatus("ended");
        setTimeLeft(null);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const randomObjects = [
      "C++", "#include", "Algorithm", "Syntax", "Compiler", "Debug",
      "IDE", "Variable", "Function", "Loop", "Array", "Class",
      "Object", "Module", "API", "Data", "Code", "Git"
    ];

    const colors = [
      "#4CAF50", "#2196F3", "#9c27b0", "#00bcd4", "#8bc34a",
      "#3f51b5", "#009688", "#ff5722", "#795548", "#607d8b"
    ];

    const objectsWithStyles = randomObjects.map((text) => ({
      text,
      color: colors[Math.floor(Math.random() * colors.length)],
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      fontSize: `${Math.random() * 16 + 12}px`,
      opacity: Math.random() * 0.4 + 0.2,
    }));

    setFloatingObjects(objectsWithStyles);
  }, []);

  const features = [
    {
      icon: <Code2 className="w-8 h-8 text-green-400" />,
      title: "Web Development",
    },
    {
      icon: <Brain className="w-8 h-8 text-blue-400" />,
      title: "AI/ML",
    },
    {
      icon: <Terminal className="w-8 h-8 text-purple-400" />,
      title: "Competitive Programming",
    },
    {
      icon: <Smartphone className="w-8 h-8 text-orange-400" />,
      title: "App Development",
    },
    {
      icon: <Gamepad className="w-8 h-8 text-pink-400" />,
      title: "Game Development",
    },
    {
      icon: <Users className="w-8 h-8 text-yellow-400" />,
      title: "Outreach",
    }
  ];

  return (
    <div className="flex flex-col bg-gradient-to-b from-black via-[#1a1a1a] to-[#32CA43] min-h-screen items-center justify-between py-12 relative overflow-hidden">
      {}
      <div className="absolute inset-0 overflow-hidden">
        {floatingObjects.map((obj, index) => (
          <span
            key={index}
            className="floating-text font-mono"
            style={{
              left: obj.left,
              top: obj.top,
              fontSize: obj.fontSize,
              opacity: obj.opacity,
              color: obj.color,
            }}
          >
            {obj.text}
          </span>
        ))}
      </div>

      <div className="absolute sm:top-8 sm:left-8 max-sm:hidden z-10">
        <Image
          src="/images/Enigma.png"
          height={70}
          width={70}
          alt="logo"
          className="hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex flex-col items-center z-10 px-4 max-w-7xl mx-auto w-full">
        <h2 className="text-center text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 title-glow tracking-wider">
          INDUCTION
        </h2>

        <p
          className={`text-center text-lg md:text-xl font-medium mb-8 ${
            status === "before"
              ? "text-neutral-200"
              : status === "live"
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {status === "before" && "Registration opens in:"}
          {status === "live" && "Registration is now open!"}
          {status === "ended" && "Registration has ended."}
        </p>

        {timeLeft && (
          <div className="grid grid-cols-4 gap-4 md:gap-8 mb-12">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div
                key={unit}
                className="countdown-box rounded-xl p-4 md:p-6 flex flex-col items-center min-w-[80px] md:min-w-[120px]"
              >
                <span className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                  {value.toString().padStart(2, "0")}
                </span>
                <span className="text-xs md:text-sm text-neutral-300 uppercase tracking-wider">
                  {unit}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 w-full">
          {features.map((feature, index) => (
            <div key={index} className="feature-card rounded-xl p-6 text-center">
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-white text-lg font-semibold mb-2">{feature.title}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="z-10">
        <Link
          href={status === "live" ? "/register" : "/"}
          onClick={(e) => status !== "live" && e.preventDefault()}
          className={`register-button px-12 py-4 text-lg font-bold rounded-full transition-all duration-300 ${
            status === "live"
              ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-[0_0_20px_rgba(50,202,67,0.5)] transform hover:-translate-y-1"
              : "bg-gray-700 text-gray-400 cursor-not-allowed opacity-50"
          }`}
        >
          Register Now
        </Link>
      </div>
    </div>
  );
}
