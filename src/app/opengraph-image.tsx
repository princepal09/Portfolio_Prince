import { ImageResponse } from "next/og";
import { profile } from "@/constants";

export const alt = `${profile.name} | ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const initials = profile.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: 85,
        color: "#f8f8f8",
        background: "radial-gradient(circle at 85% 20%, #2e270d, #0c0c0c 65%)",
        border: "14px solid #facc15",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 88,
          height: 88,
          border: "2px solid #facc15",
          borderRadius: 18,
          color: "#facc15",
          fontSize: 33,
          fontWeight: 700,
        }}
      >
        {initials}
      </div>
      <div
        style={{
          marginTop: 24,
          fontSize: 90,
          fontWeight: 700,
          lineHeight: 1.1,
        }}
      >
        {profile.name}
      </div>
      <div style={{ marginTop: 16, color: "#facc15", fontSize: 40 }}>
        {profile.role}
      </div>
      <div style={{ marginTop: 28, color: "#c4c4c4", fontSize: 26 }}>
        {profile.tagline}
      </div>
    </div>,
    size,
  );
}
