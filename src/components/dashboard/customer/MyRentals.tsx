"use client";

import { useQuery } from "@tanstack/react-query";

import {
    getMyRentals,
} from "@/services/rental/rental.api";

import PaymentButton from "@/components/dashboard/customer/PaymentButton";



export default function MyRentals() {


    const {
        data: rentals = [],
        isLoading,
        isError,

    } = useQuery({

        queryKey: [
            "my-rentals"
        ],

        queryFn: getMyRentals,

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

                Loading...

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

                Something went wrong.

            </div>

        );

    }







    if (!rentals.length) {

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

                    No Rentals Found

                </h2>


                <p className="
                    mt-2
                    text-gray-500
                ">

                    You haven't rented any gear yet.

                </p>


            </div>

        );

    }








    return (

        <div className="space-y-6">



            <div>

                <h1 className="
                    text-2xl
                    font-bold
                    sm:text-3xl
                ">

                    My Rentals

                </h1>


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


                            <th className="px-6 py-4 text-left">
                                Gear
                            </th>


                            <th className="px-6 py-4 text-left">
                                Rental Period
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


                        </tr>


                    </thead>





                    <tbody>


                        {
                            rentals.map((r: any) => (


                                <tr

                                    key={r.id}

                                    className="
                                    border-t
                                    hover:bg-gray-50
                                "

                                >



                                    <td className="px-6 py-4">


                                        <div className="
                                        flex
                                        items-center
                                        gap-4
                                    ">


                                            <img

                                                src={r.gear.image}

                                                alt={r.gear.title}

                                                className="
                                                h-16
                                                w-16
                                                rounded-lg
                                                object-cover
                                            "

                                            />


                                            <div>


                                                <h3 className="font-semibold">

                                                    {r.gear.title}

                                                </h3>


                                                <p className="
                                                text-sm
                                                text-gray-500
                                            ">

                                                    {r.gear.category.name}

                                                </p>


                                            </div>


                                        </div>


                                    </td>







                                    <td className="px-6 py-4">

                                        <p>
                                            {
                                                new Date(
                                                    r.startDate
                                                )
                                                    .toLocaleDateString()
                                            }
                                        </p>


                                        <p className="
                                        text-sm
                                        text-gray-500
                                    ">

                                            {
                                                new Date(
                                                    r.endDate
                                                )
                                                    .toLocaleDateString()
                                            }

                                        </p>


                                    </td>







                                    <td className="
                                    px-6
                                    py-4
                                    text-center
                                ">

                                        {r.quantity}

                                    </td>







                                    <td className="
                                    px-6
                                    py-4
                                    text-center
                                    font-semibold
                                ">

                                        ৳ {r.totalAmount}

                                    </td>







                                    <td className="px-6 py-4 text-center">

                                        <StatusBadge
                                            status={r.status}
                                        />

                                    </td>







                                    <td className="px-6 py-4 text-center">

                                        <PaymentButton
                                            rental={r}
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
                    rentals.map((r: any) => (


                        <div

                            key={r.id}

                            className="
                            rounded-xl
                            border
                            bg-white
                            p-5
                            shadow-sm
                        "

                        >





                            <div className="
                            flex
                            gap-4
                            border-b
                            pb-4
                        ">


                                <img

                                    src={r.gear.image}

                                    alt={r.gear.title}

                                    className="
                                    h-20
                                    w-20
                                    rounded-xl
                                    object-cover
                                "

                                />



                                <div>


                                    <h3 className="
                                    font-semibold
                                ">

                                        {r.gear.title}

                                    </h3>



                                    <p className="
                                    text-sm
                                    text-gray-500
                                ">

                                        {r.gear.category.name}

                                    </p>


                                </div>


                            </div>






                            <div className="
                            mt-4
                            space-y-3
                            text-sm
                        ">



                                <Info
                                    label="Start Date"
                                    value={
                                        new Date(
                                            r.startDate
                                        )
                                            .toLocaleDateString()
                                    }
                                />



                                <Info
                                    label="End Date"
                                    value={
                                        new Date(
                                            r.endDate
                                        )
                                            .toLocaleDateString()
                                    }
                                />



                                <Info
                                    label="Quantity"
                                    value={r.quantity}
                                />



                                <Info
                                    label="Total"
                                    value={`৳ ${r.totalAmount}`}
                                />



                                <div className="
                                flex
                                justify-between
                                items-center
                            ">

                                    <span className="text-gray-500">
                                        Status
                                    </span>


                                    <StatusBadge
                                        status={r.status}
                                    />


                                </div>



                            </div>






                            <div className="mt-5">

                                <PaymentButton
                                    rental={r}
                                />

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
            flex
            justify-between
        ">

            <span className="text-gray-500">
                {label}
            </span>


            <span className="font-medium">
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
        status === "PAID"
            ?
            "bg-green-100 text-green-700"

            :

            status === "CONFIRMED"
                ?
                "bg-blue-100 text-blue-700"

                :

                status === "PLACED"
                    ?
                    "bg-yellow-100 text-yellow-700"

                    :

                    status === "PICKED_UP"
                        ?
                        "bg-purple-100 text-purple-700"

                        :

                        "bg-gray-100 text-gray-700";



    return (

        <span className={`
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