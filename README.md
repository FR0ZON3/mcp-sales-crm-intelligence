# MCP Sales CRM Intelligence

<<<<<<< HEAD
**$130K/year wasted on manual sales analysis.**

# MCP Sales CRM Intelligence

Starter project integrating GitHub and Apify MCP servers for sales CRM intelligence workflows.

Try it:

```bash
node src/mcpClient.js
```

---

## Overview

**$130K/year wasted on manual sales analysis.**

This repository contains a starter project integrating GitHub and Apify MCP servers to build automated sales intelligence workflows. Use it to ingest sales exports, run web enrichment (Apify actors), and produce actionable CRM insights.

## Solution Overview

1. Ingest CSV exports from your sales platform into /data.
2. Run the provided Node.js scripts to call Apify actors for enrichment (company lookup, firmographic data).
3. Store enriched rows in SQLite and analyze with the provided SQL examples.

## Demo Video

Link to a short demo video showing the workflow (TBD).

## ROI Calculator

Estimate your ROI by plugging in average deal size, conversion lift, and time saved from automation.

## Quick Start

Install dependencies:

```bash
npm install
```

Initialize the local database and sample data:

```bash
npm run init-db
```

Run the MCP server dry-run to validate configuration:

```bash
node src/mcpClient.js
```

## Example Queries

SELECT top 10 accounts by ARR

## Technical Architecture

This project uses a dual-MCP setup:

- GitHub MCP (local) for repository operations and code pushes.
- Apify MCP (remote) for actor execution and scraping workflows.

## Use Cases

- Enrich leads with web-scraped firmographics
- Automate lead scoring using scraped signals

## Contact

Contact: team@example.com

