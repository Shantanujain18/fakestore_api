import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import api from "./api/api";
import {useGeolocation} from 'react-use';

export default function ShoppingCart() {
  const [products, setproducts] = useState<any>([]);

  const [cartData, setcartData] = useState<any>([]);

  const loc = useGeolocation()
  const { isLoading, error, data, refetch } = useQuery("query", api.getFakeData, {
    select: (data: any) => {
      let x = localStorage.getItem("products");
      if (x != null) {
        let y = JSON.parse(x);
        console.log("y: ", y);
        let z = y.map((id: any) => {
          console.log(
            "data.find((item:any)=>item.id === id): ",
            data.find((item: any) => item.id === id)
          );
          return data.find((item: any) => item.id === id);
        });
        console.log("z: ", z);
        

        return z;
      }
    },
  });
  console.log("data: ", data);

  useEffect(() => {
    const x = localStorage.getItem("products");
    if (x != null) {
      let y = JSON.parse(x);
      console.log("y: ", y);

      setcartData(y);
    }
  }, []);

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  if (error) {
    return <h1>Error</h1>;
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
      // let m = data.filter((item:any)=>{
      //   console.log('item.id !== id: ', item.id !== id);
        
      //   return item.id !== id})
      //   data  = m;
        refetch()
    }
  
    console.log('data: ', data);
    
  }

  const checkOut=()=>{
    console.log('loc: ', loc);
  }

  return (
    <div>
     
      <section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-24 mx-auto">
    <div className="-my-8 divide-y-2 divide-gray-100">
     
       {
       data['length'] != 0 ? data?.map((item: any) => {
        return  <div className="py-8 flex flex-wrap md:flex-nowrap">
        <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
          <span className="font-semibold title-font text-gray-700">{item.category}</span>
          <img className="font-semibold title-font text-gray-700 w-28 h-28" src={item.image}/>
          
        </div>
        <div className="md:flex-grow">
          <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">{item.title}</h2>
          <p className="leading-relaxed">{item.description}</p>
          <button className=" text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10" onClick={()=>deleteItemFromCart(item.id)}>Delete from cart</button>
        </div>
      </div>;
      }):
      <h1>
        No items in cart
      </h1>
    
    
    }
    {
      data['length'] != 0 ? 
<button className=" text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"  onClick={()=>checkOut()}>Proceed to Checkout</button>
:
      null
    }
     
    </div>
  </div>
</section>
    </div>
  );
}
