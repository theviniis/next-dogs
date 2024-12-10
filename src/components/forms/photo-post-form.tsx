"use client";
import { photoPost } from "@/action/user-photo-post";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormSubmitButton,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhotoPostSchema, photoPostSchema } from "@/schema/photo-phost.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { merge, omit } from "lodash";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { PhotoPostPreview } from "./photo-post-preview";

const useImgPreview = () => {
  const [src, setSrc] = useState<string>("");
  const handleChange = useCallback((fileList: FileList | null) => {
    if (!fileList) return;
    const file = fileList[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setSrc(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  return [src, handleChange] as const;
};

export default function PhotoPostForm() {
  const router = useRouter();

  const [imgSrc, handleSetImgSrc] = useImgPreview();

  const form = useForm<PhotoPostSchema>({
    defaultValues: {
      nome: "dog",
      peso: 0,
      idade: 0,
      img: undefined,
    },
    resolver: zodResolver(photoPostSchema),
  });

  const onSubmit = useCallback(
    async (values: PhotoPostSchema) => {
      try {
        const response = await photoPost(values);

        if (response.post_status !== "publish") {
          throw new Error("Failed to submit the form. Please try again.");
        }

        toast(`Foto enviada com sucesso! Nome: ${values.nome}`);
        router.push("/user/account");
      } catch (error) {
        console.error("Form submission error", error);
        toast.error("Failed to submit the form. Please try again.");
      }
    },
    [router],
  );

  return (
    <div className="grid grid-cols-2 gap-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="idade"
                  render={({ field: { onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Idade</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          onChange={(e) => {
                            onChange(merge({}, e, { target: { value: parseInt(e.target.value) } }));
                          }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="peso"
                  render={({ field: { onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Peso</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          onChange={(e) => {
                            onChange(merge({}, e, { target: { value: parseInt(e.target.value) } }));
                          }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="img"
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Imagem</FormLabel>
                  <FormControl>
                    <Input
                      {...omit(field, "value")}
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        onChange(event.target.files && event.target.files[0]);
                        handleSetImgSrc(event.target.files);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormSubmitButton className="w-full">Enviar</FormSubmitButton>
        </form>
      </Form>
      <PhotoPostPreview src={imgSrc} alt="Exibição da imagem previamente upada" />
    </div>
  );
}
