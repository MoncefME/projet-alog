"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { createDocument } from "@/actions/documents";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "lucide-react";

const AddDocButton = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [docTitle, setDocTitle] = useState<string>("Blank Document");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateDoc = async () => {
    setLoading(true);
    const created_doc = await createDocument({ title: docTitle });
    console.log(created_doc);
    router.refresh();
    setLoading(false);
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="col-span-1 flex h-44 flex-col items-center justify-center gap-2 bg-gradient-to-tr from-slate-900 via-slate-700 to-slate-700"
          onClick={() => setIsDialogOpen(true)}
        >
          <p className="text-lg font-bold">Add document</p>
          <PlusIcon size={50} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Document Title</DialogTitle>
          <DialogDescription>
            Add a title to your blank document
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              value={docTitle || ""}
              onChange={(e) => setDocTitle(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button type="submit" onClick={() => handleCreateDoc()}>
            {loading ? "Creating Document..." : "Create"}
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddDocButton;
