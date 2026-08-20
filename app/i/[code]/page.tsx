import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ code: string }>;
};

export default async function ShortImportPage({ params }: Props) {
  const { code } = await params;
  redirect(`/import/${encodeURIComponent(code)}`);
}
