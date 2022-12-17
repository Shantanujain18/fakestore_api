import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import { useTypewriter } from "react-simple-typewriter";
import { dehydrate, QueryClient, useQuery } from "react-query";
import api from "./api/api";
import { css } from '@emotion/css'
import { Link } from "react-scroll";
import Router from "next/router";
import Product from "./Product/[id]";
export default function HomePage() {
  
  const [totalProducts, settotalProducts] = useState([]);

  useEffect(() => {
    const x = localStorage.getItem("products")
    if(x != null){
      let y = JSON.parse(x)
      console.log('y: ', y);
      settotalProducts(y)
    }
  },[] )
  

  const { error, isLoading, data }: any = useQuery(
    `queryKey`,
    async () => await api.getFakeData()
  );

  if (error) {
    console.log(error);
    return <h1>Error</h1>;
  }

  if (isLoading) {
    console.log("loading");


    return <h1>Loading</h1>;
  }
  if(data){
    console.log('data: ', data);
  }

  const deleteItemFromCart=(id:number)=>{
    let x = localStorage.getItem("products")
    if(x != null){
      let y = JSON.parse(x)
      console.log('y: ', y);
      let z = y.indexOf(id)
      console.log('z: ', z);
      y.splice(z,1)
      localStorage.setItem("products",JSON.stringify(y))
      settotalProducts(y)
    }
  }
  const addToCard=(id:any)=>  {
    let x = localStorage.getItem("products")
    if(x == null){
      localStorage.setItem("products",JSON.stringify([id]))
      let y = localStorage.getItem("products")
      console.log(y)
    }else{
      let y = JSON.parse(x)
      if(y.indexOf(id) === -1) {
        y.push(id);
       
    }
     
      localStorage.setItem("products",JSON.stringify(y))
      console.log(y)
      settotalProducts(y)
    }
  
  }

  const viewProduct=(id:number)=>{
    // alert("Hello")
    // return <Product id={id}></Product>
    Router.push("/Product/"+id)
  }
  const viewCart=()=>{
    // alert("Hello")
    // return <Product id={id}></Product>
    Router.push("/ShoppingCart/")
  }
  return (
    <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
   
    <div className="flex flex-wrap -m-4">
{
  data?.map((item: any) => {
   

    return (
    //   className={css`
    //   padding: 32px;
    //   background-color: hotpink;
    //   font-size: 24px;
    //   border-radius: 4px;
    //   &:hover {
    //     color: red;
    //   }
    // `}
      <div className={" xl:w-1/4 md:w-1/2 p-4 object-cover"} key={item.id}  >
        <div className={"bg-gray-100 p-6 rounded-lg "+css`&:hover {
        background-color: #A8A8A8;
      }`}>
          <img className="rounded object-cover mb-6" src={item.image} alt="content" style={{ height: "300px", width: "auto", objectFit: "contain" }} onClick={()=>{viewProduct(item.id)}}/>
          <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">{item.category}</h3>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-4">{item.title.toUpperCase().substring(0,25)}..</h2>
          <p className="leading-relaxed text-base mb-10">{item.description.toUpperCase().substring(0, 80)}...</p>
          <div className={"flex justify-between items-center"}>
          <h2 className={"text-lg text-gray-900 font-medium title-font mb-4"}>$ {item.price}</h2>
          {
            totalProducts.indexOf(item.id) === -1 ? 
            <>
            <button className=" text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={()=>viewProduct(item.id)}>View Product</button>
            <button className=" text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={()=>addToCard(item.id)}>Add to cart</button>
            </>
             :
             <>
            <button className=" text-white bg-green-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={()=>viewCart()}>View in Cart</button> 

            <button className=" text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={()=>deleteItemFromCart(item.id)}>Delete</button> 
            </>
          }
          {/* <button className=" text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={()=>addToCard(item.id)}>Add to cart</button>
          <button className=" text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={()=>addToCard(item.id)}>Delete from cart</button> */}
 
          </div>
          
        </div>
      </div>
      
    )
  })
}
    
     
    </div>
  </div>
</section>
  );
}
export async function loader() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["queryKey"], api.getFakeData);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
