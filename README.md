# لينكات — صفحة مشاركة المجلد (Vercel)

موقع يعرض روابط المجلد المشارك من نفس قاعدة **Supabase** المستخدمة في تطبيق Flutter.

المسار: `/import/CODE` (مثل `https://linkat.hesdev.com/import/ABC123`)

## التشغيل محلياً

```bash
cd share-web
cp .env.example .env.local
# املأ SUPABASE_URL و SUPABASE_ANON_KEY بنفس قيم تطبيق لينكات
npm install
npm run dev
```

افتح `http://localhost:3000`

## الرفع على Vercel

1. ادفع مجلد المشروع إلى GitHub (المجلد `share-web` أو المستودع كاملاً).
2. في [vercel.com](https://vercel.com) → **Add New Project** → اختر المستودع.
3. إذا كان المشروع داخل مستودع Flutter: ضع **Root Directory** = `share-web`.
4. أضف متغيرات البيئة:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
5. Deploy.
6. اربط النطاق `linkat.hesdev.com` من Vercel → Domains.

بعد الربط، روابط المشاركة من التطبيق تفتح هذه الصفحة وتعرض الروابط من `get_shared_folder_by_code`.
