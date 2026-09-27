import { LiquidHeader } from "../lc";
import { Icon } from "../icons";

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

function Section({ title, children }) {
  return (
    <section style={{ marginBottom: 28 }}>
      <h2 style={{ color: "var(--text-h)", fontSize: 17, fontWeight: 800, margin: "0 0 10px", letterSpacing: "-.01em" }}>{title}</h2>
      <div style={{ color: "var(--text-sec)", fontSize: 14, lineHeight: 1.75 }}>{children}</div>
    </section>
  );
}

export default function TermsView() {
  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "28px 24px 72px" }}>
      <LiquidHeader eyebrow="LEGAL" icon={<Icon name="ctd" size={26} sw={1.6} />} title="Terms & Conditions"
        subtitle="The terms for using this app." />

      <div style={{ fontFamily: MONO, fontSize: 11, color: "var(--text-faint)", marginBottom: 24 }}>
        Last updated: September 27, 2026
      </div>

      <Section title="What this app is">
        <p>
          CMC App is an independent, self-directed study reference covering biologics chemistry, manufacturing,
          and controls (CMC) topics: pipeline stages, analytical methods, Quality by Design, regulatory
          guidelines, and related practice content. It is built and maintained by Yash Kacha as a personal and
          educational project.
        </p>
      </Section>

      <Section title="Not professional or regulatory advice">
        <p>
          Nothing in this app is regulatory, legal, medical, or professional advice, and it is not a substitute
          for official guidance from FDA, ICH, USP, EMA, or any other regulatory body. Content is written for
          learning and interview preparation. Verify anything you plan to rely on professionally against the
          primary source documents.
        </p>
      </Section>

      <Section title="No warranty">
        <p>
          The app and its content are provided as is, without warranty of any kind, express or implied,
          including accuracy, completeness, or fitness for a particular purpose. Regulatory guidance changes
          over time; content here may lag behind the current state of a guideline or standard.
        </p>
      </Section>

      <Section title="Acceptable use">
        <p>
          Use the app for personal learning. Do not present its content as official regulatory text, scrape or
          redistribute it at scale, or use it in a way that misrepresents its source or authorship.
        </p>
      </Section>

      <Section title="Your local data">
        <p>
          Notes, quiz progress, and other in-app state are stored only in your browser, as described in the{" "}
          <span style={{ color: "var(--accent)" }}>Privacy Policy</span>. You are responsible for your own
          browser data; the developer cannot recover it if it is cleared or lost and is not liable for that loss.
        </p>
      </Section>

      <Section title="External links">
        <p>
          The mAb Mastery module links to an external site at <code style={{ color: "var(--text-body)" }}>mab.yashkacha.com</code>.
          That site operates under its own terms, which this document does not cover.
        </p>
      </Section>

      <Section title="Availability and changes">
        <p>
          The app may be updated, changed, or taken offline at any time without notice. There is no uptime
          guarantee or service-level commitment.
        </p>
      </Section>

      <Section title="Limitation of liability">
        <p>
          To the fullest extent permitted by law, the developer is not liable for any damages arising from your
          use of, or inability to use, this app, including decisions made based on its content.
        </p>
      </Section>

      <Section title="Changes to these terms">
        <p>
          These terms may be updated as the app changes. Continued use of the app after an update means you
          accept the current version.
        </p>
      </Section>

      <Section title="Contact">
        <p style={{ margin: 0 }}>
          Questions about these terms can be sent through <span style={{ color: "var(--accent)" }}>yashkacha.com</span>.
        </p>
      </Section>
    </div>
  );
}
