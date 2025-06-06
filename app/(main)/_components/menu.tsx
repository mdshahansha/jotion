"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useUser } from "@clerk/clerk-react"
import { useMutation } from "convex/react"
import { MoreHorizontal, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface MenuProps{
    documentId:Id<"documents">
}

export const Menu=({documentId}:MenuProps)=>{

    const router=useRouter();
    const {user}=useUser();
    const archive=useMutation(api.document.archive);

    const onArchive =()=>{
        const promise=archive({id:documentId});

        toast.promise(promise,{ 
            loading:"Moving to trash ..",
            success:"Note move to Trash!",
            error:"Failed to archive Note"
        })

        router.push("/documents");

    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button>
                <MoreHorizontal className="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
      <DropdownMenuContent
      className="w-60"
      align="end"
      alignOffset={8}
      forceMount>
          <DropdownMenuItem onClick={onArchive}>
            <Trash className="h-4 w-4 mr-2"/>
            Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator>
            <div className="text-sm text-muted-foreground p-2">
            Last edited by :{user?.fullName}
            </div>
        </DropdownMenuSeparator>
      </DropdownMenuContent>
        </DropdownMenu>
    )
}

Menu.Skeleton= function MenuSkeleton(){
    return(
        <Skeleton className="h-10 w-10" />
    )

}