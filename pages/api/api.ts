
export default {
  
   getFakeData: async (): Promise<string> => {
    const response = await fetch('https://fakestoreapi.com/products')
    
    return await response.json();
  },
  
  getProductData: async (id:any): Promise<string> => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`)
    console.log("EELEL");
    
    return await response.json();
  },
    
  }