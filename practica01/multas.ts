type EstadoPrestamo = 'activo' | 'devuelto' | 'vencido';

interface Prestamo {
    multa: number; 
    ejemplar: number;
    estado: EstadoPrestamo;
    socio?: string; 
}

function calcularMulta(prestamo: Prestamo): number {
    const cargoFijo = 50;
    return prestamo.multa + cargoFijo;
}

function generarRecibo(prestamo: Prestamo): string {
    const nombreSocio = prestamo.socio ? prestamo.socio : 'Socio no registrado';
    const totalMulta = calcularMulta(prestamo);
    
    return `Recibo - Socio: ${nombreSocio} | Total a pagar: $${totalMulta}`;
}

const prestamoValido: Prestamo = { 
    multa: 350, 
    ejemplar: 14,
    estado: 'vencido', 
    socio: 'aleatorio'
};

const prestamoSinSocio: Prestamo = {
    multa: 100,
    ejemplar: 5,
    estado: 'activo'
};

console.log(generarRecibo(prestamoValido));
console.log(generarRecibo(prestamoSinSocio));


// Error 1: TS2322 - Tipo no permitido
// Esperaba: 'activo' | 'devuelto' | 'vencido' | Recibió: 'CANCELADO' | Línea: 41
//const testEstado: EstadoPrestamo = 'CANCELADO'; 

// Error 2: TS2345 - Argumento con tipo incorrecto
// Esperaba: Un objeto tipo Prestamo | Recibió: un string 'quinientos' | Línea: 45
//calcularMulta('quinientos'); 

// Error 3: TS2353 - Propiedad no declarada en la interfaz
// Esperaba: Propiedades de Prestamo | Recibió: propiedad no permitida 'recargo' | Línea: 49
//const prestamoInvalido: Prestamo = { multa: 200, ejemplar: 1, estado: 'activo', recargo: 20 };