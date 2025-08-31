"use client";

import React from "react";
import type { NodeTy } from "@/lib/interpreter";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useShell } from "@/components/shell-provider";
import { FileText, Github, Link, Video } from "lucide-react";

function TextNode({
  text,
  variant,
  size,
  weight,
}: {
  text: string;
  variant?: string;
  size?: string;
  weight?: string | boolean;
}) {
  const variantClass =
    variant === "muted" ? "text-muted-foreground" : undefined;
  const sizeClass =
    size === "sm"
      ? "text-sm"
      : size === "lg"
      ? "text-lg"
      : size === "xl"
      ? "text-xl"
      : undefined;
  const weightClass =
    weight === "bold" || weight === true
      ? "font-bold"
      : weight === "semibold"
      ? "font-semibold"
      : weight === "medium"
      ? "font-medium"
      : undefined;
  return (
    <span
      className={cn(
        "whitespace-pre-wrap leading-6",
        variantClass,
        sizeClass,
        weightClass
      )}
    >
      {text}
    </span>
  );
}

function ListNode({ nodes }: { nodes: NodeTy[] }) {
  return (
    <ul className="list-disc ml-5 space-y-1 leading-6">
      {nodes.map((child, idx) => (
        <li key={idx}>
          {"text" in child ? child.text : <RenderNode node={child} />}
        </li>
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

function LinkNode({
  href,
  label,
  icon,
}: {
  href: string;
  label?: string;
  icon?: string;
}) {
  const IconComp =
    icon === "github"
      ? Github
      : icon === "paper"
      ? FileText
      : icon === "video"
      ? Video
      : Link;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 border rounded-sm text-xs",
        "hover:bg-muted/40 transition-colors"
      )}
    >
      <IconComp className="h-3.5 w-3.5" />
      <span>{label ?? href}</span>
    </a>
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
  const shell = useShell();
  if ("text" in node) return <TextNode text={node.text} />;

  const name = node.name;
  const attrs = node.attrs ?? {};
  const renderedChildren = (node.children ?? []).map((c, i) => (
    <RenderNode key={i} node={c} />
  ));
  switch (name) {
    case "Card": {
      return (
        <div className="rounded-md border border-border bg-transparent p-3 md:p-4">
          {renderedChildren}
        </div>
      );
    }
    case "Heading": {
      const level = (attrs.level as number) ?? 3;
      const align = (attrs.align as string) ?? "left";
      const sizeClass =
        level === 1
          ? "text-xl md:text-2xl"
          : level === 2
          ? "text-lg md:text-xl"
          : level === 3
          ? "text-base md:text-lg"
          : "text-base";
      const alignClass =
        align === "center"
          ? "text-center"
          : align === "right"
          ? "text-right"
          : "text-left";
      const textContent = (node.children ?? [])
        .map((c) => ("text" in c ? c.text : ""))
        .join("");
      return (
        <div
          className={cn("font-semibold tracking-tight", sizeClass, alignClass)}
        >
          {textContent}
        </div>
      );
    }
    // Muted/Small are no longer separate nodes; use Text variant/size attrs instead
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
    case "Link": {
      const label = (node.children ?? [])
        .map((c) => ("text" in c ? c.text : ""))
        .join("");
      return (
        <LinkNode
          href={String(attrs.href ?? "#")}
          label={label}
          icon={attrs.icon as string | undefined}
        />
      );
    }
    case "Cmd": {
      const label = (node.children ?? [])
        .map((c) => ("text" in c ? c.text : ""))
        .join("");
      const cmdAttr = attrs.cmd as string | undefined;
      const cmd = String(cmdAttr ?? label);
      return (
        <button
          type="button"
          onClick={() => shell.run(cmd)}
          className={cn(
            "inline-flex items-center px-2 py-0.5 border rounded-sm text-sm",
            "hover:bg-muted/40 transition-colors"
          )}
        >
          {label || cmd}
        </button>
      );
    }
    case "Text": {
      const textContent = (node.children ?? [])
        .map((c) => ("text" in c ? c.text : ""))
        .join("");
      return (
        <TextNode
          text={textContent}
          variant={attrs.variant as string | undefined}
          size={attrs.size as string | undefined}
          weight={attrs.weight as string | boolean | undefined}
        />
      );
    }
    case "List": {
      return <ListNode nodes={node.children ?? []} />;
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
