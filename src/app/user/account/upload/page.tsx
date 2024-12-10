import PhotoPostForm from "@/components/forms/photo-post-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Postar | Minha Conta",
};
export default function UploadPage() {
  return (
    <main>
      <PhotoPostForm />
    </main>
  );
}
