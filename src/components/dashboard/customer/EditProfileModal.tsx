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






    const handleSubmit = (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        onSubmit(formData);

    };







    return (

        <div

            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                overflow-y-auto
                bg-black/50
                p-4
            "

            onClick={onClose}

        >




            <div

                className="
                    my-8
                    w-full
                    max-w-lg
                    rounded-xl
                    bg-white
                    shadow-xl
                "

                onClick={
                    (e) =>
                        e.stopPropagation()
                }

            >




                <form
                    onSubmit={handleSubmit}
                >





                    {/* Header */}


                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            border-b
                            p-5
                        "
                    >


                        <h2 className="
                            text-lg
                            font-semibold
                            sm:text-xl
                        ">
                            Edit Profile
                        </h2>



                        <button

                            type="button"

                            onClick={onClose}

                            className="
                                rounded-lg
                                p-2
                                hover:bg-gray-100
                            "

                        >

                            <X size={20} />


                        </button>


                    </div>









                    {/* Body */}


                    <div

                        className="
                            max-h-[65vh]
                            space-y-5
                            overflow-y-auto
                            p-5
                        "

                    >






                        <FormItem label="Name">

                            <Input

                                value={
                                    formData.name
                                }

                                disabled={loading}

                                onChange={
                                    (e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value
                                        })
                                }

                            />


                        </FormItem>








                        <FormItem label="Photo URL">


                            <Input

                                value={
                                    formData.photo
                                }

                                disabled={loading}

                                placeholder="
                                    https://image-url.com
                                "

                                onChange={
                                    (e) =>
                                        setFormData({
                                            ...formData,
                                            photo: e.target.value
                                        })
                                }

                            />


                        </FormItem>









                        <FormItem label="Phone">


                            <Input

                                value={
                                    formData.phone
                                }

                                disabled={loading}

                                onChange={
                                    (e) =>
                                        setFormData({
                                            ...formData,
                                            phone: e.target.value
                                        })
                                }

                            />


                        </FormItem>








                        <FormItem label="Address">


                            <Input

                                value={
                                    formData.address
                                }

                                disabled={loading}

                                onChange={
                                    (e) =>
                                        setFormData({
                                            ...formData,
                                            address: e.target.value
                                        })
                                }

                            />


                        </FormItem>








                        <FormItem label="Bio">


                            <Textarea

                                rows={4}

                                disabled={loading}

                                value={
                                    formData.bio
                                }

                                onChange={
                                    (e) =>
                                        setFormData({
                                            ...formData,
                                            bio: e.target.value
                                        })
                                }

                            />


                        </FormItem>





                    </div>









                    {/* Footer */}


                    <div

                        className="
                            flex
                            flex-col
                            gap-3
                            border-t
                            p-5

                            sm:flex-row
                            sm:justify-end
                        "

                    >



                        <Button

                            type="button"

                            variant="outline"

                            onClick={onClose}

                            disabled={loading}

                            className="
                                w-full
                                sm:w-auto
                            "

                        >

                            Cancel

                        </Button>





                        <Button

                            type="submit"

                            disabled={loading}

                            className="
                                w-full
                                sm:w-auto
                            "

                        >

                            {
                                loading
                                    ?
                                    "Updating..."
                                    :
                                    "Update Profile"
                            }


                        </Button>




                    </div>





                </form>



            </div>





        </div>


    );

}








function FormItem({

    label,

    children,

}: {

    label: string;

    children: React.ReactNode;

}) {


    return (

        <div>

            <label className="
                mb-2
                block
                text-sm
                font-medium
            ">

                {label}

            </label>


            {children}


        </div>

    );

}