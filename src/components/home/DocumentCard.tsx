"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  deleteDocument,
  editDocument,
  likeDocument,
} from "@/actions/documents";
import { formatDateAndTime } from "@/utils/format-date";

import { Clock, Heart, MoveRightIcon } from "lucide-react";
import { Button } from "../ui/button";

import DeleteDocDialog from "./CardActions/DeleteDocDialog";
import UpdateDocDialog from "./CardActions/UpdateDocDialog";
import CollaboratorsDialog from "./CardActions/CollaboratorsDialog";
import { useState } from "react";

interface DocumentCardProps {
  doc: {
    document_id: string;
    title: string;
    created_at: string;
    liked: boolean;
  };
}

const DocumentCard = ({ doc }: DocumentCardProps) => {
  const router = useRouter();
  const [liked, setLiked] = useState(doc.liked);

  const handleDocumentDelete = async () => {
    await deleteDocument(doc.document_id);
    router.refresh();
  };

  const handleDocumentLike = async () => {
    setLiked(!liked);
    const response = await likeDocument(doc.document_id);
    router.refresh();
  };

  const handleDocumentEdit = async (new_title: string) => {
    await editDocument(doc.document_id, new_title);
    router.refresh();
  };

  return (
    <div
      key={doc.document_id}
      className="col-span-1 flex size-44 flex-col justify-end truncate  rounded-md border-2 border-slate-700 bg-slate-100 p-0 hover:border-slate-800 hover:bg-white"
    >
      <Link
        href={`/editor?documentId=${doc.document_id}`}
        className="px-1 text-xl"
        target="_blank"
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
          {liked ? <Heart size={20} fill="black" /> : <Heart size={20} />}
        </Button>
        <UpdateDocDialog
          onUpdate={(new_title: string) => handleDocumentEdit(new_title)}
          current_title={doc.title}
        />
        <CollaboratorsDialog document_id={doc.document_id} />
      </div>
    </div>
  );
};

export default DocumentCard;
