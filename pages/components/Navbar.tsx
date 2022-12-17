// import { Link } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import React from "react";

export default function Navbar() {
  
  const [active, setActive] = useState(false);

  const [title1, setTitle1] = useState("");
 
  useEffect(() => {
    setTitle1("Cart");
    
  }, []);
  const handleClick = () => {
    setActive(!active);
  };
  const [cart, setCart] = useState('');

  React.useEffect(() => { 
      async function init() {
        const d:string= await localStorage.getItem('products') || "[]";
        let arr = JSON.parse(`[${d}]`.replaceAll("'", '"')); 
        console.log('d: ', arr);
        console.log('arr: ', arr[0]['length']);
        setCart(arr[0]['length']);

      }
      init();
  }, [])
  return (
    <>
      <nav className="flex items-center flex-wrap bg-black sticky top-0 z-50">
        <Link href="/#" >
          <span className="inline-flex items-center  lg:pl-16 pl-10 text-white font-bold text-3xl">
            FakeStore API
          </span>
        </Link>
        <button
          className=" inline-flex p-3 hover:bg-yellow-600 rounded lg:hidden text-white ml-auto hover:text-white outline-none"
          onClick={handleClick}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {/* <div className="text-white uppercase font-bold lg:text-xl text-lg lg:ml-0 ml-3">KING OF ADULT ENTERTAINMENT</div> */}
        {/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}

        <div className={`${active ? "" : "hidden"}  w-10/12 lg:inline-flex`}>
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start">
            <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto my-3">
              <Link href="/ShoppingCart" >
                <span className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded hover:bg-yellow-600 font-bold items-center justify-center  text-white">
                  {title1} 
                </span>
              </Link>

              
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
