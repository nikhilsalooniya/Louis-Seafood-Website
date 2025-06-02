'use client';

import { useState } from 'react';

const faqAnswers: { [key: string]: string } = {
  services: "We offer sourcing, quality inspection, import support, and logistics coordination.",
  contact: "You can reach us at contact@example.com or call us at 0787878787.",
  location: "We are located at Ash Lane 110, London, UK.",
  support: "For general support, email us at contact@example.com.",
  products: "We offer a variety of seafood products including fish, shellfish, and more.",
  pricing: "Pricing varies based on the product and order size. Please contact us for a quote.",
  shipping: "We provide shipping services worldwide. Delivery times depend on the destination.",
  customs: "We assist with customs clearance and import regulations to ensure smooth delivery.",
  quality: "We conduct thorough quality inspections to ensure product compliance and safety.",
  sourcing: "We specialize in sourcing high-quality seafood from trusted suppliers.",
  logistics: "We coordinate logistics to ensure timely delivery of your orders.",
  about: "We are a seafood company dedicated to providing high-quality products and services.",
  hours: "Our business hours are Monday to Friday, 9 AM to 5 PM.",
  team: "Our team consists of experienced professionals in the seafood industry.",
  feedback: "We value your feedback! Please let us know how we can improve.",
  returns: "Our return policy allows returns within 30 days of purchase. Please contact us for details.",
  warranty: "We offer a warranty on our products. Please refer to the product details for more information.",
  privacy: "We respect your privacy. Please refer to our privacy policy for details.",
  terms: "Please refer to our terms and conditions for more information.",
  faq: "You can find our FAQs on our website under the FAQ section.",
  business: "We are a seafood business specializing in high-quality products and services.",
  company: "We are a seafood company dedicated to providing high-quality products and services.",
};

const getBotResponse = (userMessage: string): string => {
  const msg = userMessage.toLowerCase();
  if (msg.includes("service")) return faqAnswers["services"];
  if (msg.includes("contact")) return faqAnswers["contact"];
  if (msg.includes("location") || msg.includes("address")) return faqAnswers["location"];
  if (msg.includes("support") || msg.includes("help")) return faqAnswers["support"];
  if (msg.includes("product")) return faqAnswers["products"];
  if (msg.includes("pricing") || msg.includes("price")) return faqAnswers["pricing"];
  if (msg.includes("shipping") || msg.includes("delivery")) return faqAnswers["shipping"];
  if (msg.includes("customs") || msg.includes("import")) return faqAnswers["customs"];
  if (msg.includes("quality") || msg.includes("inspection")) return faqAnswers["quality"];
  if (msg.includes("sourcing") || msg.includes("procurement")) return faqAnswers["sourcing"];
  if (msg.includes("logistics") || msg.includes("coordination")) return faqAnswers["logistics"];
  if (msg.includes("about") || msg.includes("company")) return faqAnswers["about"];
  if (msg.includes("hours")) return faqAnswers["hours"];
  if (msg.includes("team")) return faqAnswers["team"];
  if (msg.includes("feedback")) return faqAnswers["feedback"];
  if (msg.includes("returns")) return faqAnswers["returns"];
  if (msg.includes("warranty")) return faqAnswers["warranty"];
  if (msg.includes("privacy")) return faqAnswers["privacy"];
  if (msg.includes("terms")) return faqAnswers["terms"];
  if (msg.includes("faq")) return faqAnswers["faq"];
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) return "Hello! How can I assist you today?";
  if (msg.includes("thank you") || msg.includes("thanks")) return "You're welcome! If you have more questions, feel free to ask.";
  if (msg.includes("bye") || msg.includes("goodbye")) return "Goodbye! Have a great day!";
  if (msg.includes("joke")) return "Why don't scientists trust atoms? Because they make up everything!";
  if (msg.includes("weather")) return "I can't check the weather, but I hope it's nice where you are!";
  if (msg.includes("news")) return "I don't have the latest news, but I can help with other questions.";
  if (msg.includes("food") || msg.includes("seafood")) return "We specialize in seafood products. What would you like to know?";
  if (msg.includes("order") || msg.includes("purchase")) return "To place an order, please contact us directly.";
  if (msg.includes("payment") || msg.includes("pay")) return "We accept various payment methods. Please check our website for details.";
  return "Sorry, I don't know about that.";
};

export default function ChatBot() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [started, setStarted] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    const botMsg = { sender: "bot", text: getBotResponse(input) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  const handleStart = () => {
    setStarted(true);
    setMessages((prev) => [...prev, { sender: "bot", text: "How can I help you today? " }]);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => {
            setIsOpen(true);
            setStarted(false);
            setMessages([{ sender: "bot", text: "Welcome to Louis! 😊" }]);
          }}
          className="fixed bottom-6 right-6 bg-theme-blue-3 text-white p-4 rounded-full shadow-lg hover:scale-110 transition duration-300 ease-in-out cursor-pointer"
          title="Chat with us"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4.39-1.036L3 21l1.468-3.711A7.97 7.97 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>

      ) : (
        <div className="w-80 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
          <div className="bg-theme-blue-3 text-white p-3 font-bold text-center flex justify-between items-center">
            <span>Ask Me</span>
            <button
              onClick={() => {
                setIsOpen(false);
                setStarted(false);
                setMessages([]);
              }}
              className="text-white hover:text-gray-300 transition duration-300 cursor-pointer"
            >
              ✖
            </button>
          </div>

          <div className="h-64 p-3 overflow-y-auto space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded ${msg.sender === "user"
                    ? "bg-theme-blue-3 text-white text-right"
                    : "bg-gray-200 text-black text-left"
                  }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {!started ? (
            <div className="flex items-center justify-center h-20 border-t border-gray-200">
              <button
                onClick={handleStart}
                className="bg-theme-blue-3 text-white px-4 py-2 rounded hover:bg-gray-800  transition duration-300 cursor-pointer flex items-center space-x-2"
              >
                Start Chat
              </button>
            </div>
          ) : (
            <div className="flex border-t border-gray-200 p-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your question..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l"
              />
              <button
                onClick={handleSend}
                className="bg-theme-blue-3 text-white px-4 rounded-r hover:bg-gray-800 cursor-pointer"
              >
                Send
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
