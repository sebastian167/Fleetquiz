import { ReactNode } from "react";
import { Outfit } from "next/font/google";
import { Viewport } from "next";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";
import "./globals.css";

const font = Outfit({ subsets: ["latin"], weight: ["300", "400", "600", "700", "800", "900"] });

export const viewport: Viewport = {
	themeColor: config.colors.main,
	width: "device-width",
	initialScale: 1,
};

export const metadata = getSEOTags();

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html
			lang="en"
			data-theme={config.colors.theme}
			className={font.className}
		>
			<body className="bg-[#0A1628] min-h-screen">
				{children}
			</body>
		</html>
	);
}
