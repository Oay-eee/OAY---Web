import { getVerificationTokenByEmail } from "@/data";
import { prisma } from "@/lib";
import { v4 as uuidv4 } from "uuid";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  return prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
};
