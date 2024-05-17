"use client";
import { deleteDocument } from "@/actions/documents/documentLib";
import { formatDateAndTime } from "@/utils/format-date";
import { Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const DocumentCard = ({ doc }: any) => {
  const router = useRouter();
  const handleDocumentDelete = async () => {
    await deleteDocument(doc.documentId);
    router.refresh();
  };
  return (
    <div
      key={doc.documentId}
      className="col-span-1 flex h-44  flex-col  rounded-md border-2 border-blue-400 bg-blue-200 p-2"
    >
      <Trash size={20} onClick={handleDocumentDelete} />
      <Link href={`/editor?exampleId=${doc.documentId}`} className="text-xl">
        <p>{doc.title}</p>
      </Link>

      <p>Created : {formatDateAndTime(doc.createdAt)}</p>
    </div>
  );
};

export default DocumentCard;
