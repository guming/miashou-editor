import TailwindAdvancedEditor from "@/components/tailwind/advanced-editor";
import { Button } from "@/components/tailwind/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/tailwind/ui/dialog";
import Menu from "@/components/tailwind/ui/menu";
import { ScrollArea } from "@/components/tailwind/ui/scroll-area";
import { BookOpen, GithubIcon } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-4 py-4 sm:px-5">
      <Script
        src="https://www.desmos.com/api/v1.8/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"
        strategy="beforeInteractive"
      />
      <Script src="https://unpkg.com/@antonz/runno@0.6.1/dist/runno.js" strategy="beforeInteractive" />
      <Script src="https://unpkg.com/@antonz/codapi@0.19.10/dist/engine/wasi.js" strategy="beforeInteractive" />
      <Script src="https://unpkg.com/@antonz/codapi@0.19.10/dist/snippet.js" strategy="lazyOnload" />
      <Script src="https:////unpkg.com/mathlive" strategy="lazyOnload" />
      <Script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.8/dist/chart.umd.min.js" strategy="beforeInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/d3@7" strategy="beforeInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6" strategy="beforeInteractive" />
      <div className="flex w-full max-w-screen-lg items-center gap-2 px-1 sm:mb-[calc(8vh)]">
        <Button size="icon" variant="outline">
          <a href="https://github.com/guming/ai-editor" target="_blank" rel="noreferrer">
            <GithubIcon />
          </a>
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="ml gap-2">
              <BookOpen className="h-4 w-4" />
              Usage in dialog
            </Button>
          </DialogTrigger>
          <DialogContent className="flex max-w-3xl h-[calc(100vh-24px)]">
            <ScrollArea className="max-h-screen">
              <TailwindAdvancedEditor />
            </ScrollArea>
          </DialogContent>
        </Dialog>
        <Link href="/docs" className="ml-auto">
          <Button variant="ghost">Documentation</Button>
        </Link>
        <Menu />
      </div>

      <TailwindAdvancedEditor />
    </div>
  );
}
