"use client";

import React from "react";
import type { NodeTy } from "@/lib/interpreter";
import { cn } from "@/lib/utils";
import Image from "next/image";

function TextNode({ text }: { text: string }) {
  return <span>{text}</span>;
}

function ListNode({ items }: { items: string[] }) {
  return (
    <ul className={cn("list-inside", "list-disc", "space-y-1")}>
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );
}

function ImageNode({
  src,
  alt,
  width,
  height,
  rounded,
}: {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  rounded?: boolean;
}) {
  const roundedClass = rounded ? "rounded-full" : "rounded-md";
  const w = width ?? 128;
  const h = height ?? 128;
  return (
    <div
      className={cn("overflow-hidden border bg-card", roundedClass)}
      style={{ width: w, height: h }}
    >
      <Image
        src={src}
        alt={alt ?? ""}
        width={w}
        height={h}
        className={cn("object-cover w-full h-full", roundedClass)}
      />
    </div>
  );
}

function GridNode({
  base = 1,
  sm,
  md,
  lg,
  xl,
  mdTemplate,
  gap = 4,
  children,
}: {
  base?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  mdTemplate?: "auto_1fr" | "1fr_auto";
  gap?: number;
  children: React.ReactNode;
}) {
  const gapClass =
    {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      6: "gap-6",
      8: "gap-8",
    }[(gap ?? 4) as 0 | 1 | 2 | 3 | 4 | 6 | 8] || "gap-4";

  const baseCols =
    {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
    }[(base ?? 1) as 1 | 2 | 3 | 4] || "grid-cols-1";

  const smCols =
    sm &&
    {
      1: "sm:grid-cols-1",
      2: "sm:grid-cols-2",
      3: "sm:grid-cols-3",
      4: "sm:grid-cols-4",
    }[sm as 1 | 2 | 3 | 4];

  const mdCols =
    md &&
    {
      1: "md:grid-cols-1",
      2: "md:grid-cols-2",
      3: "md:grid-cols-3",
      4: "md:grid-cols-4",
    }[md as 1 | 2 | 3 | 4];

  const lgCols =
    lg &&
    {
      1: "lg:grid-cols-1",
      2: "lg:grid-cols-2",
      3: "lg:grid-cols-3",
      4: "lg:grid-cols-4",
    }[lg as 1 | 2 | 3 | 4];

  const xlCols =
    xl &&
    {
      1: "xl:grid-cols-1",
      2: "xl:grid-cols-2",
      3: "xl:grid-cols-3",
      4: "xl:grid-cols-4",
    }[xl as 1 | 2 | 3 | 4];

  const templateMd =
    mdTemplate === "auto_1fr"
      ? "md:[grid-template-columns:auto_1fr]"
      : mdTemplate === "1fr_auto"
      ? "md:[grid-template-columns:1fr_auto]"
      : undefined;

  const colClass = cn(
    "grid",
    gapClass,
    baseCols,
    smCols,
    mdCols,
    lgCols,
    xlCols,
    templateMd
  );
  return <div className={colClass}>{children}</div>;
}

export function RenderNode({ node }: { node: NodeTy }) {
  if ("text" in node) return <TextNode text={node.text} />;

  const name = node.name;
  const attrs = node.attrs ?? {};
  const renderedChildren = (node.children ?? []).map((c, i) => (
    <RenderNode key={i} node={c} />
  ));
  switch (name) {
    case "Grid":
      return (
        <GridNode
          base={(attrs.base as number) ?? 1}
          sm={attrs.sm as number | undefined}
          md={attrs.md as number | undefined}
          lg={attrs.lg as number | undefined}
          xl={attrs.xl as number | undefined}
          mdTemplate={
            attrs.mdTemplate === "auto_1fr" || attrs.mdTemplate === "1fr_auto"
              ? (attrs.mdTemplate as "auto_1fr" | "1fr_auto")
              : undefined
          }
          gap={(attrs.gap as number) ?? 4}
        >
          {renderedChildren}
        </GridNode>
      );
    case "VStack":
      return (
        <div
          className={cn(
            "flex flex-col",
            { 1: "gap-1", 2: "gap-2", 3: "gap-3", 4: "gap-4" }[
              (attrs.gap as number) ?? 2
            ] || "gap-2"
          )}
        >
          {renderedChildren}
        </div>
      );
    case "HStack":
      return (
        <div
          className={cn(
            "flex flex-row",
            { 1: "gap-1", 2: "gap-2", 3: "gap-3", 4: "gap-4" }[
              (attrs.gap as number) ?? 2
            ] || "gap-2"
          )}
        >
          {renderedChildren}
        </div>
      );
    case "Image":
      return (
        <ImageNode
          src={String(attrs.src ?? "")}
          alt={(attrs.alt as string) ?? ""}
        />
      );
    case "Text": {
      const textContent = (node.children ?? [])
        .map((c) => ("text" in c ? c.text : ""))
        .join("");
      return <TextNode text={textContent} />;
    }
    case "List": {
      const items = (node.children ?? [])
        .filter((c) => "text" in c)
        .map((c) => (c as { text: string }).text);
      return <ListNode items={items} />;
    }
    default:
      return <pre>{JSON.stringify(node, null, 2)}</pre>;
  }
}

export function ShellRenderer({ nodes }: { nodes: NodeTy[] }) {
  return (
    <div className="w-full space-y-2 font-sans">
      {nodes.map((n, i) => (
        <RenderNode key={i} node={n} />
      ))}
    </div>
  );
}
