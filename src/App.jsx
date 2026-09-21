import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useParams,
  useLocation,
} from 'react-router-dom';
import {
  profile,
  experience,
  projects,
  otherProjects,
  skills,
  topics,
  publications,
  education,
  certifications,
  places,
  placesIntro,
  placesCurrently,
  coffeeStatus,
  funStats,
  randomLikes,
  shelfBooks,
  shows,
} from './data/site';
import { WORLD_PATH, WORLD_VIEWBOX, projectPlace } from './assets/worldPath';
import './index.css';

function ExternalLink({ href, children, className = '' }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-accent hover:underline underline-offset-4 ${className}`}
    >
      {children}
    </a>
  );
}

function Divider() {
  return (
    <div className="my-16 text-center font-mono text-xs tracking-[0.6em] text-faint select-none">
      · · ·
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section>
      <Divider />
      <h2 className="mb-8 text-xl font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

function Header() {
  const nav = [
    ['About', '/'],
    ['Work', '/work'],
    ['Projects', '/projects'],
    ['Research', '/research'],
    ['Skills', '/skills'],
    ['Scrapbook', '/places'],
  ];
  return (
    <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-10">
      <Link to="/" className="font-semibold tracking-tight">
        {profile.name}
      </Link>
      <nav className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs">
        {nav.map(([label, to]) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              isActive ? 'text-ink' : 'text-faint hover:text-ink'
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-20 border-t border-hairline py-10">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <p>
          Thanks for scrolling all the way down. Say hi:{' '}
          <a
            href={`mailto:${profile.email}`}
            className="text-accent hover:underline underline-offset-4"
          >
            {profile.email}
          </a>
        </p>
        <p className="font-mono text-xs text-faint">© 2026 {profile.name}</p>
      </div>
      <p className="mt-4 font-mono text-xs text-faint">
        Handmade with React + Tailwind, set in Charter, hosted on Vercel,
        powered by coffee. No trackers, no analytics, no gradients.
      </p>
    </footer>
  );
}

function PageTitle({ title, intro }) {
  return (
    <div className="mt-16">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      {intro && <p className="mt-4 max-w-xl">{intro}</p>}
    </div>
  );
}

/* ---------- About (home) ---------- */

function PlacesMap() {
  const [tip, setTip] = useState(null);
  const [, , VW, VH] = WORLD_VIEWBOX.split(' ').map(Number);

  return (
    <div className="relative">
      <svg
        viewBox={WORLD_VIEWBOX}
        role="img"
        aria-label={`World map with pins on ${places.map((p) => p.name).join(', ')}`}
        className="w-full rounded-md border border-hairline bg-white/60"
      >
        <path d={WORLD_PATH} className="fill-hairline" />
        {places.map((place) => {
          const { x, y } = projectPlace(place.lat, place.lng);
          const active = tip?.name === place.name;
          return (
            <g
              key={place.name}
              className="cursor-pointer"
              onMouseEnter={() => setTip({ ...place, x, y })}
              onMouseLeave={() => setTip(null)}
              onClick={() => setTip(active ? null : { ...place, x, y })}
            >
              <circle cx={x} cy={y} r="9" fill="transparent" />
              <circle
                cx={x}
                cy={y}
                r={active ? 5 : 3.5}
                className={`fill-accent ${active ? 'opacity-40' : 'opacity-20'}`}
              />
              <circle cx={x} cy={y} r={active ? 2.2 : 1.6} className="fill-accent" />
            </g>
          );
        })}
      </svg>
      {tip && (
        <div
          className="pointer-events-none absolute z-20 w-max max-w-60 rounded-md border border-hairline bg-paper px-3 py-2 shadow-sm"
          style={{
            left: `${(tip.x / VW) * 100}%`,
            top: `${(tip.y / VH) * 100}%`,
            transform: `translate(${
              tip.x / VW > 0.75 ? '-90%' : tip.x / VW < 0.2 ? '-10%' : '-50%'
            }, calc(-100% - 10px))`,
          }}
        >
          <p className="font-mono text-[11px] uppercase tracking-wider text-faint">
            {tip.name}
          </p>
          {tip.note && <p className="mt-0.5 text-sm leading-snug">{tip.note}</p>}
        </div>
      )}
    </div>
  );
}

function CoffeeCup({ className = '' }) {
  return (
    <svg viewBox="0 0 40 42" aria-hidden="true" className={className}>
      <g className="text-faint">
        <path className="steam" d="M14 12c-1.4-2.3 1.4-3.7 0-6" />
        <path className="steam steam-2" d="M19.5 11c-1.4-2.3 1.4-3.7 0-6" />
        <path className="steam steam-3" d="M25 12c-1.4-2.3 1.4-3.7 0-6" />
      </g>
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path className="text-ink" d="M10 17h19v9a7 7 0 0 1-7 7h-5a7 7 0 0 1-7-7v-9Z" />
        <path className="text-ink" d="M29 19h2.5a4 4 0 0 1 0 8H29" />
        <path className="text-faint" d="M8 38h25" />
      </g>
    </svg>
  );
}

function CoffeeRing({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full border-[5px] border-[#8a5a2b]/10 ${className}`}
    />
  );
}

