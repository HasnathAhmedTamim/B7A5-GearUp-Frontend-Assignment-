"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Props {
    open: boolean;
    onClose: () => void;

    user: any;

    onSubmit: (data: {
        name: string;
        photo: string;
        phone: string;
        address: string;
        bio: string;
    }) => void;

    loading?: boolean;
}


export default function EditProfileModal({
    open,
    onClose,
    user,
    onSubmit,
    loading = false,
}: Props) {


    const [formData, setFormData] = useState({
        name: "",
        photo: "",
        phone: "",
        address: "",
        bio: "",
    });



    useEffect(() => {

        if (user) {

            setFormData({
                name: user.name || "",
                photo: user.profile?.photo || "",
                phone: user.profile?.phone || "",
                address: user.profile?.address || "",
                bio: user.profile?.bio || "",
            });

        }

    }, [user]);



    if (!open) return null;



    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();

        onSubmit(formData);

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
                            Edit Profile
                        </h2>


                        <button
                            type="button"
                            onClick={onClose}
                        >
                            <X size={20} />
                        </button>


                    </div>



                    {/* Body */}

                    <div className="space-y-5 p-5">


                        <div>

                            <label className="mb-2 block text-sm font-medium">
                                Name
                            </label>

                            <Input
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value
                                    })
                                }
                            />

                        </div>



                        <div>

                            <label className="mb-2 block text-sm font-medium">
                                Photo URL
                            </label>

                            <Input
                                value={formData.photo}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        photo: e.target.value
                                    })
                                }
                                placeholder="https://image-url.com"
                            />

                        </div>



                        <div>

                            <label className="mb-2 block text-sm font-medium">
                                Phone
                            </label>

                            <Input
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        phone: e.target.value
                                    })
                                }
                            />

                        </div>



                        <div>

                            <label className="mb-2 block text-sm font-medium">
                                Address
                            </label>

                            <Input
                                value={formData.address}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        address: e.target.value
                                    })
                                }
                            />

                        </div>



                        <div>

                            <label className="mb-2 block text-sm font-medium">
                                Bio
                            </label>

                            <Textarea
                                rows={4}
                                value={formData.bio}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        bio: e.target.value
                                    })
                                }
                            />

                        </div>



                    </div>




                    {/* Footer */}

                    <div className="flex justify-end gap-3 border-t p-5">


                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>


                        <Button
                            type="submit"
                            disabled={loading}
                        >

                            {
                                loading
                                    ? "Updating..."
                                    : "Update Profile"
                            }

                        </Button>


                    </div>


                </form>


            </div>


        </div>

    );
}