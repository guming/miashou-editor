import { defineConfig, Options } from "tsup";

export default defineConfig((options: Options) => ({
  entry: {
    index: "src/components/index.ts",
    extensions: "src/extensions/index.ts",
    plugins: "src/plugins/index.ts",
    utils: "src/utils/index.ts",
  },
  banner: {
    js: "'use client'",
  },
  minify: true,
  // esbuildPlugins: [
  //   esbuildCommonjs(), // 处理 CommonJS 模块
  // ],

  format: ["cjs", "esm"],
  dts: true,
  clean: true,

  external: ["react", "react-dom","@excalidraw/excalidraw","desmos","mermaid"],
  ...options,
}));
