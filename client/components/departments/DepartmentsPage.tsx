"use client";

import { useState } from "react";
import { DepartmentForm } from "@/components/departments/DepartmentForm";
import { ApiError } from "@/lib/api/client";
import {
  useCreateDepartment,
  useDeleteDepartment,
  useDepartments,
  useUpdateDepartment,
} from "@/lib/query/departments";
import type { Department } from "@/lib/types/department";

type Mode = "list" | "create" | "edit";

export function DepartmentsPage() {
  const [mode, setMode] = useState<Mode>("list");
  const [editing, setEditing] = useState<Department | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const { data, isLoading, isError, error } = useDepartments();
  const create = useCreateDepartment();
  const deleteDept = useDeleteDepartment();
  const update = useUpdateDepartment();

  const closeForm = () => {
    setMode("list");
    setEditing(null);
    setFormError(null);
  };

  const isFormVisible = mode === "create" || mode === "edit";
  const isSaving = create.isPending || update.isPending;

  return (
    <div className="space-y-4">
      {!isFormVisible && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-500">
            {data ? `${data.length} قسم` : ""}
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
            إضافة قسم
          </button>
        </div>
      )}

      {isFormVisible && (
        <div className="space-y-2 rounded border border-zinc-200 p-4 dark:border-zinc-700">
          <p className="text-sm font-medium">
            {mode === "create" ? "إضافة قسم" : "تعديل قسم"}
          </p>
          <DepartmentForm
            key={mode === "create" ? "create" : editing?.id}
            initial={mode === "edit" ? editing ?? undefined : undefined}
            isPending={isSaving}
            error={formError}
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
          {error instanceof ApiError
            ? error.message
            : "تعذر تحميل الأقسام. تأكد أن السيرفر يعمل."}
        </p>
      )}

      {!isLoading && !isError && mode === "list" && !data?.length && (
        <p className="text-sm text-zinc-500">لا توجد أقسام.</p>
      )}

      {!isLoading && !isError && data && data.length > 0 && mode === "list" && (
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-zinc-200 text-right dark:border-zinc-700">
              <th className="py-2 pr-2">الرمز</th>
              <th className="py-2 pr-2">الاسم</th>
              <th className="py-2 pr-2">الطلاب</th>
              <th className="py-2 pr-2">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dept) => (
              <tr
                key={dept.id}
                className="border-b border-zinc-100 dark:border-zinc-800"
              >
                <td className="py-2 pr-2">{dept.code}</td>
                <td className="py-2 pr-2">{dept.name}</td>
                <td className="py-2 pr-2">{dept.students?.length ?? 0}</td>
                <td className="py-2 pr-2">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="text-indigo-600 hover:underline"
                      onClick={() => {
                        setEditing(dept);
                        setMode("edit");
                        setFormError(null);
                      }}
                    >
                      تعديل
                    </button>
                    <button
                      type="button"
                      className="text-red-600 hover:underline disabled:opacity-50"
                      disabled={deleteDept.isPending}
                      onClick={() => {
                        if (
                          confirm(`حذف القسم "${dept.name}"؟ لا يمكن التراجع.`)
                        ) {
                          deleteDept.mutate(dept.id);
                        }
                      }}
                    >
                      حذف
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {deleteDept.isError && (
        <p className="text-sm text-red-600">
          {deleteDept.error instanceof ApiError
            ? deleteDept.error.message
            : "فشل الحذف"}
        </p>
      )}
    </div>
  );
}
