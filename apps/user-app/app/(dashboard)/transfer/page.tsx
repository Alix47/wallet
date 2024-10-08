import prisma from "@repo/db";
// import {OnRampStatus} from "@prisma/client"
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    // type OnRampStatusType = OnRampStatus;
    interface OnRampTranscationType {
        id: number;
        // status: OnRampStatusType;
        token: string;
        provider: string;
        amount: number;
        startTime: Date;
        userId: number;
      }
      
    return txns.map((t:OnRampTranscationType) => ({
        time: t.startTime,
        amount: t.amount,
        // status: t.status,
        provider: t.provider
    }))
}

export default async function() {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return <div className="w-screen">
        <div className="pt-8 mb-8 flex flex-col">
            <div className="text-4xl text-[#6a51a6] font-bold">Transfer</div>
            <div className="text-2xl text-black">Note - The transactions will not be processed unless you have the access to the backend bank API. However your transfers are listed in the transactions table below because they are stil processing.</div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <AddMoney />
            </div>  
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <div className="pt-4">
                    <OnRampTransactions transactions={transactions} />
                </div>
            </div>
        </div>
    </div>
}