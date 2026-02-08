import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const email = process.env.ADMIN_EMAIL || "admin@example.com";
    const hashedPassword = process.env.ADMIN_HASH;

    if (!hashedPassword) {
        throw new Error("ADMIN_HASH environment variable is not set");
    }

    const user = await prisma.user.upsert({
        where: { email },
        update: {
            password: hashedPassword
        },
        create: {
            email,
            password: hashedPassword,
        },
    });

    console.log("Admin user sync completed for:", user.email);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
