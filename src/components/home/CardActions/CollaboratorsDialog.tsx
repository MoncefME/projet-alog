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
import { Crown, Trash, UserCog, UsersRound } from "lucide-react";

interface UpdateDocDialogProps {
  onUpdate: () => void;
}

const formSchema = z.object({
  document_title: z.string().min(2).max(50),
});

const CollaboratorsDialog = ({ onUpdate }: UpdateDocDialogProps) => {
  const Collaborators = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    username: "Moncef",
    email: "moncef@gmail.com",
    role: i === 0 ? "Owner" : "Collaborator",
  }));

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
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-8">
            <FormField
              control={form.control}
              name="document_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="no-scrollbar flex h-44 w-full snap-y snap-mandatory flex-col gap-2 overflow-y-scroll">
          {Collaborators.map((collaborator, index) => (
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
