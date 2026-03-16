"use client";
export const dynamic = 'force-dynamic'

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function QueryCalculator() {
 const searchParams = useSearchParams();


 const aRaw = searchParams.get("a") || "0";
 const bRaw = searchParams.get("b") || "0";


 const a = parseFloat(aRaw);
 const b = parseFloat(bRaw);
 const sum = a + b;


 return (
  <Suspense fallback={<div>Loading...</div>}>
    <div style={{ padding: 40 }}>
      <h1>Calculator – Query Parameters</h1>


      Raw query values (already decoded by Next.js):
      <p>
        a = <code>{aRaw}</code>
      </p>
      <p>
        b = <code>{bRaw}</code>
      </p>


      <h2 style={{ color: "green" }}>Sum = {sum}</h2>
    </div>
    </Suspense>
 );
 
}
