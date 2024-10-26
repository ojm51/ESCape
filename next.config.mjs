/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
      'lh3.googleusercontent.com',
      'k.kakaocdn.net',
      'search.pstatic.net',
    ],
  },
}

export default nextConfig
