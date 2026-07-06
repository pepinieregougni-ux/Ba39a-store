// 1. هنا كنعرفو النوع ديال المنتج باش يفهم TypeScript
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

// 2. هنا المكون ديالنا كياخد هاداك النوع
export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border p-4 rounded-xl shadow-sm hover:shadow-md transition">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-40 object-cover rounded-lg" 
      />
      <h3 className="font-bold mt-2 text-lg">{product.name}</h3>
      <p className="text-orange-600 font-bold">{product.price} DH</p>
      <a 
        href={`https://wa.me/212600000000?text=بغيت نشري: ${product.name}`} 
        className="block mt-3 bg-green-500 text-white text-center py-2 rounded-lg font-bold"
      >
        اطلب الآن
      </a>
    </div>
  );
}