import base64
import os
import subprocess
import sys

def main():
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    public_dir = os.path.join(root, "public")
    img_path = os.path.join(public_dir, "profile.jpg")
    output_pdf = os.path.join(public_dir, "Abdullah_resume.pdf")
    temp_html = os.path.join(public_dir, "temp_resume_print.html")

    with open(img_path, "rb") as f:
        img_base64 = base64.b64encode(f.read()).decode("utf-8")

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Abdullah Malik - Resume</title>
<style>
  @page {{
    size: A4 portrait;
    margin: 12mm 14mm 12mm 14mm;
  }}
  * {{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }}
  body {{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #1e293b;
    background: #ffffff;
    line-height: 1.4;
    font-size: 9.5pt;
  }}
  a {{
    color: #0284c7;
    text-decoration: none;
  }}
  .header {{
    display: flex;
    align-items: center;
    gap: 18px;
    padding-bottom: 12px;
    border-bottom: 2px solid #e2e8f0;
    margin-bottom: 12px;
  }}
  .avatar {{
    width: 78px;
    height: 78px;
    border-radius: 12px;
    object-fit: cover;
    object-position: top;
    border: 2px solid #0284c7;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  }}
  .header-info {{
    flex: 1;
  }}
  .name-row {{
    display: flex;
    align-items: baseline;
    gap: 10px;
    margin-bottom: 2px;
  }}
  h1 {{
    font-size: 20pt;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.5px;
  }}
  .title-tag {{
    font-size: 8.5pt;
    font-weight: 700;
    color: #0369a1;
    background: #e0f2fe;
    padding: 2px 8px;
    border-radius: 9999px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }}
  .sub-title {{
    font-size: 10pt;
    font-weight: 600;
    color: #475569;
    margin-bottom: 4px;
  }}
  .contact-row {{
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    font-size: 8pt;
    color: #64748b;
  }}
  .contact-item {{
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }}
  .section {{
    margin-bottom: 11px;
  }}
  .section-title {{
    font-size: 9.5pt;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: #0f172a;
    border-bottom: 1.5px solid #cbd5e1;
    padding-bottom: 2px;
    margin-bottom: 6px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }}
  .summary-text {{
    font-size: 8.5pt;
    color: #334155;
    text-align: justify;
    line-height: 1.35;
  }}
  .edu-item, .project-item {{
    margin-bottom: 7px;
  }}
  .item-header {{
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 1px;
  }}
  .item-title {{
    font-size: 9pt;
    font-weight: 700;
    color: #0f172a;
  }}
  .item-sub {{
    font-size: 8.5pt;
    font-weight: 600;
    color: #0284c7;
  }}
  .item-date {{
    font-size: 8pt;
    color: #64748b;
    font-weight: 500;
  }}
  .item-desc {{
    font-size: 8pt;
    color: #475569;
    line-height: 1.35;
  }}
  .achievements-grid {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
    margin-top: 4px;
  }}
  .ach-card {{
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 6px 8px;
  }}
  .ach-title {{
    font-size: 8.5pt;
    font-weight: 700;
    color: #0f172a;
    display: flex;
    align-items: center;
    gap: 4px;
  }}
  .ach-badge {{
    font-size: 7pt;
    font-weight: 700;
    background: #fef3c7;
    color: #92400e;
    padding: 1px 5px;
    border-radius: 4px;
    text-transform: uppercase;
  }}
  .ach-desc {{
    font-size: 7.5pt;
    color: #64748b;
    margin-top: 1px;
    line-height: 1.25;
  }}
  .skills-container {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
    font-size: 8pt;
  }}
  .skill-group {{
    background: #f8fafc;
    padding: 6px 8px;
    border-radius: 6px;
    border: 1px solid #f1f5f9;
  }}
  .skill-label {{
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 1px;
    font-size: 8pt;
  }}
  .skill-val {{
    color: #475569;
    font-size: 7.5pt;
  }}
