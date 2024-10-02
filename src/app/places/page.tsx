"use client";
import React from 'react';
import SectionGridFeaturePlaces from "@/components/SectionGridFeaturePlaces";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";

const Page = () => {
    const { data: session } = useSession();
    console.log('Places ::',session)
    if(!session?.user)
        redirect('/login')
    return (
        <div className={"container mb-24 lg:mb-32 mt-9"}>
            <SectionGridFeaturePlaces cardType="card2" />
        </div>
    );
};

export default Page;