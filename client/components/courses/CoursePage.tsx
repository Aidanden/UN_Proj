"use client";

import {useState ,useMemo} from "react";

import {CourseForm} from "@/components/courses/CourseForm";

import { useCourses, useCreateCourse, useUpdateCourse, useDeleteCourse } from "@/lib/query/courses";
import { Course } from "@/lib/types/course";
import { useInstructors } from "@/lib/query/instructors";
import { useDepartments } from "@/lib/query/departments";
import { ApiError } from "@/lib/api/client";

type Mode = "list" | "create" | "edit";


function instructorName(course:Course) {
    if (!course.instructor) return "";
    return `${course.instructor.firstName} ${course.instructor.lastName}`;
}


export function CoursePage() {
    const [mode, setMode] = useState<Mode>("list");
    const [editing, setEditing] = useState<Course | null>(null);
    const [formError, setFormError] = useState<string | null>(null);

    const { data, isLoading, isError, error } = useCourses();

    const {data: instructors = [],isLoading: instructorsLoading} = useInstructors();
    const {data: departments = [],isLoading: departmentsLoading} = useDepartments();
    const create = useCreateCourse();
    const deleteCourse = useDeleteCourse();
    const update = useUpdateCourse();

    const deptById = useMemo(() => new Map(departments.map(dept => [dept.id, dept])), [departments]);

    const closeForm = () => {
        setMode("list");
        setEditing(null);
        setFormError(null);
    };

    
    const isFormVisible = mode === "create" || mode === "edit";
    const isSaving = create.isPending || update.isPending;
    const lookupsLoading = instructorsLoading || departmentsLoading;
   

    return (
        <div className="space-y-4">
            {!isFormVisible && (
                <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-500">
                        {data ? `${data.length} مقرر` : ""}
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
                        إضافة مقرر

                    </button>
                </div>
            )}
            {isFormVisible&&(
                <div className="space-y-2 rounded border border-zinc-200 p-4 ">
                    <p className="text-sm font-medium">
                        {mode === "create" ? "إضافة مقرر" : "تعديل مقرر"}
                    </p>
                    <CourseForm
                    key={mode === "create" ? "create" : editing?.id}
                    initial={mode === "edit" ? editing ?? undefined : undefined}
                    isPending={isSaving}
                    error={formError}
                    lookupsLoading={lookupsLoading}
                    instructors={instructors}
                    departments={departments}
                    onCancel={closeForm}
                    onSubmit={(formData) => {
                        setFormError(null);
                        if (mode === "create") {
                            create.mutate(formData, {
                                onSuccess: closeForm,
                                onError: (err) =>
                                    setFormError(
                                        err instanceof ApiError ? err.message : "فشل الإنشاء"
                                    ),
                            });
                        } else if (editing) {
                            update.mutate({ id: editing.id, data: formData }, {
                                onSuccess: closeForm,
                                onError: (err) =>
                                    setFormError(
                                        err instanceof ApiError ? err.message : "فشل التحديث"
                                    ),
                            });
                        }
                    }}
                    />
                </div>
            )}
            {isLoading && <p className="text-sm text-zinc-500">جاري التحميل...</p>}
            {isError && (
                <p className="text-sm text-red-600">
                    {error instanceof ApiError ? error.message : "تعذر تحميل المقررات. تأكد أن السيرفر يعمل."}
                </p>
            )}
            {!isLoading && !isError && mode === "list" && !data?.length && (
                <p className="text-sm text-zinc-500">لا توجد مقررات.</p>
            )}
            {!isLoading && !isError && data && data?.length > 0 && mode === "list" && (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="border-b border-zinc-200 text-right ">
                                <th className="py-2 pr-2">رمز المقرر</th>
                                <th className="py-2 pr-2">الاسم</th>
                                <th className="py-2 pr-2">المحاضر</th>
                                <th className="py-2 pr-2">القسم</th>
                                <th className="py-2 pr-2">السعة</th>
                                <th className="py-2 pr-2">الساعات</th>
                                <th className="py-2 pr-2">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((course) => (
                                <tr key={course.id} className="border-b border-zinc-100">
                                    <td className="py-2 pr-2">{course.courseId}</td>
                                    <td className="py-2 pr-2">{course.name}</td>
                                    <td className="py-2 pr-2">{instructorName(course)}</td>
                                    <td className="py-2 pr-2">{deptById.get(course.departmentId)?.name ?? ""}</td>
                                    <td className="py-2 pr-2">{course.capacity}</td>
                                    <td className="py-2 pr-2">{course.credits}</td>
                                    <td className="py-2 pr-2">
                                        <button
                                        type="button"
                                        className="text-indigo-600 hover:underline"
                                        onClick={() => {
                                            setEditing(course);
                                            setMode("edit");
                                            setFormError(null);
                                        }}
                                        >
                                            تعديل
                                        </button>
                                        <button
                                        type="button"
                                        className="text-red-600 hover:underline disabled:opacity-50"
                                        disabled={deleteCourse.isPending}
                                        onClick={() => {
                                            if (confirm(`حذف المقرر "${course.name}"؟ لا يمكن التراجع.`)) {
                                                deleteCourse.mutate(course.id);
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
            {deleteCourse.isError && (
                <p className="text-sm text-red-600">
                    {deleteCourse.error instanceof ApiError ? deleteCourse.error.message : "فشل الحذف"}
                </p>
            )}
        </div>
    );
    
    
}