function ScrapCard({ label, entries, children, className = '' }) {
  return (
    <div
      className={`rounded-md border border-hairline bg-white/60 px-5 py-4 font-mono text-xs leading-6 ${className}`}
    >
      <p className="mb-2 flex items-center gap-2 uppercase tracking-[0.2em] text-faint">
        {label}
        {children}
      </p>
      {entries.map(([k, v]) => (
        <p key={k}>
          <span className="text-faint">{k}:</span> <span className="text-ink">{v}</span>
        </p>
      ))}
    </div>
  );
}

function PlacesPage() {
  return (
    <main>
      <PageTitle title="The scrapbook" intro={placesIntro} />

      {/* Map, taped in like a photo. Breaks out of the text column on wide screens. */}
      <div className="relative mt-12 md:-mx-14 lg:-mx-36">
        <div
          aria-hidden="true"
          className="absolute -top-2.5 left-6 z-10 h-5 w-24 -rotate-6 bg-[#e6d795]/60"
        />
        <div
          aria-hidden="true"
          className="absolute -top-2.5 right-6 z-10 h-5 w-24 rotate-3 bg-[#b7c4ae]/60"
        />
        <PlacesMap />
        <p className="mt-3 -rotate-1 text-right font-hand text-sm text-faint">
          hover the pins — every one has a memory attached ↑
        </p>
      </div>

      {/* Currently + coffee */}
      <div className="relative mt-10 grid gap-5 sm:grid-cols-2">
        <CoffeeRing className="-right-8 -top-8 h-20 w-20 rotate-12" />
        <ScrapCard
          label="Currently"
          entries={placesCurrently}
          className="-rotate-[0.5deg] transition-transform hover:rotate-0"
        />
        <ScrapCard
          label="Coffee status"
          entries={coffeeStatus}
          className="rotate-[0.5deg] transition-transform hover:rotate-0"
        >
          <CoffeeCup className="h-6 w-6" />
        </ScrapCard>
      </div>

      {/* Tiny fun stats */}
      <Section title="Extremely rigorous statistics">
        <div className="relative grid gap-4 sm:grid-cols-2">
          <CoffeeRing className="-bottom-6 -left-10 h-24 w-24 -rotate-6" />
          {funStats.map(([label, value], i) => (
            <div
              key={label}
              className={`rounded-md border border-hairline bg-white/60 px-4 py-3 transition-transform hover:rotate-0 ${
                i % 2 ? 'rotate-[0.6deg]' : '-rotate-[0.6deg]'
              }`}
            >
              <p className="font-mono text-xs uppercase tracking-wider text-faint">
                {label}
              </p>
              <p className="mt-1 font-semibold">{value}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Random likes */}
      <Section title="Random things I like">
        <div className="flex max-w-xl flex-wrap gap-2.5">
          {randomLikes.map((like) => (
            <span
              key={like}
              className="rounded-full border border-hairline bg-white/60 px-3.5 py-1 text-sm transition-transform hover:-rotate-2 hover:border-accent"
            >
              {like}
            </span>
          ))}
        </div>
      </Section>

      {/* Books & shows */}
      <Section title="The shelf">
        <p className="max-w-xl">
          Fantasy, mostly. The rule of thumb: if there’s a map in the front and a
          family tree in the back, I’m in.
        </p>
        <div className="mt-8 flex items-end gap-1.5 border-b-[6px] border-hairline px-3 pb-0">
          {shelfBooks.map((book, i) => (
            <div
              key={book.title}
              style={{ background: book.color }}
              title={`${book.title} — ${book.author}`}
              className={`flex items-center justify-center rounded-t-[3px] transition-transform duration-200 hover:-translate-y-2 ${
                ['h-40', 'h-36', 'h-44', 'h-36', 'h-40'][i % 5]
              } w-9 ${i === shelfBooks.length - 1 ? 'ml-2 origin-bottom-left rotate-6' : ''}`}
            >
              <span
                className="font-mono text-[10px] tracking-wide text-white/90"
                style={{ writingMode: 'vertical-rl' }}
              >
                {book.title}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 font-hand text-sm text-faint">
          the leaning one is the current read
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {shows.map((show, i) => (
            <div
              key={show.title}
              className={`relative rounded-md border border-hairline bg-white/60 px-4 pb-4 pt-6 transition-transform hover:rotate-0 ${
                i % 2 ? 'rotate-[0.8deg]' : '-rotate-[0.8deg]'
              }`}
            >
              <div
                aria-hidden="true"
                className="absolute -top-2 left-1/2 h-4 w-16 -translate-x-1/2 -rotate-2 bg-[#e6d795]/60"
              />
              <p className="font-semibold leading-snug">{show.title}</p>
              <p className="mt-1 font-mono text-xs text-faint">{show.note}</p>
            </div>
          ))}
        </div>
      </Section>

      <p className="mt-14">
        Okay, back to the{' '}
        <Link to="/projects" className="text-accent hover:underline underline-offset-4">
          serious stuff
        </Link>
        .{' '}
        <span className="font-hand text-sm text-faint">
          (the coffee’s getting cold anyway)
        </span>
      </p>
    </main>
  );
}

function Intro() {
  return (
    <div className="mt-20">
      <h1 className="text-3xl font-semibold tracking-tight">{profile.tagline}</h1>
      {profile.intro.map((para) => (
        <p key={para} className="mt-5 max-w-xl">
          {para}
        </p>
      ))}
      <p className="mt-6 font-mono text-xs text-faint">
        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
        {profile.status}
      </p>
      <p className="mt-3 max-w-xl">
        If you’d rather have all of this on one tidy page,{' '}
        <a
          href={profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline underline-offset-4"
        >
          here’s my resume
        </a>
        .
      </p>
      <div className="mt-5 flex gap-5 font-mono text-xs">
        <ExternalLink href={profile.github}>GitHub</ExternalLink>
        <ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink>
        <a
          href={`mailto:${profile.email}`}
          className="text-accent hover:underline underline-offset-4"
        >
          Email
        </a>
        <a
          href={profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline underline-offset-4"
        >
          Resume
        </a>
      </div>

      <div className="mt-10 rounded-md border border-hairline px-5 py-4 font-mono text-xs leading-6">
        <p className="mb-2 uppercase tracking-[0.2em] text-faint">Currently</p>
        {profile.currently.map(([label, value]) => (
          <p key={label}>
            <span className="text-faint">{label}:</span>{' '}
            <span className="text-ink">{value}</span>
          </p>
        ))}
      </div>

      <p className="mt-8">
        If you want to see what I’ve actually built,{' '}
        <Link to="/projects" className="text-accent hover:underline underline-offset-4">
          the projects page
        </Link>{' '}
        is the good part. My internships are over on{' '}
        <Link to="/work" className="text-accent hover:underline underline-offset-4">
          work
        </Link>
        , and the papers live under{' '}
        <Link to="/research" className="text-accent hover:underline underline-offset-4">
          research
        </Link>
        . And if you’re wondering about the trip-planning comment,{' '}
        <Link to="/places" className="text-accent hover:underline underline-offset-4">
          there’s a map
        </Link>
        .
      </p>
    </div>
  );
}

function AboutPage() {
  return (
    <main>
      <Intro />
    </main>
  );
}

/* ---------- Work ---------- */

function WorkPage() {
  return (
    <main>
      <PageTitle title="Where I’ve worked" intro={profile.workIntro} />
      <div className="mt-12 space-y-12">
        {experience.map((job) => (
          <div key={job.company + job.role}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="font-semibold">
                {job.role} <span className="font-normal text-faint">· {job.company}</span>
              </h3>
              <span className="font-mono text-xs text-faint">{job.date}</span>
            </div>
            <p className="mt-2 italic text-faint">{job.summary}</p>
            <ul className="mt-3 space-y-1.5">
              {job.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="select-none text-hairline">-</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Section title="Education">
        <div className="space-y-5">
          {education.map((e) => (
            <div
              key={e.school}
              className="flex flex-wrap items-baseline justify-between gap-x-4"
            >
              <p>
                <span className="font-semibold">{e.school}</span>
                <span className="text-faint"> · {e.degree}</span>
              </p>
              <span className="font-mono text-xs text-faint">{e.detail}</span>
            </div>
          ))}
          <p className="font-mono text-xs text-faint">
            Certifications: {certifications.join(' · ')}
          </p>
        </div>
      </Section>
    </main>
  );
}

/* ---------- Research ---------- */

function ResearchPage() {
  return (
    <main>
      <PageTitle title="Papers & a patent" intro={profile.researchIntro} />
      <div className="mt-12 space-y-8">
        {publications.map((pub) => (
          <div key={pub.title} className="border-t border-hairline pt-5">
            <p className="font-semibold">
              {pub.href ? (
                <ExternalLink href={pub.href} className="text-ink hover:text-accent">
                  {pub.title} ↗
                </ExternalLink>
              ) : (
                pub.title
              )}
            </p>
            <p className="mt-1 font-mono text-xs text-faint">
              {pub.type} · {pub.venue}
            </p>
            {pub.note && <p className="mt-2">{pub.note}</p>}
          </div>
        ))}
      </div>
      <p className="mt-12">
        The code behind these lives on the{' '}
        <Link to="/projects" className="text-accent hover:underline underline-offset-4">
          projects page
        </Link>. The patent came out of{' '}
        <Link
          to="/projects/elyssa"
          className="text-accent hover:underline underline-offset-4"
        >
          Elyssa
        </Link>
        , and the papers came out of Alzheimer’s Detection and GenoCrypt.
      </p>
    </main>
  );
}

/* ---------- Projects ---------- */

function ProjectIndexEntry({ title, tag, date, description, readMoreTo, githubHref }) {
  return (
    <div className="border-t border-hairline pt-5 pb-1">
      <div className="flex flex-wrap items-baseline gap-x-3">
        {readMoreTo ? (
          <Link to={readMoreTo} className="font-semibold hover:text-accent">
            {title}
          </Link>
        ) : (
          <ExternalLink
            href={githubHref}
            className="font-semibold text-ink hover:text-accent"
          >
            {title}
          </ExternalLink>
        )}
        <span className="font-mono text-xs uppercase tracking-wider text-faint">
          ({tag})
        </span>
      </div>
      <p className="mt-1.5">{description}</p>
      <div className="mt-2 flex flex-wrap items-baseline gap-x-5 font-mono text-xs">
        {readMoreTo ? (
          <Link to={readMoreTo} className="text-accent hover:underline underline-offset-4">
            Read more →
          </Link>
        ) : (
          <ExternalLink href={githubHref}>GitHub →</ExternalLink>
        )}
        <span className="text-faint">{date}</span>
      </div>
    </div>
  );
}

function ProjectsPage() {
  return (
    <main>
      <PageTitle title="Things I’ve built" intro={profile.projectsIntro} />
      <div className="mt-10 space-y-6">
        {projects.map((p) => (
          <ProjectIndexEntry
            key={p.slug}
            title={p.title}
            tag={p.tag}
            date={p.date}
            description={p.oneLiner}
            readMoreTo={`/projects/${p.slug}`}
          />
        ))}
        {otherProjects.map((p) => (
          <ProjectIndexEntry
            key={p.title}
            title={p.title}
            tag={p.tag}
            date={p.date}
            description={p.description}
            githubHref={p.href}
          />
        ))}
      </div>
    </main>
  );
}

function ProjectPost() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return <NotFound />;

  return (
    <main className="mt-16">
      <Link to="/projects" className="font-mono text-xs text-faint hover:text-ink">
        ← Back to projects
      </Link>

      <h1 className="mt-6 text-3xl font-semibold tracking-tight">{project.title}</h1>
      <p className="mt-3 font-mono text-xs text-faint">
        {project.tag} · {project.date} · {project.stack}
      </p>
      <div className="mt-4 flex flex-wrap gap-5 font-mono text-xs">
        {project.links.map((l) => (
          <ExternalLink key={l.href} href={l.href}>
            {l.label} ↗
          </ExternalLink>
        ))}
      </div>

      {project.gif && (
        <img
          src={project.gif}
          alt={project.gifAlt}
          loading="lazy"
          className="mt-8 w-full rounded-md border border-hairline"
        />
      )}

      {project.image && (
        <figure className="mt-8">
          <img
            src={project.image.src}
            alt={project.image.alt}
            loading="lazy"
            className="w-full rounded-md border border-hairline"
          />
          <figcaption className="mt-2 font-mono text-xs text-faint">
            {project.image.caption}
          </figcaption>
        </figure>
      )}

      {project.tryIt && (
        <div className="mt-8">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-faint">
            Try it
          </p>
          <pre className="overflow-x-auto rounded-md border border-hairline bg-white/60 px-4 py-3 font-mono text-xs leading-6">
            {project.tryIt}
          </pre>
        </div>
      )}

      {project.sections.map((section) => (
        <section key={section.heading} className="mt-12">
          <h2 className="mb-4 text-lg font-semibold tracking-tight">
            {section.heading}
          </h2>
          {section.paragraphs?.map((para) => (
            <p key={para} className="mt-3 first:mt-0">
              {para}
            </p>
          ))}
          {section.pre && (
            <pre className="overflow-x-auto rounded-md border border-hairline bg-white/60 px-4 py-3 font-mono text-xs leading-5">
              {section.pre}
            </pre>
          )}
          {section.bullets && (
            <ul className="mt-3 space-y-1.5 first:mt-0">
              {section.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="select-none text-hairline">-</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </main>
  );
}

/* ---------- Skills ---------- */

function SkillGroupList({ groups }) {
  return (
    <div className="space-y-6">
      {groups.map((s) => (
        <div key={s.group}>
          <h3 className="font-semibold">{s.group}</h3>
          <p className="mt-1">{s.items}</p>
        </div>
      ))}
    </div>
  );
}

function SkillsPage() {
  return (
    <main>
      <PageTitle title="Tools I reach for" intro={profile.skillsIntro} />
      <div className="mt-10">
        <SkillGroupList groups={skills} />
      </div>
      <Section title="Topics covered">
        <SkillGroupList groups={topics} />
      </Section>
    </main>
  );
}

/* ---------- 404 ---------- */

function NotFound() {
  return (
    <main className="mt-24 mb-12">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">404</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">
        This page doesn’t exist.
      </h1>
      <p className="mt-5 max-w-xl">
        You’ve wandered beyond the Wall. There’s nothing up here but white
        walkers and broken links.
      </p>
      <p className="mt-6 font-mono text-xs">
        <Link to="/" className="text-accent hover:underline underline-offset-4">
          ← Head back south
        </Link>
      </p>
    </main>
  );
}

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

// The routed tree, minus the router itself. Kept separate so tests (and any
// future SSR entry) can mount it inside a MemoryRouter.
export function AppShell() {
  return (
    <>
      <ScrollManager />
      <div className="mx-auto max-w-2xl px-6">
        <Header />
        <Routes>
          <Route path="/" element={<AboutPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectPost />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/places" element={<PlacesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
