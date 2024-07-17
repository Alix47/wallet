"use client"

import Link from "next/link";

export const DashboardCard = ({info,buttonRoute,buttonValue}:{info:string;buttonRoute:string;buttonValue:string})=>{
    return(
        <div>
            <p>{info}</p>
            <br></br>
            <Link href={buttonRoute}><button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{buttonValue}</button></Link>
        </div>
    )

}