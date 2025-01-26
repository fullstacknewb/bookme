
import { Client, Environment } from "square"
import { PaymentsApi } from "square";

 
// Make an API call to the Square API
export const getServices = async () => {
    // Create a new instance of the Square API client
    // Initialize the Square client
 const client = new Client({
  bearerAuthCredentials:{
      accessToken: 'EAAAl1ObzCX7S9AkD193gc2B_UymC23Wg1t7Q6zp0x9OgUVWGa7W_hAc3lIwci_n'
  },
  environment: Environment.Sandbox
})
  try {
      const response = await client.catalogApi.searchCatalogItems({
        productTypes: [
          'APPOINTMENTS_SERVICE'
        ]
      });
    // Map through the response and log the items
     const result =  response.result.items?.map(item => {
      const prodName = item.itemData?.name;
      const price = item.itemData?.variations.map(variation => variation.itemVariationData?.priceMoney.amount);

      return prodName + " " + price;  
     })
    
     return result

    } catch(error) {
      console.log(error);
    }

}

export default function Services() {
  const services = getServices();

  return (
    <div>
      <h1>Services</h1>
      <button onClick>Buy Now</button>
    </div>
  )
}


