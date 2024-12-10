import getPhotoById from "@/action/photo-get-by-id";
import { PhotoModal } from "@/components/photo/photo-modal";

type PhotoPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PhotoPageProps) {
  const { id } = await params;
  const data = await getPhotoById(+id);
  return {
    title: data?.photo?.title ? `Dogs | ${data.photo.title}` : "Dogs",
  };
}

export default async function PhotoPage({ params }: PhotoPageProps) {
  const data = await getPhotoById(+(await params).id);

  return <PhotoModal data={data} />;
}
