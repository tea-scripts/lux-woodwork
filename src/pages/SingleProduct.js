import { useParams } from 'react-router-dom';

const SingleProduct = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Single Product Page</h1>
      <h2>{id}</h2>
    </div>
  );
};
export default SingleProduct;
