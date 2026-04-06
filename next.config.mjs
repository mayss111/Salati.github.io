/** @type {import('next').NextConfig} */
const repository = process.env.GITHUB_REPOSITORY || ""
const [owner = "", repo = ""] = repository.split("/")
const isUserSiteRepo =
  owner.length > 0 && repo.toLowerCase() === `${owner.toLowerCase()}.github.io`
const isProduction = process.env.NODE_ENV === "production"
const basePath = isProduction && repo && !isUserSiteRepo ? `/${repo}` : ""

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
