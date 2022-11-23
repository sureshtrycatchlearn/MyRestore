import { Product } from "../../app/models/product"

interface Props{
    products:Product[];
    addProduct:()=>void;
}

export default function Catalog({products, addProduct}: Props){
    return(
    <>    
      <ul>
        {products.map((product:any)=>(
          <li key={product.id}>{product.brand} - {product.price} - {product.pictureUrl}</li>
        ))}
      </ul>
      <button onClick={addProduct}>Add Product</button>
    </>
    )
}