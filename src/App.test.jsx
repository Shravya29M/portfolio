import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App, { AppShell } from './App';
import { otherProjects, places, profile, projects } from './data/site';

/**
 * AppShell is the routed tree without the BrowserRouter, so each test can
 * mount it at an arbitrary URL inside a MemoryRouter.
 */
function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppShell />
    </MemoryRouter>,
  );
}

const heading = (level, name) =>
  screen.getByRole('heading', { level, name });

describe('chrome', () => {
  it('renders the name as a link home on every page', () => {
    renderAt('/work');
    const header = screen.getByRole('banner');
    expect(within(header).getByRole('link', { name: profile.name })).toHaveAttribute(
      'href',
      '/',
    );
  });

  it('renders every nav destination', () => {
    renderAt('/');
    const nav = screen.getByRole('navigation');
    for (const [label, href] of [
      ['About', '/'],
      ['Work', '/work'],
      ['Projects', '/projects'],
      ['Research', '/research'],
      ['Skills', '/skills'],
      ['Scrapbook', '/places'],
    ]) {
      expect(within(nav).getByRole('link', { name: label })).toHaveAttribute('href', href);
    }
  });

  it('exposes a mailto link in the footer', () => {
    renderAt('/');
    const footer = screen.getByRole('contentinfo');
    expect(within(footer).getByRole('link', { name: profile.email })).toHaveAttribute(
      'href',
      `mailto:${profile.email}`,
    );
  });
});

