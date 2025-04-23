"use client"

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Spinner } from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Search, Trash, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation"
import { useState } from "react";
import { toast } from "sonner";

export const TrashBox = () => {
    const router = useRouter();
    const params = useParams();
    const documents = useQuery(api.document.getTrash);
    const restore = useMutation(api.document.restore);
    const remove = useMutation(api.document.remove);

    console.log("documents   ", documents)

    const [search, setSearch] = useState("");
    const filteredDocuments = documents?.filter((document) => {
        return document.title.toLowerCase().includes(search.toLowerCase());
    })

    const onClick = (documentId: string) => {
        router.push(`/documents/${documentId}`);
    }

    const onRestore = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        documentId: Id<"documents">,
    ) => {
        event.stopPropagation();
        const promise = restore({ id: documentId });

        toast.promise(promise, {
            loading: "Restoring Note...",
            success: "Note Restored!",
            error: "Failed to restore note."

        })
    }

    const onRemove = (
        documentId: Id<"documents">,
    ) => {
        // event.stopPropagation();
        const promise = remove({ id: documentId });

        toast.promise(promise, {
            loading: "Deleting Note...",
            success: "Note Deleted!",
            error: "Failed to delete note."

        })

        if (params.documentId === documentId) {
            router.push("/documents")
        }

        if (document === undefined) {
            return (
                <div className="h-full flex items-center justify-center p-4 ">
                    <Spinner size="lg" />

                </div>
            )
        }

    }





    return (
        <div className="text-sm">
            <div className="flex items-center gap-x-1 p-2">
                <Search className="h-4 w-4" />
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-7 px-2 focus-visble:ring-transparent bg-secondary"
                    placeholder="Filter by page title..."
                />
            </div>
            <div className="mt-2 px-1 pb-1">
                <p className="hidden last:block text-xs text-center text-muted-foreground">
                    no Documents Found
                </p>

                {
                    filteredDocuments?.map((document) => (
                        <div
                            key={document._id}
                            role="button"
                            onClick={()=> onClick(document._id)}
                            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-preimary justify-between"
                        >
                            <span className="truncate pl-2">{document.title}</span>
                                <div className="flex items-center">
                                    <div 
                                    onClick={(e)=>onRestore(e,document._id)}
                                    role="button"
                                    className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                                    >
                                       <Undo className="h-4 w-4 text-shadow-muted-foreground"/> 
                                    </div>
                                    <ConfirmModal onConfirm={()=>onRemove(document._id)}>
                                    <div 
                                    className="text-muted-foreground"
                                    >
                                        <Trash className="h-4 w-4 text-muted-foreground dark:hover:bg-neutral-600 " />
                                    </div>
                                    </ConfirmModal>
                                    </div>
                        </div>
                    ))}

            </div>

        </div>
    )
};
