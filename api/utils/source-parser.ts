interface Source {
  deliverableId: string;
  title: string;
}

/**
 * Extract source citations from the answer text
 * Maps deliverable names mentioned in the answer to their IDs
 */
export function extractSources(answer: string, clientSlug: string): Source[] {
  const sources: Source[] = [];

  // Map of deliverable titles to their IDs (for Intus)
  const deliverableMap: Record<string, { id: string; title: string }> = {
    'executive summary': {
      id: 'executive-summary',
      title: 'Executive Summary',
    },
    'gate tracker': {
      id: 'gate-tracker',
      title: 'Gate Tracker',
    },
    'market intelligence report': {
      id: '01-market-intelligence-report',
      title: 'Market Intelligence Report',
    },
    'competitive dynamics': {
      id: '02-competitive-dynamics-report',
      title: 'Competitive Dynamics Model & Strategy',
    },
    'strategic positioning brief': {
      id: '03-strategic-positioning-brief',
      title: 'Strategic Positioning Brief & Category Blueprint',
    },
    'brand archetype guide': {
      id: '04-brand-archetype-guide',
      title: 'Brand Archetype Guide',
    },
    'brandscript': {
      id: '05-brandscript-and-manifesto',
      title: 'BrandScript & Brand Manifesto',
    },
    'manifesto': {
      id: '05-brandscript-and-manifesto',
      title: 'BrandScript & Brand Manifesto',
    },
    'tone of voice': {
      id: '06-tone-of-voice-guide',
      title: 'Tone of Voice Guide, Word Bank & Copy Deck',
    },
    'brand identity system': {
      id: '07-brand-identity-system',
      title: 'Brand Identity System',
    },
    'design system': {
      id: '08-design-system',
      title: 'Design System',
    },
    'semiotic dictionary': {
      id: '09-semiotic-dictionary',
      title: 'Semiotic Dictionary',
    },
    'website ux': {
      id: '10-website-ux-wireframes',
      title: 'Website UX Wireframes & Digital Architecture',
    },
    'wireframes': {
      id: '10-website-ux-wireframes',
      title: 'Website UX Wireframes & Digital Architecture',
    },
    'content strategy': {
      id: '11-content-strategy-channel-plan',
      title: 'Content Strategy & Channel Plan',
    },
    'email lifecycle': {
      id: '12-email-lifecycle-system',
      title: 'Email Lifecycle System',
    },
    'ad creative': {
      id: '13-ad-creative-testing-framework',
      title: 'Ad Creative Testing Framework',
    },
    'lightning strike': {
      id: '14-lightning-strike-execution-plan',
      title: 'Lightning Strike Execution Plan',
    },
    'measurement framework': {
      id: '15-measurement-framework',
      title: 'Measurement Framework & Dashboards',
    },
    'ninety-day roadmap': {
      id: '16-ninety-day-roadmap',
      title: '90-Day Post-Launch Roadmap',
    },
    '90-day': {
      id: '16-ninety-day-roadmap',
      title: '90-Day Post-Launch Roadmap',
    },
  };

  // Search for deliverable mentions in the answer (case-insensitive)
  const answerLower = answer.toLowerCase();
  const foundSources = new Set<string>(); // Use Set to avoid duplicates

  for (const [keyword, deliverable] of Object.entries(deliverableMap)) {
    if (answerLower.includes(keyword)) {
      foundSources.add(deliverable.id);
    }
  }

  // Convert Set to array of Source objects
  for (const id of foundSources) {
    const deliverable = Object.values(deliverableMap).find(d => d.id === id);
    if (deliverable) {
      sources.push({
        deliverableId: id,
        title: deliverable.title,
      });
    }
  }

  return sources;
}
