import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "./generated/prisma/client";

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.cliente.deleteMany();

  await prisma.cliente.createMany({
    data: [
      { nombre: "Romel Saavedra", fecha: new Date("2026-11-13"), createdAt: new Date() },
      { nombre: "Marden Tuesta", fecha: new Date("2026-10-15"), createdAt: new Date() },
      { nombre: "Luisa Gomez", fecha: new Date("2026-12-09"), createdAt: new Date() },
      { nombre: "Carlos Perez", fecha: new Date("2026-09-20"), createdAt: new Date() },
      { nombre: "Ana Martinez", fecha: new Date("2026-11-10"), createdAt: new Date() },
      { nombre: "Javier Rodriguez", fecha: new Date("2026-10-25"), createdAt: new Date() },
    ],
  });

  await prisma.pago.deleteMany();
  await prisma.membresia.deleteMany();
  await prisma.socio.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.rol.deleteMany();
  await prisma.plan.deleteMany();

  await prisma.rol.createMany({
    data: [
      { nombre: "Administrador" },
      { nombre: "Recepcionista" },
    ],
  });

  const rolAdministrador = await prisma.rol.findUniqueOrThrow({
    where: { nombre: "Administrador" },
  });
  const rolRecepcionista = await prisma.rol.findUniqueOrThrow({
    where: { nombre: "Recepcionista" },
  });

  await prisma.usuario.createMany({
    data: [
      { rolId: rolAdministrador.id },
      { rolId: rolRecepcionista.id },
    ],
  });

  const usuarios = await prisma.usuario.findMany({
    orderBy: { id: "asc" },
  });

  await prisma.plan.createMany({
    data: [
      { nombre: "Mensual", precio: "50000.00", duracionDias: 30, activo: true },
      { nombre: "Trimestral", precio: "135000.00", duracionDias: 90, activo: true },
      { nombre: "Anual", precio: "480000.00", duracionDias: 365, activo: true },
    ],
  });

  const planes = await prisma.plan.findMany({
    orderBy: { id: "asc" },
  });

  await prisma.socio.createMany({ data: [{}, {}, {}] });
  const socios = await prisma.socio.findMany({
    orderBy: { id: "asc" },
  });

  await prisma.membresia.createMany({
    data: [
      {
        socioId: socios[0].id,
        planId: planes[0].id,
        fechaInicio: new Date("2026-11-01"),
        fechaFin: new Date("2026-12-01"),
        precioPagado: "50000.00",
      },
      {
        socioId: socios[1].id,
        planId: planes[1].id,
        fechaInicio: new Date("2026-10-01"),
        fechaFin: new Date("2026-12-30"),
        precioPagado: "135000.00",
      },
      {
        socioId: socios[2].id,
        planId: planes[2].id,
        fechaInicio: new Date("2026-01-01"),
        fechaFin: new Date("2027-01-01"),
        precioPagado: "480000.00",
      },
    ],
  });

  const membresias = await prisma.membresia.findMany({
    orderBy: { id: "asc" },
  });

  await prisma.pago.createMany({
    data: [
      {
        socioId: socios[0].id,
        membresiaId: membresias[0].id,
        monto: "50000.00",
        metodo: "EFECTIVO",
        estado: "REGISTRADO",
        registradoPorId: usuarios[0].id,
      },
      {
        socioId: socios[1].id,
        membresiaId: membresias[1].id,
        monto: "135000.00",
        metodo: "TRANSFERENCIA",
        estado: "REGISTRADO",
        registradoPorId: usuarios[1].id,
      },
      {
        socioId: socios[2].id,
        membresiaId: membresias[2].id,
        monto: "480000.00",
        metodo: "TARJETA",
        estado: "REGISTRADO",
        registradoPorId: usuarios[0].id,
      },
    ],
  });

  console.log("Datos iniciales insertados correctamente.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
