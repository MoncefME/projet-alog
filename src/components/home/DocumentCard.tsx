import { Trash } from "lucide-react";
import Link from "next/link";

const DocumentCard = ({ doc }: any) => {
  return (
    <Link href={`/editor?exampleId=${doc.documentId}`}>
      <div
        key={doc.documentId}
        className="col-span-1 flex h-44  flex-col  rounded-md border-2 border-blue-400 bg-blue-200 p-2"
      >
        <Trash size={20} />
        <p>{doc.title}</p>
        <p>{doc.createdAt}</p>
        <p>{doc.updatedAt}</p>
      </div>
    </Link>
  );
};

export default DocumentCard;
