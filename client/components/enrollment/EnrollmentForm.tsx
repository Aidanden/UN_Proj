"use client";

import type { Enrollment, CreateEnrollmentInput } from "@/lib/types/enrillment";
import type { Student } from "@/lib/types/student";
import type { Course } from "@/lib/types/course";
import { ENROLLMENT_STATUSES, ENROLLMENT_STATUS_LABELS } from "@/lib/types/enrillment";

type EnrollmentFormProps = {
    initial?: Enrollment;
    students: Student[];
    courses: Course[];
    onSubmit: (data: CreateEnrollmentInput) => void;
    onCancel?: () => void;
    isPending?: boolean;
    error?: string | null;
    lookupsLoading?: boolean;
};



export function EnrollmentForm({
    initial,
    students,
    courses,
    onSubmit,
    onCancel,
    isPending,
    error,
    lookupsLoading,
}: EnrollmentFormProps) {
    return (
        <form className="max-w-lg space-y-3" onSubmit={(e)=>{
            e.preventDefault();
            const form = new FormData(e.currentTarget);
            onSubmit({
                studentId: String(form.get("studentId") ?? "").trim(),
                courseId: String(form.get("courseId") ?? "").trim(),
                enrollmentDate: new Date(String(form.get("enrollmentDate") ?? "")),
                grade: String(form.get("grade") ?? "").trim() || null,
                gradePoint: Number(form.get("gradePoint") ?? "0"),
                attendance: Number(form.get("attendance") ?? "0"),
                status: String(form.get("status") ?? "").trim() as CreateEnrollmentInput["status"],
            })
        }}>

            <label className="block text-sm">
                الطالب
                <select name="studentId" required defaultValue={initial?.studentId ?? ""} className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 ">
                    <option value="" disabled>
                        {lookupsLoading ? "جاري التحميل..." : "اختر الطالب"}
                    </option>
                    {students.map((student) => (
                        <option key={student.id} value={student.id}>
                            {student.firstName} {student.lastName}
                        </option>
                    ))}
                </select>   
            </label>
            <label className="block text-sm">
                المقرر
                <select name="courseId" required defaultValue={initial?.courseId ?? ""} className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 ">
                    <option value="" disabled>
                        {lookupsLoading ? "جاري التحميل..." : "اختر المقرر"}
                    </option>
                    {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                            {course.name}
                        </option>
                    ))}
                </select>
            </label>
            <label className="block text-sm">
                تاريخ التسجيل
                <input name="enrollmentDate" required 
                 defaultValue={
                    (initial?.enrollmentDate instanceof Date
                      ? initial.enrollmentDate.toISOString()
                      : initial?.enrollmentDate ?? new Date().toISOString()
                    ).split('T')[0]
                  }         
                className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 " />
            </label>
            <label className="block text-sm">
                العلامة
                <input name="grade" required defaultValue={initial?.grade ?? ""} className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 " />
            </label>
            <label className="block text-sm">
                نقاط العلامة
                <input name="gradePoint" required defaultValue={initial?.gradePoint ?? "0"} className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 " />
            </label>
            <label className="block text-sm">
                الحضور
                <input name="attendance" required defaultValue={initial?.attendance ?? "0"} className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 " />
            </label>
            <label className="block text-sm">
                الحالة
                <select name="status" required defaultValue={initial?.status ?? ""} className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 ">
                    <option value="" disabled>
                        {lookupsLoading ? "جاري التحميل..." : "اختر الحالة"}
                    </option>
                    {ENROLLMENT_STATUSES.map((status) => (
                        <option key={status} value={status}>
                            {ENROLLMENT_STATUS_LABELS[status]}
                        </option>
                    ))}
                </select>
            </label>
            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex gap-2">
                {onCancel && (
                    <button type="button" onClick={onCancel} disabled={isPending} className="rounded border border-zinc-300 px-3 py-1.5 text-sm ">
                        إلغاء
                    </button>
                )}
          
            <button type="submit" disabled={isPending || lookupsLoading || !students.length || !courses.length} className="rounded bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-700 disabled:opacity-50">
                {isPending ? "جاري التحميل..." : "حفظ"}
            </button>   
            </div>
           </form>
        )
    }