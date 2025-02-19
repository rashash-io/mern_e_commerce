import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";


export const ProductPage = () => {
  const { fetchSingleProduct } = useProductStore();
  const { productId } = useParams();
  const [prod, setProd] = useState({});
  useEffect(() => {
    let fetched = fetchSingleProduct(productId);
    setProd(fetched);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 
  return (
    <div>
      ProductPage{prod.name} Prod Id: {productId}
      <div className="section">
      
      </div>
    </div>
  );
};

export default ProductPage;
