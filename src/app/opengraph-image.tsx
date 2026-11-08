import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/constants";

export const runtime = "nodejs";
export const alt = `Portrait of ${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const portraitData = await readFile(
  join(process.cwd(), "public", "profile.jpg"),
  "base64",
);
const portraitSrc = `data:image/jpeg;base64,${portraitData}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "56px 68px",
        color: "#f8f8f8",
        background: "radial-gradient(circle at 82% 40%, #30270b, #0c0c0c 64%)",
        border: "14px solid #facc15",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: 660,
          height: "100%",
          paddingRight: 28,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#facc15",
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          Portfolio
          <span style={{ width: 38, height: 2, background: "#facc15" }} />
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          {profile.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            color: "#facc15",
            fontSize: 31,
            fontWeight: 600,
          }}
        >
          {profile.role}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            color: "#c4c4c4",
            fontSize: 25,
            lineHeight: 1.4,
          }}
        >
          {profile.tagline}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          width: 360,
          height: 500,
          overflow: "hidden",
          border: "3px solid #facc15",
          borderRadius: 28,
          background: "#191505",
        }}
      >
        {/* OG images need a plain img so ImageResponse can embed the data URI. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={portraitSrc}
          alt={alt}
          width={360}
          height={500}
          style={{ objectFit: "cover", objectPosition: "center 40%" }}
        />
      </div>
    </div>,
    size,
  );
}
