import { LiquidHeader } from "../lc";
import { Icon } from "../icons";

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

const STORAGE_KEYS = [
  { key: "cmc-theme", desc: "Your light or dark theme preference." },
  { key: "cmc-notes", desc: "Notes you create in the Notes section." },
  { key: "cmc-quiz-progress", desc: "Spaced-repetition scheduling data for exam questions you have answered." },
  { key: "cmc-visited-views", desc: "Which sections of the app you have opened, used to show your progress." },
  { key: "cmc-pathway-progress", desc: "Which learning-pathway milestone badges you have marked as earned." },
  { key: "cmc-bpr-state", desc: "Your in-progress state in the Batch Record Simulator." },
];

function Section({ title, children }) {
  return (
    <section style={{ marginBottom: 28 }}>
      <h2 style={{ color: "var(--text-h)", fontSize: 17, fontWeight: 800, margin: "0 0 10px", letterSpacing: "-.01em" }}>{title}</h2>
      <div style={{ color: "var(--text-sec)", fontSize: 14, lineHeight: 1.75 }}>{children}</div>
    </section>
  );
}

export default function PrivacyView() {
  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "28px 24px 72px" }}>
      <LiquidHeader eyebrow="LEGAL" icon={<Icon name="lock" size={26} sw={1.6} />} title="Privacy Policy"
        subtitle="How this app handles the data it touches." />

      <div style={{ fontFamily: MONO, fontSize: 11, color: "var(--text-faint)", marginBottom: 24 }}>
        Last updated: September 27, 2026
      </div>

      <Section title="Summary">
        <p style={{ margin: 0 }}>
          CMC App is a static, client-side application. It has no account system, no backend server, and no
          analytics or tracking scripts. Everything the app remembers about you is written directly to your
          browser's local storage and never leaves your device.
        </p>
      </Section>

      <Section title="What is stored, and where">
        <p>
          The app uses your browser's <code style={{ color: "var(--text-body)" }}>localStorage</code> to remember
          your preferences and progress between visits. Nothing here is uploaded to a server, because the app
          does not have one to upload to. The keys it writes are:
        </p>
        <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
          {STORAGE_KEYS.map(k => (
            <div key={k.key} style={{ background: "var(--panel)", border: "1px solid var(--hairline)", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ fontFamily: MONO, fontSize: 12, color: "var(--accent)", fontWeight: 700 }}>{k.key}</div>
              <div style={{ fontSize: 13, color: "var(--text-sec)", marginTop: 3 }}>{k.desc}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="What is not collected">
        <p>
          No name, email address, or other personal information is requested or stored by the app. There are no
          cookies, no third-party analytics, no advertising trackers, and no data sent to any server operated by
          the developer or anyone else.
        </p>
      </Section>

      <Section title="Admin mode">
        <p>
          The admin login in the navigation bar checks a passphrase locally, inside your own browser, to unlock a
          few editing conveniences (like unrestricted note editing). It is not a real authentication system, does
          not create an account anywhere, and does not transmit the passphrase to any server.
        </p>
      </Section>

      <Section title="Clearing your data">
        <p>
          Clearing your browser's site data, using private/incognito mode, or switching browsers or devices will
          remove or exclude the stored progress described above. There is no backup or recovery mechanism,
          because nothing is stored outside your browser.
        </p>
      </Section>

      <Section title="External links">
        <p>
          The mAb Mastery module opens an external site at <code style={{ color: "var(--text-body)" }}>mab.yashkacha.com</code>.
          That site is separate from this app and has its own privacy practices, which this policy does not cover.
        </p>
      </Section>

      <Section title="Hosting">
        <p>
          This app is served as static files. The hosting provider may keep standard server access logs (such as
          IP address and request timestamps) as part of normal infrastructure operation. Those logs are managed
          by the hosting provider, not the developer, and are not used for tracking within the app.
        </p>
      </Section>

      <Section title="Children's privacy">
        <p>
          This app is not directed at children and does not knowingly collect information from anyone, regardless
          of age, since it does not collect information from anyone at all.
        </p>
      </Section>

      <Section title="Changes to this policy">
        <p>
          If how the app handles data ever changes, this page will be updated to reflect it. Check back here for
          the current version.
        </p>
      </Section>

      <Section title="Contact">
        <p style={{ margin: 0 }}>
          Questions about this policy can be sent through <span style={{ color: "var(--accent)" }}>yashkacha.com</span>.
        </p>
      </Section>
    </div>
  );
}
