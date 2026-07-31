"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInCalendarDays } from "date-fns";
import { toast } from "sonner";
import { z } from "zod";

import { createRental } from "@/services/rental/rental.api";

import {
    rentalSchema,
    RentalFormData,
} from "@/validation/rental.validation";

import { getErrorMessage } from "@/utils/getErrorMessage";


interface RentalFormProps {
    gearId: string;
    pricePerDay: number;
    stock: number;
}


export default function RentalForm({
    gearId,
    pricePerDay,
    stock,
}: RentalFormProps) {


    const router = useRouter();



    const {
        register,
        handleSubmit,
        watch,
        formState: {
            errors,
        },

    } = useForm<
        z.input<typeof rentalSchema>,
        unknown,
        RentalFormData
    >({

        resolver: zodResolver(rentalSchema),

        defaultValues: {

            gearId,

            quantity: 1,

            startDate: "",

            endDate: "",

        },

    });





    const startDate = watch("startDate");

    const endDate = watch("endDate");

    const quantity = watch("quantity");





    const totalDays = useMemo(() => {

        if (!startDate || !endDate) {
            return 0;
        }


        const days = differenceInCalendarDays(
            new Date(endDate),
            new Date(startDate)
        );


        return days > 0 ? days : 0;


    }, [
        startDate,
        endDate,
    ]);






    const totalPrice =
        totalDays *
        pricePerDay *
        Number(quantity || 0);







    const {
        mutate,
        isPending,

    } = useMutation({

        mutationFn: createRental,


        onSuccess: (res) => {

            toast.success(
                res.message
            );


            router.push(
                "/dashboard/customer/rentals"
            );

        },


        onError: (error) => {

            toast.error(
                getErrorMessage(error)
            );

        },

    });







    const onSubmit = (
        data: RentalFormData
    ) => {

        mutate(data);

    };







    return (

        <form
            onSubmit={
                handleSubmit(onSubmit)
            }

            className="
                mt-10
                rounded-xl
                border
                bg-white
                p-6
                shadow-sm
            "
        >


            <h2 className="mb-6 text-2xl font-bold">
                Rent This Gear
            </h2>





            <input
                type="hidden"
                {...register("gearId")}
            />






            <div
                className="
                    grid
                    gap-5
                    md:grid-cols-2
                "
            >


                {/* Start Date */}

                <div>

                    <label className="mb-2 block font-medium">
                        Start Date
                    </label>


                    <input
                        type="date"
                        {...register("startDate")}
                        className="
                            w-full
                            rounded-lg
                            border
                            p-3
                            outline-none
                            focus:border-blue-600
                        "
                    />


                    <p className="mt-1 text-sm text-red-500">
                        {errors.startDate?.message}
                    </p>


                </div>







                {/* End Date */}

                <div>

                    <label className="mb-2 block font-medium">
                        End Date
                    </label>


                    <input
                        type="date"
                        {...register("endDate")}
                        className="
                            w-full
                            rounded-lg
                            border
                            p-3
                            outline-none
                            focus:border-blue-600
                        "
                    />


                    <p className="mt-1 text-sm text-red-500">
                        {errors.endDate?.message}
                    </p>


                </div>



            </div>








            {/* Quantity */}

            <div className="mt-5">


                <label className="mb-2 block font-medium">
                    Quantity
                </label>


                <input
                    type="number"
                    min={1}
                    max={stock}

                    {...register(
                        "quantity",
                        {
                            valueAsNumber: true,
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



                <p className="mt-1 text-sm text-red-500">
                    {errors.quantity?.message}
                </p>



                <p className="mt-2 text-sm text-gray-500">
                    Available Stock: {stock}
                </p>


            </div>









            {/* Price Summary */}


            <div
                className="
                    mt-8
                    rounded-lg
                    bg-gray-100
                    p-5
                "
            >


                <div className="flex justify-between">

                    <span>
                        Total Days
                    </span>


                    <span>
                        {totalDays}
                    </span>


                </div>




                <div
                    className="
                        mt-3
                        flex
                        justify-between
                        font-bold
                    "
                >

                    <span>
                        Total Price
                    </span>


                    <span>
                        ৳ {totalPrice}
                    </span>


                </div>


            </div>








            <button

                type="submit"

                disabled={isPending}

                className="
                    mt-8
                    w-full
                    rounded-lg
                    bg-blue-600
                    py-3
                    font-semibold
                    text-white
                    transition
                    hover:bg-blue-700
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                "

            >

                {
                    isPending
                        ?
                        "Processing..."
                        :
                        "Rent Now"
                }


            </button>



        </form>

    );
}