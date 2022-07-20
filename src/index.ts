import { Application } from "https://deno.land/x/oak/mod.ts";
// import { config } from "https://deno.land/x/dotenv/mod.ts";
import router from "./routes.ts";
const app = new Application();

app.use(router.routes());
const PORT = 3000
console.log(`Server listening on port ${PORT}`);
await app.listen({ port: PORT });

