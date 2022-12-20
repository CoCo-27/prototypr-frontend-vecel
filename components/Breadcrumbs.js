
import React , { useState } from "react";
import Link from 'next/link'


export default function Breadcrumbs ({title = "", links = [], currentSlug='', urlRoot=''}) {
    return <>
    <div className="mb-6 text-md text-gray-700">
         {links.map((item,index) =>{
            return (
                <div className="inline" key={index}>
                    {" "} 
                    <Link href={`${item.slug}`} key={`breadcrumb_${title}_${index}`}>
                     <span className="hover:underline">{item.name}</span>
                     </Link>{" "}→{" "}
                 </div>
            );
         })}
        {currentSlug?<Link
            href={`${urlRoot}/${currentSlug}/page/1`}
            className="capitalize underline">
            {currentSlug}
        </Link>:
        <Link href={`${urlRoot}/page/1`}>
            <span className="capitalize underline">{title}</span>
        </Link>
        }
    </div>
    <h1 className="text-4xl font-bold tracking-tighter leading-tight mb-2">{title}</h1>

    </>;
}

