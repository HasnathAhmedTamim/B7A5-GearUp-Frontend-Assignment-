"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import {
    createCheckoutSession,
} from "@/services/payment/payment.api";

import {
    getErrorMessage,
} from "@/utils/getErrorMessage";



interface PaymentButtonProps {

    rental: any;

}





export default function PaymentButton({

    rental,

}: PaymentButtonProps) {





    const {
        mutate,
        isPending,

    } = useMutation({



        mutationFn: () =>
            createCheckoutSession(
                rental.id
            ),




        onSuccess: (data) => {


            window.location.href =
                data.checkoutUrl;


        },




        onError: (error) => {


            toast.error(
                getErrorMessage(error)
            );


        }



    });








    if (rental.payment) {


        return (

            <span
                className="
                    inline-flex
                    rounded-full
                    bg-green-100
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-green-700
                "
            >

                Paid

            </span>

        );

    }









    if (rental.status === "CONFIRMED") {


        return (

            <button

                disabled={isPending}


                onClick={() =>
                    mutate()
                }


                className="
                    w-full
                    rounded-lg
                    bg-green-600
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-white
                    transition
                    hover:bg-green-700

                    disabled:cursor-not-allowed
                    disabled:opacity-60

                    sm:w-auto
                "

            >


                {
                    isPending

                        ?

                        "Redirecting..."

                        :

                        "Pay Now"
                }


            </button>


        );

    }









    return (

        <span

            className="
                inline-flex
                rounded-full
                bg-yellow-100
                px-3
                py-1
                text-xs
                font-semibold
                text-yellow-700
            "

        >

            Waiting

        </span>

    );

}