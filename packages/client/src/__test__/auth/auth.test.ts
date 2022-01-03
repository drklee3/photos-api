import { getApp } from "@picatch/server/src/server";
import { PrismaClient } from ".prisma/client";
import type { Express } from "express";
import { Server } from "http";
import type { ApolloServer } from "apollo-server-express";
import { getSdk } from "../../graphqlRequest";
import { GraphQLClient } from "graphql-request";
import crossFetch from "cross-fetch";
import fetchCookie from "fetch-cookie";
import { CookieJar } from "tough-cookie";

const cookieJar = new CookieJar();
const fetch = fetchCookie(crossFetch, cookieJar);

const client = new GraphQLClient("http://localhost:4000/graphql", {
  credentials: "include",
  fetch,
});
const sdk = getSdk(client);

let httpServer: Server;
let apolloServer: ApolloServer<unknown>;

beforeAll(async () => {
  const app = await getApp();
  httpServer = app.httpServer;
  apolloServer = app.apolloServer;

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
});

afterAll(async () => {
  await apolloServer.stop();
  httpServer.close();
});

describe("auth", () => {
  const prisma = new PrismaClient();

  beforeAll(async () => {
    // Clear database users
    await prisma.user.deleteMany({});
  });

  afterAll(async () => {
    // Clear database users
    await prisma.user.deleteMany({});

    // Clear cookies
    await cookieJar.removeAllCookies();
  });

  test("query currentUser before signup", async () => {
    await expect(sdk.CurrentUser()).rejects.toThrow("Not Authorised!");
  });

  test("signup", async () => {
    const res = await sdk.Signup({
      username: "bob",
      password: "Hunter2",
      email: "me@example.com",
    });

    expect(res.signup).toBeDefined();

    expect(res.signup?.user?.username).toBe("bob");
    expect(res.signup?.user?.email).toBe("me@example.com");
  });

  test("query currentUser", async () => {
    const res = await sdk.CurrentUser();

    expect(res.currentUser).toBeDefined();

    expect(res.currentUser?.username).toBe("bob");
    expect(res.currentUser?.email).toBe("me@example.com");
  });

  test("signup when already signed in", async () => {
    await expect(
      sdk.Signup({
        username: "bob",
        password: "Hunter2",
        email: "me@example.com",
      })
    ).rejects.toThrow("Not Authorised!");
  });

  test("signout", async () => {
    await sdk.Logout();

    // Should actually sign out
    await expect(sdk.CurrentUser()).rejects.toThrow("Not Authorised!");
  });
});
