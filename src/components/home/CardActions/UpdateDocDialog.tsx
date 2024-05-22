"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EditIcon, File } from "lucide-react";
import { useState } from "react";

interface UpdateDocDialogProps {
  current_title: string;
  onUpdate: (new_title: string) => Promise<void>;
}

const formSchema = z.object({
  document_title: z.string().min(2).max(50),
});

const UpdateDocDialog = ({ current_title, onUpdate }: UpdateDocDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      document_title: current_title,
    },
  });

  const handleFormSubmit = async (values: { document_title: string }) => {
    setLoading(true);
    try {
      await onUpdate(values.document_title);
      setIsDialogOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex size-8 items-center justify-center p-0"
        >
          <EditIcon size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-start gap-2">
            <File />
            Edit Document Title
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="document_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={current_title} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full justify-between space-x-4">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button type="submit">
                {loading ? "Updating..." : "Update"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDocDialog;
