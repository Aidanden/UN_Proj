"use client";

import {useState ,useMemo} from "react";

import {EnrollmentForm} from "@/components/enrollment/EnrollmentForm";

import { useEnrollments, useCreateEnrollment, useUpdateEnrollment, useDeleteEnrollment } from "@/lib/query/enrollment";
import type { Enrollment } from "@/lib/types/enrillment";
import { useStudents } from "@/lib/query/student";
import { useCourses } from "@/lib/query/courses";
import { ApiError } from "@/lib/api/client";
import { formatDate } from "@/lib/format";

type Mode = "list" | "create" | "edit";


export function EnrollmentPage() {


    const [mode, setMode] = useState<Mode>("list");
    const [editing, setEditing] = useState<Enrollment | null>(null);
    const [formError, setFormError] = useState<string | null>(null);

    const { data, isLoading, isError, error } = useEnrollments();

    const {data: students = [],isLoading: studentsLoading} = useStudents();
    const {data: courses = [],isLoading: coursesLoading} = useCourses();
    const create = useCreateEnrollment();
    const deleteEnrollment = useDeleteEnrollment();
    const update = useUpdateEnrollment();

    const studentById = useMemo(() => new Map(students.map(student => [student.id, student])), [students]);
    const courseById = useMemo(() => new Map(courses.map(course => [course.id, course])), [courses]);

    const closeForm = () => {
        setMode("list");
        setEditing(null);
        setFormError(null);
    };

    const isFormVisible = mode === "create" || mode === "edit";
    const isSaving = create.isPending || update.isPending;
    const lookupsLoading = studentsLoading || coursesLoading;

    return (
        <div className="space-y-4">
            {!isFormVisible && (
                <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-500">
                        {data ? `${data.length} تسجيل` : ""}
                    </span>
                    <button
                        type="button"
                        onClick={() => {
                            setMode("create");
                            setEditing(null);
                            setFormError(null);
                        }}
                        className="rounded bg-indigo-600 px-3 py-1 text-sm text-white hover:bg-indigo-700"
                    >
                        إضافة التسجيل
                    </button>

                    </div>
            )}
            {isFormVisible && (
                <div className="space-y-2 rounded border border-zinc-200 p-4 ">
                    <p className="text-sm font-medium">
                        {mode === "create" ? "إضافة التسجيل" : "تعديل التسجيل"}
                    </p>
                    <EnrollmentForm
                    key={mode === "create" ? "create" : editing?.id}
                    initial={mode === "edit" ? editing ?? undefined : undefined}
                    isPending={isSaving}
                    error={formError}
                    lookupsLoading={lookupsLoading}
                    students={students}
                    courses={courses}
                    onCancel={closeForm}
                    onSubmit={(formData) => {
                        setFormError(null);
                        if (mode === "create") {
                            create.mutate(formData, {
                                onSuccess: closeForm,
                                onError: (err: unknown) =>
                                    setFormError(err instanceof ApiError ? err.message : "فشل الإنشاء"),
                            });
                        } else if (editing) {
                            update.mutate({ id: editing.id, data: formData }, {
                                onSuccess: closeForm,
                                onError: (err: unknown) =>
                                    setFormError(err instanceof ApiError ? err.message : "فشل التحديث"),
                            });
                        }
                    }}
                    />
                </div>
            )}
            {isLoading && <p className="text-sm text-zinc-500">جاري التحميل...</p>}
            {isError && (
                <p className="text-sm text-red-600">
                    {error instanceof ApiError ? error.message : "تعذر تحميل التسجيلات. تأكد أن السيرفر يعمل."}
                </p>
            )}
            {!isLoading && !isError && mode === "list" && !data?.length && (
                <p className="text-sm text-zinc-500">لا توجد تسجيلات.</p>
            )}
            {!isLoading && !isError && mode === "list" && data && data.length > 0 && (
               
                 <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="border-b border-zinc-200 text-right ">
                                <th className="py-2 pr-2">الطالب</th>
                                <th className="py-2 pr-2">المقرر</th>
                                <th className="py-2 pr-2">تاريخ التسجيل</th>
                                <th className="py-2 pr-2">العلامة</th>
                                <th className="py-2 pr-2">نقاط العلامة</th>
                                <th className="py-2 pr-2">الحضور</th>
                                <th className="py-2 pr-2">الحالة</th>
                                <th className="py-2 pr-2">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((enrollment:Enrollment) => (
                                <tr key={enrollment.id} className="border-b border-zinc-100">
                                    <td className="py-2 pr-2">{studentById.get(enrollment.studentId)?.firstName} {studentById.get(enrollment.studentId)?.lastName}</td>
                                    <td className="py-2 pr-2">{courseById.get(enrollment.courseId)?.name}</td>
                                    <td className="py-2 pr-2">{formatDate(enrollment.enrollmentDate)}</td>
                                    <td className="py-2 pr-2">{enrollment.grade}</td>
                                    <td className="py-2 pr-2">{enrollment.gradePoint}</td>
                                    <td className="py-2 pr-2">{enrollment.attendance}</td>
                                    <td className="py-2 pr-2">{enrollment.status}</td>
                                    <td className="py-2 pr-2 space-x-2 space-x-reverse">
                                        <button type="button" onClick={() => {
                                            setMode("edit");
                                            setEditing(enrollment);
                                        }} className="rounded bg-indigo-600 px-3 py-1 text-sm text-white hover:bg-indigo-700">
                                            تعديل
                                        </button>
                                        <button type="button" onClick={() => {
                                            if (confirm(`حذف التسجيل؟ لا يمكن التراجع.`)) {
                                                deleteEnrollment.mutate(enrollment.id);
                                            }
                                        }} className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700">
                                            حذف
                                        </button>
                                    </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
        
            {deleteEnrollment.isError && (
                <p className="text-sm text-red-600">
                    {deleteEnrollment.error instanceof ApiError ? deleteEnrollment.error.message : "فشل الحذف"}
                </p>
            )}
        </div>
    );
}

