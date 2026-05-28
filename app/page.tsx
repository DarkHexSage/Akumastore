"use client";
import { useState } from "react";

const WHATSAPP = "50685303183"; // <-- CAMBIAR POR TU NÚMERO

type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  category: "rompecabezas" | "llaveros" | "figuras";
  img1: string;
  img2: string;
};

const products: Product[] = [
  { id: 1, name: "Naruto Akatsuki", price: 11000, originalPrice: 16000, category: "rompecabezas", img1: "/images/products/puzzle-akatsuki1.jpeg", img2: "/images/products/puzzle-akatsuki2.jpeg" },
  { id: 2, name: "El Viaje de Chihiro", price: 11000, originalPrice: 16000, category: "rompecabezas", img1: "/images/products/puzzle-chihiro1.jpeg", img2: "/images/products/puzzle-chihiro2.jpeg" },
  { id: 3, name: "Death Note", price: 11000, originalPrice: 16000, category: "rompecabezas", img1: "/images/products/puzzle-deathnote.png", img2: "/images/products/puzzle-deathnote2.png" },
  { id: 4, name: "Digimon", price: 9000, originalPrice: 13000, category: "rompecabezas", img1: "/images/products/puzzle-digimon1.jpeg", img2: "/images/products/puzzle-digimon2.jpeg" },
  { id: 5, name: "Yu-Gi-Oh! Exodia", price: 8000, originalPrice: 13000, category: "rompecabezas", img1: "/images/products/puzzle-exodia1.jpeg", img2: "/images/products/puzzle-exodia2.jpeg" },
  { id: 6, name: "One Piece", price: 11000, originalPrice: 16000, category: "rompecabezas", img1: "/images/products/puzzle-onepiece1.jpeg", img2: "/images/products/puzzle-onepiece2.jpeg" },
  { id: 7, name: "Attack on Titan", price: 11000, originalPrice: 16000, category: "rompecabezas", img1: "/images/products/puzzle-shingeky1.jpeg", img2: "/images/products/puzzle-shingeky2.jpeg" },
  { id: 8, name: "Mi Vecino Totoro", price: 10000, originalPrice: 13000, category: "rompecabezas", img1: "/images/products/puzzle-totoro1.jpeg", img2: "/images/products/puzzle-totoro2.jpeg" },
  { id: 9, name: "Yu-Gi-Oh!", price: 11000, originalPrice: 16000, category: "rompecabezas", img1: "/images/products/puzzle-yugiohpsy1.jpeg", img2: "/images/products/puzzle-yugiohpsy2.jpeg" },
  { id: 10, name: "Naruto Akatsuki", price: 3000, originalPrice: 4500, category: "llaveros", img1: "/images/products/llavero-akatsuki1.jpeg", img2: "/images/products/llavero-akatsuki2.jpeg" },
  { id: 11, name: "Berserk Beherit", price: 3000, originalPrice: 4500, category: "llaveros", img1: "/images/products/llavero-beherit1.jpeg", img2: "/images/products/llavero-beherit2.jpeg" },
  { id: 12, name: "Attack on Titan", price: 3000, originalPrice: 4500, category: "llaveros", img1: "/images/products/llavero-shingeky1.jpeg", img2: "/images/products/llavero-shingeky2.jpeg" },
  { id: 13, name: "Dark Souls Solaire", price: 3500, originalPrice: 4500, category: "llaveros", img1: "/images/products/llavero-solaire1.jpeg", img2: "/images/products/llavero-solaire2.jpeg" },
  { id: 14, name: "Yu-Gi-Oh! Rompecabezas del Milenio", price: 3500, originalPrice: 4500, category: "llaveros", img1: "/images/products/llavero-yugioh-milenio1.jpeg", img2: "/images/products/llavero-yugioh-milenio2.jpeg" },
  { id: 15, name: "Yu-Gi-Oh! Cetro Del Milenio", price: 3500, originalPrice: 4500, category: "llaveros", img1: "/images/products/llavero-yugioh1.jpeg", img2: "/images/products/llavero-yugioh1.jpeg" },
  { id: 16, name: "Naruto Meditación Tradicional", price: 14000, originalPrice: 20000, category: "figuras", img1: "/images/products/figura-naruto1.jpeg", img2: "/images/products/figura-naruto2.jpeg" },
];

const categoryLabels: Record<string, string> = {
  todos: "Todos",
  rompecabezas: "Rompecabezas",
  llaveros: "Llaveros",
  figuras: "Figuras",
};

const categoryDescriptions: Record<string, string> = {
  rompecabezas: "1000 piezas · Calidad premium",
  llaveros: "Metal · Coleccionables",
  figuras: "Edición limitada · Detalle artístico",
};

