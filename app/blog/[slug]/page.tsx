import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Calendar, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import BlogPostTracker from '@/components/BlogPostTracker';

// Blog posts data
const blogPosts: { [key: string]: any } = {
  'building-openredaction-developer-journey': {
    title: 'From Regex Library to Real API: Building OpenRedaction\'s Developer Journey',
    date: '2025-12-04',
    category: 'Guide',
    excerpt: 'How OpenRedaction evolved from a simple regex-based redaction library into a hosted API with AI-assist, billing and product-grade infrastructure.',
    content: `
      <p>You know that feeling when you build something small, open-source… then suddenly people star it, fork it, and ask: <em>"How much for the API?"</em></p>
      
      <p>That's where we found ourselves with OpenRedaction. What began as a deterministic regex-based redaction library — simple, local, dependable — has now become something bigger: a hosted AI-assist proxy, Stripe payments, API keys, and a real product behind it.</p>
      
      <p>In this post I walk you through that journey: why we built each piece, what worked, what we learned — and how you can use the same blueprint for your own dev tools.</p>
      
      <h2>1. The beginning: an open-source library for privacy-first redaction</h2>
      
      <ul>
        <li><strong>Origins</strong> — OpenRedaction started as a personal tool: a regex-based engine to strip out names, emails, phone numbers, addresses, etc. from text. It was simple, deterministic, fast, and local.</li>
        <li><strong>Why regex-first?</strong> Regex gives control: no external calls, no hidden AI, no data leaks. That's important for privacy, security, and compliance.</li>
        <li><strong>Open-sourcing</strong> — I made it MIT, published on GitHub, added many patterns, tests, and documentation. People liked it: devs could trust its transparency and deterministic behaviour.</li>
      </ul>
      
      <p><strong>Value delivered:</strong> a lean, dependable redaction engine for anyone who needs PII-safe output — logs, disclosures, transcripts, and more.</p>
      
      <h2>2. The gap: real-world data isn't neat — regex wasn't enough</h2>
      
      <p>Real world isn't clean. Names are lowercase, uppercase, mixed case; people combine first/last names incorrectly; addresses vary; phone numbers have weird formats; blobs of unstructured text with noise.</p>
      
      <p>Regex did a great job — but still missed messy, ambiguous, or unusual cases.</p>
      
      <p>So I asked: <em>What if we layer an AI-powered detection pass over regex?</em></p>
      
      <p>But I also wanted to stay true to the original values: privacy, transparency, and optionality.</p>
      
      <h2>3. The hybrid solution: regex-first + optional AI-assist</h2>
      
      <p>We designed the architecture to be hybrid:</p>
      
      <ul>
        <li><strong>Regex-first core</strong> — still default, local, open-source.</li>
        <li><strong>Optional AI-assist via hosted proxy</strong> — when you need extra detection power.</li>
        <li><strong>User decides</strong> — you can stay 100% local, or use hosted API.</li>
      </ul>
      
      <p>That balance preserves trust while giving flexibility.</p>
      
      <h2>4. From library to product: building the API, proxy, billing</h2>
      
      <p>A few big steps:</p>
      
      <ul>
        <li>Built a <strong>hosted AI proxy</strong> — accepts text, passes it to a model provider, returns structured entity spans.</li>
        <li>Wrapped with <strong>rate-limiting, API keys, quota checks</strong> — using Upstash + KV storage.</li>
        <li>Integrated <strong>payment handling</strong> (via Stripe) → after checkout, generate API key + email to user.</li>
        <li>Updated docs + README + site messaging — made clear what's free, what's paid, and how to use.</li>
        <li>Added <strong>free tier + pro tier</strong> — free tier for experimentation; pro tier for real usage (e.g. 50,000 AI-assisted requests/month).</li>
      </ul>
      
      <p>This turned OpenRedaction from a hobby-library to a <strong>real dev-tool product</strong>.</p>
      
      <h2>5. What we learned (the hard and the good)</h2>
      
      <h3>Good</h3>
      <ul>
        <li>Open source brings visibility and trust.</li>
        <li>Hybrid model satisfies both "privacy-first" and "power-when-needed" communities.</li>
        <li>Simple billing + API key logic is enough at early stage.</li>
        <li>Transparent docs + clear messaging convert interested devs quickly.</li>
        <li>Hosting under your own proxy lets you control quota, avoid vendor friction, and shield users from complexity.</li>
      </ul>
      
      <h3>Challenges & trade-offs</h3>
      <ul>
        <li>You must explain clearly when AI-assist sends data externally — honesty builds trust.</li>
        <li>Edge cases: very long inputs, abuse, rate-limiting — had to harden API accordingly.</li>
        <li>Documentation & UX must stay rock-solid to avoid confusion.</li>
        <li>You lose the "fully local only" claim when users choose AI mode — needs clear communication.</li>
      </ul>
      
      <h2>6. The result: a tool devs can trust — with flexibility</h2>
      
      <p>OpenRedaction today:</p>
      
      <ul>
        <li>Is still free and open-source at its core.</li>
        <li>Lets you redact with pure regex quickly and privately.</li>
        <li>Offers optional AI-assist for messy or unstructured text.</li>
        <li>Provides a hosted API, billing, and key-based access — ideal for production.</li>
        <li>Gives community & enterprise users flexibility: local vs hosted; free vs paid; DIY vs plug-and-play.</li>
      </ul>
      
      <p>It's become a <strong>full-featured redaction platform</strong>, but with developer values and transparency intact.</p>
      
      <h2>7. Advice for other dev-tool creators</h2>
      
      <p>If you're building a developer library and thinking of turning it into a product:</p>
      
      <ul>
        <li>Start with <strong>deterministic core functionality</strong> — something reliable, open-source, and trustable.</li>
        <li>Expose a clear switch — "core library only" vs "hosted service" — let users choose.</li>
        <li>Build incremental — library → self-hosted → hosted API → billing.</li>
        <li>Keep docs simple, honest, and upfront about trade-offs (privacy, cost, limits).</li>
        <li>Don't over-engineer early. A simple API key + rate limiting + small quota is enough to test demand.</li>
        <li>Use a hosted proxy rather than exposing vendor complexity — shield users from underlying dependencies.</li>
      </ul>
      
      <h2>Conclusion</h2>
      
      <p>OpenRedaction's journey — from small regex library to hosted API product — is a classic developer-tool growth arc. Because we stayed grounded in simplicity, transparency and dev-values, we haven't lost flexibility or trust — and unlocked real usage and revenue potential.</p>
      
      <p>If you're building a tool, library or small SaaS: treat your users as developers, give them control, stay honest — and build slowly.</p>
      
      <p>Want to see the live code or try it? Check out <a href="https://github.com/sam247/openredaction" target="_blank" rel="noopener noreferrer">GitHub → OpenRedaction</a> or visit <a href="https://openredaction.com">openredaction.com</a>.</p>
      
      <div style="margin-top: 3rem; padding: 1.5rem; background-color: #111827; border: 1px solid #374151; border-radius: 0.5rem;">
        <h3 style="margin-top: 0; margin-bottom: 1rem; font-size: 1.25rem; font-weight: 600; color: #fff;">Ready to get started?</h3>
        <ul style="margin-bottom: 1rem; padding-left: 1.5rem; list-style-type: disc; color: #d1d5db;">
          <li style="margin-bottom: 0.5rem;">Learn about <a href="/blog/pii-detection-for-ai" style="color: #fff; text-decoration: underline;">PII Detection for AI</a> and how to safely use user data with LLMs</li>
          <li style="margin-bottom: 0.5rem;">Read <a href="/blog/understanding-pii-detection" style="color: #fff; text-decoration: underline;">Understanding PII Detection</a> for a primer on the basics</li>
          <li style="margin-bottom: 0.5rem;">Check out <a href="/nodejs-redaction" style="color: #fff; text-decoration: underline;">Node.js Redaction</a> for integration guides</li>
          <li style="margin-bottom: 0.5rem;"><a href="/pricing" style="color: #fff; text-decoration: underline;">View pricing and get an API key</a> for the Pro tier</li>
          <li style="margin-bottom: 0.5rem;"><a href="/playground" style="color: #fff; text-decoration: underline;">Try the playground</a> to test redaction in your browser</li>
          <li style="margin-bottom: 0.5rem;"><a href="/docs" style="color: #fff; text-decoration: underline;">Read the documentation</a> for integration guides and API details</li>
        </ul>
      </div>
    `,
  },
  'understanding-pii-detection': {
    title: 'Understanding PII Detection',
    date: '2025-01-15',
    category: 'Guide',
    excerpt: 'Learn what PII is, why detecting it is challenging, and how pattern-based and AI-assisted approaches combine for robust redaction pipelines.',
    content: `
      <p>Personally identifiable information (PII) sits at the heart of modern privacy and security risk. Detecting it reliably is the first step to protecting users, complying with regulations, and enabling safer logging, analytics, and AI workflows.</p>
      
      <p>This article explains what PII is, why detecting it is hard in practice, and how pattern‑based and AI‑assisted approaches like <a href="/">OpenRedaction's</a> can be combined for robust redaction pipelines. For a practical guide on implementing PII detection, see our <a href="/pii-detection">PII Detection guide</a>.</p>
      
      <h2>What counts as PII?</h2>
      
      <p>PII is any information that can directly or indirectly identify a specific person. Some identifiers are obviously sensitive, while others become identifying when combined with other attributes.</p>
      
      <p>Common PII categories include:</p>
      
      <ul>
        <li><strong>Direct identifiers:</strong> names, email addresses, phone numbers, national IDs, credit card numbers, bank account numbers.</li>
        <li><strong>Quasi‑identifiers:</strong> dates of birth, postcodes, job titles, demographic attributes that may identify people in combination.</li>
        <li><strong>Contextual identifiers:</strong> IP addresses, device IDs, cookie IDs, and customer IDs that tie activity back to individuals.</li>
      </ul>
      
      <p>Different regulations define and scope PII slightly differently. For example, GDPR speaks more broadly about "personal data" (see our <a href="/gdpr-redaction">GDPR Redaction guide</a>), while sector rules like HIPAA focus on health data but list specific identifiers that must be removed or de‑identified (see our <a href="/hipaa-redaction">HIPAA Redaction guide</a>).</p>
      
      <h2>Why PII detection matters</h2>
      
      <p>Detecting PII early lets teams prevent sensitive data from leaking into logs, analytics, and third‑party services. This reduces breach impact, simplifies incident response, and can materially reduce regulatory and contractual risk.</p>
      
      <p>PII detection is also a prerequisite for safe data sharing and AI adoption. Before sending text to external LLMs, analytics tools, or partners, organizations increasingly run detection and redaction pipelines to strip out identifiers while keeping data useful.</p>
      
      <p>Operationally, automated PII detection reduces reliance on manual review, which is slow, inconsistent, and itself a privacy risk. With robust automated detection, teams can enforce privacy controls consistently across services and environments.</p>
      
      <h2>Challenges in detecting PII</h2>
      
      <p>PII detection is more complex than scanning for obvious patterns like email addresses. Real‑world data is messy, multilingual, full of typos, abbreviations, and domain‑specific identifiers that do not follow simple formats.</p>
      
      <p>False negatives (missed PII) create privacy and compliance risk, while false positives (over‑flagging) can destroy data utility. For example, detecting every number as PII may protect privacy but makes logs, metrics, and analytics almost unusable.</p>
      
      <p>PII can also appear in unstructured content such as free‑text comments, support tickets, legal documents, audio transcripts and screenshots. Detecting PII in these channels often requires a mix of text processing, OCR, and language‑aware models.</p>
      
      <h2>Key approaches to PII detection</h2>
      
      <p>Most modern systems blend deterministic pattern‑matching with probabilistic AI or NER (named entity recognition) models. Each approach has strengths and weaknesses that matter when designing a pipeline.</p>
      
      <h3>Pattern‑based (regex) detection</h3>
      
      <p>Pattern‑based detection relies on explicit rules such as regular expressions to match emails, phone numbers, card numbers, and similar tokens. For example, card numbers can be matched with format checks plus checksum validation, and phone numbers by known country‑specific patterns.</p>
      
      <p>Pattern‑based detection is transparent, deterministic, and very fast, making it ideal as a first pass in logs, text streams, and structured fields. The trade‑off is that it struggles with unusual formats, obfuscated data, and context‑dependent identifiers such as names or organization‑specific IDs.</p>
      
      <h3>AI and NER‑based detection</h3>
      
      <p>NER‑based detection uses machine learning models trained to recognize entities like "Person", "Location", "Email", "PhoneNumber", and so on within text. These models can spot identifiers even when formats vary or when meaning is largely contextual, such as recognizing a person's name next to a company name in a sentence.</p>
      
      <p>AI models are powerful on free‑form and multilingual text, but they introduce complexity: model selection, latency, cost, confidence thresholds, and possible misclassifications. Many platforms expose these capabilities via cloud APIs for PII detection and redaction, often returning entities with types, offsets, and confidence scores.</p>
      
      <h3>OCR for visual content</h3>
      
      <p>For screenshots, scanned documents, and video frames, systems apply OCR to extract text and then run PII detection over the recognized content. This enables PII detection in UI recordings, PDFs, scanned forms, and on‑screen dashboards captured during support or testing.</p>
      
      <p>OCR‑based pipelines must account for recognition errors, layout, and multiple languages. Confidence thresholds and secondary validation become important to avoid both missing visible PII and over‑redacting misleading OCR artifacts.</p>
      
      <h2>How OpenRedaction approaches PII detection</h2>
      
      <p><a href="/">OpenRedaction</a> focuses on fast, transparent PII detection and redaction that can run entirely on your infrastructure. It combines a large library of hardened regex patterns with an optional AI assist layer, giving developers control over accuracy, speed, and privacy posture.</p>
      
      <p>By default, OpenRedaction uses regex‑based detection over text, applying a large set of tested patterns covering emails, phone numbers, IPs, payment data, IDs and more. Optionally, an AI proxy can be enabled to augment regex with additional PII spans discovered by an AI model, particularly for entity types that are hard to encode as patterns, such as person names.</p>
      
      <p>For more on how OpenRedaction evolved from a regex library to a hybrid API, see our <a href="/blog/building-openredaction-developer-journey">developer journey blog post</a>. To integrate PII detection into your Node.js applications, check out our <a href="/nodejs-redaction">Node.js Redaction guide</a>.</p>
      
      <h3>Why pattern‑first detection?</h3>
      
      <p>Leading with pattern‑based detection keeps the system deterministic: the same input always produces the same output, and detection logic is fully inspectable. This is especially important for regulated environments and for debugging complex pipelines where teams need to understand exactly why specific tokens were redacted.</p>
      
      <p>Pattern‑first detection also avoids sending data to third‑party AI services by default, which is crucial for privacy‑first workflows and strict data residency requirements. Because there are no external network calls in the default path, performance is predictable and suitable for high‑throughput systems like log processors or API gateways.</p>
      
      <h3>Optional AI assist</h3>
      
      <p>OpenRedaction's AI assist is explicitly opt‑in and layered on top of regex results. When enabled, text is sent to a hosted AI proxy that returns additional PII spans, which are then merged with the pattern‑based matches before redaction.</p>
      
      <p>This hybrid model allows teams to capture more subtle identifiers in free‑text content without surrendering full control to a black‑box AI. It can be particularly helpful in support tickets, chat logs, or fields where users might paste arbitrary personal information that does not follow strict formats.</p>
      
      <h2>Common PII types and patterns</h2>
      
      <p>Different domains prioritize different PII types, but a typical detection configuration covers several core categories. These often align with regulatory lists (e.g., the HIPAA "Safe Harbor" identifiers) or internal data classification schemes.</p>
      
      <p>Typical PII for pattern‑based detection includes:</p>
      
      <ul>
        <li><strong>Contact details:</strong> email addresses, phone numbers, postal addresses (partially), IP addresses.</li>
        <li><strong>Financial and ID numbers:</strong> credit card numbers, bank account numbers, national IDs, passport numbers.</li>
        <li><strong>Network/application identifiers:</strong> IPs, MAC addresses, JWTs, API keys, session IDs, customer IDs when formats are known.</li>
      </ul>
      
      <p>For these categories, regex and checksums can detect most instances with high precision, especially when combined with boundary checks and context rules. Names, locations, and free‑form descriptors usually require either very careful custom rules or AI‑based NER to achieve useful coverage.</p>
      
      <h2>Precision, recall and thresholds</h2>
      
      <p>Designing a PII detector always involves tuning the trade‑off between precision (few false positives) and recall (few false negatives). In protection‑first contexts like log shipping to external services, teams often prefer higher recall, accepting some over‑redaction to minimize risk.</p>
      
      <p>When AI models are part of the pipeline, confidence thresholds become a major tuning knob. Increasing the threshold improves precision but may miss borderline entities; lowering it catches more possible PII at the cost of more noise.</p>
      
      <p>A practical pattern is to:</p>
      
      <ul>
        <li>Use strict, validated regex for high‑impact PII such as card numbers and IDs where false positives are costly.</li>
        <li>Use more permissive rules or lower AI thresholds for lower‑risk tokens like generic names, especially in environments where over‑redaction is acceptable.</li>
      </ul>
      
      <h2>Redaction strategies</h2>
      
      <p>Detection is only half the story; handling detected PII safely is the other. Redaction transforms or removes PII so that downstream systems cannot reconstruct the original identifiers, while preserving enough structure for debugging or analytics where needed.</p>
      
      <p>Common redaction strategies include:</p>
      
      <ul>
        <li><strong>Full masking:</strong> replacing the entire span with a placeholder token such as [EMAIL] or [CARD].</li>
        <li><strong>Partial masking:</strong> keeping some non‑sensitive characters (e.g., last 4 digits) while masking the rest.</li>
        <li><strong>Tokenization or hashing:</strong> substituting identifiers with irreversible or keyed tokens so that records can still be linked without revealing raw PII.</li>
      </ul>
      
      <p>For many teams, full masking for logs and external integrations and tokenization for internal analytics offers a balanced compromise. OpenRedaction's pattern‑based spans make it straightforward to implement consistent masking strategies at the text level before data leaves a secure boundary.</p>
      
      <h2>Building PII detection into your stack</h2>
      
      <p>PII detection is most effective when integrated into the data lifecycle rather than treated as a one‑off batch task. That means embedding detection at the edges of your system and in the pipelines that move data between services.</p>
      
      <p>Typical integration points include:</p>
      
      <ul>
        <li><strong>Ingestion:</strong> run detection and redaction as data enters logs, data lakes, or event streams.</li>
        <li><strong>Pre‑export:</strong> scrub PII before sending data to third‑party monitoring, analytics, or AI services.</li>
        <li><strong>Migration and audits:</strong> scan existing databases and object stores to identify and remediate sensitive fields or misclassified tables.</li>
      </ul>
      
      <p>OpenRedaction's <a href="https://github.com/sam247/openredaction" target="_blank" rel="noopener noreferrer">open‑source core</a> and simple text‑in/text‑out interface make it suitable for embedding in log forwarders, middleware, sidecars, and ETL jobs. Because detection logic is local and inspectable, it fits well into "privacy by design" architectures where teams must justify and document how they handle personal data.</p>
      
      <h2>Comparing detection approaches</h2>
      
      <p>The table below summarizes key differences between the main approaches and where OpenRedaction fits.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 2rem 0;">
        <thead>
          <tr style="border-bottom: 2px solid #374151;">
            <th style="text-align: left; padding: 0.75rem; color: #fff; font-weight: 600;">Aspect</th>
            <th style="text-align: left; padding: 0.75rem; color: #fff; font-weight: 600;">Pattern‑based (regex)</th>
            <th style="text-align: left; padding: 0.75rem; color: #fff; font-weight: 600;">AI / NER‑based detection</th>
            <th style="text-align: left; padding: 0.75rem; color: #fff; font-weight: 600;">Hybrid (OpenRedaction style)</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #374151;">
            <td style="padding: 0.75rem; color: #d1d5db;">Transparency</td>
            <td style="padding: 0.75rem; color: #d1d5db;">Fully inspectable, deterministic rules</td>
            <td style="padding: 0.75rem; color: #d1d5db;">Opaque model internals</td>
            <td style="padding: 0.75rem; color: #d1d5db;">Clear base rules plus optional model spans</td>
          </tr>
          <tr style="border-bottom: 1px solid #374151;">
            <td style="padding: 0.75rem; color: #d1d5db;">Performance</td>
            <td style="padding: 0.75rem; color: #d1d5db;">Very fast, low CPU, no network</td>
            <td style="padding: 0.75rem; color: #d1d5db;">Higher latency, often network‑bound</td>
            <td style="padding: 0.75rem; color: #d1d5db;">Fast baseline, optional slower extra coverage</td>
          </tr>
          <tr style="border-bottom: 1px solid #374151;">
            <td style="padding: 0.75rem; color: #d1d5db;">Strengths</td>
            <td style="padding: 0.75rem; color: #d1d5db;">Structured IDs, emails, phones, cards</td>
            <td style="padding: 0.75rem; color: #d1d5db;">Names, context‑dependent entities</td>
            <td style="padding: 0.75rem; color: #d1d5db;">Strong formats plus better coverage of free‑text</td>
          </tr>
          <tr style="border-bottom: 1px solid #374151;">
            <td style="padding: 0.75rem; color: #d1d5db;">Data residency/privacy</td>
            <td style="padding: 0.75rem; color: #d1d5db;">Easy to keep fully local</td>
            <td style="padding: 0.75rem; color: #d1d5db;">Often cloud‑hosted APIs</td>
            <td style="padding: 0.75rem; color: #d1d5db;">Local by default, opt‑in remote assist</td>
          </tr>
          <tr style="border-bottom: 1px solid #374151;">
            <td style="padding: 0.75rem; color: #d1d5db;">Tuning</td>
            <td style="padding: 0.75rem; color: #d1d5db;">Edit rules and patterns directly</td>
            <td style="padding: 0.75rem; color: #d1d5db;">Adjust thresholds, retrain models</td>
            <td style="padding: 0.75rem; color: #d1d5db;">Adjust patterns and assist configuration</td>
          </tr>
        </tbody>
      </table>
      
      <h2>Good practices when implementing PII detection</h2>
      
      <p>Several practical practices help teams get more value from PII detection while avoiding unnecessary friction.</p>
      
      <p>Recommended steps include:</p>
      
      <ul>
        <li>Map data flows so you know where PII enters, moves, and leaves your systems, then prioritize high‑risk paths for detection.</li>
        <li>Start with well‑defined, high‑impact PII types (emails, phone numbers, card numbers, IDs) and expand coverage iteratively.</li>
        <li>Add detection to CI, integration tests, or staging pipelines to ensure new features do not accidentally leak PII into logs or external tools.</li>
        <li>Periodically review patterns, thresholds, and redaction behavior as regulations, products, and data types evolve.</li>
      </ul>
      
      <p>Finally, treat PII detection as one building block in a broader privacy strategy that includes encryption, access controls, retention limits, and training. Combining strong PII detection with sane defaults across the stack allows teams to move quickly while still respecting user privacy and regulatory obligations.</p>
      
      <div style="margin-top: 3rem; padding: 1.5rem; background-color: #111827; border: 1px solid #374151; border-radius: 0.5rem;">
        <h3 style="margin-top: 0; margin-bottom: 1rem; font-size: 1.25rem; font-weight: 600; color: #fff;">Ready to get started?</h3>
        <ul style="margin-bottom: 1rem; padding-left: 1.5rem; list-style-type: disc; color: #d1d5db;">
          <li style="margin-bottom: 0.5rem;">Learn about <a href="/blog/pii-detection-for-ai" style="color: #fff; text-decoration: underline;">PII Detection for AI</a> and how to safely use user data with LLMs</li>
          <li style="margin-bottom: 0.5rem;">Read about <a href="/blog/building-openredaction-developer-journey" style="color: #fff; text-decoration: underline;">how OpenRedaction evolved</a> from a regex library to a hybrid API</li>
          <li style="margin-bottom: 0.5rem;"><a href="/" style="color: #fff; text-decoration: underline;">Visit the homepage</a> to learn more about OpenRedaction</li>
          <li style="margin-bottom: 0.5rem;"><a href="/contact" style="color: #fff; text-decoration: underline;">Get in touch</a> if you have questions or need help</li>
          <li style="margin-bottom: 0.5rem;">Check out the <a href="https://github.com/sam247/openredaction" target="_blank" rel="noopener noreferrer" style="color: #fff; text-decoration: underline;">open-source repository</a> on GitHub</li>
        </ul>
      </div>
    `,
  },
  'pii-detection-for-ai': {
    title: 'PII Detection for AI: How to Safely Use User Data with LLMs',
    date: '2025-12-05',
    category: 'Guide',
    excerpt: 'Learn how PII detection fits into AI workflows, where personal data typically leaks, and how to design a PII-aware architecture using a hybrid pattern-first + AI assist approach.',
    content: `
      <p>Large language models are incredibly good at turning messy real‑world data into something useful. They are also incredibly good at ingesting sensitive information you did not realise you were sending. If you are feeding real user data into AI systems, you already have a PII problem – the question is whether you have visibility and control.</p>
      
      <p>This article explains how PII detection fits into AI workflows, where personal data typically leaks, and how to design a PII‑aware architecture using a hybrid "pattern‑first + AI assist" approach like the one in OpenRedaction. For a primer on the basics of PII detection, see the article <a href="/blog/understanding-pii-detection">"Understanding PII Detection"</a> on the OpenRedaction blog, or check out our <a href="/pii-detection">PII Detection guide</a> for practical implementation details.</p>
      
      <h2>Where PII hides in AI workflows</h2>
      
      <p>PII shows up everywhere once you start looking, especially around AI:</p>
      
      <p><strong>Inbound:</strong> user prompts, chat messages, uploaded PDFs and Word docs, CSV exports from CRMs, support tickets and email threads, call transcripts, screenshots.</p>
      
      <p><strong>Processing:</strong> prompt/response logging, debug traces, observability tools capturing requests and responses, intermediate queues and event streams.</p>
      
      <p><strong>Storage:</strong> vector databases for RAG, fine‑tuning datasets, analytics warehouses where raw prompts and responses are stored "just in case".</p>
      
      <p><strong>Outbound:</strong> model responses that echo user details, include copied text from uploads, or reconstruct information from context.</p>
      
      <p>The net effect is that a single user message can spray personal data across half a dozen systems. Without a consistent PII detection and redaction layer, those systems become shadow copies of your most sensitive data.</p>
      
      <h2>Threat model: what can go wrong</h2>
      
      <p>Before deciding how to detect PII, it helps to be clear on what you are protecting against:</p>
      
      <ul>
        <li><strong>Accidental logging:</strong> prompts and responses with names, emails, IDs and access tokens end up in log management tools, ticketing systems or shared debug dashboards.</li>
        <li><strong>Data residency and vendor risk:</strong> PII is sent to third‑party LLM APIs in other jurisdictions, sometimes against policy or contract.</li>
        <li><strong>Model and RAG leakage:</strong> unredacted data used for fine‑tuning or retrieval‑augmented generation later shows up in responses to unrelated users.</li>
        <li><strong>Compliance headaches:</strong> once PII is scattered across logs, vector stores and training sets, responding to deletion or subject access requests becomes painful.</li>
      </ul>
      
      <p>PII detection is not a silver bullet, but it is one of the few controls you can place right at the boundary of your AI systems to reduce the blast radius of all these risks.</p>
      
      <h2>Pattern‑based vs AI‑based PII detection</h2>
      
      <p>There are two main families of approaches for detecting PII, and in practice you often want both.</p>
      
      <h3>Pattern‑based (regex) detection</h3>
      
      <p>Pattern‑based detection uses explicit rules, usually regular expressions plus validation logic, to find identifiers with predictable shapes. Typical examples include:</p>
      
      <ul>
        <li>Email addresses and phone numbers</li>
        <li>IP addresses and MAC addresses</li>
        <li>Credit card and bank account numbers</li>
        <li>Government ID numbers and passport numbers</li>
        <li>Access tokens, API keys and session IDs with known formats</li>
      </ul>
      
      <p>This approach is:</p>
      
      <ul>
        <li><strong>Deterministic:</strong> the same input always produces the same output.</li>
        <li><strong>Transparent:</strong> you can inspect and adjust the actual rules.</li>
        <li><strong>Fast and cheap:</strong> runs locally, with no external calls.</li>
      </ul>
      
      <p>The downside is that pattern‑based detection struggles with:</p>
      
      <ul>
        <li>Names and locations</li>
        <li>Free‑form descriptions like "my colleague John in the London office"</li>
        <li>Domain‑specific identifiers whose formats are not well known</li>
      </ul>
      
      <h3>AI / NER‑based detection</h3>
      
      <p>AI‑based detection uses trained models (often named entity recognition / NER models or LLMs themselves) to find entities like "Person", "Location", "Organization", "Email", "PhoneNumber" and so on directly in text.</p>
      
      <p>This approach is strong when:</p>
      
      <ul>
        <li>Text is messy, multilingual or full of typos.</li>
        <li>You care about entities that do not follow strict formats (names, employers, schools, addresses).</li>
        <li>Users can paste anything into a free‑text field.</li>
      </ul>
      
      <p>The trade‑offs include:</p>
      
      <ul>
        <li><strong>Opacity:</strong> understanding why a model did or did not detect something is harder.</li>
        <li><strong>Operational complexity:</strong> you have to manage latency, cost, versioning and confidence thresholds.</li>
        <li><strong>Data flow:</strong> many AI PII detectors are cloud APIs, which may conflict with strict data residency or privacy requirements.</li>
      </ul>
      
      <h3>A hybrid approach</h3>
      
      <p>A robust setup combines the strengths of both:</p>
      
      <ol>
        <li>First, run pattern‑based detection locally to catch anything with a known shape.</li>
        <li>Then, optionally call an AI model to find additional PII in the remaining free‑text.</li>
        <li>Merge results and apply redaction in a consistent, predictable way.</li>
      </ol>
      
      <p>This is the philosophy behind OpenRedaction's "pattern‑first with optional AI assist" design. The core library ships with a large collection of hardened regexes and does not require sending data anywhere. When you need more coverage on messy text, you can enable an AI assist layer on top.</p>
      
      <p>For more on the basics of pattern‑based detection and how OpenRedaction does it, see <a href="/blog/understanding-pii-detection">Understanding PII Detection</a>.</p>
      
      <h2>Designing a PII‑aware AI architecture</h2>
      
      <p>Think in terms of where to insert PII detection in your AI stack. A good mental model is four key stages.</p>
      
      <h3>1. Classify AI use cases by risk</h3>
      
      <p>Not all AI use is equal. Classify flows roughly as:</p>
      
      <ul>
        <li><strong>Low‑risk:</strong> internal tools on synthetic or low‑sensitivity data, local models, no external logging.</li>
        <li><strong>Medium‑risk:</strong> internal use with real customer data, logs in shared systems, vendor APIs within your region.</li>
        <li><strong>High‑risk:</strong> public‑facing AI features, cross‑border API calls, long‑term storage of prompts/responses.</li>
      </ul>
      
      <p>The higher the risk, the more aggressive your PII detection and redaction should be.</p>
      
      <h3>2. Insert PII detection at system boundaries</h3>
      
      <p>You typically want detection at:</p>
      
      <p><strong>Inbound request edges</strong></p>
      
      <p>Middleware in your API gateway, backend or chat server that runs PII detection/redaction on prompts before they reach your model gateway or vector ingestion code.</p>
      
      <p><strong>File ingestion paths</strong></p>
      
      <p>For uploads (PDFs, DOCX, CSV, images), run text extraction (and OCR if needed), then PII detection, then chunk/embedding. This ensures your vector database never sees raw identifiers.</p>
      
      <p><strong>Event and log pipelines</strong></p>
      
      <p>Before logs, metrics or traces leave your core infrastructure for third‑party tools, pass them through a PII filter to guarantee that observability does not become a shadow PII store.</p>
      
      <p>OpenRedaction is deliberately built as a text‑in/text‑out engine that slots naturally into these boundaries, whether you use it as a library or a sidecar.</p>
      
      <h3>3. Post‑process model outputs</h3>
      
      <p>It is easy to focus only on inputs, but outputs deserve similar care:</p>
      
      <p><strong>Echo suppression</strong></p>
      
      <p>LLMs can repeat back PII that was present in user prompts or documents. A post‑processing step can detect and mask those before responses are stored or shown.</p>
      
      <p><strong>Guardrails</strong></p>
      
      <p>For some products, you may want to explicitly block the model from outputting certain classes of identifiers unless there is a strong justification (for example, internal tools used only by staff).</p>
      
      <p>A simple pattern is:</p>
      
      <ol>
        <li>Model generates a response.</li>
        <li>Run PII detection over that response.</li>
        <li>Mask or tokenise any detected spans before returning to the client or storing in logs.</li>
      </ol>
      
      <h3>4. Choose your redaction style</h3>
      
      <p>Once you have spans, you still need to decide how to transform them. Common strategies:</p>
      
      <p><strong>Full masking</strong></p>
      
      <p>Replace the entire span with a generic token such as [EMAIL], [PHONE], [NAME] or [CARD]. This is usually the safest default for anything leaving your VPC or going to third‑party APIs.</p>
      
      <p><strong>Partial masking</strong></p>
      
      <p>Keep a small part of the identifier for context (for example, last 4 digits of a card) and mask the rest. This is helpful in debugging and customer support, but should be used cautiously in AI training datasets.</p>
      
      <p><strong>Tokenisation / pseudonymisation</strong></p>
      
      <p>Replace identifiers with irreversible or keyed tokens (for example, user_12345) so interactions can be linked over time without exposing raw PII. This can be useful inside analytics or internal LLMs.</p>
      
      <p>OpenRedaction treats redaction as a second step after detection, so you can pick whichever strategy fits a specific pipeline. You can learn more about how detection and redaction fit together in the OpenRedaction ecosystem at <a href="/">openredaction.com</a>.</p>
      
      <h2>How OpenRedaction fits into AI pipelines</h2>
      
      <p>OpenRedaction was built to be simple to drop into real‑world data flows:</p>
      
      <ul>
        <li><strong>Self‑hosted and open source</strong> – You can run detection on your own infrastructure so prompts and documents never leave your environment unless you explicitly decide to use an AI assist layer.</li>
        <li><strong>Pattern‑first detection</strong> – A broad library of regex patterns for emails, phones, IPs, payment cards, government IDs and more gives you high‑precision coverage for the most critical identifiers without any model dependencies.</li>
        <li><strong>Optional AI assist</strong> – When you have high‑value free‑text (for example, long support conversations) and need extra coverage, you can layer on AI‑powered PII detection to find names, organizations and looser patterns.</li>
      </ul>
      
      <p>Some concrete integration patterns:</p>
      
      <p><strong>LLM gateway middleware</strong></p>
      
      <p>Wrap your calls to OpenAI/Anthropic/others with a middleware that sends the request body (for example, prompt or messages) through OpenRedaction first. Only redacted content is ever sent over the network.</p>
      
      <p><strong>RAG ingestion</strong></p>
      
      <p>In your document ingestion pipeline: extract text → run OpenRedaction → chunk and embed redacted text → store in your vector DB. Retrieval then operates on redacted content by default.</p>
      
      <p><strong>Prompt/response logging</strong></p>
      
      <p>Before writing prompts and responses to logs, analytics or long‑term storage, pass them through OpenRedaction so debugging and product analytics never deal with raw PII.</p>
      
      <p>If you are new to OpenRedaction, the <a href="/">home page</a> has a concise overview and links to the playground so you can try detection and redaction on sample text.</p>
      
      <p>You can also explore more how‑to content on the <a href="/blog">blog</a>.</p>
      
      <h2>Practical implementation patterns</h2>
      
      <p>Here are three simple ways to think about integrating PII detection without adding too much friction for your team.</p>
      
      <p><strong>Backend middleware (Node.js / Python / Go)</strong></p>
      
      <p>Wrap your AI calls in a small function that:</p>
      
      <ol>
        <li>Accepts a prompt or messages payload.</li>
        <li>Passes it through OpenRedaction's detection + redaction.</li>
        <li>Sends the cleaned prompt to the LLM API.</li>
        <li>Optionally runs OpenRedaction again on the response before returning it.</li>
      </ol>
      
      <p>Because OpenRedaction is just text‑in/text‑out, this is usually only a few lines of glue code.</p>
      
      <p><strong>ETL and data lake ingestion</strong></p>
      
      <p>For analytics or training:</p>
      
      <ol>
        <li>As data is extracted from transactional systems, run a transformation step that calls OpenRedaction on free‑text fields.</li>
        <li>Store redacted versions in your lakehouse or warehouse.</li>
        <li>Make redacted tables the default source for analytics, RAG and fine‑tuning.</li>
      </ol>
      
      <p>This avoids building models or dashboards on raw PII by accident.</p>
      
      <p><strong>Observability pipelines</strong></p>
      
      <p>In log forwarders or collectors (for example, Fluent Bit, Vector, Logstash):</p>
      
      <ul>
        <li>Add a filter step that passes log messages through OpenRedaction before forwarding them to your central logging platform.</li>
        <li>For traces and metrics containing large blobs of text (responses, payloads), selectively process those fields.</li>
      </ul>
      
      <p>That way you can still have rich observability without quietly centralising all your PII in one place.</p>
      
      <h2>Measuring success</h2>
      
      <p>To know whether your PII detection and AI controls are working, define a few simple checks:</p>
      
      <p><strong>Technical checks</strong></p>
      
      <ul>
        <li>Periodically search logs, vector DBs and analytics tables for known PII patterns (for example, test email addresses, synthetic ID numbers) and confirm they do not appear.</li>
        <li>Track latency overhead from the PII detection layer to ensure it stays within acceptable bounds.</li>
      </ul>
      
      <p><strong>Process checks</strong></p>
      
      <ul>
        <li>Add regression tests that send synthetic PII through your AI endpoints and confirm that what reaches the model (and what gets logged) is redacted.</li>
        <li>Treat detection rule updates as code, with review and CI around them.</li>
      </ul>
      
      <p>Over time, you can tighten your patterns, thresholds and redaction strategies as you better understand your data and risk profile.</p>
      
      <h2>Where to go next</h2>
      
      <p>If you are designing or hardening AI features, a practical next step is:</p>
      
      <ol>
        <li>Map where prompts, documents and model outputs enter and leave your system.</li>
        <li>Pick one high‑risk boundary (for example, your LLM gateway) and add OpenRedaction as a PII filter there.</li>
        <li>Extend from there into ingestion, logs and RAG pipelines.</li>
      </ol>
      
      <p>To dive deeper into the foundations of PII detection and how regex‑based approaches work, read <a href="/blog/understanding-pii-detection">"Understanding PII Detection"</a> on the blog.</p>
      
      <p>For more guidance, examples and updates, explore the rest of the <a href="/blog">blog</a>.</p>
      
      <p>If you want to discuss bespoke use cases, integrations or get help rolling OpenRedaction out across your stack, you can reach the team via the <a href="/contact">contact page</a>.</p>
      
      <p>To understand pricing options and how OpenRedaction can support larger deployments or enterprise needs, see <a href="/pricing">pricing</a>.</p>
      
      <div style="margin-top: 3rem; padding: 1.5rem; background-color: #111827; border: 1px solid #374151; border-radius: 0.5rem;">
        <h3 style="margin-top: 0; margin-bottom: 1rem; font-size: 1.25rem; font-weight: 600; color: #fff;">Ready to get started?</h3>
        <ul style="margin-bottom: 1rem; padding-left: 1.5rem; list-style-type: disc; color: #d1d5db;">
          <li style="margin-bottom: 0.5rem;">Read <a href="/blog/understanding-pii-detection" style="color: #fff; text-decoration: underline;">Understanding PII Detection</a> for a primer on the basics</li>
          <li style="margin-bottom: 0.5rem;">Learn about <a href="/blog/building-openredaction-developer-journey" style="color: #fff; text-decoration: underline;">how OpenRedaction evolved</a> from a regex library to a hybrid API</li>
          <li style="margin-bottom: 0.5rem;"><a href="/" style="color: #fff; text-decoration: underline;">Visit the homepage</a> to learn more about OpenRedaction</li>
          <li style="margin-bottom: 0.5rem;"><a href="/contact" style="color: #fff; text-decoration: underline;">Get in touch</a> if you have questions or need help</li>
        </ul>
      </div>
    `,
  },
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts[params.slug];

  if (!post) {
    return {};
  }

  const excerpt = post.excerpt || post.content?.replace(/<[^>]*>/g, '').substring(0, 160) || '';

  return generatePageMetadata({
    title: post.title,
    description: excerpt,
    path: `/blog/${params.slug}`,
  });
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug];

  if (!post) {
    notFound();
  }

  // Process content - ensure links have proper styling
  const processedContent = post.content
    .replace(/<a href="([^"]+)">/g, (_match: string, href: string) => {
      if (href.startsWith('/') || href.startsWith('https://openredaction.com')) {
        return `<a href="${href}" style="color: #fff; text-decoration: underline; hover:color: #d1d5db;">`;
      }
      return `<a href="${href}" target="_blank" rel="noopener noreferrer" style="color: #fff; text-decoration: underline;">`;
    })
    .trim();

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <BlogPostTracker slug={params.slug} title={post.title} />
      
      <main className="pt-[148px] pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Blog
          </Link>

          <article>
            <div className="mb-6">
              <span className="text-xs font-medium text-gray-400 bg-gray-800 px-2 py-1 rounded">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex items-center text-gray-400 text-sm mb-8">
              <Calendar size={16} className="mr-2" />
              {new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>

            <div 
              className="blog-content prose prose-invert prose-lg max-w-none
                prose-headings:text-white prose-headings:font-semibold
                prose-h1:text-3xl prose-h1:font-bold prose-h1:mt-8 prose-h1:mb-4
                prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-6 prose-h2:leading-tight
                prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-4 prose-h3:leading-tight
                prose-p:text-gray-300 prose-p:mb-6 prose-p:leading-7 prose-p:text-base
                prose-a:text-white prose-a:underline prose-a:hover:text-gray-300
                prose-strong:text-white prose-strong:font-semibold
                prose-code:text-green-400 prose-code:bg-gray-900 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800 prose-pre:rounded prose-pre:p-4
                prose-ul:text-gray-300 prose-ul:my-6 prose-ul:pl-6 prose-ul:space-y-2
                prose-li:text-gray-300 prose-li:my-1 prose-li:leading-7 prose-li:text-base
                prose-hr:border-gray-800 prose-hr:my-10 prose-hr:border-t
                prose-blockquote:border-l-gray-800 prose-blockquote:text-gray-400"
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />
            <style dangerouslySetInnerHTML={{ __html: `
              .blog-content p {
                margin-bottom: 1.5rem !important;
                line-height: 1.75 !important;
              }
              .blog-content ul {
                margin-top: 1.5rem !important;
                margin-bottom: 1.5rem !important;
              }
              .blog-content li {
                margin-top: 0.5rem !important;
                margin-bottom: 0.5rem !important;
                line-height: 1.75 !important;
              }
              .blog-content h2 {
                margin-top: 2.5rem !important;
                margin-bottom: 1.5rem !important;
              }
              .blog-content h3 {
                margin-top: 2rem !important;
                margin-bottom: 1rem !important;
              }
              .blog-content hr {
                margin-top: 2.5rem !important;
                margin-bottom: 2.5rem !important;
              }
            `}} />
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
