"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import CategoryModal from "./CategoryModal";

import {
    createCategory,


    updateCategory,
} from "@/services/category/category.api";
import {
    deleteCategory,
    getAllCategories,
} from "@/services/category/category.api";

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

            toast.error(
                getErrorMessage(error)
            );

        }
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

            toast.error(
                getErrorMessage(error)
            );

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

            setOpenModal(false);
            setSelectedCategory(null);
        },

        onError: (error) => {

            toast.error(
                getErrorMessage(error)
            );

        }
    });

    if (isLoading) {
        return (
            <div className="py-16 text-center">
                Loading Categories...
            </div>
        );
    }

    return (
        <div>

            {/* Header */}

            <div className="mb-6 flex items-center justify-between">

                <div>
                    <h1 className="text-3xl font-bold">
                        Category Management
                    </h1>

                    <p className="text-sm text-gray-500">
                        Manage all rental categories.
                    </p>
                </div>

                <Button
                    onClick={() => {
                        setSelectedCategory(null);
                        setOpenModal(true);
                    }}
                >
                    <Plus className="mr-2 h-4 w-4" />

                    Add Category
                </Button>
            </div>

            {/* Table */}

            <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-left">
                                Name
                            </th>

                            <th className="p-4 text-left">
                                Description
                            </th>

                            <th className="p-4 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {categories.map((category: any) => (

                            <tr
                                key={category.id}
                                className="border-t hover:bg-gray-50"
                            >

                                <td className="p-4 font-medium">
                                    {category.name}
                                </td>

                                <td className="p-4 text-gray-600">
                                    {category.description || "-"}
                                </td>

                                <td className="p-4">

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

                {!categories.length && (

                    <div className="p-8 text-center text-gray-500">
                        No Categories Found.
                    </div>

                )}

            </div>

            {/* Next Part */}

            {openModal && (
                <div>
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
                </div>
            )}

        </div>
    );
}