describe('routing', () => {
  it.each([
    ['/', profile.tagline],
    ['/work', 'Where I’ve worked'],
    ['/research', 'Papers & a patent'],
    ['/projects', 'Things I’ve built'],
    ['/skills', 'Tools I reach for'],
    ['/places', 'The scrapbook'],
  ])('renders the page heading at %s', (path, expected) => {
    renderAt(path);
    expect(heading(1, expected)).toBeInTheDocument();
  });

  it('falls through to a 404 for an unknown path', () => {
    renderAt('/definitely-not-a-page');
    expect(heading(1, /doesn’t exist/i)).toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('keeps the header and footer on the 404 page', () => {
    renderAt('/nope');
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('offers a way back home from the 404 page', () => {
    renderAt('/nope');
    const main = screen.getByRole('main');
    expect(within(main).getByRole('link', { name: /head back south/i })).toHaveAttribute(
      'href',
      '/',
    );
  });
});

describe('projects index', () => {
  it('lists every project that has a post', () => {
    renderAt('/projects');
    const main = screen.getByRole('main');
    for (const project of projects) {
      // Index entries are links into the post, not headings.
      expect(
        within(main).getAllByRole('link', { name: project.title }).length,
      ).toBeGreaterThan(0);
    }
  });

  it('lists the smaller projects too', () => {
    renderAt('/projects');
    const main = screen.getByRole('main');
    for (const project of otherProjects) {
      expect(within(main).getByText(project.title)).toBeInTheDocument();
    }
  });

  it('links each post-backed project to its own URL', () => {
    renderAt('/projects');
    const main = screen.getByRole('main');
    const hrefs = within(main)
      .getAllByRole('link')
      .map((a) => a.getAttribute('href'));
    for (const project of projects) {
      expect(hrefs).toContain(`/projects/${project.slug}`);
    }
  });
});

describe('project post', () => {
  it.each(projects.map((p) => [p.slug, p]))(
    'renders the %s post at its slug',
    (slug, project) => {
      renderAt(`/projects/${slug}`);
      expect(heading(1, project.title)).toBeInTheDocument();
    },
  );

  it.each(projects.map((p) => [p.slug, p]))(
    'renders every section heading of %s',
    (slug, project) => {
      renderAt(`/projects/${slug}`);
      const main = screen.getByRole('main');
      for (const section of project.sections) {
        expect(
          within(main).getByRole('heading', { level: 2, name: section.heading }),
        ).toBeInTheDocument();
      }
    },
  );

  it('renders the outbound links for a post', () => {
    const project = projects[0];
    renderAt(`/projects/${project.slug}`);
    const main = screen.getByRole('main');
    for (const link of project.links) {
      const anchor = within(main).getByRole('link', { name: `${link.label} ↗` });
      expect(anchor).toHaveAttribute('href', link.href);
      expect(anchor).toHaveAttribute('target', '_blank');
      // Opening in a new tab without noopener hands the child a window handle.
      expect(anchor.getAttribute('rel')).toContain('noopener');
    }
  });

  it('gives any embedded demo image alt text and lazy loading', () => {
    const withGif = projects.find((p) => p.gif);
    if (!withGif) return;
    renderAt(`/projects/${withGif.slug}`);
    const img = screen.getByAltText(withGif.gifAlt);
    expect(img).toHaveAttribute('src', withGif.gif);
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('shows the try-it snippet when a project has one', () => {
    const withTryIt = projects.find((p) => p.tryIt);
    if (!withTryIt) return;
    renderAt(`/projects/${withTryIt.slug}`);
    expect(screen.getByText(withTryIt.tryIt)).toBeInTheDocument();
  });

  it('links back to the projects index', () => {
    renderAt(`/projects/${projects[0].slug}`);
    expect(screen.getByRole('link', { name: /back to projects/i })).toHaveAttribute(
      'href',
      '/projects',
    );
  });

  it('renders the 404 for a slug with no project', () => {
    renderAt('/projects/no-such-project');
    expect(heading(1, /doesn’t exist/i)).toBeInTheDocument();
  });
});

describe('navigation', () => {
  it('moves between pages when a nav link is clicked', async () => {
    const user = userEvent.setup();
    renderAt('/');
    await user.click(within(screen.getByRole('navigation')).getByRole('link', { name: 'Projects' }));
    expect(heading(1, 'Things I’ve built')).toBeInTheDocument();
  });

  it('opens a project post from the index', async () => {
    const user = userEvent.setup();
    renderAt('/projects');
    const project = projects[0];
    const main = screen.getByRole('main');
    const [readMore] = within(main)
      .getAllByRole('link')
      .filter((a) => a.getAttribute('href') === `/projects/${project.slug}`);
    await user.click(readMore);
    expect(heading(1, project.title)).toBeInTheDocument();
  });

  it('returns to the index from a post', async () => {
    const user = userEvent.setup();
    renderAt(`/projects/${projects[0].slug}`);
    await user.click(screen.getByRole('link', { name: /back to projects/i }));
    expect(heading(1, 'Things I’ve built')).toBeInTheDocument();
  });
});

describe('scrapbook map', () => {
  it('labels the map for screen readers with every pinned place', () => {
    renderAt('/places');
    const map = screen.getByRole('img', { name: /world map with pins on/i });
    const label = map.getAttribute('aria-label');
    for (const place of places) {
      expect(label).toContain(place.name);
    }
  });

  it('renders one pin group per place', () => {
    const { container } = renderAt('/places');
    const map = container.querySelector('svg[role="img"]');
    expect(map.querySelectorAll('g.cursor-pointer')).toHaveLength(places.length);
  });

  it('shows a place tooltip on hover and clears it on leave', async () => {
    const user = userEvent.setup();
    const { container } = renderAt('/places');
    const place = places[0];
    const pin = container.querySelectorAll('svg[role="img"] g.cursor-pointer')[0];

    expect(screen.queryByText(place.note)).not.toBeInTheDocument();
    await user.hover(pin);
    expect(screen.getByText(place.note)).toBeInTheDocument();
    await user.unhover(pin);
    expect(screen.queryByText(place.note)).not.toBeInTheDocument();
  });

  // On touch there is no hover, so tap alone has to open the tooltip. Driven
  // with fireEvent rather than userEvent, which would fire mouseEnter first.
  it('opens the tooltip on a bare tap and toggles it shut on the next one', () => {
    const { container } = renderAt('/places');
    const place = places[0];
    const pin = container.querySelectorAll('svg[role="img"] g.cursor-pointer')[0];

    fireEvent.click(pin);
    expect(screen.getByText(place.note)).toBeInTheDocument();
    fireEvent.click(pin);
    expect(screen.queryByText(place.note)).not.toBeInTheDocument();
  });

  it('positions the tooltip within the map for a far-east and a far-west place', async () => {
    const user = userEvent.setup();
    const { container } = renderAt('/places');
    const pins = [...container.querySelectorAll('svg[role="img"] g.cursor-pointer')];
    const east = places.indexOf([...places].sort((a, b) => b.lng - a.lng)[0]);
    const west = places.indexOf([...places].sort((a, b) => a.lng - b.lng)[0]);

    for (const index of [east, west]) {
      await user.hover(pins[index]);
      const tip = screen.getByText(places[index].name).parentElement;
      expect(tip.style.left).toMatch(/%$/);
      expect(tip.style.transform).toContain('translate');
      await user.unhover(pins[index]);
    }
  });
});

describe('scroll manager', () => {
  it('scrolls to the top on a plain route change', () => {
    renderAt('/projects');
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('scrolls to the anchor instead when the URL carries a hash', () => {
    renderAt('/work#experience');
    expect(window.scrollTo).not.toHaveBeenCalled();
  });
});

describe('App', () => {
  it('mounts the default export against the browser router', () => {
    render(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: profile.tagline })).toBeInTheDocument();
  });
});

describe('external links', () => {
  it('opens outbound links safely everywhere they appear', () => {
    for (const path of ['/', '/work', '/research', '/projects', '/skills', '/places']) {
      const { unmount } = renderAt(path);
      const external = screen
        .getAllByRole('link')
        .filter((a) => (a.getAttribute('href') ?? '').startsWith('http'));
      for (const anchor of external) {
        expect(anchor).toHaveAttribute('target', '_blank');
        expect(anchor.getAttribute('rel')).toContain('noopener');
      }
      unmount();
    }
  });
});
