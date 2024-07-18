"use client"
import { Button } from "@repo/ui/button";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createOnRamp } from "../app/lib/actions/createOnRamp";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const [amount,setAmount] = useState(0);
    const [bank,setBank] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    return <div className="border p-6 rounded-xl bg-[#ededed]">
        <h1 className="text-xl border-b pb-2">Add Money</h1>
    <div className="w-full">
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(e:any) => {
            setAmount(e)
        }} />
        <div className="py-4 text-left">
            Bank
        </div>
        <Select onSelect={(value) => {
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
            setBank(value);
        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        <div className="flex justify-center pt-4">
            <Button onClick={async ()=>{
                await createOnRamp(bank, amount)
                window.location.href = redirectUrl || "";
            }} children="Add Money"/>
        </div>
    </div>
</div>
}