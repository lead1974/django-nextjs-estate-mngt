/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.externals = [...config.externals, { canvas: "canvas" }];
		return config;
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
	swcMinify: true,
};

export default nextConfig;