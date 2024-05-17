import { getUsersDocuments } from "@/actions/documents/documentLib";
import AddDocButton from "@/components/home/AddDocButton";
import DocumentCard from "@/components/home/DocumentCard";
import { Input } from "@/components/ui/input";

const HomePage = async () => {
  const user_documents = await getUsersDocuments();

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-start gap-4 bg-red-200 px-[25%] py-4">
      <div className="flex w-full items-center justify-between gap-4 border-b-2 border-black pb-2 ">
        <h1 className="w-full text-left text-xl font-semibold">My documents</h1>
        <Input id="search" placeholder="Search" />
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
