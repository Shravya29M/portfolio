import { describe, expect, it } from 'vitest';
import {
  certifications,
  coffeeStatus,
  education,
  experience,
  funStats,
  otherProjects,
  places,
  placesCurrently,
  profile,
  projects,
  publications,
  randomLikes,
  shelfBooks,
  shows,
  skills,
  topics,
} from './site';

/**
 * The site is a static data file rendered by a thin React layer, so almost
 * every user-visible bug is a data bug: a dead link, a duplicate slug, a
 * project whose "Read more" points at nothing. These tests guard the data
 * shape so a typo fails CI instead of shipping to the live portfolio.
 */

const URL_RE = /^https?:\/\/[^\s]+$/;

describe('profile', () => {
  it('has the identity fields every page reads', () => {
    expect(profile.name).toBeTruthy();
    expect(profile.tagline).toBeTruthy();
    expect(profile.status).toBeTruthy();
  });

  it('exposes a valid email address', () => {
    expect(profile.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
  });

  it('links out to GitHub and LinkedIn over https', () => {
    expect(profile.github).toMatch(URL_RE);
    expect(profile.linkedin).toMatch(URL_RE);
  });

  it('points the resume at a site-relative asset', () => {
    expect(profile.resume.startsWith('/')).toBe(true);
    expect(profile.resume).toMatch(/\.pdf$/);
  });

  it('has non-empty intro and currently blocks', () => {
    expect(profile.intro.length).toBeGreaterThan(0);
    expect(profile.currently.length).toBeGreaterThan(0);
    for (const line of profile.intro) {
      expect(typeof line).toBe('string');
      expect(line.trim()).not.toBe('');
    }
    // `currently` is a list of [label, text] pairs.
    for (const entry of profile.currently) {
      expect(entry).toHaveLength(2);
      const [label, text] = entry;
      expect(label.trim()).not.toBe('');
      expect(text.trim()).not.toBe('');
    }
  });
});

describe('projects', () => {
  it('is non-empty', () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it('uses unique, URL-safe slugs', () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it.each(projects.map((p) => [p.slug, p]))(
    '%s carries the fields the post page renders',
    (_slug, project) => {
      expect(project.title).toBeTruthy();
      expect(project.tag).toBeTruthy();
      expect(project.date).toBeTruthy();
      expect(project.stack).toBeTruthy();
      expect(project.oneLiner).toBeTruthy();
      expect(Array.isArray(project.links)).toBe(true);
      expect(Array.isArray(project.sections)).toBe(true);
      expect(project.sections.length).toBeGreaterThan(0);
    },
  );

  it.each(projects.map((p) => [p.slug, p]))(
    '%s has labelled, absolute outbound links',
    (_slug, project) => {
      for (const link of project.links) {
        expect(link.label).toBeTruthy();
        expect(link.href).toMatch(URL_RE);
      }
    },
  );

  it.each(projects.map((p) => [p.slug, p]))(
    '%s gives every section a heading and some body',
    (_slug, project) => {
      for (const section of project.sections) {
        expect(section.heading).toBeTruthy();
        const hasBody =
          Boolean(section.paragraphs?.length) ||
          Boolean(section.bullets?.length) ||
          Boolean(section.pre);
        expect(hasBody).toBe(true);
      }
    },
  );

  it.each(projects.map((p) => [p.slug, p]))(
    '%s uses unique section headings, since heading is the React key',
    (_slug, project) => {
      const headings = project.sections.map((s) => s.heading);
      expect(new Set(headings).size).toBe(headings.length);
    },
  );

  it.each(projects.map((p) => [p.slug, p]))(
    '%s describes any media it embeds with alt text',
    (_slug, project) => {
      if (project.gif) {
        expect(project.gif).toMatch(URL_RE);
        expect(project.gifAlt).toBeTruthy();
      }
      if (project.image) {
        expect(project.image.src).toBeTruthy();
        expect(project.image.alt).toBeTruthy();
      }
    },
  );
});

describe('otherProjects', () => {
  it.each(otherProjects.map((p) => [p.title, p]))(
    '%s has a title, description and absolute href',
    (_title, project) => {
      expect(project.title).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(project.href).toMatch(URL_RE);
    },
  );

  it('does not repeat a project already given a full post', () => {
    const postTitles = new Set(projects.map((p) => p.title));
    for (const project of otherProjects) {
      expect(postTitles.has(project.title)).toBe(false);
    }
  });
});

describe('experience', () => {
  it('is non-empty and fully populated', () => {
    expect(experience.length).toBeGreaterThan(0);
    for (const role of experience) {
      expect(role.role).toBeTruthy();
      expect(role.company).toBeTruthy();
      expect(role.date).toBeTruthy();
      expect(role.summary).toBeTruthy();
      expect(role.bullets.length).toBeGreaterThan(0);
    }
  });

  it('keeps bullets tight enough to scan', () => {
    for (const role of experience) {
      for (const bullet of role.bullets) {
        expect(bullet.length).toBeLessThan(400);
      }
    }
  });
});

describe('publications', () => {
  it('labels each entry and links it when a URL exists', () => {
    expect(publications.length).toBeGreaterThan(0);
    for (const pub of publications) {
      expect(pub.type).toBeTruthy();
      expect(pub.title).toBeTruthy();
      expect(pub.venue).toBeTruthy();
      // href is intentionally null for the patent, which has no public URL.
      if (pub.href !== null) {
        expect(pub.href).toMatch(URL_RE);
      }
    }
  });
});

describe('education, skills and topics', () => {
  it('lists education with school, degree and detail', () => {
    expect(education.length).toBeGreaterThan(0);
    for (const entry of education) {
      expect(entry.school).toBeTruthy();
      expect(entry.degree).toBeTruthy();
      expect(entry.detail).toBeTruthy();
    }
  });

  it('groups skills and topics uniquely', () => {
    for (const list of [skills, topics]) {
      expect(list.length).toBeGreaterThan(0);
      const groups = list.map((s) => s.group);
      expect(new Set(groups).size).toBe(groups.length);
      for (const entry of list) {
        expect(entry.items.trim()).not.toBe('');
      }
    }
  });

  it('lists certifications as non-empty strings', () => {
    for (const cert of certifications) {
      expect(cert.trim()).not.toBe('');
    }
  });
});

describe('scrapbook data', () => {
  it('gives every place a name and plottable coordinates', () => {
    expect(places.length).toBeGreaterThan(0);
    for (const place of places) {
      expect(place.name).toBeTruthy();
      expect(Number.isFinite(place.lat)).toBe(true);
      expect(Number.isFinite(place.lng)).toBe(true);
      expect(place.lat).toBeGreaterThanOrEqual(-90);
      expect(place.lat).toBeLessThanOrEqual(90);
      expect(place.lng).toBeGreaterThanOrEqual(-180);
      expect(place.lng).toBeLessThanOrEqual(180);
      expect(place.note).toBeTruthy();
    }
  });

  it('does not list the same place twice', () => {
    const names = places.map((p) => p.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('populates the scrapbook cards', () => {
    for (const list of [placesCurrently, coffeeStatus, randomLikes, shelfBooks, shows]) {
      expect(Array.isArray(list)).toBe(true);
      expect(list.length).toBeGreaterThan(0);
    }
  });

  it('gives each fun stat a label and a value', () => {
    expect(funStats.length).toBeGreaterThan(0);
    for (const stat of funStats) {
      expect(Object.keys(stat).length).toBeGreaterThan(0);
    }
  });
});

describe('copy conventions', () => {
  // The site was deliberately stripped of em dashes; this keeps it that way.
  it('uses no em dashes in project prose', () => {
    for (const project of projects) {
      expect(project.oneLiner).not.toContain('—');
      for (const section of project.sections) {
        for (const para of section.paragraphs ?? []) {
          expect(para).not.toContain('—');
        }
        for (const bullet of section.bullets ?? []) {
          expect(bullet).not.toContain('—');
        }
      }
    }
  });
});
