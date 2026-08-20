import type { Metadata } from "next";
import { getSharedFolder } from "@/lib/share";
import { FolderView } from "./folder-view";

type Props = {
  params: Promise<{ code: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const folder = await getSharedFolder(code).catch(() => null);
  if (!folder) {
    return { title: "المجلد غير متاح — لينكات" };
  }
  return {
    title: `${folder.name} — لينكات`,
    description: `${folder.links.length} روابط مشاركة من تطبيق لينكات`,
  };
}

export default async function ImportPage({ params }: Props) {
  const { code } = await params;
  let folder = null;
  let configError = false;
  try {
    folder = await getSharedFolder(code);
  } catch {
    configError = true;
  }

  return (
    <main className="shell">
      <header className="brand">
        <a className="logo" href="/">
          LINKAT
        </a>
      </header>
      {configError ? (
        <section className="card empty">
          <h1>تعذر الاتصال بقاعدة البيانات</h1>
          <p className="meta">تحقق من متغيرات SUPABASE_URL و SUPABASE_ANON_KEY.</p>
        </section>
      ) : folder ? (
        <FolderView folder={folder} />
      ) : (
        <section className="card empty">
          <h1>المجلد غير موجود أو انتهت صلاحيته</h1>
          <p className="meta">روابط المشاركة صالحة لمدة 24 ساعة فقط.</p>
          <a className="btn btn-ghost" href="/">
            العودة
          </a>
        </section>
      )}
    </main>
  );
}
