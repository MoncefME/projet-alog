import { getUsersDocuments } from "@/actions/documents";
import AddDocButton from "@/components/home/AddDocButton";
import DocumentCard from "@/components/home/DocumentCard";
import { Input } from "@/components/ui/input";
import { FolderDot } from "lucide-react";

const HomePage = async () => {
  const user_documents = await getUsersDocuments();

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-start gap-4 bg-slate-200 px-[20%] py-4">
      <div className="flex w-full items-center justify-between gap-4 border-b-2 border-black pb-2 ">
        <div className="flex w-full items-center gap-2 text-left text-xl font-semibold">
          <FolderDot /> <span>My documents</span>
        </div>
      </div>

      <div className="grid w-full grid-cols-4 gap-4 ">
        <AddDocButton />
        {user_documents &&
          user_documents.map((doc) => (
            <DocumentCard key={doc.documentId} doc={doc} />
          ))}
      </div>
    </div>
  );
};

export default HomePage;
