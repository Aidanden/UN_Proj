"use client";

import type { Course, CreateCourseInput } from "@/lib/types/course";

import type { Instructor } from "@/lib/types/instructor";
import type { Department } from "@/lib/types/department";



type CourseFormProps = {
    initial?: Course;
    instructors: Instructor[];
    departments: Department[];
    onSubmit: (data: CreateCourseInput) => void;
    onCancel?: () => void;
    isPending?: boolean;
    error?: string | null;
    lookupsLoading?: boolean;
};

export function CourseForm({
    initial,
    instructors,
    departments,
    onSubmit,
    onCancel,
    isPending,
    error,
    lookupsLoading,
}: CourseFormProps) {

    return (
        <form 
        className="max-w-lg space-y-3"
        onSubmit={(e)=>{
            e.preventDefault();
            const form = new FormData(e.currentTarget)
            onSubmit({
                courseId: String(form.get("courseId") ?? "").trim(),
                name: String(form.get("name") ?? "").trim(),
                description: String(form.get("description") ?? "").trim() || null,
                credits: Number(form.get("credits") ?? "0"),
                departmentId: String(form.get("departmentId") ?? "").trim(),
                instructorId: String(form.get("instructorId") ?? "").trim(),
                capacity: Number(form.get("capacity") ?? "0"),
            })
        }}
         >
            <label className="block text-sm">
                رمز المقرر
                <input
                    name="courseId"
                    required
                    defaultValue={initial?.courseId ?? ""}
                    className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 "
                />
            </label>

            <label className="block text-sm">
                الاسم
                <input
                    name="name"
                    required
                    defaultValue={initial?.name ?? ""}
                    className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 "
                />
            </label>

            <label className="block text-sm">
                الوصف
                <textarea
                    name="description"
                    rows={3}
                    defaultValue={initial?.description ?? ""}
                    className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 "
                />
            </label>

            <div className="grid grid-cols-2 gap-3">

                <label className="block text-sm">
                    الساعات المعتمدة
                    <input
                        name="credits"
                        required
                        defaultValue={initial?.credits ?? "0"}
                        className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 "
                    />
                </label>
                <label className="block text-sm">   
                    السعة
                    <input
                        name="capacity"
                        required
                        defaultValue={initial?.capacity ?? "0"}
                        className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 "
                    />
                </label>
            </div>

             <label className="block text-sm">
                القسم
                <select
                    name="departmentId"
                    required
                    disabled={lookupsLoading || departments.length === 0}
                    defaultValue={initial?.departmentId ?? ""}
                    className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 "
                >
                    <option value="" disabled>
                    {lookupsLoading ? "جاري التحميل..." : "اختر القسم"}
                    </option>
                    {departments.map((department) => (
                        <option key={department.id} value={department.id}>
                            {department.name}
                        </option>
                    ))}
                </select>
             </label>
             <label className="block text-sm">
                المحاضر
                <select
                    name="instructorId"
                    required
                    disabled={lookupsLoading || instructors.length === 0}
                    defaultValue={initial?.instructorId ?? ""}
                    className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 "
                >
                    <option value="" disabled>
                        {lookupsLoading ? "جاري التحميل..." : "اختر المحاضر"}
                    </option>
                    {instructors.map((instructor) => (
                        <option key={instructor.id} value={instructor.id}>
                            {instructor.firstName} {instructor.lastName}
                        </option>
                    ))}
                </select>
             </label>

             {!lookupsLoading && !departments.length &&  (
                <p className="text-sm text-red-500">
                    لا يوجد قسم متاح
                </p>
             )}
             {!lookupsLoading && !instructors.length &&  (
               <p className="text-sm text-red-500">
                لا يوجد محاضر متاح
               </p>
             )}
             {error && <p className="text-sm text-red-500">{error}</p>}

             <div className="flex gap-2">
                {onCancel && (
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isPending}
                    className="rounded border border-zinc-300 px-3 py-1.5 text-sm "
                >
                    إلغاء
                </button>
                )}
                <button
                    type="submit"
                    disabled={isPending ||
                        lookupsLoading ||
                        !departments.length  ||
                        !instructors.length 
                    }
                    className="rounded bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-700 disabled:opacity-50"
                >
                    {isPending ? "جاري التحميل..." : "حفظ"}
                </button>
             </div>
        </form>
    )
}


