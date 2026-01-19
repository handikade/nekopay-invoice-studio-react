import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const formatTimestamp = (date: Date) => {
  const pad = (value: number) => String(value).padStart(2, "0");
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
    "-",
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds()),
  ].join("");
};

type CanvasRenderer = typeof html2canvas;
type PdfFactory = typeof jsPDF;

type DownloadInvoicePdfOptions = {
  renderCanvas?: CanvasRenderer;
  createPdf?: PdfFactory;
  now?: () => Date;
  saveFile?: (pdf: InstanceType<PdfFactory>, filename: string) => void;
};

export const downloadPdf = async (
  previewElement: HTMLElement,
  options: DownloadInvoicePdfOptions = {},
) => {
  const renderCanvas = options.renderCanvas ?? html2canvas;
  const createPdf = options.createPdf ?? jsPDF;
  const now = options.now ?? (() => new Date());
  const saveFile = options.saveFile ?? ((pdf, filename) => pdf.save(filename));

  const canvas = await renderCanvas(previewElement, {
    backgroundColor: "#ffffff",
    scale: 2,
    useCORS: true,
  });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new createPdf({ orientation: "p", unit: "pt", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * pageWidth) / canvas.width;

  let remainingHeight = imgHeight;
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  remainingHeight -= pageHeight;

  while (remainingHeight > 0) {
    position -= pageHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    remainingHeight -= pageHeight;
  }

  const timestamp = formatTimestamp(now());
  saveFile(pdf, `invoice-${timestamp}.pdf`);
};
