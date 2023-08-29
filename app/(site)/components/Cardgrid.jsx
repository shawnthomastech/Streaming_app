"use client"

import React, { useState, useEffect } from "react";
import supabase from "@/database/supabase";

const Cardgrid = () => {
    const [content, setcontent] = useState(null);
    const [founderror, seterror] = useState(null);

    useEffect(() => {
        const fetchcontent = async () => {
            const { data, error } = await supabase
                .from('Contentdesc')
                .select();

            if (error) {
                seterror('No luck in finding content');
                setcontent(null);
                console.log(error);
            }
            if (data) {
                setcontent(data);
                seterror(null);
            }
        };
        fetchcontent();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4">
            {content && content.map(val => (
                <div className="bg-gray-900 rounded-lg overflow-hidden shadow-md transition hover:shadow-lg">
                    <div className="relative pb-[55%]"> {/* Aspect ratio for a square image */}
                        <img className="absolute h-full w-full object-cover" src={val.image_path} alt="" />
                    </div>
                    <div className="p-4">
                        <h2 className="text-lg font-semibold text-white">{val.title}</h2>
                        <p className="text-gray-400 mt-2">{val.desc}</p>
                        <button className="mt-3 py-2 px-4 text-violet-700 bg-white rounded-md transition hover:text-white hover:bg-gray-500 text-sm w-full">
                            <a href={"../Gallery/" + val.id}>Watch Now</a>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Cardgrid;

// className=" bg-white text-violet-700 p-5 rounded-md transition hover:text-white hover:bg-gray-500 mt-5 text-xl w-full"