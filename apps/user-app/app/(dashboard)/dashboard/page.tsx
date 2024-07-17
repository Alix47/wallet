import { Card } from "@repo/ui/card";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { DashboardCard } from "../../../components/DashboardCard";
import image1 from "../../../public/dashboard_transfer.webp"
import Image from "next/image";

export default async function() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({where:{userId: Number(session?.user?.id)}});
    if(!balance){
        return{
            message: "Login first!"
        }
    }
    return <div className="w-full p-5">
        <div className="w-full border p-3 rounded-xl bg-[#2F3033] text-white text-3xl flex items-center justify-center">Fast, safe, social payments</div>
        <div className="flex justify-evenly w-full p-5 gap-5">
            <div className="p-5 flex flex-col justify-evenly h-full gap-5">
                <Card title={`${session?.user?.name}'s Net Balance`} children={`- ${(balance?.amount)/100} INR`}/>
                <div className="border p-10 bg-blue-500 text-xl text-white rounded-xl w-[40vh]">
                    <DashboardCard info="Send and receive money with friends to split everyday necessities, bills, and shared activities like takeout or travel." buttonRoute="/p2ptransfer" buttonValue="Send money"/>
                </div>
            </div>
        <div className="h-full w-full border p-10 text-xl bg-yellow-300 rounded-xl">
            <Image src={image1} alt="Image of transfer" className="rounded-xl w-full h-[80%]"></Image>
            <br/>
            <DashboardCard info="Send money to your wallet using your bank account and checkout at some of your favorite brands in-stores and online." buttonRoute="/transfer" buttonValue="Transfer money"/>
        </div>
        </div>
    </div>
}