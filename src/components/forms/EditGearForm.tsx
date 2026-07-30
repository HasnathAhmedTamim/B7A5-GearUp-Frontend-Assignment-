"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import GearForm from "./GearForm";

import {
    getSingleGear,
    updateGear,
} from "@/services/gear/gear.api";
import { AddGearFormData } from "@/validation/gear.validation";

export default function EditGearForm() {
    const params = useParams();
    const router = useRouter();
    const queryClient = useQueryClient();

    const id = params.id as string;

    const {
        data: gear,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["gear", id],
        queryFn: () => getSingleGear(id),
        enabled: !!id,
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (data: AddGearFormData) =>
            updateGear(id, data),

        onSuccess: (res) => {
            toast.success(res.message);

            queryClient.invalidateQueries({
                queryKey: ["my-gear"],
            });

            queryClient.invalidateQueries({
                queryKey: ["gear", id],
            });

            router.push("/dashboard/provider/my-gear");
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ||
                "Failed to update gear."
            );
        },
    });

    if (isLoading) {
        return (
            <div className="rounded-xl border bg-white p-6">
                Loading...
            </div>
        );
    }

    if (isError || !gear) {
        return (
            <div className="rounded-xl border bg-white p-6 text-red-500">
                Failed to load gear.
            </div>
        );
    }

    return (
        <GearForm
            defaultValues={{
                title: gear.title,
                description: gear.description,
                brand: gear.brand,
                image: gear.image,
                pricePerDay: Number(gear.pricePerDay),
                stock: Number(gear.stock),
                categoryId: gear.categoryId,
            }}
            submitText="Update Gear"
            isSubmitting={isPending}
            onSubmit={(data) => mutate(data)}
        />
    );
}