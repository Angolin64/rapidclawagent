import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

export const metadata: Metadata = {
  title: 'Privacy Policy | RapidClawAgent',
  description: 'Our commitment to protecting your privacy and personal information.',
};

async function getPrivacyContent() {
  const filePath = path.join(process.cwd(), 'content', 'PRIVACY_POLICY.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const processedContent = await remark().use(html).process(fileContents);
  return processedContent.toString();
}

export default async function PrivacyPage() {
  const content = await getPrivacyContent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-6"
          >
            ← Back to Home
          </a>
        </div>

        <article
          className="prose prose-invert prose-slate max-w-none
            prose-headings:text-white prose-headings:font-bold
            prose-h1:text-4xl prose-h1:mb-8 prose-h1:border-b prose-h1:border-slate-700 prose-h1:pb-4
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-cyan-400
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-slate-200
            prose-p:text-slate-300 prose-p:leading-relaxed
            prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-cyan-300 hover:prose-a:underline
            prose-strong:text-white prose-strong:font-semibold
            prose-ul:text-slate-300 prose-ol:text-slate-300
            prose-li:my-2
            prose-code:text-cyan-400 prose-code:bg-slate-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-table:border-slate-700
            prose-th:bg-slate-800 prose-th:text-white
            prose-td:border-slate-700
            prose-hr:border-slate-700 prose-hr:my-8"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <div className="mt-12 p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
          <h3 className="text-lg font-bold text-white mb-2">Questions about your privacy?</h3>
          <p className="text-slate-300 text-sm mb-4">
            We&apos;re here to help. Contact us anytime.
          </p>
          <a
            href="mailto:privacy@rapidclawagent.com"
            className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
          >
            📧 privacy@rapidclawagent.com
          </a>
        </div>
      </div>
    </div>
  );
}
