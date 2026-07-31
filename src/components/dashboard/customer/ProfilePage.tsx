"use client";

import { useState } from "react";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";


import {
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
    User,
    Pencil,
} from "lucide-react";


import {
    getCurrentUser,
} from "@/services/auth/auth.api";


import {
    updateProfile,
} from "@/services/user/user.api";


import EditProfileModal from "./EditProfileModal";


import {
    getErrorMessage,
} from "@/utils/getErrorMessage";
import Image from "next/image";





export default function ProfilePage() {


    const queryClient = useQueryClient();


    const [
        openEdit,
        setOpenEdit
    ] = useState(false);





    const {
        data,
        isLoading,
        isError,

    } = useQuery({

        queryKey: [
            "current-user"
        ],

        queryFn: getCurrentUser,

    });





    const user = data?.data;







    const updateMutation = useMutation({


        mutationFn: updateProfile,


        onSuccess: () => {


            toast.success(
                "Profile updated successfully"
            );


            queryClient.invalidateQueries({

                queryKey: [
                    "current-user"
                ]

            });


            setOpenEdit(false);


        },



        onError: (error) => {


            toast.error(
                getErrorMessage(error)
            );


        }


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

                Loading profile...

            </div>

        );

    }







    if (isError || !user) {

        return (

            <div className="
                flex
                h-80
                items-center
                justify-center
                text-red-500
            ">

                Failed to load profile

            </div>

        );

    }







    const avatar =
        user.profile?.photo ||
        `https://ui-avatars.com/api/?background=2563eb&color=fff&size=200&name=${encodeURIComponent(
            user.name
        )}`;









    return (

        <div className="
            space-y-6
            overflow-hidden
        ">







            {/* Header */}


            <div className="
                flex
                flex-col
                gap-4

                sm:flex-row
                sm:items-center
                sm:justify-between
            ">


                <div>

                    <h1 className="
                        text-2xl
                        font-bold
                        sm:text-3xl
                    ">

                        My Profile

                    </h1>


                    <p className="
                        mt-1
                        text-sm
                        text-gray-500
                    ">

                        Manage your personal information.

                    </p>


                </div>





                <button

                    onClick={() =>
                        setOpenEdit(true)
                    }

                    className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-lg
                        border
                        px-4
                        py-2
                        text-sm
                        font-medium
                        transition
                        hover:bg-gray-50

                        sm:w-auto
                    "

                >

                    <Pencil size={16} />

                    Edit Profile

                </button>



            </div>









            {/* Profile Card */}


            <div className="
                rounded-2xl
                border
                bg-white
                p-4
                shadow-sm

                sm:p-6
                lg:p-8
            ">








                {/* User Header */}


                <div className="
                    flex
                    flex-col
                    items-center
                    gap-5
                    border-b
                    pb-8

                    md:flex-row
                ">





                    <Image
                        width={128}
                        height={128}
                        src={avatar}

                        alt={user.name}


                        className="
                            h-28
                            w-28
                            rounded-full
                            border
                            object-cover
                            shadow

                            sm:h-32
                            sm:w-32
                        "

                    />






                    <div className="
                        text-center

                        md:text-left
                    ">


                        <h2 className="
                            text-2xl
                            font-bold
                            sm:text-3xl
                        ">

                            {user.name}

                        </h2>




                        <p className="
                            mt-1
                            text-sm
                            text-gray-500
                        ">

                            {user.email}

                        </p>







                        <div className="
                            mt-4
                            flex
                            flex-wrap
                            justify-center
                            gap-3

                            md:justify-start
                        ">


                            <span className="
                                rounded-full
                                bg-blue-100
                                px-4
                                py-1
                                text-sm
                                font-semibold
                                text-blue-700
                            ">

                                {user.role}

                            </span>





                            <span

                                className={`
                                    rounded-full
                                    px-4
                                    py-1
                                    text-sm
                                    font-semibold

                                    ${user.status === "ACTIVE"

                                        ?

                                        "bg-green-100 text-green-700"

                                        :

                                        "bg-red-100 text-red-700"
                                    }
                                `}

                            >

                                {user.status}

                            </span>



                        </div>



                    </div>




                </div>









                {/* Information */}



                <div className="
                    mt-8
                ">


                    <h3 className="
                        mb-5
                        text-xl
                        font-bold
                    ">

                        Personal Information

                    </h3>





                    <div className="
                        grid
                        gap-4

                        md:grid-cols-2
                    ">





                        <InfoCard

                            icon={
                                <User size={18} />
                            }

                            title="Full Name"

                            value={user.name}

                        />





                        <InfoCard

                            icon={
                                <Mail size={18} />
                            }

                            title="Email"

                            value={user.email}

                        />





                        <InfoCard

                            icon={
                                <Phone size={18} />
                            }

                            title="Phone"

                            value={
                                user.profile?.phone ||
                                "Not Added"
                            }

                        />





                        <InfoCard

                            icon={
                                <ShieldCheck size={18} />
                            }

                            title="Role"

                            value={user.role}

                        />








                        <div className="
                            md:col-span-2
                        ">


                            <InfoCard

                                icon={
                                    <MapPin size={18} />
                                }

                                title="Address"

                                value={
                                    user.profile?.address ||
                                    "No address added"
                                }

                            />


                        </div>







                        <div className="
                            rounded-xl
                            border
                            p-5

                            md:col-span-2
                        ">


                            <p className="
                                mb-2
                                text-sm
                                text-gray-500
                            ">

                                Bio

                            </p>


                            <p className="text-gray-700">

                                {
                                    user.profile?.bio ||
                                    "No bio added yet."
                                }

                            </p>


                        </div>






                    </div>


                </div>







            </div>









            <EditProfileModal

                open={openEdit}

                onClose={() =>
                    setOpenEdit(false)
                }

                user={user}

                loading={
                    updateMutation.isPending
                }


                onSubmit={(values) => {

                    updateMutation.mutate(
                        values
                    );

                }}

            />




        </div>

    );

}








function InfoCard({

    icon,

    title,

    value,

}: {

    icon: React.ReactNode;

    title: string;

    value: string;

}) {


    return (

        <div className="
            rounded-xl
            border
            p-4
            transition
            hover:shadow-md
        ">


            <div className="
                mb-3
                flex
                items-center
                gap-2
                text-sm
                text-gray-500
            ">

                {icon}

                {title}

            </div>



            <p className="
                break-words
                font-semibold
            ">

                {value}

            </p>



        </div>

    );

}