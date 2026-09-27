interface OgImageProps {
  title: string
  description: string
}

export default function OgImage({ title, description }: OgImageProps) {
  return (
    <div
      style={{
        alignItems: "stretch",
        background: "#fff9f5",
        color: "#3d3436",
        display: "flex",
        flexDirection: "column",
        fontFamily: "sans-serif",
        height: "100%",
        justifyContent: "space-between",
        padding: "72px",
        width: "100%",
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "34px",
            fontWeight: 800,
            letterSpacing: "-2px",
          }}
        >
          YOTTABYTE.
        </div>
        <div
          style={{
            background: "#ff7e5f",
            border: "3px solid #3d3436",
            display: "flex",
            fontSize: "18px",
            fontWeight: 700,
            padding: "12px 18px",
          }}
        >
          WEB DEVELOPMENT STUDIO
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
        <div
          style={{
            display: "flex",
            fontSize: "82px",
            fontWeight: 800,
            letterSpacing: "-5px",
            lineHeight: 0.98,
            maxWidth: "980px",
          }}
        >
          {title}
        </div>
        <div
          style={{
            color: "#6f6764",
            display: "flex",
            fontSize: "30px",
            lineHeight: 1.35,
            maxWidth: "860px",
          }}
        >
          {description}
        </div>
      </div>

      <div
        style={{
          alignItems: "center",
          borderTop: "3px solid #3d3436",
          color: "#6f6764",
          display: "flex",
          fontSize: "22px",
          justifyContent: "space-between",
          paddingTop: "28px",
        }}
      >
        <div style={{ display: "flex" }}>Built Sharp. Built Fast.</div>
        <div style={{ color: "#ce5d47", display: "flex", fontWeight: 700 }}>
          Built to Convert.
        </div>
      </div>
    </div>
  )
}
