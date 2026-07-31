"use client";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import {
    getProviderOrders,
    updateRentalStatus,
} from "@/services/rental/rental.api";

import TableSkeleton from "@/components/shared/TableSkeleton";
import { getErrorMessage } from "@/utils/getErrorMessage";
import Image from "next/image";


type RentalStatus =
    | "CONFIRMED"
    | "PICKED_UP"
    | "RETURNED";



export default function ProviderOrders() {


    const queryClient = useQueryClient();



    const {
        data: orders = [],
        isLoading,
        isError,
    } = useQuery({

        queryKey: ["provider-orders"],

        queryFn: getProviderOrders,

    });




    const {
        mutate,
        isPending,
    } = useMutation({


        mutationFn: ({
            id,
            status,
        }: {
            id:string;
            status:RentalStatus;
        }) =>
            updateRentalStatus(
                id,
                status
            ),



        onSuccess:(res)=>{


            toast.success(
                res.message
            );


            queryClient.invalidateQueries({

                queryKey:[
                    "provider-orders"
                ]

            });


        },



        onError:(error)=>{

            toast.error(
                getErrorMessage(error)
            );

        }


    });





    if(isLoading){

        return (
            <TableSkeleton
                rows={5}
                columns={6}
            />
        );

    }





    if(isError){

        return (
            <div className="
                flex
                h-80
                items-center
                justify-center
                text-red-500
            ">
                Failed to load orders.
            </div>
        );

    }




    if(!orders.length){

        return (

            <div className="
                rounded-xl
                border
                bg-white
                p-10
                text-center
                shadow-sm
            ">

                <h2 className="text-2xl font-semibold">
                    No Rental Orders
                </h2>


                <p className="mt-2 text-gray-500">
                    No customer has rented your gear yet.
                </p>


            </div>

        );

    }





    return (

        <div className="space-y-6">


            <div>

                <h1 className="text-2xl font-bold sm:text-3xl">
                    Rental Orders
                </h1>


                <p className="mt-1 text-sm text-gray-500">
                    Manage your customer rental requests.
                </p>

            </div>





            {/* Desktop Table */}


            <div
                className="
                    hidden
                    overflow-hidden
                    rounded-xl
                    border
                    bg-white
                    shadow-sm
                    xl:block
                "
            >


                <table className="w-full">


                    <thead className="bg-gray-100">

                        <tr>


                            <th className="px-6 py-4 text-left">
                                Customer
                            </th>


                            <th className="px-6 py-4 text-left">
                                Gear
                            </th>


                            <th className="px-6 py-4 text-center">
                                Qty
                            </th>


                            <th className="px-6 py-4 text-center">
                                Total
                            </th>


                            <th className="px-6 py-4 text-center">
                                Status
                            </th>


                            <th className="px-6 py-4 text-center">
                                Payment
                            </th>


                            <th className="px-6 py-4 text-center">
                                Action
                            </th>


                        </tr>

                    </thead>




                    <tbody>


                    {
                        orders.map((order:any)=>(


                            <tr
                                key={order.id}
                                className="
                                    border-t
                                    hover:bg-gray-50
                                "
                            >



                                <td className="px-6 py-4">

                                    <p className="font-semibold">
                                        {order.customer.name}
                                    </p>


                                    <p className="text-sm text-gray-500">
                                        {order.customer.email}
                                    </p>

                                </td>





                                <td className="px-6 py-4">


                                    <div className="flex items-center gap-3">


                                        <img
                                        
                                            src={order.gear.image}
                                            alt={order.gear.title}
                                            className="
                                                h-14
                                                w-14
                                                rounded-lg
                                                object-cover
                                            "
                                        />



                                        <div>


                                            <p className="font-semibold">
                                                {order.gear.title}
                                            </p>


                                            <p className="text-sm text-gray-500">
                                                {order.gear.category.name}
                                            </p>


                                        </div>


                                    </div>


                                </td>





                                <td className="px-6 py-4 text-center">

                                    {order.quantity}

                                </td>





                                <td className="
                                    px-6
                                    py-4
                                    text-center
                                    font-semibold
                                ">

                                    ৳ {order.totalAmount}

                                </td>





                                <td className="px-6 py-4 text-center">


                                    <span className="
                                        rounded-full
                                        bg-blue-100
                                        px-3
                                        py-1
                                        text-xs
                                        font-semibold
                                        text-blue-700
                                    ">

                                        {order.status}

                                    </span>


                                </td>





                                <td className="px-6 py-4 text-center">


                                    {
                                        order.payment

                                        ?

                                        <span className="
                                            rounded-full
                                            bg-green-100
                                            px-3
                                            py-1
                                            text-xs
                                            font-semibold
                                            text-green-700
                                        ">
                                            Paid
                                        </span>


                                        :

                                        <span className="
                                            rounded-full
                                            bg-red-100
                                            px-3
                                            py-1
                                            text-xs
                                            font-semibold
                                            text-red-700
                                        ">
                                            Unpaid
                                        </span>
                                    }


                                </td>





                                <td className="px-6 py-4 text-center">

                                    <ActionButton
                                        order={order}
                                        mutate={mutate}
                                        isPending={isPending}
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
                orders.map((order:any)=>(


                    <div
                        key={order.id}
                        className="
                            rounded-xl
                            border
                            bg-white
                            p-5
                            shadow-sm
                        "
                    >



                        <div className="border-b pb-4">


                            <p className="text-sm text-gray-500">
                                Customer
                            </p>


                            <p className="font-semibold">
                                {order.customer.name}
                            </p>


                            <p className="text-sm text-gray-500">
                                {order.customer.email}
                            </p>


                        </div>






                        <div className="
                            mt-4
                            flex
                            gap-3
                            border-b
                            pb-4
                        ">


                            <img
                                src={order.gear.image}
                                alt={order.gear.title}
                                className="
                                    h-16
                                    w-16
                                    rounded-lg
                                    object-cover
                                "
                            />


                            <div>

                                <p className="font-semibold">
                                    {order.gear.title}
                                </p>


                                <p className="text-sm text-gray-500">
                                    {order.gear.category.name}
                                </p>


                            </div>


                        </div>







                        <div className="
                            mt-4
                            space-y-3
                            text-sm
                        ">



                            <div className="flex justify-between">

                                <span className="text-gray-500">
                                    Quantity
                                </span>

                                <span>
                                    {order.quantity}
                                </span>

                            </div>





                            <div className="flex justify-between">

                                <span className="text-gray-500">
                                    Total
                                </span>


                                <span className="font-semibold">
                                    ৳ {order.totalAmount}
                                </span>


                            </div>





                            <div className="flex justify-between">

                                <span className="text-gray-500">
                                    Status
                                </span>


                                <span className="
                                    rounded-full
                                    bg-blue-100
                                    px-3
                                    py-1
                                    text-xs
                                    text-blue-700
                                ">
                                    {order.status}
                                </span>


                            </div>





                            <div className="flex justify-between">

                                <span className="text-gray-500">
                                    Payment
                                </span>


                                {
                                    order.payment

                                    ?

                                    <span className="
                                        rounded-full
                                        bg-green-100
                                        px-3
                                        py-1
                                        text-xs
                                        text-green-700
                                    ">
                                        Paid
                                    </span>


                                    :

                                    <span className="
                                        rounded-full
                                        bg-red-100
                                        px-3
                                        py-1
                                        text-xs
                                        text-red-700
                                    ">
                                        Unpaid
                                    </span>
                                }


                            </div>



                        </div>






                        <div className="mt-5">


                            <ActionButton
                                order={order}
                                mutate={mutate}
                                isPending={isPending}
                            />


                        </div>



                    </div>


                ))
            }


            </div>



        </div>

    );

}






function ActionButton({
    order,
    mutate,
    isPending,
}:any){


    if(order.status==="PLACED"){

        return (

            <button
                disabled={isPending}
                onClick={()=>mutate({
                    id:order.id,
                    status:"CONFIRMED"
                })}
                className="
                    w-full
                    rounded-lg
                    bg-green-600
                    px-4
                    py-2
                    text-sm
                    text-white
                    hover:bg-green-700
                "
            >
                Confirm
            </button>

        );

    }




    if(order.status==="PAID"){

        return (

            <button
                disabled={isPending}
                onClick={()=>mutate({
                    id:order.id,
                    status:"PICKED_UP"
                })}
                className="
                    w-full
                    rounded-lg
                    bg-blue-600
                    px-4
                    py-2
                    text-sm
                    text-white
                    hover:bg-blue-700
                "
            >
                Pick Up
            </button>

        );

    }





    if(order.status==="PICKED_UP"){

        return (

            <button
                disabled={isPending}
                onClick={()=>mutate({
                    id:order.id,
                    status:"RETURNED"
                })}
                className="
                    w-full
                    rounded-lg
                    bg-purple-600
                    px-4
                    py-2
                    text-sm
                    text-white
                    hover:bg-purple-700
                "
            >
                Returned
            </button>

        );

    }




    return (

        <span className="text-sm text-gray-500">
            No Action
        </span>

    );

}