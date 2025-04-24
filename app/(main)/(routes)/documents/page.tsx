"use client"

import Image from "next/image";
import { useUser } from "@clerk/clerk-react"
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";

import {api} from "@/convex/_generated/api"
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DocumentsPage = () => {
    const { user } = useUser();
    const create=useMutation(api.document.create);
    const router=useRouter()

    const onCreate=()=>{
        const promise =create({title:"untitle"})
        .then((documentId)=> router.push(`/documents/${documentId}`))

        toast.promise(promise,{
            loading:"creating a new note",
            success :"New note Created !",
            error:"Failed to create a new note"
        })
    }

    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image src="/empty.png"
                className="dark:hidden"
                height="300"
                width="300"
                alt="Empty"
            />
            <Image src="/empty-dark.png"
                className="hidden dark:hidden"
                height="300"
                width="300"
                alt="Empty"
            />

            <h2>
                Welcome  to {user?.firstName} &apos;s Jotion
            </h2>
            <Button onClick={onCreate}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Create a Note
            </Button>
        </div>
    );
}

export default DocumentsPage;