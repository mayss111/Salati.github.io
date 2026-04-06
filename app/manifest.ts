import type { MetadataRoute } from "next"

export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Salati",
    short_name: "Salati",
    description: "Prayer times, Qibla direction, and daily Islamic companion.",
    start_url: ".",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#1a1f3a",
    icons: [
      {
        src: "icon-180.svg",
        sizes: "180x180",
        type: "image/svg+xml",
      },
      {
        src: "icon-32.svg",
        sizes: "32x32",
        type: "image/svg+xml",
      },
    ],
  }
}
