import { useEffect } from "react";

const BOOKING_URL = "https://teymur-continental-hotel.hotelrunner.com/bv3/search";

export function ReservationPage() {
  useEffect(() => {
    window.location.replace(BOOKING_URL);
  }, []);

  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#888" }}>
      Rezervasyon sayfasına yönlendiriliyorsunuz…
    </div>
  );
}
