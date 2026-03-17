import themes from "daisyui/src/theming/themes";
import { ConfigProps } from "./types/config";

const config = {
  // REQUIRED
  appName: "Delta Fleet Quiz",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription:
    "Match Delta Air Lines ship numbers to their aircraft types — a timed quiz game with leaderboards.",
  // REQUIRED (no https://, not trailing slash at the end, just the naked domain)
  domainName: "fleetquiz.netlify.app",
  crisp: {
    id: "",
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    plans: [],
  },
  aws: {
    bucket: "bucket-name",
    bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
    cdn: "https://cdn-id.cloudfront.net/",
  },
  resend: {
    fromNoReply: `Delta Fleet Quiz <noreply@fleetquiz.netlify.app>`,
    fromAdmin: `Delta Fleet Quiz <admin@fleetquiz.netlify.app>`,
    supportEmail: "",
  },
  colors: {
    theme: "dark",
    main: "#E81830",
  },
  auth: {
    loginUrl: "/api/auth/signin",
    callbackUrl: "/dashboard",
  },
} as ConfigProps;

export default config;
