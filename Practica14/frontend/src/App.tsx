import { useState } from "react";
import { useProducts } from "./hooks/useProducts";
import { createOrder, type Producto } from "./services/productService";
import { Layout } from "./Layout";
import { Encabezado } from "./Encabezado";
import { PiePagina } from "./PiePagina";
import { Filtros } from "./Filtros";
import { Catalogo } from "./Catalogo";

export default function App() {
  const { products, loading, error, refetch } = useProducts();
  const [categoria, setCategoria] = useState("todas");
  const [carrito, setCarrito] = useState<Producto[]>([]);

  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [pagoError, setPagoError] = useState("");
  const [folioExito, setFolioExito] = useState("");
  const [enviando, setEnviando] = useState(false);

  const categorias = ["todas", ...new Set(products.map((p) => p.categoria))];

  const visibles =
    categoria === "todas"
      ? products
      : products.filter((p) => p.categoria === categoria);

  const total = carrito.reduce((suma, p) => suma + p.precio, 0);

  function agregar(producto: Producto) {
    setCarrito((anterior) => [...anterior, producto]);
  }

  async function handlePago(e: React.FormEvent) {
    e.preventDefault();
    setPagoError("");
    setFolioExito("");

    if (!correo.includes("@")) {
      setPagoError('El correo debe contener un "@" válido.');
      return;
    }

    if (!/^\d{10}$/.test(telefono)) {
      setPagoError("El teléfono debe contener exactamente 10 dígitos numéricos.");
      return;
    }

    if (carrito.length === 0) {
      setPagoError("El carrito está vacío.");
      return;
    }

    setEnviando(true);
    try {
      const ids = carrito.map((p) => p.id);
      const respuesta = await createOrder({
        correo,
        telefono,
        productos: ids,
      });

      setFolioExito(respuesta.folio);
      setCarrito([]);
      setCorreo("");
      setTelefono("");
      refetch();
    } catch (err: any) {
      const msg = err.response?.data?.message || "Ocurrió un error al procesar el pedido.";
      setPagoError(Array.isArray(msg) ? msg.join(", ") : msg);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <Layout
      encabezado={<Encabezado piezas={carrito.length} />}
      pie={<PiePagina piezas={carrito.length} total={total} />}
    >
      <section className="portada">
        <h1>Catálogo de Temporada</h1>

        {loading && (
          <div className="cargando">
            <div className="cargando__rueda"></div>
            <p>Cargando productos...</p>
          </div>
        )}

        {error && !loading && (
          <div className="error">
            <p>{error}</p>
            <button onClick={refetch}>Reintentar</button>
          </div>
        )}

        {!loading && !error && (
          <>
            <p>{visibles.length} productos disponibles</p>
            <Filtros
              categorias={categorias}
              activa={categoria}
              onCambiar={setCategoria}
            />
            <Catalogo productos={visibles} onAgregar={agregar} />

            <form className="pago" onSubmit={handlePago}>
              <h2>Simular Pago</h2>

              <label>
                Correo electrónico:
                <input
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="ejemplo@itson.edu.mx"
                  required
                />
              </label>

              <label>
                Teléfono (10 dígitos):
                <input
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="6441234567"
                  required
                />
              </label>

              {pagoError && <p className="pago__error">{pagoError}</p>}

              <button type="submit" disabled={enviando}>
                {enviando ? "Procesando..." : "Confirmar y Pagar"}
              </button>
            </form>

            {folioExito && (
              <div className="confirmacion">
                ¡Pedido confirmado! Tu folio de compra es: <strong>{folioExito}</strong>
              </div>
            )}
          </>
        )}
      </section>
    </Layout>
  );
}