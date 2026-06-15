"use client";

import type {
  CreateDepartmentInput,
  Department,
} from "@/lib/types/department";

type DepartmentFormProps = {
  initial?: Department;
  onSubmit: (data: CreateDepartmentInput) => void;
  onCancel?: () => void;
  isPending?: boolean;
  error?: string | null;
};

export function DepartmentForm({
  initial,
  onSubmit,
  onCancel,
  isPending,
  error,
}: DepartmentFormProps) {
  return (
    <form
      className="max-w-md space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        onSubmit({
          name: String(form.get("name") ?? "").trim(),
          code: String(form.get("code") ?? "").trim(),
          description: String(form.get("description") ?? "").trim() || undefined,
        });
      }}
    >
      <label className="block text-sm">
        الاسم
        <input
          name="name"
          required
          defaultValue={initial?.name ?? ""}
          className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 dark:border-zinc-600 dark:bg-zinc-900"
        />
      </label>

      <label className="block text-sm">
        الرمز
        <input
          name="code"
          required
          defaultValue={initial?.code ?? ""}
          className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 dark:border-zinc-600 dark:bg-zinc-900"
        />
      </label>

      <label className="block text-sm">
        الوصف
        <textarea
          name="description"
          rows={3}
          defaultValue={initial?.description ?? ""}
          className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 dark:border-zinc-600 dark:bg-zinc-900"
        />
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending ? "جاري الحفظ..." : "حفظ"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded border border-zinc-300 px-3 py-1.5 text-sm dark:border-zinc-600"
          >
            إلغاء
          </button>
        )}
      </div>
    </form>
  );
}
