"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { deleteDocument, likeDocument } from "@/actions/documents";
import { formatDateAndTime } from "@/utils/format-date";

import {
  Clock,
  Heart,
  LucideStar,
  MoveLeft,
  MoveRightIcon,
} from "lucide-react";
import { Button } from "../ui/button";

import DeleteDocDialog from "./CardActions/DeleteDocDialog";
import UpdateDocDialog from "./CardActions/UpdateDocDialog";
import CollaboratorsDialog from "./CardActions/CollaboratorsDialog";
import { useState } from "react";

const DocumentCard = ({ doc }: any) => {
  const router = useRouter();
  const [liked, setLiked] = useState(doc.liked);

  const handleDocumentDelete = async () => {
    await deleteDocument(doc.document_id);
    router.refresh();
  };

  const handleDocumentLike = async () => {
    await likeDocument(doc.document_id);
    router.refresh();
  };

  const handleDocumentEdit = async () => {
    // await likeDocument(doc.documentId);
    // router.refresh();
  };

  return (
    <div
      key={doc.documentId}
      className="col-span-1 flex h-44 flex-col justify-end truncate  rounded-md border-2 border-slate-700 bg-slate-100 p-0 hover:border-slate-800 hover:bg-white"
    >
      <Link
        href={`/editor?exampleId=${doc.document_id}`}
        className="px-1 text-xl"
      >
        <p className="group flex items-center truncate text-wrap transition-all duration-300 hover:pl-1">
          <MoveRightIcon
            size={20}
            className="hidden transition-all duration-300 group-hover:inline-block"
          />
          <span className="ml-1 transform truncate transition-all duration-300 group-hover:translate-x-1">
            {doc.title}
          </span>
        </p>
      </Link>
      <div className="flex items-center gap-1 p-2 pt-0 align-bottom text-xs text-gray-500">
        <Clock size={12} />
        <p>Created : {formatDateAndTime(doc.created_at)}</p>
      </div>
      <div className="flex w-full items-center justify-around rounded-b-md rounded-t-none border-t-2 border-slate-700 bg-slate-300 p-2">
        <DeleteDocDialog onDelete={handleDocumentDelete} />

        <Button
          variant="outline"
          className="flex size-8 items-center justify-center p-0 "
          onClick={handleDocumentLike}
        >
          {liked ? <Heart size={20} fill="red" /> : <Heart size={20} />}
        </Button>
        <UpdateDocDialog
          onUpdate={handleDocumentEdit}
          current_title={doc.title}
        />
        <CollaboratorsDialog onUpdate={handleDocumentEdit} />
      </div>
    </div>
  );
};

export default DocumentCard;
