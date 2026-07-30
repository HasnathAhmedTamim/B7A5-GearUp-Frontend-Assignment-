"use client";

import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useCategories } from "@/hooks/category/useCategories";
import { createGear } from "@/services/gear/gear.api";
import { ICategory } from "@/types/category";
import {
    addGearSchema,
    AddGearFormData,
} from "@/validation/gear.validation";

export default function AddGearForm() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { data: categories = [] } = useCategories();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(addGearSchema),
        defaultValues: {
            title: "",
            description: "",
            brand: "",
            image: "",
            pricePerDay: 0,
            stock: 0,
            categoryId: "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: createGear,

        onSuccess: (res) => {
            toast.success(res.message);

            queryClient.invalidateQueries({
                queryKey: ["my-gear"],
            });

            reset();

            router.push("/dashboard/provider/my-gear");
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message || "Failed to create gear."
            );
        },
    });

    const onSubmit = (data: AddGearFormData) => {
        mutate(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 rounded-xl border bg-white p-6 shadow"
        >
            <div>
                <label className="mb-2 block font-medium">Title</label>

                <input
                    {...register("title")}
                    className="w-full rounded-lg border p-3"
                />

                <p className="mt-1 text-sm text-red-500">
                    {errors.title?.message?.toString()}
                </p>
            </div>

            <div>
                <label className="mb-2 block font-medium">Brand</label>

                <input
                    {...register("brand")}
                    className="w-full rounded-lg border p-3"
                />

                <p className="mt-1 text-sm text-red-500">
                    {errors.brand?.message?.toString()}
                </p>
            </div>

            <div>
                <label className="mb-2 block font-medium">Image URL</label>

                <input
                    {...register("image")}
                    className="w-full rounded-lg border p-3"
                />

                <p className="mt-1 text-sm text-red-500">
                    {errors.image?.message?.toString()}
                </p>
            </div>

            <div>
                <label className="mb-2 block font-medium">Price Per Day</label>

                <input
                    type="number"
                    {...register("pricePerDay", {
                        valueAsNumber: true,
                    })}
                    className="w-full rounded-lg border p-3"
                />

                <p className="mt-1 text-sm text-red-500">
                    {errors.pricePerDay?.message?.toString()}
                </p>
            </div>

            <div>
                <label className="mb-2 block font-medium">Stock</label>

                <input
                    type="number"
                    {...register("stock", {
                        valueAsNumber: true,
                    })}
                    className="w-full rounded-lg border p-3"
                />

                <p className="mt-1 text-sm text-red-500">
                    {errors.stock?.message?.toString()}
                </p>
            </div>

            <div>
                <label className="mb-2 block font-medium">Category</label>

                <select
                    {...register("categoryId")}
                    className="w-full rounded-lg border p-3"
                >
                    <option value="">Select Category</option>

                    {categories.map((category: ICategory) => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>

                <p className="mt-1 text-sm text-red-500">
                    {errors.categoryId?.message?.toString()}
                </p>
            </div>

            <div>
                <label className="mb-2 block font-medium">Description</label>

                <textarea
                    rows={5}
                    {...register("description")}
                    className="w-full rounded-lg border p-3"
                />

                <p className="mt-1 text-sm text-red-500">
                    {errors.description?.message?.toString()}
                </p>
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-lg bg-black py-3 text-white"
            >
                {isPending ? "Creating..." : "Add Gear"}
            </button>
        </form>
    );
}