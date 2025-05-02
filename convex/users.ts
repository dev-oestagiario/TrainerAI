import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const syncUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        image: v.optional(v.string()),
        clearkId: v.string()
    },
    handler: async (ctx, args) => {

        const existingUser = await ctx.db.query("users")
        .filter(q => q.eq(q.field("clearkId"), args.clearkId))
        .first();

        if (existingUser) return;
        return await ctx.db.insert("users", args);
    },
}) 