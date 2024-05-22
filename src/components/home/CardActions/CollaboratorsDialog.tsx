"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
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
import { useEffect, useState } from "react";
import {
  addCollaborator,
  deleteCollaborator,
  getDocCollaborator,
} from "@/actions/collaborators";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  collab_email: z.string().email(),
});

interface Collaborator {
  document_id: string;
  user_id: string;
  owner: boolean;
  email: string;
  full_name: string;
}

const CollaboratorsDialog = ({ document_id }: { document_id: string }) => {
  const router = useRouter();
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collab_email: "",
    },
  });

  const fetchCollaborators = async () => {
    const collaborators = await getDocCollaborator({ document_id });
    setCollaborators(collaborators || []);
  };

  const handleDeleteCollaborator = async (user_id: string) => {
    await deleteCollaborator(document_id, user_id);
    setCollaborators((prev) =>
      prev.filter((collab) => collab.user_id !== user_id)
    );
  };

  const handleAddCollaborator = async (email: string) => {
    const newCollaborator = await addCollaborator({ document_id, email });
    if (newCollaborator.success) {
      setCollaborators((prev) => [...prev, newCollaborator.data]);
    } else {
      form.setError("collab_email", {
        type: "manual",
        message: newCollaborator.message,
      });
      console.log(newCollaborator.message);
    }
  };

  useEffect(() => {
    fetchCollaborators();
  }, [document_id]);

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
          <form
            onSubmit={form.handleSubmit((values) =>
              handleAddCollaborator(values.collab_email)
            )}
          >
            <FormField
              control={form.control}
              name="collab_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormMessage />
                  <div className="flex items-center gap-2">
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
                  {collaborator.owner ? <Crown fill="yellow" /> : <UserCog />}
                </Button>
                <p>{collaborator.username}</p>
              </div>
              <div className="col-span-3">{collaborator.email}</div>
              <div className="col-span-1 flex items-center justify-center gap-2">
                {!collaborator.owner ? (
                  <Button
                    variant={"destructive"}
                    size={"sm"}
                    onClick={() =>
                      handleDeleteCollaborator(collaborator.user_id)
                    }
                  >
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CollaboratorsDialog;
