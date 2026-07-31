"use client";

import { useQuery } from "@tanstack/react-query";

import {
    CreditCard,
    CalendarDays,
} from "lucide-react";

import {
    getMyPayments,
} from "@/services/payment/payment.api";
import Image from "next/image";




export default function PaymentList() {


    const {
        data: payments = [],
        isLoading,
        isError,

    } = useQuery({

        queryKey: [
            "my-payments"
        ],

        queryFn: getMyPayments,

    });







    if (isLoading) {

        return (

            <div className="
                flex
                h-80
                items-center
                justify-center
                text-gray-500
            ">

                Loading payments...

            </div>

        );

    }








    if (isError) {

        return (

            <div className="
                flex
                h-80
                items-center
                justify-center
                text-red-500
            ">

                Failed to load payments.

            </div>

        );

    }








    if (!payments.length) {

        return (

            <div className="
                rounded-xl
                border
                bg-white
                p-10
                text-center
                shadow-sm
            ">


                <h2 className="
                    text-2xl
                    font-semibold
                ">

                    No Payments Found

                </h2>



                <p className="
                    mt-2
                    text-gray-500
                ">

                    Your payment history will appear here.

                </p>


            </div>

        );

    }








    return (

        <div className="space-y-6">






            {/* Header */}


            <div>


                <h1 className="
                    text-2xl
                    font-bold
                    sm:text-3xl
                ">

                    Payments

                </h1>



                <p className="
                    mt-1
                    text-sm
                    text-gray-500
                ">

                    View your payment history.

                </p>



            </div>









            {/* Desktop Table */}


            <div className="
                hidden
                overflow-hidden
                rounded-xl
                border
                bg-white
                shadow-sm
                xl:block
            ">



                <table className="w-full">


                    <thead className="bg-gray-100">


                        <tr>


                            <th className="p-4 text-left">
                                Gear
                            </th>


                            <th className="p-4 text-left">
                                Amount
                            </th>


                            <th className="p-4 text-left">
                                Provider
                            </th>


                            <th className="p-4 text-left">
                                Transaction ID
                            </th>


                            <th className="p-4 text-left">
                                Date
                            </th>


                            <th className="p-4 text-left">
                                Status
                            </th>


                        </tr>


                    </thead>






                    <tbody>


                        {
                            payments.map(
                                (payment: any) => (


                                    <tr

                                        key={payment.id}

                                        className="
                                        border-t
                                        hover:bg-gray-50
                                    "

                                    >




                                        <td className="p-4">


                                            <div className="
                                            flex
                                            items-center
                                            gap-3
                                        ">


                                                <Image 

                                                    src={
                                                        payment
                                                            .rentalOrder
                                                            ?.gear
                                                            ?.image
                                                    }

                                                    alt="gear"

                                                    className="
                                                    h-14
                                                    w-14
                                                    rounded-lg
                                                    object-cover
                                                "

                                                />



                                                <div>


                                                    <p className="
                                                    font-semibold
                                                ">

                                                        {
                                                            payment
                                                                .rentalOrder
                                                                ?.gear
                                                                ?.title
                                                        }


                                                    </p>


                                                    <p className="
                                                    text-sm
                                                    text-gray-500
                                                ">

                                                        Rental Payment

                                                    </p>


                                                </div>



                                            </div>


                                        </td>






                                        <td className="
                                        p-4
                                        font-semibold
                                    ">


                                            ৳ {
                                                Number(
                                                    payment.amount
                                                ).toFixed(2)
                                            }


                                        </td>







                                        <td className="p-4">


                                            <div className="
                                            flex
                                            items-center
                                            gap-2
                                        ">


                                                <CreditCard size={16} />


                                                {
                                                    payment.provider
                                                }


                                            </div>


                                        </td>







                                        <td className="
                                        max-w-[180px]
                                        break-all
                                        p-4
                                        text-sm
                                    ">


                                            {
                                                payment.transactionId || "-"
                                            }


                                        </td>







                                        <td className="p-4">


                                            <div className="
                                            flex
                                            items-center
                                            gap-2
                                        ">


                                                <CalendarDays size={16} />


                                                {
                                                    payment.paidAt

                                                        ?

                                                        new Date(
                                                            payment.paidAt
                                                        )
                                                            .toLocaleDateString()

                                                        :

                                                        "Not Paid"
                                                }


                                            </div>


                                        </td>








                                        <td className="p-4">


                                            <StatusBadge

                                                status={
                                                    payment.status
                                                }

                                            />


                                        </td>





                                    </tr>


                                ))
                        }


                    </tbody>



                </table>


            </div>









            {/* Mobile + Tablet Card */}



            <div className="
                grid
                gap-4
                xl:hidden
            ">



                {
                    payments.map(
                        (payment: any) => (


                            <div

                                key={payment.id}

                                className="
                                rounded-xl
                                border
                                bg-white
                                p-4
                                shadow-sm
                            "

                            >







                                {/* Gear */}



                                <div className="
                                flex
                                items-start
                                gap-3
                                border-b
                                pb-4
                            ">


                                    <Image 

                                        src={
                                            payment
                                                .rentalOrder
                                                ?.gear
                                                ?.image
                                        }

                                        alt="gear"

                                        className="
                                        h-16
                                        w-16
                                        shrink-0
                                        rounded-xl
                                        object-cover
                                    "

                                    />



                                    <div className="
                                    min-w-0
                                ">


                                        <h3 className="
                                        break-words
                                        text-sm
                                        font-semibold
                                    ">

                                            {
                                                payment
                                                    .rentalOrder
                                                    ?.gear
                                                    ?.title
                                            }

                                        </h3>



                                        <p className="
                                        text-xs
                                        text-gray-500
                                    ">

                                            Rental Payment

                                        </p>



                                    </div>



                                </div>









                                {/* Info */}



                                <div className="
                                mt-4
                                space-y-3
                            ">



                                    <Info

                                        label="Amount"

                                        value={
                                            `৳ ${Number(
                                                payment.amount
                                            ).toFixed(2)}`
                                        }

                                    />




                                    <Info

                                        label="Provider"

                                        value={
                                            payment.provider
                                        }

                                    />





                                    <Info

                                        label="Transaction"

                                        value={
                                            payment.transactionId || "-"
                                        }

                                    />





                                    <Info

                                        label="Date"

                                        value={
                                            payment.paidAt

                                                ?

                                                new Date(
                                                    payment.paidAt
                                                )
                                                    .toLocaleDateString()

                                                :

                                                "Not Paid"
                                        }

                                    />






                                    <div className="
                                    flex
                                    items-center
                                    justify-between
                                    gap-3
                                ">


                                        <span className="
                                        text-sm
                                        text-gray-500
                                    ">

                                            Status

                                        </span>



                                        <StatusBadge

                                            status={
                                                payment.status
                                            }

                                        />



                                    </div>




                                </div>





                            </div>


                        ))
                }



            </div>







        </div>

    );

}









function Info({

    label,

    value,

}: {

    label: string;

    value: any;

}) {


    return (

        <div className="
            grid
            grid-cols-2
            gap-2
            text-sm
        ">


            <span className="
                text-gray-500
            ">

                {label}

            </span>



            <span className="
                break-all
                text-right
                font-medium
            ">

                {value}

            </span>



        </div>

    );

}









function StatusBadge({

    status,

}: {

    status: string;

}) {


    const style =

        status === "COMPLETED"

            ?

            "bg-green-100 text-green-700"


            :

            status === "PENDING"

                ?

                "bg-yellow-100 text-yellow-700"


                :

                "bg-red-100 text-red-700";



    return (

        <span className={`
            inline-flex
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            ${style}
        `}>

            {status}

        </span>

    );

}