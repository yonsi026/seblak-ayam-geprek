import { Plus, Star } from "lucide-react";
import { formatIDR, type Product } from "@/data/menu";
import { images } from "@/lib/images";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/Button";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <article className="flex h-full flex-col border border-border bg-background">
      <div className="relative">
        <img
          src={images[product.image]}
          alt={product.name}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover"
        />
        <div className="absolute left-0 top-0 flex flex-col items-start">
          {product.isBestSeller ? (
            <span className="label-mono bg-ink px-2 py-1 text-background">Bestseller</span>
          ) : null}
          {product.isPromotion ? (
            <span className="label-mono bg-primary px-2 py-1 text-primary-foreground">Promo</span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="text-[17px] font-bold tracking-tight">{product.name}</h3>
          <p className="mt-1 text-[14px] leading-snug text-muted-foreground">
            {product.description}
          </p>
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xl font-extrabold tracking-tight">{formatIDR(product.price)}</p>
            <p className="flex items-center gap-1 text-[13px] font-medium text-muted-foreground">
              <Star className="h-3.5 w-3.5 fill-primary text-primary" aria-hidden="true" />
              {product.rating.toFixed(1)}
              <span className="sr-only">dari 5</span> ({product.reviewCount})
            </p>
          </div>
          {product.isAvailable ? (
            <Button
              size="sm"
              className="mt-3 w-full"
              onClick={() =>
                addItem({ id: product.id, name: product.name, price: product.price })
              }
            >
              <Plus className="h-4 w-4" aria-hidden="true" /> Tambah
            </Button>
          ) : (
            <p className="mt-3 border border-destructive px-3 py-2 text-center text-[13px] font-semibold text-destructive">
              Habis hari ini
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
