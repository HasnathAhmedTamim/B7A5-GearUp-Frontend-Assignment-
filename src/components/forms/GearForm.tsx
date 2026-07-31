"use client";

import { useEffect } from "react";

import {
    useForm,
    SubmitHandler,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";


import { useCategories } from "@/hooks/category/useCategories";

import { ICategory } from "@/types/category";


import {
    addGearSchema,
    AddGearFormData,
} from "@/validation/gear.validation";



interface GearFormProps {

    defaultValues?: Partial<AddGearFormData>;

    onSubmit: (
        data: AddGearFormData
    ) => void;

    isSubmitting?: boolean;

    submitText: string;

}





export default function GearForm({

    defaultValues,

    onSubmit,

    isSubmitting = false,

    submitText,

}: GearFormProps) {



    const {
        data: categories = [],
    } = useCategories();





    const {
        register,
        handleSubmit,
        reset,

        formState: {
            errors,
        },

    } = useForm<AddGearFormData>({

        resolver: zodResolver(
            addGearSchema
        ),


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

    }, [
        defaultValues,
        reset
    ]);







    const submitHandler:
        SubmitHandler<AddGearFormData> =
        (data) => {

            onSubmit(data);

        };









    return (

        <form

            onSubmit={
                handleSubmit(
                    submitHandler
                )
            }


            className="
                space-y-6
                rounded-xl
                border
                bg-white
                p-4
                shadow-sm

                sm:p-6

                lg:p-8
            "

        >





            <div
                className="
                    grid
                    gap-5
                    md:grid-cols-2
                "
            >





                {/* Title */}

                <FormField
                    label="Title"
                    error={errors.title?.message}
                >

                    <input

                        {...register(
                            "title"
                        )}

                        placeholder="Enter gear title"

                        className="
                            w-full
                            rounded-lg
                            border
                            p-3
                            outline-none
                            focus:border-blue-600
                        "

                    />

                </FormField>









                {/* Brand */}

                <FormField

                    label="Brand"

                    error={
                        errors.brand?.message
                    }

                >

                    <input

                        {...register(
                            "brand"
                        )}

                        placeholder="Enter brand"

                        className="
                            w-full
                            rounded-lg
                            border
                            p-3
                            outline-none
                            focus:border-blue-600
                        "

                    />


                </FormField>









                {/* Image */}

                <FormField

                    label="Image URL"

                    error={
                        errors.image?.message
                    }

                >


                    <input

                        {...register(
                            "image"
                        )}

                        placeholder="https://image-url.com"

                        className="
                            w-full
                            rounded-lg
                            border
                            p-3
                            outline-none
                            focus:border-blue-600
                        "

                    />


                </FormField>









                {/* Category */}

                <FormField

                    label="Category"

                    error={
                        errors.categoryId?.message
                    }

                >


                    <select

                        {...register(
                            "categoryId"
                        )}

                        className="
                            w-full
                            rounded-lg
                            border
                            p-3
                            outline-none
                            focus:border-blue-600
                        "

                    >

                        <option value="">
                            Select Category
                        </option>


                        {
                            categories.map(
                                (
                                    category: ICategory
                                ) => (

                                    <option

                                        key={
                                            category.id
                                        }

                                        value={
                                            category.id
                                        }

                                    >

                                        {
                                            category.name
                                        }

                                    </option>

                                )
                            )
                        }


                    </select>


                </FormField>









                {/* Price */}

                <FormField

                    label="Price Per Day"

                    error={
                        errors.pricePerDay?.message
                    }

                >


                    <input

                        type="number"

                        {...register(
                            "pricePerDay",
                            {
                                valueAsNumber: true
                            }
                        )}


                        className="
                            w-full
                            rounded-lg
                            border
                            p-3
                            outline-none
                            focus:border-blue-600
                        "

                    />


                </FormField>









                {/* Stock */}

                <FormField

                    label="Stock"

                    error={
                        errors.stock?.message
                    }

                >


                    <input

                        type="number"

                        {...register(
                            "stock",
                            {
                                valueAsNumber: true
                            }
                        )}


                        className="
                            w-full
                            rounded-lg
                            border
                            p-3
                            outline-none
                            focus:border-blue-600
                        "

                    />


                </FormField>




            </div>









            {/* Description */}

            <FormField

                label="Description"

                error={
                    errors.description?.message
                }

            >


                <textarea

                    rows={5}

                    {...register(
                        "description"
                    )}

                    placeholder="Write gear description..."

                    className="
                        w-full
                        resize-none
                        rounded-lg
                        border
                        p-3
                        outline-none
                        focus:border-blue-600
                    "

                />


            </FormField>









            <button

                type="submit"

                disabled={
                    isSubmitting
                }


                className="
                    w-full
                    rounded-lg
                    bg-black
                    py-3
                    font-semibold
                    text-white
                    transition
                    hover:bg-gray-800
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                "

            >

                {
                    isSubmitting
                        ?
                        "Processing..."
                        :
                        submitText
                }


            </button>





        </form>

    );

}









function FormField({

    label,

    error,

    children,

}: {

    label: string;

    error?: string;

    children: React.ReactNode;

}) {


    return (

        <div>


            <label className="
                mb-2
                block
                font-medium
            ">

                {label}

            </label>


            {children}



            {
                error && (

                    <p className="
                        mt-1
                        text-sm
                        text-red-500
                    ">

                        {error}

                    </p>

                )
            }


        </div>

    );

}