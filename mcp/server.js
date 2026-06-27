import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { 
  ListResourcesRequestSchema, 
  ReadResourceRequestSchema,
  ListToolsRequestSchema,
  CallToolRequestSchema 
} from "@modelcontextprotocol/sdk/types.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import * as yaml from "js-yaml";
import express from "express";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOC_DIR = path.resolve(__dirname, "../doc");

const server = new Server(
  {
    name: "zeppos-doc-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  }
);

// Helper to parse frontmatter
async function getFileMetadata(filePath) {
  const content = await fs.readFile(filePath, "utf-8");
  // Robust regex: matches --- followed by any whitespace/newlines, then capture until ---
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  
  if (match) {
    try {
      const data = yaml.load(match[1]);
      return {
        description: data.description || `Documentation file: ${path.basename(filePath)}`
      };
    } catch (e) {
      console.error(`Error parsing YAML for ${filePath}:`, e);
    }
  }
  return { description: `Documentation file: ${path.basename(filePath)}` };
}

server.setRequestHandler(ListResourcesRequestSchema, async () => {
  const files = await fs.readdir(DOC_DIR);
  const markdownFiles = files.filter((file) => file.endsWith(".md"));
  
  const resources = [];
  for (const file of markdownFiles) {
    const filePath = path.join(DOC_DIR, file);
    const metadata = await getFileMetadata(filePath);
    
    resources.push({
      uri: `file://${filePath}`,
      name: file,
      description: metadata.description,
      mimeType: "text/markdown",
    });
  }
  return { resources };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;
  const filePath = uri.replace("file://", "");
  
  // Security check: path must be inside DOC_DIR
  if (!filePath.startsWith(DOC_DIR)) {
    throw new Error("Access denied: File is outside the documentation directory.");
  }
  
  const content = await fs.readFile(filePath, "utf-8");
  return {
    contents: [{
      uri,
      mimeType: "text/markdown",
      text: content,
    }],
  };
});

// Tool: list_files
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "search_docs",
        description: "Search for a keyword within all documentation files.",
        inputSchema: {
          type: "object",
          properties: {
            keyword: { type: "string", description: "The keyword to search for" },
          },
          required: ["keyword"],
        },
      },
      {
        name: "list_files",
        description: "List all available documentation files with their full paths.",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "search_docs") {
    const keyword = request.params.arguments.keyword;
    const files = await fs.readdir(DOC_DIR);
    const markdownFiles = files.filter((file) => file.endsWith(".md"));
    
    const results = [];
    
    for (const file of markdownFiles) {
      const filePath = path.join(DOC_DIR, file);
      const content = await fs.readFile(filePath, "utf-8");
      
      if (content.includes(keyword)) {
        results.push(`Found in ${file}`);
      }
    }
    
    return {
      content: [{ type: "text", text: results.length > 0 ? results.join("\n") : "No results found." }],
    };
  }
  
  if (request.params.name === "list_files") {
    const files = await fs.readdir(DOC_DIR);
    const markdownFiles = files.filter((file) => file.endsWith(".md"));
    
    const fileList = [];
    for (const file of markdownFiles) {
      const filePath = path.join(DOC_DIR, file);
      const metadata = await getFileMetadata(filePath);
      fileList.push(`File: ${filePath}\nDescription: ${metadata.description}`);
    }
    
    return {
      content: [{ type: "text", text: fileList.length > 0 ? fileList.join("\n\n") : "No documentation files found." }],
    };
  }
  
  throw new Error(`Tool not found: ${request.params.name}`);
});

const app = express();
let transport;

app.get("/sse", async (req, res) => {
  transport = new SSEServerTransport("/messages", res);
  await server.connect(transport);
});

app.post("/messages", async (req, res) => {
  await transport.handlePostMessage(req, res);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.error(`ZeppOS Documentation MCP Server started successfully on port ${PORT}.`);
  console.error(`Documentation directory: ${DOC_DIR}`);
  console.error(`SSE endpoint available at http://localhost:${PORT}/sse`);
});

