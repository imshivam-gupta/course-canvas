/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          "utfs.io",
            "myaws3020.s3.ap-south-1.amazonaws.com"
        ]
      },
      typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      },
};


export default nextConfig;
