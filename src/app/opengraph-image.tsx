import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "TIDA WORKS - 奄美大島の業務システム開発・Web制作";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <span
            style={{
              fontSize: "64px",
              fontWeight: 900,
              color: "#F5A623",
            }}
          >
            TIDA
          </span>
          <span
            style={{
              fontSize: "64px",
              fontWeight: 900,
              color: "#ffffff",
              marginLeft: "16px",
            }}
          >
            WORKS
          </span>
        </div>

        <div
          style={{
            fontSize: "42px",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.4,
            marginBottom: "24px",
          }}
        >
          奄美大島の業務システム開発・Web制作
        </div>

        <div
          style={{
            fontSize: "24px",
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.6,
          }}
        >
          予約管理・顧客管理・売上集計・LINE連携
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "60px",
            right: "80px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#2ECC71",
            }}
          />
          <span style={{ fontSize: "20px", color: "rgba(255,255,255,0.4)" }}>
            tidaworks.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
