"use client";

import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import GearForm from "./GearForm";

import { createGear } from "@/services/gear/gear.api";
import { AddGearFormData } from "@/validation/gear.validation";
import { getErrorMessage } from "@/utils/getErrorMessage";

export default function AddGearForm() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: createGear,

        onSuccess: (res) => {
            toast.success(res.message);

            queryClient.invalidateQueries({
                queryKey: ["my-gear"],
            });

            router.push("/dashboard/provider/my-gear");
        },

        onError: (error) => {

            toast.error(
                getErrorMessage(error)
            );

        }
    });

    const handleSubmit = (data: AddGearFormData) => {
        mutate(data);
    };

    return (
        <GearForm
            submitText="Add Gear"
            onSubmit={handleSubmit}
            isSubmitting={isPending}
        />
    );
}