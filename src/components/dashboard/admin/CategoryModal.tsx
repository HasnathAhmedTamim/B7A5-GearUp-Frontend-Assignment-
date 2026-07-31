"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Category {
    id: string;
    name: string;
    description?: string;
}

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: {
        name: string;
        description: string;
    }) => void;
    loading?: boolean;
    category?: Category | null;
}

export default function CategoryModal({
    open,
    onClose,
    onSubmit,
    loading = false,
    category,
}: Props) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });

    useEffect(() => {
        if (!open) return;

        setFormData({
            name: category?.name ?? "",
            description: category?.description ?? "",
        });
    }, [open, category]);

    if (!open) return null;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            toast.error("Category name is required");
            return;
        }

        onSubmit({
            name: formData.name.trim(),
            description: formData.description.trim(),
        });
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-lg rounded-xl bg-white shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <form onSubmit={handleSubmit}>
                    {/* Header */}
                    <div className="flex items-center justify-between border-b p-5">
                        <h2 className="text-xl font-semibold">
                            {category ? "Edit Category" : "Add Category"}
                        </h2>

                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close modal"
                            className="rounded p-1 hover:bg-gray-100"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="space-y-5 p-5">
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Category Name
                            </label>

                            <Input
                                value={formData.name}
                                disabled={loading}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        name: e.target.value,
                                    }))
                                }
                                placeholder="Enter category name"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Description
                            </label>

                            <Textarea
                                rows={4}
                                value={formData.description}
                                disabled={loading}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                    }))
                                }
                                placeholder="Optional description"
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 border-t p-5">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </Button>

                        <Button type="submit" disabled={loading}>
                            {loading
                                ? category
                                    ? "Updating..."
                                    : "Creating..."
                                : category
                                    ? "Update"
                                    : "Create"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}