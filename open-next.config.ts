import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
	// Uncomment the lines below when you have R2 bucket configured in wrangler.jsonc
	// incrementalCache: r2IncrementalCache,
});
