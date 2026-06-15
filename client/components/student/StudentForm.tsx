"use client";


import type { Student, CreateStudentInput } from "@/lib/types/student";
import type { Department } from "@/lib/types/department";
import { GENDERS, GENDER_LABELS, STUDENT_STATUSES, STUDENT_STATUS_LABELS } from "@/lib/types/student";

type StudentFormProps = {
    initial?: Student;
    departments: Department[];
    onSubmit: (data: CreateStudentInput) => void;
    onCancel?: () => void;
    isPending?: boolean;
    error?: string | null;
    lookupsLoading?: boolean;
};


export function StudentForm({ initial,
     departments,
      onSubmit,
       onCancel, isPending, error, lookupsLoading }: StudentFormProps) {

        return (
            <form 
            className="max-w-lg space-y-3"
            onSubmit={(e)=>{
                e.preventDefault();
                const form = new FormData(e.currentTarget);
                onSubmit({
                    studentId: String(form.get("studentId") ?? "").trim(),
                    firstName: String(form.get("firstName") ?? "").trim(),
                    lastName: String(form.get("lastName") ?? "").trim(),
                    email: String(form.get("email") ?? "").trim(),
                    phone: String(form.get("phone") ?? "").trim(),
                    address: String(form.get("address") ?? "").trim() || null,
                    dateOfBirth: new Date(String(form.get("dateOfBirth") ?? "")),
                    gender: String(form.get("gender") ?? "").trim() as CreateStudentInput["gender"],
                    departmentId: String(form.get("departmentId") ?? "").trim(),
                    address2: String(form.get("address2") ?? "").trim() || null,
                    city: String(form.get("city") ?? "").trim() || null,
                    state: String(form.get("state") ?? "").trim() || null,
                    country: String(form.get("country") ?? "").trim() || null,
                    status: String(form.get("status") ?? "").trim() as CreateStudentInput["status"],
                })
            }}
            >

                <label className="block text-sm">
                    الرمز الدراسي
                    <input
                        name="studentId"
                        required
                        defaultValue={initial?.studentId ?? ""}
                        className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 "
                    />
                </label>

                <label className="block text-sm">
                    الاسم الاول
                    <input
                        name="firstName"
                        required
                        defaultValue={initial?.firstName ?? ""}
                        className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 "
                    />
                </label>
                <label className="block text-sm">
                    الاسم الثاني
                    <input
                        name="lastName"
                        required
                        defaultValue={initial?.lastName ?? ""}
                        className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 "
                    />
                </label>
                <label className="block text-sm">
                    البريد الإلكتروني
                    <input
                        name="email"
                        required
                        defaultValue={initial?.email ?? ""}
                        className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 "
                    />
                </label>
                <label className="block text-sm">
                    الهاتف
                    <input
                        name="phone"
                        required
                        defaultValue={initial?.phone ?? ""}
                        className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 "
                    />
                </label>
                <label className="block text-sm">
                    العنوان
                    <textarea
                        name="address"
                        rows={3}
                        defaultValue={initial?.address ?? ""}
                        className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 "
                    />
                    </label>
                <label className="block text-sm">
                    العنوان الثاني
                    <textarea
                        name="address2"
                        rows={3}
                        defaultValue={initial?.address2 ?? ""}
                        className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 "
                    />
                </label>
                <label className="block text-sm">
                    المدينة
                    <input
                        name="city"
                        
                        defaultValue={initial?.city ?? ""}
                        className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 "
                    />
                </label>
                <label className="block text-sm">
                    الدولة
                    <input
                        name="state"
                        
                        defaultValue={initial?.state ?? ""}
                        className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 "
                    />
                </label>
                <label className="block text-sm">
                    تاريخ الميلاد
                    <input
                        name="dateOfBirth"
                        required
                        defaultValue={
                            (initial?.dateOfBirth instanceof Date
                              ? initial.dateOfBirth.toISOString()
                              : initial?.dateOfBirth ?? new Date().toISOString()
                            ).split('T')[0]
                          }         
                                                  className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 "
                    />
                </label>
                <label className="block text-sm">
                    الجنس
                    <select
                        name="gender"
                        required
                        defaultValue={initial?.gender ?? ""}
                        className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 "
                    >
                        <option value="" disabled>
                            {lookupsLoading ? "جاري التحميل..." : "اختر الجنس"}
                        </option>
                        {GENDERS.map((gender) => (
                            <option key={gender} value={gender}>
                                {GENDER_LABELS[gender]}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="block text-sm">
                    القسم
                    <select
                        name="departmentId"
                        required
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
                    الحالة الدراسية
                    <select
                        name="status"
                        required
                        defaultValue={initial?.status ?? ""}
                        className="mt-1 w-full rounded border border-zinc-300 px-2 py-1.5 "
                    >
                        <option value="" disabled>
                            اختر الحالة
                        </option>
                        {STUDENT_STATUSES.map((status) => (
                            <option key={status} value={status}>
                                {STUDENT_STATUS_LABELS[status]}
                            </option>
                        ))}
                    </select>
                </label>
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
                        disabled={isPending || lookupsLoading || !departments.length}
                        className="rounded bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {isPending ? "جاري التحميل..." : "حفظ"}
                    </button>
                </div>
            </form>
        )

       }