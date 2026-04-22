import { loadEnv, defineConfig } from "@medusajs/framework/utils";
// import session from "express-session";
import RedisStore from "connect-redis";

loadEnv(process.env.NODE_ENV || "development", process.cwd());

const redisUrl = process.env.REDIS_URL;

export default defineConfig({
  projectConfig: {
    redisUrl,
    // sessionOptions: {
    //   store: new RedisStore({
    //     client: require("redis").createClient({ url: redisUrl }), // or use ioredis client
    //     prefix: "medusa:sess:",
    //   }),
    //   secret: process.env.COOKIE_SECRET || "supersecret",
    //   resave: false,
    //   saveUninitialized: false,
    // },
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
  modules: {
    eventBus: {
      resolve: "@medusajs/event-bus-redis",
      options: {
        redisUrl,
      },
    },
    cacheService: {
      resolve: "@medusajs/cache-redis",
      options: {
        redisUrl,
      },
    },
    // locking: {
    //   resolve: "@medusajs/locking-redis",
    //   options: {
    //     redisUrl,
    //   },
    // },
  },
});
