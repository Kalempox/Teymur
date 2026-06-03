import { useState } from "react";

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.open("https://wa.me/903429991111", "_blank");
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="WhatsApp İletişim"
      style={{
        position: "fixed",
        bottom: "100px",
        right: "32px",
        zIndex: 9998,
        width: "64px",
        height: "64px",
        borderRadius: "50%",
        backgroundColor: isHovered ? "#1ebe57" : "#25D366",
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: isHovered
          ? "0 16px 48px rgba(37,211,102,0.5)"
          : "0 8px 24px rgba(37,211,102,0.35)",
        transform: isHovered ? "scale(1.08)" : "scale(1)",
        transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
        animation: "pulseWA 2.8s ease-in-out infinite",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="32"
        height="32"
        fill="#ffffff"
      >
        <path d="M16.003 3C9.375 3 4 8.373 4 15.003c0 2.15.576 4.19 1.67 5.98L4 29l8.23-1.64A11.94 11.94 0 0 0 16.003 28C22.627 28 28 22.627 28 16.003 28 9.373 22.627 3 16.003 3zm0 21.857c-1.88 0-3.72-.506-5.328-1.463l-.38-.225-3.942.786.803-3.844-.247-.394A9.842 9.842 0 0 1 5.714 15c0-5.68 4.61-10.286 10.29-10.286C21.686 4.714 26.286 9.32 26.286 15c0 5.68-4.6 10.857-10.283 10.857zm5.636-8.142c-.308-.154-1.823-.9-2.106-.999-.282-.1-.487-.154-.693.154-.205.308-.797.999-.977 1.203-.18.205-.36.23-.668.077-.308-.154-1.3-.48-2.476-1.53-.915-.817-1.534-1.827-1.714-2.135-.18-.308-.019-.474.135-.628.138-.138.308-.36.462-.54.154-.18.205-.308.308-.513.103-.205.051-.385-.026-.54-.077-.154-.693-1.67-.95-2.286-.25-.6-.504-.518-.693-.528l-.59-.01c-.205 0-.54.077-.82.385-.282.308-1.077 1.05-1.077 2.562s1.103 2.973 1.257 3.178c.154.205 2.17 3.31 5.253 4.64.734.317 1.307.506 1.753.648.736.235 1.407.202 1.937.122.59-.088 1.823-.745 2.08-1.464.256-.72.256-1.336.18-1.464-.077-.128-.282-.205-.59-.36z"/>
      </svg>

      <style>{`
        @keyframes pulseWA {
          0%, 100% {
            box-shadow: 0 8px 24px rgba(37,211,102,0.35), 0 0 0 0 rgba(37,211,102,0.5);
          }
          50% {
            box-shadow: 0 8px 24px rgba(37,211,102,0.35), 0 0 0 12px rgba(37,211,102,0);
          }
        }

        @media (max-width: 768px) {
          button[aria-label="WhatsApp İletişim"] {
            width: 56px !important;
            height: 56px !important;
            bottom: 90px !important;
            right: 24px !important;
          }
        }
      `}</style>
    </button>
  );
}
