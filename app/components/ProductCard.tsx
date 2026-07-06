export default function ProductCard({ product }) {
  return (
    <div className="border p-4 rounded-xl">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
      <h3 className="font-bold mt-2">{product.name}</h3>
      <p>{product.price} DH</p>
      <a href={`https://wa.me/212600000000?text=بغيت:${product.name}`} className="bg-green-500 text-white p-2 rounded">
        اطلب الآن
      </a>
    </div>
  );
}