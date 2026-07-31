"use client";

import { useQuery } from "@tanstack/react-query";
import {
    CreditCard,
    CalendarDays,
} from "lucide-react";

import { getMyPayments } from "@/services/payment/payment.api";


export default function PaymentList() {

    const {
        data: payments = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["my-payments"],
        queryFn: getMyPayments,
    });


    if (isLoading) {
        return (
            <div className="flex h-80 items-center justify-center">
                Loading payments...
            </div>
        );
    }


    if (isError) {
        return (
            <div className="flex h-80 items-center justify-center text-red-500">
                Failed to load payments.
            </div>
        );
    }


    if (!payments.length) {
        return (
            <div className="rounded-xl border bg-white p-10 text-center shadow-sm">

                <h2 className="text-2xl font-semibold">
                    No Payments Found
                </h2>

                <p className="mt-2 text-gray-500">
                    Your payment history will appear here.
                </p>

            </div>
        );
    }


    return (

        <div className="space-y-6">


            <div>
                <h1 className="text-3xl font-bold">
                    Payments
                </h1>

                <p className="mt-1 text-gray-500">
                    View your payment history.
                </p>
            </div>




            <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

                <div className="overflow-x-auto">

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


                            {payments.map((payment: any) => (


                                <tr
                                    key={payment.id}
                                    className="border-t hover:bg-gray-50"
                                >



                                    <td className="p-4">

                                        <div className="flex items-center gap-3">


                                            <img
                                                src={
                                                    payment.rentalOrder?.gear?.image
                                                }
                                                alt={
                                                    payment.rentalOrder?.gear?.title
                                                }
                                                className="h-14 w-14 rounded-lg object-cover"
                                            />


                                            <div>

                                                <p className="font-semibold">
                                                    {
                                                        payment.rentalOrder?.gear?.title
                                                    }
                                                </p>


                                                <p className="text-sm text-gray-500">
                                                    Rental Payment
                                                </p>


                                            </div>


                                        </div>

                                    </td>




                                    <td className="p-4 font-semibold">

                                        ৳ {Number(payment.amount).toFixed(2)}

                                    </td>




                                    <td className="p-4">

                                        <div className="flex items-center gap-2">

                                            <CreditCard size={16} />

                                            {payment.provider}

                                        </div>

                                    </td>




                                    <td className="p-4 text-sm">

                                        {payment.transactionId || "-"}

                                    </td>




                                    <td className="p-4">

                                        <div className="flex items-center gap-2">

                                            <CalendarDays size={16} />


                                            {
                                                payment.paidAt
                                                    ? new Date(
                                                        payment.paidAt
                                                    ).toLocaleDateString()
                                                    : "Not Paid"
                                            }


                                        </div>


                                    </td>




                                    <td className="p-4">


                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${payment.status === "COMPLETED"
                                                    ? "bg-green-100 text-green-700"
                                                    : payment.status === "PENDING"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                        >

                                            {payment.status}

                                        </span>


                                    </td>



                                </tr>


                            ))}


                        </tbody>


                    </table>


                </div>


            </div>



        </div>

    );
}