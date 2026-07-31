"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import CategoryModal from "./CategoryModal";

import {
    createCategory,
    deleteCategory,
    getAllCategories,
    updateCategory,
} from "@/services/category/category.api";

import { getErrorMessage } from "@/utils/getErrorMessage";

export default function AdminCategories() {
    const queryClient = useQueryClient();

    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [openModal, setOpenModal] = useState(false);

    const {
        data: categories = [],
        isLoading,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: getAllCategories,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteCategory,

        onSuccess: () => {
            toast.success("Category deleted successfully");

            queryClient.invalidateQueries({
                queryKey: ["categories"],
            });
        },

        onError: (error) => {
            toast.error(getErrorMessage(error));
        },
    });

    const createMutation = useMutation({
        mutationFn: createCategory,

        onSuccess: () => {
            toast.success("Category created successfully");

            queryClient.invalidateQueries({
                queryKey: ["categories"],
            });

            setOpenModal(false);
        },

        onError: (error) => {
            toast.error(getErrorMessage(error));
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({
            id,
            payload,
        }: {
            id: string;
            payload: {
                name: string;
                description?: string;
            };
        }) => updateCategory(id, payload),

        onSuccess: () => {
            toast.success("Category updated successfully");

            queryClient.invalidateQueries({
                queryKey: ["categories"],
            });

            setSelectedCategory(null);
            setOpenModal(false);
        },

        onError: (error) => {
            toast.error(getErrorMessage(error));
        },
    });

    if (isLoading) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="space-y-6">

            {/* Header */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                    <h1 className="text-2xl font-bold sm:text-3xl">
                        Category Management
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage all rental categories.
                    </p>

                </div>

                <Button
                    className="w-full sm:w-auto"
                    onClick={() => {
                        setSelectedCategory(null);
                        setOpenModal(true);
                    }}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Category
                </Button>

            </div>

            {/* Desktop Table */}

            <div className="hidden overflow-hidden rounded-xl border bg-white shadow-sm md:block">

                <div className="overflow-x-auto">

                    <table className="min-w-full">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Name
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Description
                                </th>

                                <th className="px-6 py-4 text-center text-sm font-semibold">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {categories.map((category: any) => (

                                <tr
                                    key={category.id}
                                    className="border-t transition-colors hover:bg-gray-50"
                                >

                                    <td className="px-6 py-5 font-medium">
                                        {category.name}
                                    </td>

                                    <td className="max-w-md px-6 py-5 text-gray-600">
                                        {category.description || "-"}
                                    </td>

                                    <td className="px-6 py-5">

                                        <div className="flex justify-center gap-2">

                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => {
                                                    setSelectedCategory(category);
                                                    setOpenModal(true);
                                                }}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>

                                            <AlertDialog>

                                                <AlertDialogTrigger asChild>

                                                    <Button
                                                        variant="destructive"
                                                        size="icon"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>

                                                </AlertDialogTrigger>

                                                <AlertDialogContent>

                                                    <AlertDialogHeader>

                                                        <AlertDialogTitle>
                                                            Delete Category?
                                                        </AlertDialogTitle>

                                                        <AlertDialogDescription>
                                                            This action cannot be undone.
                                                        </AlertDialogDescription>

                                                    </AlertDialogHeader>

                                                    <AlertDialogFooter>

                                                        <AlertDialogCancel>
                                                            Cancel
                                                        </AlertDialogCancel>

                                                        <AlertDialogAction
                                                            onClick={() =>
                                                                deleteMutation.mutate(category.id)
                                                            }
                                                        >
                                                            Delete
                                                        </AlertDialogAction>

                                                    </AlertDialogFooter>

                                                </AlertDialogContent>

                                            </AlertDialog>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* Mobile Cards */}

            <div className="space-y-4 md:hidden">

                {categories.map((category: any) => (

                    <div
                        key={category.id}
                        className="rounded-xl border bg-white p-5 shadow-sm"
                    >

                        <div>

                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Category
                            </p>

                            <h3 className="mt-1 text-lg font-semibold">
                                {category.name}
                            </h3>

                        </div>

                        <div className="mt-4">

                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Description
                            </p>

                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                {category.description || "No description"}
                            </p>

                        </div>

                        <div className="mt-5 flex flex-col gap-3 sm:flex-row">

                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => {
                                    setSelectedCategory(category);
                                    setOpenModal(true);
                                }}
                            >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                            </Button>

                            <AlertDialog>

                                <AlertDialogTrigger asChild>

                                    <Button
                                        variant="destructive"
                                        className="flex-1"
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                    </Button>

                                </AlertDialogTrigger>

                                <AlertDialogContent>

                                    <AlertDialogHeader>

                                        <AlertDialogTitle>
                                            Delete Category?
                                        </AlertDialogTitle>

                                        <AlertDialogDescription>
                                            This action cannot be undone.
                                        </AlertDialogDescription>

                                    </AlertDialogHeader>

                                    <AlertDialogFooter>

                                        <AlertDialogCancel>
                                            Cancel
                                        </AlertDialogCancel>

                                        <AlertDialogAction
                                            onClick={() =>
                                                deleteMutation.mutate(category.id)
                                            }
                                        >
                                            Delete
                                        </AlertDialogAction>

                                    </AlertDialogFooter>

                                </AlertDialogContent>

                            </AlertDialog>

                        </div>

                    </div>

                ))}

            </div>

            {/* Empty State */}

            {categories.length === 0 && (

                <div className="rounded-xl border border-dashed bg-white py-12 text-center text-gray-500">

                    No Categories Found.

                </div>

            )}
            {/* Modal */}

            {openModal && (
                <CategoryModal
                    open={openModal}
                    onClose={() => {
                        setOpenModal(false);
                        setSelectedCategory(null);
                    }}
                    category={selectedCategory}
                    loading={
                        createMutation.isPending ||
                        updateMutation.isPending
                    }
                    onSubmit={(values) => {
                        if (selectedCategory) {
                            updateMutation.mutate({
                                id: selectedCategory.id,
                                payload: values,
                            });
                        } else {
                            createMutation.mutate(values);
                        }
                    }}
                />
            )}

        </div>
    );
}