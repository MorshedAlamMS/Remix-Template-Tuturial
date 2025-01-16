import { type Config } from "@react-router/dev/config";

export default {
  ssr: true,
  prerender: ["/about"] //static and pre-rendered routes
} satisfies Config;
