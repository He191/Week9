/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains: ['indiasweethouse.in'],  // Add the domain here
        remotePatterns: [
          {
            protocol: "https",
            hostname: "indiasweethouse.in",
            port: "",
            pathname: "/**",
          },
          {
            protocol: "https",
            hostname: "cdn.uengage.io",
            port: "",
            pathname: "/**",
          },
          {
            protocol: "https",
            hostname: "shwetainthekitchen.com",
            port: "",
            pathname: "/**",
          },
          {
            protocol: "https",
            hostname: "encrypted-tbn0.gstatic.com",
            port: "",
            pathname: "/**",
          },
          
          {
            protocol: "https",
            hostname: "static.toiimg.com",
            port: "",
            pathname: "/**",
          },
          {
            protocol: "https",
            hostname: "spicecravings.com",
            port: "",
            pathname: "/**",
          },
          {
            protocol: "https",
            hostname: "encrypted-tbn0.gstatic.com",
            port: "",
            pathname: "/**",
          },
          {
            protocol: "https",
            hostname: "sapanarestaurant.com",
            port: "",
            pathname: "/**",
          },
          {
            protocol: "https",
            hostname: "upload.wikimedia.org",
            port: "",
            pathname: "/**",
          }
        ],
      },
};

export default nextConfig;
