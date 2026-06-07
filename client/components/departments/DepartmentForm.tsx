"use client"; // هذا المكوّن يعمل في المتصفح (تفاعل، نموذج، أحداث)

import type { // استيراد الأنواع فقط — تُحذف عند الترجمة ولا تبقى في الكود النهائي
  CreateDepartmentInput, // شكل البيانات المرسلة عند الحفظ: name, code, description?
  Department, // شكل القسم الكامل القادم من API (للتعديل)
} from "@/lib/types/department"; // مسار الأنواع المعرّفة لمشروع الأقسام

type DepartmentFormProps = { // تعريف خصائص (props) التي يمرّرها الأب لهذا المكوّن
  initial?: Department; // قسم موجود عند التعديل — اختياري عند الإنشاء
  onSubmit: (data: CreateDepartmentInput) => void; // دالة يستدعيها الأب بعد تعبئة النموذج
  onCancel?: () => void; // دالة الإلغاء — اختيارية (زر إلغاء يظهر إن وُجدت)
  isPending?: boolean; // true أثناء إرسال الطلب للسيرفر — لتعطيل زر الحفظ
  error?: string | null; // رسالة خطأ من الأب لعرضها تحت الحقول
}; // نهاية تعريف النوع

export function DepartmentForm({ // تصدير المكوّن لاستخدامه في DepartmentsPage
  initial, // القسم الحالي عند وضع التعديل
  onSubmit, // callback عند الضغط على حفظ
  onCancel, // callback عند الضغط على إلغاء
  isPending, // حالة التحميل من mutation
  error, // نص الخطأ إن وُجد
}: DepartmentFormProps) { // نوع الـ props للتحقق من TypeScript
  return ( // إرجاع واجهة النموذج
    <form // عنصر HTML للنموذج
      className="max-w-md space-y-3" // عرض أقصى متوسط + مسافة عمودية بين الحقول
      onSubmit={(e) => { // عند إرسال النموذج (زر submit أو Enter)
        e.preventDefault(); // منع إعادة تحميل الصفحة الافتراضية للمتصفح
        const form = new FormData(e.currentTarget); // قراءة قيم الحقول من النموذج الحالي
        onSubmit({ // استدعاء دالة الأب بالبيانات المُجهّزة
          name: String(form.get("name") ?? "").trim(), // حقل الاسم — نص مُقصّى من الطرفين
          code: String(form.get("code") ?? "").trim(), // حقل الرمز — نص مُقصّى
          description: String(form.get("description") ?? "").trim() || undefined, // الوصف: فارغ → undefined لا يُرسل
        }); // نهاية كائن البيانات
      }} // نهاية معالج onSubmit
    > // بداية محتوى النموذج
      <label className="block text-sm"> {/* تسمية حقل الاسم */}
        الاسم {/* نص يظهر للمستخدم */}
        <input // حقل إدخال نصي
          name="name" // اسم الحقل — يُستخدم في FormData.get("name")
          required // إلزامي في HTML قبل الإرسال
          defaultValue={initial?.name ?? ""} // قيمة ابتدائية من القسم عند التعديل، أو فارغة
          className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 dark:border-zinc-600 dark:bg-zinc-900" // تنسيق Tailwind
        /> {/* نهاية input */}
      </label> {/* نهاية label الاسم */}

      <label className="block text-sm"> {/* تسمية حقل الرمز */}
        الرمز {/* نص الحقل */}
        <input // حقل الرمز
          name="code" // مفتاح FormData للرمز
          required // حقل إلزامي
          defaultValue={initial?.code ?? ""} // قيمة من القسم عند التعديل
          className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 dark:border-zinc-600 dark:bg-zinc-900" // نفس تنسيق الحقول
        /> {/* نهاية input */}
      </label> {/* نهاية label الرمز */}

      <label className="block text-sm"> {/* تسمية الوصف */}
        الوصف {/* نص الحقل */}
        <textarea // منطقة نص متعددة الأسطر
          name="description" // مفتاح FormData للوصف
          rows={3} // ارتفاع تقريبي 3 أسطر
          defaultValue={initial?.description ?? ""} // وصف القسم أو فارغ — null يصبح ""
          className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 dark:border-zinc-600 dark:bg-zinc-900" // تنسيق الحقل
        /> {/* نهاية textarea */}
      </label> {/* نهاية label الوصف */}

      {error && <p className="text-sm text-red-600">{error}</p>} {/* عرض الخطأ فقط إن وُجد error */}

      <div className="flex gap-2"> {/* صف الأزرار: حفظ وإلغاء */}
        <button // زر الحفظ
          type="submit" // يرسل النموذج ويُشغّل onSubmit
          disabled={isPending} // معطّل أثناء انتظار رد السيرفر
          className="rounded bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-700 disabled:opacity-50" // زر أساسي
        > {/* بداية محتوى الزر */}
          {isPending ? "جاري الحفظ..." : "حفظ"} {/* نص ديناميكي حسب حالة الحفظ */}
        </button> {/* نهاية زر الحفظ */}
        {onCancel && ( // عرض زر الإلغاء فقط إذا مرّر الأب onCancel
          <button // زر الإلغاء
            type="button" // لا يرسل النموذج
            onClick={onCancel} // استدعاء closeForm من الأب
            className="rounded border border-zinc-300 px-3 py-1.5 text-sm dark:border-zinc-600" // زر ثانوي بحدود
          > {/* بداية محتوى الزر */}
            إلغاء {/* نص الزر */}
          </button> // نهاية زر الإلغاء
        )} {/* نهاية الشرط */}
      </div> {/* نهاية صف الأزرار */}
    </form> // نهاية عنصر form
  ); // نهاية return
} // نهاية الدالة DepartmentForm
