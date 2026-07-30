"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCategories } from "@/hooks/category/useCategories";
import { ICategory } from "@/types/category";
import {
    addGearSchema,
    AddGearFormData,
} from "@/validation/gear.validation";

interface GearFormProps {
    defaultValues?: Partial<AddGearFormData>;
    onSubmit: (data: AddGearFormData) => void;
    isSubmitting?: boolean;
    submitText: string;
}

export default function GearForm({
    defaultValues,
    onSubmit,
    isSubmitting = false,
    submitText,
}: GearFormProps) {
    const { data: categories = [] } = useCategories();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AddGearFormData>({
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

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 rounded-xl border bg-white p-6 shadow"
        >
            {/* Title */}
            <div>
                <label className="mb-2 block font-medium">Title</label>

                <input
                    {...register("title")}
                    className="w-full rounded-lg border p-3"
                />

                <p className="mt-1 text-sm text-red-500">
                    {errors.title?.message}
                </p>
            </div>

            {/* Brand */}
            <div>
                <label className="mb-2 block font-medium">Brand</label>

                <input
                    {...register("brand")}
                    className="w-full rounded-lg border p-3"
                />

                <p className="mt-1 text-sm text-red-500">
                    {errors.brand?.message}
                </p>
            </div>

            {/* Image */}
            <div>
                <label className="mb-2 block font-medium">
                    Image URL
                </label>

                <input
                    {...register("image")}
                    className="w-full rounded-lg border p-3"
                />

                <p className="mt-1 text-sm text-red-500">
                    {errors.image?.message}
                </p>
            </div>

            {/* Price */}
            <div>
                <label className="mb-2 block font-medium">
                    Price Per Day
                </label>

                <input
                    type="number"
                    {...register("pricePerDay", {
                        valueAsNumber: true,
                    })}
                    className="w-full rounded-lg border p-3"
                />

                <p className="mt-1 text-sm text-red-500">
                    {errors.pricePerDay?.message}
                </p>
            </div>

            {/* Stock */}
            <div>
                <label className="mb-2 block font-medium">
                    Stock
                </label>

                <input
                    type="number"
                    {...register("stock", {
                        valueAsNumber: true,
                    })}
                    className="w-full rounded-lg border p-3"
                />

                <p className="mt-1 text-sm text-red-500">
                    {errors.stock?.message}
                </p>
            </div>

            {/* Category */}
            <div>
                <label className="mb-2 block font-medium">
                    Category
                </label>

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
                    {errors.categoryId?.message}
                </p>
            </div>

            {/* Description */}
            <div>
                <label className="mb-2 block font-medium">
                    Description
                </label>

                <textarea
                    rows={5}
                    {...register("description")}
                    className="w-full rounded-lg border p-3"
                />

                <p className="mt-1 text-sm text-red-500">
                    {errors.description?.message}
                </p>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-black py-3 text-white transition hover:bg-gray-800 disabled:opacity-50"
            >
                {isSubmitting ? "Processing..." : submitText}
            </button>
        </form>
    );
}