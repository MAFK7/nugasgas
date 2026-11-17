"use client";

import { AnimatePresence, motion, useDragControls, useMotionValue } from "motion/react";
import { useRef, useState, type ReactNode, type RefObject } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { useDesktop, type WindowId } from "./DesktopContext";

type Props = {
  id: WindowId;
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
  tab?: boolean; // judul tampil sebagai tab (gaya Explorer)
  maximizable?: boolean;
  draggable?: boolean;
  dragConstraints?: RefObject<HTMLElement | null>;
  collapseOnClose?: boolean;
};

const ctrl =
  "grid h-9 w-11 place-items-center text-text-2 transition-colors hover:bg-white/10 hover:text-text";
const svgCtrl = {
  width: 12,
  height: 12,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export default function WindowFrame({
  id,
  title,
  icon,
  children,
  className = "",
  tab = false,
  maximizable = false,
  draggable = false,
  dragConstraints,
  collapseOnClose = false,
}: Props) {
  const { closed, close } = useDesktop();
  const [collapsed, setCollapsed] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [lockH, setLockH] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const controls = useDragControls();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const fine = useMediaQuery("(pointer: fine)");

  const isOpen = !closed.includes(id);
  const canDrag = draggable && fine && !maximized;
  const h0 = collapseOnClose ? { height: 0 } : {};

  const toggleMax = () => {
    setLockH(maximized ? null : (wrapRef.current?.offsetHeight ?? null));
    x.set(0);
    y.set(0);
    setCollapsed(false);
    setMaximized((m) => !m);
  };

  const onClose = () => {
    setCollapsed(false);
    setMaximized(false);
    setLockH(null);
    x.set(0);
    y.set(0);
    close(id);
  };

  return (
    <div ref={wrapRef} className={className} style={lockH ? { height: lockH } : undefined}>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={id}
            drag={canDrag}
            dragControls={controls}
            dragListener={false}
            dragMomentum={false}
            dragElastic={0}
            dragConstraints={dragConstraints}
            style={{ x, y }}
            initial={{ opacity: 0, scale: 0.95, ...h0 }}
            animate={{ opacity: 1, scale: 1, ...(collapseOnClose ? { height: "auto" } : {}) }}
            exit={{ opacity: 0, scale: 0.95, ...h0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`mica flex flex-col overflow-hidden rounded-xl ${maximized ? "fixed inset-x-3 bottom-24 top-3 z-40 sm:inset-x-6 sm:top-6" : "relative"
              }`}
          >
            <div
              onPointerDown={(e) => {
                if (canDrag) controls.start(e);
              }}
              onDoubleClick={maximizable ? toggleMax : undefined}
              className={`flex h-9 shrink-0 select-none items-center justify-between bg-black/25 text-xs ${canDrag ? "cursor-grab active:cursor-grabbing" : ""
                }`}
            >
              {tab ? (
                <div className="ml-2 flex h-8 items-center gap-2 self-end rounded-t-lg border-t-2 border-aqua bg-white/[0.06] px-3 text-[13px] text-text">
                  {icon}
                  <span>{title}</span>
                </div>
              ) : (
                <div className="flex min-w-0 items-center gap-2 pl-3 text-text-2">
                  {icon}
                  <span className="truncate font-mono">{title}</span>
                </div>
              )}

              <div
                className="flex h-full"
                onPointerDown={(e) => e.stopPropagation()}
                onDoubleClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  aria-label={collapsed ? "Pulihkan" : "Kecilkan"}
                  onClick={() => setCollapsed((c) => !c)}
                  className={ctrl}
                >
                  <svg {...svgCtrl}>
                    <path d="M5 12h14" />
                  </svg>
                </button>
                {maximizable && (
                  <button
                    type="button"
                    aria-label={maximized ? "Pulihkan ukuran" : "Besarkan"}
                    onClick={toggleMax}
                    className={ctrl}
                  >
                    <svg {...svgCtrl}>
                      {maximized ? (
                        <>
                          <rect x="8" y="4" width="12" height="12" rx="1.5" />
                          <path d="M4 8v11a1 1 0 0 0 1 1h11" />
                        </>
                      ) : (
                        <rect x="5" y="5" width="14" height="14" rx="1.5" />
                      )}
                    </svg>
                  </button>
                )}
                <button
                  type="button"
                  aria-label="Tutup"
                  onClick={onClose}
                  className={`${ctrl} hover:!bg-[#c42b1c] hover:!text-white`}
                >
                  <svg {...svgCtrl}>
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                </button>
              </div>
            </div>

            <motion.div
              initial={false}
              animate={{ height: collapsed ? 0 : "auto", opacity: collapsed ? 0 : 1 }}
              transition={{ duration: 0.18 }}
              className="min-h-0 flex-1 overflow-hidden"
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}