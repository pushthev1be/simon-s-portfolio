import React, { useState } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

type Client = 'claude-code' | 'claude-desktop' | 'gemini' | 'codex';
const CLIENTS: { id: Client; label: string }[] = [
  { id: 'claude-code', label: 'Claude Code' },
  { id: 'claude-desktop', label: 'Claude Desktop' },
  { id: 'gemini', label: 'Gemini CLI' },
  { id: 'codex', label: 'Codex CLI' },
];

const BLENDER_CONFIG: Record<Client, { where: string; code: string; note?: string }> = {
  'claude-code': {
    where: 'Run in any terminal:',
    code: 'claude mcp add --scope user blender -- uvx mcp-for-blender',
    note: 'Then start Claude Code and type /mcp to check that "blender" is connected.',
  },
  'claude-desktop': {
    where: 'Settings → Developer → Edit Config opens claude_desktop_config.json. Add:',
    code: `{
  "mcpServers": {
    "blender": {
      "command": "uvx",
      "args": ["mcp-for-blender"]
    }
  }
}`,
    note: 'Quit Claude Desktop fully (system tray too) and reopen it.',
  },
  gemini: {
    where: 'Edit ~/.gemini/settings.json (Windows: %USERPROFILE%\\.gemini\\settings.json) and add:',
    code: `{
  "mcpServers": {
    "blender": {
      "command": "uvx",
      "args": ["mcp-for-blender"]
    }
  }
}`,
    note: 'Restart Gemini CLI and type /mcp to see the Blender tools.',
  },
  codex: {
    where: 'Edit ~/.codex/config.toml (Windows: %USERPROFILE%\\.codex\\config.toml) and add:',
    code: `[mcp_servers.blender]
command = "uvx"
args = ["mcp-for-blender"]`,
    note: 'Restart Codex. In the TUI, /mcp lists connected servers.',
  },
};

// Exactly what Studio shows under MCP Servers → Setup instructions (JSON / TOML need the backslashes doubled).
const ROBLOX_ARGS = String.raw`"/c", "cd /d %LOCALAPPDATA%\\Roblox && .\\mcp.bat"`;
const ROBLOX_JSON = `{
  "mcpServers": {
    "Roblox_Studio": {
      "command": "cmd.exe",
      "args": [${ROBLOX_ARGS}]
    }
  }
}`;
const ROBLOX_CONFIG: Record<Client, string> = {
  'claude-code': String.raw`claude mcp add --scope user Roblox_Studio -- cmd.exe /c "cd /d %LOCALAPPDATA%\Roblox && .\mcp.bat"`,
  'claude-desktop': ROBLOX_JSON,
  gemini: ROBLOX_JSON,
  codex: `[mcp_servers.Roblox_Studio]
command = "cmd.exe"
args = [${ROBLOX_ARGS}]`,
};

const SETUP_PROMPT = `Set up MCP for Blender for me so you can control Blender directly. Work step by step, run the commands yourself, and tell me before anything needs my hands.

1. Detect my OS. Check whether "uv" is installed (run: uv --version). If not, install it:
   - Windows (PowerShell): powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
   - macOS / Linux: curl -LsSf https://astral.sh/uv/install.sh | sh
   Then open a fresh shell (or use the full path to uvx) so the new PATH is picked up.
2. Check Blender is installed (version 3.0 or newer) and tell me which version you found.
3. Run: uvx mcp-for-blender setup --dry-run
   Show me what it found, then run it for real: uvx mcp-for-blender setup
   This installs and enables the Blender addon and registers the "blender" MCP server with the clients it detects.
4. If you are a client that setup did not configure (for example Gemini CLI or Codex), add the server to your own config yourself:
   command "uvx", args ["mcp-for-blender"], server name "blender".
5. Tell me to open Blender, press N in the 3D viewport and open the "MCP for Blender" tab. It should say "Connected on port 9876"; if it says "Not connected", I click "Connect to MCP server".
6. Tell me how to restart / reconnect you so the new server loads, then call the Blender tools to read the scene and confirm it works.

If anything fails, show me the exact error and fix it before moving on.`;

