import { server$ } from "@builder.io/qwik-city";
import type { Session } from "@auth/qwik";
import { ServerError } from "@builder.io/qwik-city/middleware/request-handler";
import Stripe from "stripe";

/**
 * Server function to deactivate a Stripe product by setting its active status to false.
 * This function performs a "soft delete" by deactivating the product rather than permanently removing it.
 *
 * @param id - The Stripe product ID to deactivate
 * @returns Promise<Stripe.Product> - The updated Stripe product object with active: false
 *
 * @throws {ServerError} 401 - When user is not authenticated or not authorized (must be ts22082@gmail.com)
 * @throws {ServerError} 500 - When Stripe API call fails or other server errors occur
 *
 * @example
 * ```typescript
 * try {
 *   const result = await deleteProduct("prod_1234567890");
 *   console.log("Product deactivated:", result.id);
 * } catch (error) {
 *   console.error("Failed to delete product:", error);
 * }
 * ```
 */

export const deleteProduct = server$(async function (id: string) {
  try {
    const session: Session | null = this.sharedMap.get("session");

    if (!session || session.user?.email !== "ts22082@gmail.com") {
      throw new ServerError(401, "Not authorized");
    }

    const stripe = new Stripe(this.env.get("SECRET_STRIPE_KEY") || "", {
      apiVersion: "2025-04-30.basil",
    });

    const result = await stripe.products.update(id, {
      active: false,
    });

    return result;
  } catch (e) {
    throw new ServerError(500, e);
  }
});
