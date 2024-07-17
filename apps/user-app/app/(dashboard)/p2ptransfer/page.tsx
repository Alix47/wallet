import prisma from "@repo/db/client";
import P2PTransfer from "../../../components/P2PTransfer";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { P2pTransactions } from "../../../components/P2pTransactions";

const getp2ptransaction = async () => {
  const session = await getServerSession(authOptions);
  const transactions = await prisma.p2PTransfer.findMany({
    where: {
      OR: [
        { fromUserId: Number(session?.user?.id) },
        { toUserId: Number(session?.user?.id) },
      ],
    },
    orderBy: {
      timestamp: "desc",
    },
  });
  return transactions;
};

export default async function () {
  const transactions = await getp2ptransaction();
  return (
    <div className="flex flex-col justify-start items-center p-10 w-[80vw] gap-5">
      <div className="w-[40%]">
        <P2PTransfer />
      </div>
      <div className="w-full">
        <P2pTransactions transactions={transactions} />
      </div>
    </div>
  );
}
