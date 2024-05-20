"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Crown, Trash, UserCog, UserPlus, UsersRound } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { getUsersDocuments } from "@/actions/documents";
import { getDocCollaborator } from "@/actions/collaborators";

interface UpdateDocDialogProps {
  onUpdate: () => void;
}

const formSchema = z.object({
  document_title: z.string().min(2).max(50),
});

const CollaboratorsDialog = ({ onUpdate }: UpdateDocDialogProps) => {
  const [collaborators, setCollaborators] = useState<any>([]);

  const fetchCollaborators = async () => {
    const collaborators = await getDocCollaborator({
      document_id: "1dd220df-6609-496a-a10b-15194866ffbd",
    });
    console.log(collaborators, "0000");
    setCollaborators(collaborators);
  };
  useEffect(() => {
    fetchCollaborators();
    console.log("collaborators", collaborators);
  }, []);

  // const Collaborators = Array.from({ length: 20 }, (_, i) => ({
  //   id: i + 1,
  //   username: "Moncef",
  //   email: "moncef@gmail.com",
  //   role: i === 0 ? "Owner" : "Collaborator",
  // }));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      document_title: "",
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex size-8 items-center justify-center p-0"
        >
          <UsersRound size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-start gap-2">
            <UsersRound />
            <p>Add Collaborators</p>
          </DialogTitle>
          <DialogDescription>
            Enter the email of the user you want to add as a collaborator.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onUpdate)}>
            <FormField
              control={form.control}
              name="document_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormMessage />

                  <div className="flex  items-center gap-2">
                    <FormControl>
                      <Input
                        placeholder="collab@email.com"
                        {...field}
                        type="email"
                      />
                    </FormControl>
                    <Button type="submit" variant="default">
                      <UserPlus />
                    </Button>
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="no-scrollbar flex h-44 w-full snap-y snap-mandatory flex-col gap-2 overflow-y-scroll">
          {collaborators.map((collaborator: any, index: any) => (
            <div
              key={index}
              className="grid w-full snap-start grid-cols-6 items-center rounded-sm border-slate-500 bg-slate-100 px-4 py-2"
            >
              <div className="col-span-2 flex items-center gap-2">
                <Button variant={"ghost"} size={"sm"}>
                  {collaborator.role === "Owner" ? (
                    <Crown fill="yellow" />
                  ) : (
                    <UserCog />
                  )}
                </Button>
                <p>{collaborator.username}</p>
              </div>
              <div className="col-span-3">{collaborator.email}</div>
              <div className="col-span-1 flex items-center justify-center gap-2">
                {collaborator.role !== "Owner" ? (
                  <Button variant={"destructive"} size={"sm"}>
                    <Trash />
                  </Button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
        <div className="flex w-full justify-between space-x-4">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="submit">Submit</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CollaboratorsDialog;
