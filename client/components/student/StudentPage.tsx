"use client";

import { useState, useMemo } from "react";

import { StudentForm } from "@/components/student/StudentForm";

import { useStudents, useCreateStudent, useUpdateStudent, useDeleteStudent } from "@/lib/query/student";
import { Student } from "@/lib/types/student";
import { useDepartments } from "@/lib/query/departments";
import { ApiError } from "@/lib/api/client";
import { formatDate } from "@/lib/format";

type Mode = "list" | "create" | "edit";

export function StudentPage() {
    const [mode, setMode] = useState<Mode>("list");
    const [editing, setEditing] = useState<Student | null>(null);
    const [formError, setFormError] = useState<string | null>(null);

    const { data, isLoading, isError, error } = useStudents();

    const {data: departments = [],isLoading: departmentsLoading} = useDepartments();
    const create = useCreateStudent();
    const deleteStudent = useDeleteStudent();
    const update = useUpdateStudent();
    
    const deptById = useMemo(() => new Map(departments.map(dept => [dept.id, dept])), [departments]);

    const closeForm = () => {
        setMode("list");
        setEditing(null);
        setFormError(null);
    };
    
    const isFormVisible = mode === "create" || mode === "edit";
    const isSaving = create.isPending || update.isPending;
    const lookupsLoading = departmentsLoading;

    return (
        <div className="space-y-4">
            {!isFormVisible && (
                <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-500">
                        {data ? `${data.length} طلاب` : ""}
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
                        إضافة طلاب
                    </button>
                </div>
            )}
            {isFormVisible && (
                <div className="space-y-2 rounded border border-zinc-200 p-4 ">
                    <p className="text-sm font-medium">
                        {mode === "create" ? "إضافة طلاب" : "تعديل طلاب"}
                    </p>
                    <StudentForm
                    key={mode === "create" ? "create" : editing?.id}
                    initial={mode === "edit" ? editing ?? undefined : undefined}
                    isPending={isSaving}
                    error={formError}
                    lookupsLoading={lookupsLoading}
                    departments={departments}
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
                    }}/>

            </div>
            )}
            {isLoading && <p className="text-sm text-zinc-500">جاري التحميل...</p>}
            {isError && (
                <p className="text-sm text-red-600">
                    {error instanceof ApiError ? error.message : "تعذر تحميل الطلاب. تأكد أن السيرفر يعمل."}
                </p>
            )}
            {!isLoading && !isError && mode === "list" && !data?.length && (
                <p className="text-sm text-zinc-500">لا توجد طلاب.</p>
            )}
            {!isLoading && !isError && data && data?.length > 0 && mode === "list" && (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="border-b border-zinc-200 text-right ">
                                <th className="py-2 pr-2">رمز الطالب</th>
                                <th className="py-2 pr-2">الاسم</th>
                                <th className="py-2 pr-2">البريد الإلكتروني</th>
                                <th className="py-2 pr-2">الهاتف</th>
                                <th className="py-2 pr-2">العنوان</th>
                                <th className="py-2 pr-2">تاريخ الميلاد</th>
                                <th className="py-2 pr-2">الجنس</th>
                                <th className="py-2 pr-2">القسم</th>
                                <th className="py-2 pr-2">الحالة الدراسية</th>
                                <th className="py-2 pr-2">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((student:Student) => (
                                <tr key={student.id} className="border-b border-zinc-100">
                                    <td className="py-2 pr-2">{student.studentId}</td>
                                    <td className="py-2 pr-2">{student.firstName} {student.lastName}</td>
                                    <td className="py-2 pr-2">{student.email}</td>
                                    <td className="py-2 pr-2">{student.phone}</td>
                                    <td className="py-2 pr-2">{student.address}</td>
                                    <td className="py-2 pr-2">{formatDate(student.dateOfBirth)}</td>
                                    <td className="py-2 pr-2">{student.gender}</td>
                                    <td className="py-2 pr-2">{deptById.get(student.departmentId)?.name ?? ""}</td>
                                    <td className="py-2 pr-2">{student.status}</td>
                                    <td className="py-2 pr-2">
                                        <button
                                        type="button"
                                        className="text-indigo-600 hover:underline"
                                        onClick={() => {
                                            setEditing(student);
                                            setMode("edit");
                                            setFormError(null);
                                        }}
                                        >
                                            تعديل
                                        </button>
                                            <button
                                        type="button"
                                        className="text-red-600 hover:underline disabled:opacity-50"
                                        disabled={deleteStudent.isPending}
                                        onClick={() => {
                                            if (confirm(`حذف الطالب "${student.firstName} ${student.lastName}"؟ لا يمكن التراجع.`)) {
                                                deleteStudent.mutate(student.id);
                                            }
                                        }}
                                        >
                                            حذف
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {deleteStudent.isError && (
                <p className="text-sm text-red-600">
                    {deleteStudent.error instanceof ApiError ? deleteStudent.error.message : "فشل الحذف"}
                </p>
            )}
        </div>
    );
}