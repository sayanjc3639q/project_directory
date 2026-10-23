/**
 * @file src/features/admin-auth/auth.test.ts
 * @purpose Unit test verifying auth helper imports and verification structure.
 * @tags test, auth, admin, verification, vitest
 */
import { describe, it, expect, vi } from "vitest";
import { verifySessionCookie } from "./server/verifySession";
import * as adminDb from "@/lib/firebase/admin-db";

describe("Admin Auth verification", () => {
  it("rejects invalid or blank session cookie strings", async () => {
    vi.spyOn(adminDb, "getAdminAuth").mockReturnValue({
      verifySessionCookie: vi.fn().mockRejectedValue(new Error("Invalid cookie")),
    } as unknown as ReturnType<typeof adminDb.getAdminAuth>);

    const result = await verifySessionCookie("invalid-fake-cookie");
    expect(result).toBeNull();
  });
});
