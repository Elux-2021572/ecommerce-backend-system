import PDFDocument from "pdfkit";
import fs from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Genera un PDF de la factura y lo guarda en el servidor.
 * @param {Object} invoiceData - Datos de la factura.
 * @param {string} invoiceData.id - ID de la factura.
 * @param {string} invoiceData.clientName - Nombre del cliente.
 * @param {string} invoiceData.date - Fecha de la factura.
 * @param {Array} invoiceData.products - Lista de productos.
 * @param {number} invoiceData.total - Total de la factura.
 * @returns {string} - Ruta del archivo PDF generado.
 */
export const generateInvoicePdf = async (invoiceData) => {
    const pdfDoc = new PDFDocument();
    const pdfPath = join(__dirname, `../../public/docs/factura-${invoiceData.id}.pdf`);
    const writeStream = fs.createWriteStream(pdfPath);

    pdfDoc.pipe(writeStream);

    // Encabezado de la factura
    pdfDoc.fontSize(24).text("Factura", { align: "center" });
    pdfDoc.moveDown();

    // Detalles de la factura
    pdfDoc.fontSize(12).text(`Factura ID: ${invoiceData.id}`);
    pdfDoc.text(`Cliente: ${invoiceData.clientName}`);
    pdfDoc.text(`Fecha: ${invoiceData.date}`);
    pdfDoc.moveDown();

    // Lista de productos
    pdfDoc.text("Productos:", { underline: true });
    pdfDoc.moveDown();
    invoiceData.products.forEach((product) => {
        pdfDoc.text(`${product.name} - ${product.quantity} x Q${product.price}`);
    });
    pdfDoc.moveDown();

    // Total
    pdfDoc.text(`Total: Q${invoiceData.total}`, { bold: true });

    pdfDoc.end();

    return new Promise((resolve, reject) => {
        writeStream.on("finish", () => resolve(pdfPath));
        writeStream.on("error", (err) => reject(err));
    });
};