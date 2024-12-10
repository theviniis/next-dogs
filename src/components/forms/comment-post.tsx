"use client";

import commentPost from "@/action/comment-post";
import { Comment } from "@/entities/Comment";
import { Photo } from "@/entities/Photo";
import { cn } from "@/lib/utils";
import { commentPostSchema, CommentPostSchema } from "@/schema/comment-post.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ButtonDogs } from "../ui/button-dogs";
import { Form, FormField } from "../ui/form";
import { Textarea } from "../ui/textarea";

export type CommentPostFormProps = {
  isSingle: boolean;
  photoId: Photo["id"];
  onSuccess: (comment: Comment) => void;
};

export default function CommentPostForm({ photoId, isSingle, onSuccess }: CommentPostFormProps) {
  const form = useForm<CommentPostSchema>({
    resolver: zodResolver(commentPostSchema),
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ["commentPost"],
    mutationFn: commentPost,
  });

  const onSubmit = async (formData: CommentPostSchema) => {
    try {
      const comment = await mutateAsync({ photoId, data: formData });
      if (!comment.comment_ID) throw new Error("Comment not created");
      form.reset({ comment: "" });
      onSuccess(comment);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex border border-input mx-8 my-0 rounded", isSingle && "m-12")}
      >
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <Textarea
              id="comment"
              placeholder="Escreva um comentário"
              className="border-none resize-none rounded-none"
              {...field}
            />
          )}
        />
        <ButtonDogs className="rounded-none" disabled={isLoading} />
      </form>
    </Form>
  );
}
