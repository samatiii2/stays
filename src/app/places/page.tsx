"use client";
import React, {useEffect} from 'react';
import SectionGridFeaturePlaces from "@/components/SectionGridFeaturePlaces";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";

const Page = () => {
    const { data: session,status } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
            // Redirect to login page if user is not authenticated
            redirect("/login");
        }
    }, [status]);
    return (
        <div className={"container mb-24 lg:mb-32 mt-9"}>
            <SectionGridFeaturePlaces cardType="card2" />
        </div>
    );
};

export default Page;