</style>
</head>
<body>

  <!-- Header -->
  <header class="header">
    <img class="avatar" src="data:image/jpeg;base64,{img_base64}" alt="Abdullah Malik">
    <div class="header-info">
      <div class="name-row">
        <h1>Abdullah Malik</h1>
        <span class="title-tag">BS Data Science (IUB)</span>
      </div>
      <div class="sub-title">Agentic AI Engineer & Autonomous Systems Architect</div>
      <div class="contact-row">
        <span class="contact-item">📧 <a href="mailto:muhammadabdullah51700@gmail.com">muhammadabdullah51700@gmail.com</a></span>
        <span class="contact-item">📱 +92 304 0705172</span>
        <span class="contact-item">🌐 <a href="https://portfolio-ai-assistant-of-malik.vercel.app/">portfolio-ai-assistant.vercel.app</a></span>
        <span class="contact-item">🐙 <a href="https://github.com/AbdullahMalik17">github.com/AbdullahMalik17</a></span>
        <span class="contact-item">💼 <a href="https://www.linkedin.com/in/muhammad-abdullah-athar">in/muhammad-abdullah-athar</a></span>
      </div>
    </div>
  </header>

  <!-- Executive Summary -->
  <section class="section">
    <div class="section-title">Executive Profile</div>
    <p class="summary-text">
      Autonomous software systems engineer and undergraduate Data Science student at <strong>Islamia University of Bahawalpur (IUB)</strong>. High-growth developer (started coding at age 14) specializing in high-autonomy Digital Employees (Digital FTEs), compiled edge-native Go agent runtimes (&lt;10MB RAM footprint), and verifiable Model Context Protocol (MCP) tooling. Creator of <strong>MalikClaw</strong> (recipient of the <strong>GitHub Starstruck Bronze Achievement</strong> with 16+ stars, listed on MCP Market) and holder of the audited <strong>A2AS Behavior Certificate</strong> for AI Agent Security & Governance.
    </p>
  </section>

  <!-- Education -->
  <section class="section">
    <div class="section-title">Education & Academic Credentials</div>
    
    <div class="edu-item">
      <div class="item-header">
        <span class="item-title">Islamia University of Bahawalpur (IUB)</span>
        <span class="item-date">2025 – Present • Pakistan</span>
      </div>
      <div class="item-sub">Bachelor of Science in Data Science (BS Data Science)</div>
      <p class="item-desc">
        Core focus: Statistical Modeling, Linear Algebra, Machine Learning Models, Data Structures & Algorithms, Big Data Analytics. Bridging rigorous mathematical foundations with autonomous AI swarms.
      </p>
    </div>

    <div class="edu-item">
      <div class="item-header">
        <span class="item-title">Panaversity</span>
        <span class="item-date">2024</span>
      </div>
      <div class="item-sub">Specialist Certification in Agentic AI Development</div>
      <p class="item-desc">
        Mastered autonomous agent loops, OpenAI Agents SDK, LangChain, tool calling schemas, and visual workflow automation.
      </p>
    </div>

    <div class="edu-item">
      <div class="item-header">
        <span class="item-title">Presidential Initiative for Artificial Intelligence & Computing (PIAIC)</span>
        <span class="item-date">2023 – 2024</span>
      </div>
      <div class="item-sub">Specialist in Artificial Intelligence & Cloud-Native Computing</div>
      <p class="item-desc">
        Mastered TypeScript, async Python, Docker containerization, PostgreSQL, and modern web application development.
      </p>
    </div>
  </section>

  <!-- Honors & GitHub Achievements -->
  <section class="section">
    <div class="section-title">Honors & Official GitHub Achievements</div>
    <div class="achievements-grid">
      <div class="ach-card">
        <div class="ach-title">⭐ GitHub Starstruck <span class="ach-badge">Bronze Tier</span></div>
        <div class="ach-desc">Awarded for <strong>MalikClaw</strong> earning 16+ GitHub stars from open-source developers worldwide.</div>
      </div>
      <div class="ach-card">
        <div class="ach-title">🦈 GitHub Pull Shark <span class="ach-badge" style="background:#e0f2fe;color:#0369a1;">Active</span></div>
        <div class="ach-desc">Awarded for high-velocity merged pull requests in Hackathon 2 open source repositories.</div>
      </div>
      <div class="ach-card">
        <div class="ach-title">👥 Pair Extraordinaire <span class="ach-badge" style="background:#f3e8ff;color:#6b21a8;">AI Co-Author</span></div>
        <div class="ach-desc">Recognized for autonomous AI pair programming and co-authored repository commits with Claude.</div>
      </div>
      <div class="ach-card">
        <div class="ach-title">🛡️ A2AS Behavior Certificate & MCP Market</div>
        <div class="ach-desc">Audited agent safety limits by A2AS Registry; MalikClaw cataloged on official global MCP Market.</div>
      </div>
    </div>
  </section>

  <!-- Flagship Projects -->
  <section class="section">
    <div class="section-title">Flagship Engineering Systems</div>

    <div class="project-item">
      <div class="item-header">
        <span class="item-title">MalikClaw — Edge-Native Agentic Assistant & Gateway</span>
        <span class="item-date">Go • MCP • ADB • Docker</span>
      </div>
      <p class="item-desc">
        Ultra-lightweight edge agent compiled in Go operating on <strong>&lt;10MB RAM</strong> with <strong>&lt;1s boot time</strong> on a $10 Raspberry Pi Zero or Android hardware. Features native Urdu NLP with RTL bidirectional routing, JSON-RPC 2.0 Model Context Protocol (MCP) dispatch, and Android mobile automation over ADB. Received GitHub Starstruck Bronze Achievement.
      </p>
    </div>

    <div class="project-item">
      <div class="item-header">
        <span class="item-title">Digital FTE — Abdullah Junior</span>
        <span class="item-date">Python • FastAPI • Claude • MCP</span>
      </div>
      <p class="item-desc">
        Autonomous 24/7 Digital Employee utilizing a <strong>Dual-Agent Architecture</strong> (Cloud Sentry monitoring + Local Executive execution). Enforces strict credential isolation with HMAC verification; autonomously handles Gmail, WhatsApp, LinkedIn, and Odoo ERP workflows.
      </p>
    </div>

    <div class="project-item">
      <div class="item-header">
        <span class="item-title">Customer Success Digital FTE</span>
        <span class="item-date">FastAPI • pgvector • Apache Kafka</span>
      </div>
      <p class="item-desc">
        Multi-channel customer inquiry agent operating 24/7. Integrates 1536-dimensional vector similarity retrieval in PostgreSQL with pgvector and an asynchronous Apache Kafka pipeline with automated dead-letter queue recovery.
      </p>
    </div>
  </section>

  <!-- Technical Skills Matrix -->
  <section class="section">
    <div class="section-title">Technical Skills Matrix</div>
    <div class="skills-container">
      <div class="skill-group">
        <div class="skill-label">Languages & Runtimes:</div>
        <div class="skill-val">Go (Golang), Python (AsyncIO), TypeScript, JavaScript, SQL, R, Bash</div>
      </div>
      <div class="skill-group">
        <div class="skill-label">AI, Data Science & Vector Stores:</div>
        <div class="skill-val">Model Context Protocol (MCP), OpenAI Agents SDK, pgvector, Pandas, NumPy, Scikit-learn, ChromaDB, Pinecone</div>
      </div>
      <div class="skill-group">
        <div class="skill-label">Backends & Cloud Infrastructure:</div>
        <div class="skill-val">FastAPI, Next.js 15, PostgreSQL, Apache Kafka, Docker, Kubernetes, Vercel, Fly.io, CI/CD</div>
      </div>
      <div class="skill-group">
        <div class="skill-label">Security & Observability:</div>
        <div class="skill-val">A2AS Behavior Limits, Android ADB Automation, Langfuse Telemetry, Git/GitHub Actions</div>
      </div>
    </div>
  </section>

</body>
</html>"""

    with open(temp_html, "w", encoding="utf-8") as f:
        f.write(html)

    chrome_candidates = [
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    ]

    chrome_bin = None
    for c in chrome_candidates:
        if os.path.exists(c):
            chrome_bin = c
            break

    if not chrome_bin:
        print("ERROR: No Chrome or Edge executable found.")
        sys.exit(1)

    print(f"Using browser: {chrome_bin}")
    cmd = [
        chrome_bin,
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={output_pdf}",
        temp_html
    ]

    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode == 0 and os.path.exists(output_pdf):
        size = os.path.getsize(output_pdf)
        print(f"SUCCESS: Generated {output_pdf} ({size} bytes)")
    else:
        print(f"ERROR: {res.stderr}")
        sys.exit(1)

    # Clean up temp html
    if os.path.exists(temp_html):
        os.remove(temp_html)

if __name__ == "__main__":
    main()