const ROBLOX_PROMPT = `Connect yourself to Roblox Studio over MCP.

1. I have Roblox Studio open with "Enable Studio as MCP server" switched on (Assistant panel → settings icon → MCP Servers). Check that this file exists: %LOCALAPPDATA%\\Roblox\\mcp.bat (Windows). If it does not, stop and tell me to switch that setting on.
2. Register a stdio MCP server named "Roblox_Studio" in your own config that runs:
   cmd.exe /c "cd /d %LOCALAPPDATA%\\Roblox && .\\mcp.bat"
   (On a Mac, copy the command from Studio: MCP Servers → Setup instructions → Startup Command.)
3. Tell me how to restart / reconnect you, then list the open Studio sessions to prove it works.`;

const TEST_PROMPTS = [
  'Read the Blender scene and tell me what objects are in it.',
  'Add a low-poly katana: a thin curved blade, a square guard and a wrapped handle. Then show me a screenshot.',
  'Light the scene with a three-point setup and render a 1280x720 image to my desktop.',
  'In Roblox Studio, list the scripts in ServerScriptService and tell me what each one does.',
];

const label: React.CSSProperties = { fontSize: 10, fontWeight: 800, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#16a34a', marginBottom: 12 };
const h2: React.CSSProperties = { fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(26px,3.4vw,36px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 14 };
const body: React.CSSProperties = { fontSize: 13, color: '#444', lineHeight: 1.75 };

const Code: React.FC<{ code: string; title?: string }> = ({ code, title }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }).catch(() => {});
  };
  return (
    <div style={{ border: '1px solid #1f1f1f', background: '#0a0a0a', margin: '12px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', borderBottom: '1px solid #1f1f1f' }}>
        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#777' }}>{title ?? 'Copy'}</span>
        <button onClick={copy} style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: copied ? '#22c55e' : '#bbb', padding: '4px 8px', border: '1px solid #333' }}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre style={{ margin: 0, padding: '14px 16px', overflowX: 'auto', fontSize: 12, lineHeight: 1.65, color: '#e5e5e5', fontFamily: 'var(--mono)', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{code}</pre>
    </div>
  );
};

/** A screenshot from the real apps. Click to open it full size. */
const Shot: React.FC<{ src: string; alt: string; caption?: string; maxWidth?: number }> = ({ src, alt, caption, maxWidth }) => (
  <figure style={{ margin: '14px 0', maxWidth }}>
    <a href={src} target="_blank" rel="noopener noreferrer" title="Open full size">
      <img src={src} alt={alt} loading="lazy" style={{ width: '100%', display: 'block', border: '1px solid #e2e2e2' }} />
    </a>
    {caption && <figcaption style={{ fontSize: 11, color: '#888', marginTop: 6, lineHeight: 1.5 }}>{caption}</figcaption>}
  </figure>
);

const Step: React.FC<{ n: number; title: string; children: React.ReactNode }> = ({ n, title, children }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: 12, padding: '22px 0', borderTop: '1px solid #eee' }}>
    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 800, color: '#16a34a' }}>{String(n).padStart(2, '0')}</div>
    <div style={{ minWidth: 0 }}>
      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 19, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8 }}>{title}</h3>
      <div style={body}>{children}</div>
    </div>
  </div>
);

const Tabs: React.FC<{ value: Client; onChange: (c: Client) => void }> = ({ value, onChange }) => (
  <div role="tablist" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '6px 0 4px' }}>
    {CLIENTS.map(c => (
      <button key={c.id} role="tab" aria-selected={value === c.id} className={`pill${value === c.id ? ' active' : ''}`} onClick={() => onChange(c.id)}>{c.label}</button>
    ))}
  </div>
);

const kbd: React.CSSProperties = { border: '1px solid #ddd', borderBottomWidth: 2, padding: '1px 6px', fontSize: 11, background: '#fafafa' };
const inline: React.CSSProperties = { background: '#f4f4f4', padding: '1px 6px', fontSize: 12 };

