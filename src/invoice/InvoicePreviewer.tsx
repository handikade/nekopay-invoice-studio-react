import { Box, Typography } from "@mui/material";
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type TouchEvent,
  type WheelEvent,
} from "react";
import Draggable from "react-draggable";

const DEFAULT_TEMPLATE_WIDTH = 816;
const DEFAULT_MIN_ZOOM = 0.5;
const DEFAULT_MAX_ZOOM = 2.5;
const DEFAULT_ZOOM_SENSITIVITY = 0.0015;

type InvoicePreviewerProps = {
  children: ReactNode;
  templateWidth?: number;
  minZoom?: number;
  maxZoom?: number;
  zoomSensitivity?: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const InvoicePreviewer = ({
  children,
  templateWidth = DEFAULT_TEMPLATE_WIDTH,
  minZoom = DEFAULT_MIN_ZOOM,
  maxZoom = DEFAULT_MAX_ZOOM,
  zoomSensitivity = DEFAULT_ZOOM_SENSITIVITY,
}: InvoicePreviewerProps) => {
  const [zoom, setZoom] = useState(0.65);
  const [contentHeight, setContentHeight] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<HTMLDivElement>(null);
  const lastPinchDistanceRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    const element = contentRef.current;
    if (!element) {
      return;
    }

    const updateHeight = () => {
      setContentHeight(element.offsetHeight);
    };

    updateHeight();

    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(() => updateHeight());
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const handleWheel = useCallback(
    (event: WheelEvent<HTMLDivElement>) => {
      if (event.deltaY === 0) {
        return;
      }

      event.stopPropagation();
      event.preventDefault();
      const delta = -event.deltaY * zoomSensitivity;
      setZoom((current) => clamp(current + delta, minZoom, maxZoom));
    },
    [maxZoom, minZoom, zoomSensitivity],
  );

  const handleTouchStart = useCallback((event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 2) {
      const first = event.touches.item(0);
      const second = event.touches.item(1);
      if (!first || !second) {
        return;
      }
      lastPinchDistanceRef.current = Math.hypot(
        first.clientX - second.clientX,
        first.clientY - second.clientY,
      );
    }
  }, []);

  const handleTouchMove = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      if (event.touches.length !== 2) {
        lastPinchDistanceRef.current = null;
        return;
      }

      const first = event.touches.item(0);
      const second = event.touches.item(1);
      if (!first || !second) {
        return;
      }

      const distance = Math.hypot(
        first.clientX - second.clientX,
        first.clientY - second.clientY,
      );
      const lastDistance = lastPinchDistanceRef.current;

      if (lastDistance) {
        const scaleChange = distance / lastDistance;
        setZoom((current) => clamp(current * scaleChange, minZoom, maxZoom));
      }

      lastPinchDistanceRef.current = distance;
      event.preventDefault();
    },
    [maxZoom, minZoom],
  );

  const handleTouchEnd = useCallback((event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length < 2) {
      lastPinchDistanceRef.current = null;
    }
  }, []);

  const scaledWidth = templateWidth * zoom;
  const scaledHeight = contentHeight > 0 ? contentHeight * zoom : undefined;

  return (
    <Box
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      sx={{
        position: "relative",
        overflow: "auto",
        overscrollBehavior: "contain",
        width: "100%",
        touchAction: "pan-x pan-y",
        height: "720px",
        cursor: isDragging ? "grabbing" : "grab",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,

          backgroundColor: "#ffffff",
          opacity: "1",
          background: `
            radial-gradient(
              circle, transparent 20%, #eee 20%, #eee 80%, transparent 80%, transparent
            ),
            radial-gradient(
              circle, transparent 20%, #eee 20%, #eee 80%, transparent 80%, transparent
            ) 20px 20px,
            linear-gradient(#ccc 1.6px, transparent 1.6px) 0 -0.8px,
            linear-gradient(90deg, #ccc 1.6px, #eee 1.6px) -0.8px 0
          `,
          backgroundSize: "40px 40px, 40px 40px, 20px 20px, 20px 20px",

          zIndex: 0,
        },
      }}
    >
      <Typography
        variant="caption"
        sx={{
          position: "sticky",
          top: 8,
          left: 8,
          display: "inline-flex",
          alignItems: "center",
          alignSelf: "flex-start",
          px: 1,
          py: 0.5,
          borderRadius: 1,
          bgcolor: "rgba(255, 255, 255, 0.85)",
          color: "text.primary",
          zIndex: 1,
          width: "fit-content",
          mb: 1,
        }}
      >
        Zoom: {Math.round(zoom * 100)}%
      </Typography>
      <Draggable
        nodeRef={draggableRef}
        onStart={() => setIsDragging(true)}
        onStop={() => setIsDragging(false)}
      >
        <Box
          ref={draggableRef}
          data-invoice-preview-wrapper="true"
          sx={{
            width: scaledWidth,
            height: scaledHeight ?? "auto",
            mx: "auto",
            overflow: "hidden",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            ref={contentRef}
            data-invoice-preview-content="true"
            sx={{
              width: templateWidth,
              transform: `scale(${zoom})`,
              transformOrigin: "top left",
            }}
          >
            {children}
          </Box>
        </Box>
      </Draggable>
    </Box>
  );
};

export default InvoicePreviewer;
