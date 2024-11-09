import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

export const createUser = internalMutation({
    args: { createUser: v.string()},
    async handler(ctx, args) {

    }
})