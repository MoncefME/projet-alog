"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { deleteDocument } from "@/actions/documents";
import { formatDateAndTime } from "@/utils/format-date";

import { EditIcon, LucideStar, Trash, UsersRound } from "lucide-react";
import { Button } from "../ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const DocumentCard = ({ doc }: any) => {
  const router = useRouter();

  const handleDocumentDelete = async () => {
    await deleteDocument(doc.documentId);
    router.refresh();
  };

  const handleDocumentLike = async () => {
    // await likeDocument(doc.documentId);
    // router.refresh();
  };

  return (
    <div
      key={doc.documentId}
      className="col-span-1 flex h-44 flex-col justify-end  rounded-md border-2 border-slate-700 bg-slate-100 p-0 hover:border-slate-800 hover:bg-white"
    >
      <Link
        href={`/editor?exampleId=${doc.documentId}`}
        className="px-2 text-xl"
      >
        <p>{doc.title}</p>
      </Link>
      <p className="p-2 pt-0 align-bottom text-sm text-gray-500">
        Created : {formatDateAndTime(doc.createdAt)}
      </p>
      <div className="flex w-full items-center justify-around rounded-b-md rounded-t-none border-t-2 border-slate-700 bg-slate-300 p-2">
        <AlertDialog>
          <AlertDialogTrigger>
            <Button
              variant="destructive"
              className=" right-2 top-2 flex size-8 items-center justify-center p-0"
            >
              <Trash size={20} />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Document</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                document.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDocumentDelete}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button
          variant="outline"
          className="flex size-8 items-center justify-center p-0 "
        >
          <LucideStar size={20} />
        </Button>
        <Button
          variant="outline"
          className="flex size-8 items-center justify-center p-0"
        >
          <EditIcon size={20} />
        </Button>
        <Button
          variant="outline"
          className="flex size-8 items-center justify-center p-0"
        >
          <UsersRound size={20} />
        </Button>
      </div>
    </div>
  );
};

export default DocumentCard;
