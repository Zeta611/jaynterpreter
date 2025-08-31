import posthog from "posthog-js";

const posthogPublicKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (posthogPublicKey) {
  posthog.init(posthogPublicKey, {
    api_host: "/relay-g361",
    ui_host: "https://us.posthog.com",
  });
} else {
  console.warn(
    "PostHog not initialized: NEXT_PUBLIC_POSTHOG_KEY is missing or empty"
  );
}
