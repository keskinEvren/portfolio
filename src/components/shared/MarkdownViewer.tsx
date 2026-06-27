"use client";

import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

let mermaidInitialized = false;

// Mermaid diagram rendering block
interface MermaidBlockProps {
  code: string;
}

const MermaidBlock: React.FC<MermaidBlockProps> = ({ code }) => {
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const elementId = React.useId().replace(/:/g, ""); // Strip colons for valid HTML/Mermaid ID

  useEffect(() => {
    let isMounted = true;
    const renderDiagram = async () => {
      try {
        const { default: mermaid } = await import("mermaid");

        if (!mermaidInitialized) {
          mermaid.initialize({
            startOnLoad: false,
            theme: "dark",
            securityLevel: "loose",
            themeVariables: {
              background: "transparent",
              primaryColor: "#1e1e2e",
              edgeLabelBackground: "#09090b",
            },
          });
          mermaidInitialized = true;
        }

        const cleanCode = code.trim();
        const { svg: renderedSvg } = await mermaid.render(`mermaid-${elementId}`, cleanCode);
        
        if (isMounted) {
          setSvg(renderedSvg);
          setError(null);
        }
      } catch (err: unknown) {
        // Clean up internal mermaid trash if it appended error elements
        const badEl = document.getElementById(`mermaid-${elementId}`);
        if (badEl) {
          badEl.remove();
        }
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to render Mermaid diagram");
        }
      }
    };

    renderDiagram();

    return () => {
      isMounted = false;
    };
  }, [code, elementId]);

  if (error) {
    return (
      <div className="p-4 my-4 rounded-xl border border-red-500/20 bg-red-950/20 text-red-400 text-xs font-mono overflow-x-auto">
        <p className="font-semibold mb-2">Mermaid Render Error:</p>
        <pre className="whitespace-pre-wrap">{code}</pre>
        <p className="mt-2 text-[10px] opacity-70">{error}</p>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="flex items-center justify-center p-8 border border-white/10 bg-white/5 rounded-xl animate-pulse my-4">
        <span className="text-xs text-white/40">Rendering diagram...</span>
      </div>
    );
  }

  return (
    <div
      className="my-6 p-4 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md flex justify-center items-center overflow-x-auto custom-scrollbar shadow-inner"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

interface MarkdownViewerProps {
  content: string;
  className?: string;
}

export function MarkdownViewer({ content, className }: MarkdownViewerProps) {
  return (
    <div className={`prose prose-invert max-w-none text-white ${className || ""}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const isInline = !match;
            const codeValue = String(children).replace(/\n$/, "");

            if (!isInline && match[1] === "mermaid") {
              return <MermaidBlock code={codeValue} />;
            }

            if (!isInline) {
              return (
                <pre className="p-4 rounded-xl border border-white/10 bg-white/5 font-mono text-xs overflow-x-auto text-white/80 my-4 custom-scrollbar">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              );
            }

            return (
              <code
                className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-xs text-white/90"
                {...props}
              >
                {children}
              </code>
            );
          },
          h1: ({ children }) => (
            <h1 className="text-xl md:text-2xl font-bold text-white mt-6 mb-3 tracking-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg md:text-xl font-semibold text-white/90 mt-5 mb-2.5 border-b border-white/10 pb-1">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base md:text-lg font-medium text-white/85 mt-4 mb-2">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-sm text-white/70 leading-relaxed mb-4 font-light">
              {children}
            </p>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-sm text-white underline hover:text-white/80 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-1.5 mb-4 pl-2 text-sm text-white/70 font-light">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-1.5 mb-4 pl-2 text-sm text-white/70 font-light">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-white/20 pl-4 italic my-4 text-white/60 bg-white/[0.02] py-2 rounded-r-lg">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto w-full custom-scrollbar my-6 rounded-xl border border-white/10 bg-white/[0.02]">
              <table className="w-full border-collapse text-sm text-white/70">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-white/5 text-white font-medium border-b border-white/10">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="p-3 text-left font-semibold border-b border-white/10">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="p-3 font-light border-b border-white/5">
              {children}
            </td>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-white/[0.02] transition-colors">
              {children}
            </tr>
          ),
          hr: () => <hr className="my-6 border-white/10" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
