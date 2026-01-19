/** @vitest-environment jsdom */
import { describe, expect, it, vi } from "vitest";
import { downloadPdf } from "./pdf";

type JsPdfFactory = typeof import("jspdf").jsPDF;

const buildPdfMock = () => ({
  internal: {
    pageSize: {
      getWidth: vi.fn(() => 200),
      getHeight: vi.fn(() => 200),
    },
  },
  addImage: vi.fn(),
  addPage: vi.fn(),
  save: vi.fn(),
});

describe("downloadPdf", () => {
  it("renders canvas and saves a timestamped PDF", async () => {
    const preview = document.createElement("div");
    const canvas = {
      width: 100,
      height: 100,
      toDataURL: vi.fn(() => "data:image/png;base64,stub"),
    } as unknown as HTMLCanvasElement;
    const renderCanvas = vi.fn(async () => canvas);
    const pdfMock = buildPdfMock();
    const createPdf = vi.fn(function () {
      return pdfMock;
    }) as unknown as JsPdfFactory;
    const now = () => new Date(2025, 0, 2, 3, 4, 5);

    await downloadPdf(preview, { renderCanvas, createPdf, now });

    expect(renderCanvas).toHaveBeenCalledWith(preview, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true,
    });
    expect(canvas.toDataURL).toHaveBeenCalledWith("image/png");
    expect(createPdf).toHaveBeenCalledWith({
      orientation: "p",
      unit: "pt",
      format: "a4",
    });
    expect(pdfMock.addImage).toHaveBeenCalledWith(
      "data:image/png;base64,stub",
      "PNG",
      0,
      0,
      200,
      200,
    );
    expect(pdfMock.addPage).not.toHaveBeenCalled();
    expect(pdfMock.save).toHaveBeenCalledWith("invoice-20250102-030405.pdf");
  });

  it("adds pages when the image exceeds a page height", async () => {
    const preview = document.createElement("div");
    const canvas = {
      width: 100,
      height: 400,
      toDataURL: vi.fn(() => "data:image/png;base64,stub"),
    } as unknown as HTMLCanvasElement;
    const renderCanvas = vi.fn(async () => canvas);
    const pdfMock = buildPdfMock();
    const createPdf = vi.fn(function () {
      return pdfMock;
    }) as unknown as JsPdfFactory;
    const saveFile = vi.fn();

    await downloadPdf(preview, {
      renderCanvas,
      createPdf,
      saveFile,
      now: () => new Date(2025, 0, 1, 0, 0, 0),
    });

    expect(pdfMock.addPage).toHaveBeenCalledTimes(3);
    expect(pdfMock.addImage).toHaveBeenCalledTimes(4);
    const positions = pdfMock.addImage.mock.calls.map((call) => call[3]);
    expect(positions).toEqual([0, -200, -400, -600]);
    expect(saveFile).toHaveBeenCalledWith(
      pdfMock,
      "invoice-20250101-000000.pdf",
    );
  });
});
