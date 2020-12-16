import get from "./msw-utils";
import auth from "./auth.json";

export const handlers = [get("https://api.nav.no/innloggingsstatus/auth", auth)];