function formatPrice(n: number) {
  return "\u20A1" + n.toLocaleString("es-CR");
}

function discountPercent(orig: number, now: number) {
  return Math.round(((orig - now) / orig) * 100);
}

function whatsappLink(product: Product) {
  const cat = product.category === "rompecabezas" ? "Rompecabezas" : product.category === "llaveros" ? "Llavero" : "Figura";
  const msg = encodeURIComponent("Hola! Me interesa el " + cat + ' "' + product.name + '" (' + formatPrice(product.price) + "). Esta disponible?");
  return "https://wa.me/" + WHATSAPP + "?text=" + msg;
}

const WaIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

function ProductCard({ product, hovered, onHover }: { product: Product; hovered: boolean; onHover: (id: number | null) => void }) {
  const badgeClass = product.category === "rompecabezas" ? "badge-puzzle" : product.category === "llaveros" ? "badge-keychain" : "badge-figure";
  const badgeText = product.category === "rompecabezas" ? "PUZZLE" : product.category === "llaveros" ? "LLAVERO" : "FIGURA";
  const discount = discountPercent(product.originalPrice, product.price);

  return (
    <div className="card" onMouseEnter={() => onHover(product.id)} onMouseLeave={() => onHover(null)}>
      <div className="card-img-wrap">
        <span className={"card-badge " + badgeClass}>{badgeText}</span>
        {discount > 0 && <span className="discount-badge">-{discount}%</span>}
        <img src={hovered ? product.img2 : product.img1} alt={product.name} loading="lazy" />
      </div>
      <div className="card-body">
        <p className="card-name">{product.name}</p>
        <div className="card-prices">
          <p className="card-price">{formatPrice(product.price)}</p>
          {product.originalPrice > product.price && (
            <span className="card-original">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        <a className="card-wa" href={whatsappLink(product)} target="_blank" rel="noopener noreferrer">
          <WaIcon /> Lo quiero!
        </a>
      </div>
    </div>
  );
}

export default function Home() {
  const [filter, setFilter] = useState<string>("todos");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filtered = filter === "todos" ? products : products.filter((p) => p.category === filter);

  return (
    <>
      <div className="hero">
        <p className="jp-accent">アニメショップ</p>
        <h1 className="hero-title">AKUMA STORE</h1>
        <img src="/images/logo.png" alt="Akuma Store" style={{ width: 180, height: "auto", margin: "0 auto 16px", display: "block" }} />
        <p style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "clamp(1.5rem, 5vw, 2.5rem)", color: "#e63946", letterSpacing: "8px" }}>CATÁLOGO</p>
        <p className="hero-sub">ROMPECABEZAS · LLAVEROS · FIGURAS</p>
        <div className="hero-line" />
      </div>

      <div className="filters">
        {Object.entries(categoryLabels).map(([key, label]) => {
          const count = key === "todos" ? products.length : products.filter((p) => p.category === key).length;
          return (
            <button
              key={key}
              className={"filter-btn" + (filter === key ? " active" : "")}
              onClick={() => setFilter(key)}
            >
              {label}
              <span className="filter-count">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="grid-container">
        {filter === "todos" ? (
          (["rompecabezas", "llaveros", "figuras"] as const).map((cat) => {
            const items = products.filter((p) => p.category === cat);
            if (items.length === 0) return null;
            return (
              <div key={cat} style={{ marginBottom: 48 }}>
                <div className="section-header">
                  <h2>{categoryLabels[cat]}</h2>
                  <p>{categoryDescriptions[cat]}</p>
                  <div className="section-divider" />
                </div>
                <div className="product-grid">
                  {items.map((p) => (
                    <ProductCard key={p.id} product={p} hovered={hoveredId === p.id} onHover={setHoveredId} />
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <>
            <div className="section-header">
              <h2>{categoryLabels[filter]}</h2>
              <p>{categoryDescriptions[filter]}</p>
              <div className="section-divider" />
            </div>
            <div className="product-grid">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} hovered={hoveredId === p.id} onHover={setHoveredId} />
              ))}
            </div>
          </>
        )}
      </div>

      <a className="wa-float" href={"https://wa.me/" + WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <svg viewBox="0 0 24 24" width="30" height="30" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      <footer className="footer">
        <p>© 2026 <span className="accent">Akuma Store</span> — Costa Rica</p>
        <p style={{ marginTop: 4, opacity: 0.5 }}>Pedidos por WhatsApp · Envios a todo el pais</p>
      </footer>
    </>
  );
}