const McpSetupPage: React.FC = () => {
  const isMobile = useIsMobile();
  const [client, setClient] = useState<Client>('claude-code');
  const cfg = BLENDER_CONFIG[client];

  return (
    <main style={{ padding: isMobile ? '104px 20px 80px' : '128px 48px 112px', minHeight: '70vh' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        <a href="/" style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#999' }}>← Back to home</a>

        <header style={{ padding: '28px 0 28px', borderBottom: '1px solid #e8e8e8', marginBottom: 12 }}>
          <div style={label}>Guide</div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(38px,6vw,64px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>Blender + Roblox Studio MCP setup</h1>
          <p style={{ ...body, marginTop: 18, maxWidth: 680 }}>
            MCP lets an AI agent drive Blender and Roblox Studio directly: build and edit models, rig, animate, render, read and write scripts.
            It is how I build most of the work in my <a href="/#3d" style={{ color: '#16a34a', fontWeight: 700 }}>3D section</a>.
            This page sets it up for Claude Code, Claude Desktop, Gemini CLI and Codex CLI. The quickest route is to copy the prompt below into your agent and let it do the setup for you.
          </p>
        </header>

        {/* Fast path */}
        <section style={{ padding: '36px 0', borderBottom: '1px solid #e8e8e8' }}>
          <div style={label}>Fastest way</div>
          <h2 style={h2}>Paste this into your agent</h2>
          <p style={body}>
            Works in agents that can run commands on your computer: Claude Code, Gemini CLI and Codex CLI. In Claude Desktop, follow the manual steps instead.
          </p>
          <Code code={SETUP_PROMPT} title="Setup prompt · Blender" />
          <Code code={ROBLOX_PROMPT} title="Setup prompt · Roblox Studio (optional)" />
        </section>

        {/* Blender manual */}
        <section style={{ padding: '36px 0 12px', borderBottom: '1px solid #e8e8e8' }}>
          <div style={label}>Manual setup</div>
          <h2 style={h2}>Blender MCP, step by step</h2>

          <Step n={1} title="Install what you need">
            <p><a href="https://www.blender.org/download/" target="_blank" rel="noopener noreferrer" style={{ color: '#16a34a', fontWeight: 700 }}>Blender</a> 3.0 or newer, and <b>uv</b>, the Python tool runner that downloads and runs the MCP server for you (no separate Python install needed).</p>
            <Code title="Windows · PowerShell" code={'powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"'} />
            <Code title="macOS / Linux" code={'curl -LsSf https://astral.sh/uv/install.sh | sh'} />
            <p>Close and reopen your terminal afterwards so <span style={inline}>uvx</span> is on your PATH.</p>
          </Step>

          <Step n={2} title="Install the addon and register the server">
            <p>One command installs the Blender addon, switches it on, and adds the server to every client it can find (Claude Desktop, Claude Code, Cursor, VS Code and others). Try <span style={inline}>--dry-run</span> first to see what it will change.</p>
            <Code title="Terminal" code={'uvx mcp-for-blender setup --dry-run\nuvx mcp-for-blender setup'} />
            <p>Older guides call the package <span style={inline}>blender-mcp</span>. That name still works, and setup moves old configs over to the new one.</p>
          </Step>

          <Step n={3} title="Add it to your client by hand (if setup skipped it)">
            <p>Gemini CLI and Codex usually need this step. Pick your client:</p>
            <Tabs value={client} onChange={setClient} />
            <p style={{ marginTop: 10 }}>{cfg.where}</p>
            <Code title={CLIENTS.find(c => c.id === client)!.label} code={cfg.code} />
            {cfg.note && <p>{cfg.note}</p>}
          </Step>

          <Step n={4} title="Press N in Blender to check it's connected">
            <p>
              Open Blender, hover over the 3D viewport and press <span style={kbd}>N</span> to open the sidebar. Click the <b>MCP for Blender</b> tab on its right edge.
              The server starts by itself when Blender opens, so you should see <b>Connected on port 9876</b>.
            </p>
            <Shot src="/mcp/blender-sidebar.jpg" alt="Blender with the N sidebar open on the MCP for Blender tab, showing Connected on port 9876" caption="N opens the sidebar. MCP for Blender is the last tab on its right edge." />
            <p>If it says <b>Not connected</b>, click <b>Connect to MCP server</b>:</p>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14 }}>
              <Shot src="/mcp/blender-not-connected.jpg" alt="MCP for Blender panel showing Not connected and a Connect to MCP server button" caption="Not running: click Connect to MCP server." />
              <Shot src="/mcp/blender-connected.jpg" alt="MCP for Blender panel showing Connected on port 9876" caption="Ready: your agent can now use Blender." />
            </div>
            <p>No tab at all? Go to <b>Edit → Preferences → Add-ons</b>, search "MCP" and tick <b>Interface: MCP for Blender</b>.</p>
          </Step>

          <Step n={5} title="Reconnect your agent and test it">
            <p>Restart your client (or run <span style={inline}>/mcp</span> in Claude Code / Gemini CLI). With Claude Code you can also check from a terminal:</p>
            <Code title="Terminal" code={'claude mcp list\n\n# look for this line:\nblender: uvx mcp-for-blender - ✔ Connected'} />
            <p>Then try one of these:</p>
            <ul style={{ margin: '10px 0 0 18px' }}>
              {TEST_PROMPTS.slice(0, 3).map(p => <li key={p} style={{ marginBottom: 6 }}>{p}</li>)}
            </ul>
          </Step>
        </section>

        {/* Roblox */}
        <section style={{ padding: '36px 0 12px', borderBottom: '1px solid #e8e8e8' }}>
          <div style={label}>Bonus</div>
          <h2 style={h2}>Roblox Studio MCP</h2>
          <p style={body}>
            Roblox Studio has its own MCP server built in. With both connected, one agent can model in Blender and then script, test and play the result in Studio.
          </p>

          <Step n={1} title="Open the Assistant settings">
            <p>Update Roblox Studio and open the <b>Assistant</b> panel. Click the <b>settings icon</b> (the sliders) next to the + in the chat box.</p>
            <Shot src="/mcp/studio-assistant-settings.jpg" alt="Roblox Studio Assistant chat box with the sliders settings icon circled" maxWidth={420} />
          </Step>
          <Step n={2} title="Turn on “Enable Studio as MCP server”">
            <p>
              Go to <b>MCP Servers</b> and switch on <b>Enable Studio as MCP server</b>. Under <b>Quick connect</b>, Studio can hook up Claude Code, Cursor, VS Code and Antigravity for you: flip the switch for the one you use and you're done.
            </p>
            <Shot src="/mcp/studio-mcp-servers.jpg" alt="Roblox Studio Assistant Settings, MCP Servers page, with Enable Studio as MCP server switched on" maxWidth={620} caption="The green dot shows how many agents are connected." />
          </Step>
          <Step n={3} title="Or point your client at it by hand">
            <p>For Claude Desktop, Gemini CLI or Codex, open <b>Setup instructions</b> on the same page. Studio shows the exact config with a copy button:</p>
            <Shot src="/mcp/studio-mcp-config.jpg" alt="Roblox Studio MCP setup instructions showing the JSON configuration and startup command" maxWidth={620} />
            <p>The same config for each client:</p>
            <Tabs value={client} onChange={setClient} />
            <Code title={CLIENTS.find(c => c.id === client)!.label} code={ROBLOX_CONFIG[client]} />
            <p>On a Mac, copy Studio's <b>Startup Command</b> instead. Keep Studio open while you work: the agent talks to the running Studio session.</p>
          </Step>
          <Step n={4} title="Check it's connected">
            <p>Restart your client. Studio's status bar (bottom right) shows <b>MCP</b> with a green dot and the number of connected agents. Hover it for details.</p>
            <Shot src="/mcp/studio-mcp-status.jpg" alt="Roblox Studio status bar showing MCP with a green dot and the tooltip 3 clients connected" maxWidth={300} />
            <p>Then try: {TEST_PROMPTS[3]}</p>
          </Step>
        </section>

        {/* Troubleshooting */}
        <section style={{ padding: '36px 0 0' }}>
          <div style={label}>If it breaks</div>
          <h2 style={h2}>Troubleshooting</h2>
          {[
            ['"Could not connect to Blender"', 'Blender is closed, or the MCP for Blender tab says Not connected. Click Connect to MCP server, then reconnect with /mcp.'],
            ['uvx: command not found', 'Open a new terminal after installing uv. On Windows you can also use the full path to uvx.exe in your config.'],
            ['Port 9876 already in use', 'Another Blender window already runs the server. Use one Blender at a time, or change the port in the panel and pass --port to the server.'],
            ['Tools never show up', 'Check the JSON/TOML is valid (one missing comma breaks the file), then fully restart the client. Claude Desktop keeps running in the system tray.'],
            ['"protocol version is not supported"', 'Your client is older than the server. Update Claude Code / Gemini CLI / Codex to the latest version.'],
            ['Roblox: no Studio sessions found', 'Studio has to be open with Enable Studio as MCP server switched on. The status bar should show a green MCP dot.'],
          ].map(([q, a]) => (
            <div key={q} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '260px 1fr', gap: isMobile ? 4 : 20, padding: '14px 0', borderTop: '1px solid #eee' }}>
              <div style={{ fontSize: 12, fontWeight: 800 }}>{q}</div>
              <div style={body}>{a}</div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};

export default McpSetupPage;
