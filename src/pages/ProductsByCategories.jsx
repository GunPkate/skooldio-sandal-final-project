import { useParams } from "react-router-dom";

const ProductsByCategories = () => {
    const {Categories} = useParams();
    // console.log(Categories)
    return (
        <>
            <h1>Yellow</h1>
        </>
    )
}

export default ProductsByCategories;