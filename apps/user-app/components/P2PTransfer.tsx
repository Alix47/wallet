"use client"
import { useState } from 'react'
import { Button } from '../../../packages/ui/src/button'
import { TextInput } from '../../../packages/ui/src/TextInput'
import {p2ptransfer} from '../app/lib/actions/p2ptransfer'

export default function P2PTransfer() {
    const [number,setNumber] = useState("");
    const [amount,setAmount] = useState(0);    
  return (
    <div className="w-full">
        <div className="border p-6 rounded-xl bg-[#ededed]">
        <h1 className="text-xl border-b pb-2">P2P Transfer</h1>
            <div className='flex  flex-col  gap-4 w-full'>
                <TextInput placeholder='Number' label='Number' onChange={(e:any)=>{setNumber(e)}}/>
                <TextInput placeholder='Amount' label='Amount' onChange={(e:any)=>{setAmount(e)}}/>
                <Button onClick={async()=>{
                  await p2ptransfer(number,amount);
                }} children="Transfer"/>
            </div>
        </div>
    </div>
  )
}
