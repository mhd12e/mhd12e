import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/CodeBlock";
import { EmptyState } from "@/components/EmptyState";
import { SpotlightCard } from "@/components/SpotlightCard";
import { RotatingTitle } from "@/components/RotatingTitle";
import { ProjectCard } from "@/components/ProjectCard";
import { HeroCTAButtons } from "@/components/HeroCTAButtons";
import { Briefcase, GraduationCap, User, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    take: 3,
    orderBy: { createdAt: 'desc' },
    include: { relatedPost: true }
  });

  const posts = await prisma.post.findMany({
    where: { published: true },
    take: 3,
    orderBy: { createdAt: 'desc' }
  });


  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mohamed Elsayed",
    "url": "https://mhd12.dev",
    "image": "https://mhd12.dev/og-image.png",
    "jobTitle": "Full-Stack Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "sameAs": [
      "https://github.com/mhd12e",
      "https://www.linkedin.com/in/mhd12/",
      "https://www.youtube.com/@mhd12e"
    ],
    "knowsAbout": [
      "React", "Next.js", "TypeScript", "Nest.js", "PostgreSQL",
      "Docker", "Python", "Web Development", "Full-Stack Development"
    ],
    "email": "mailto:mhd12@devlix.org"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col gap-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex items-center py-16 md:py-8">
          {/* Grid pattern on the right side */}
          <div className="absolute inset-y-0 right-0 w-2/3 grid-pattern [mask-image:linear-gradient(to_left,black_50%,transparent)]" />

          {/* Subtle gradient glow */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-8 text-left animate-in fade-in slide-in-from-left-4 duration-700">
              <div className="space-y-4">
                <p className="text-primary font-medium tracking-widest uppercase text-sm">Hello! I'm</p>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight leading-none">
                  Mohamed <span className="text-primary">Elsayed</span>
                </h1>
                <p className="text-2xl md:text-3xl font-light text-muted-foreground italic font-serif">
                  <RotatingTitle />
                </p>
              </div>
              <p className="text-lg md:text-xl text-muted-foreground max-w-[600px] leading-relaxed">
                Building robust, scalable applications with modern web technologies. From full-stack development to DevOps pipelines and self-hosted infrastructure - I love turning complex problems into elegant solutions.
              </p>
              <p className="text-sm text-muted-foreground/70 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                Based in Sharjah, UAE
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <HeroCTAButtons />

                <div className="flex items-center gap-4 ml-2 md:ml-4">
                  <Link href="https://github.com/mhd12e" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                  </Link>
                  <Link href="https://www.youtube.com/@mhd12e" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                  </Link>
                  <Link href="https://www.linkedin.com/in/mhd12/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex-1 flex justify-center animate-in fade-in zoom-in duration-1000">
              <div className="relative w-full max-w-[450px]">
                <CodeBlock className="w-full shadow-none border-none" />
              </div>
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-12">About Me</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Bio, Education, Experience */}
            <div className="lg:col-span-2 space-y-8">
              {/* Bio */}
              <div className="space-y-4">
                <h3 className="text-2xl font-serif font-bold flex items-center gap-2">
                  <User className="w-6 h-6 text-primary" /> Bio
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  8th grader passionate about building and deploying applications end-to-end. I specialize in full-stack development, DevOps automation, and self-hosting - combining technical skills with a drive to own the entire stack.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Education */}
                <SpotlightCard className="p-6 h-full border-primary/10 bg-card hover:border-primary/30 transition-colors">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm">
                      <GraduationCap className="w-4 h-4" /> Education
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Student (Grade 8)</h4>
                      <p className="text-muted-foreground text-sm">Al Noor International School</p>
                      <p className="text-xs text-primary/60 mt-1 font-mono">Sharjah, UAE • Since Grade 7</p>
                    </div>

                  </div>
                </SpotlightCard>

                {/* Experience */}
                <SpotlightCard className="p-6 h-full border-primary/10 bg-card hover:border-primary/30 transition-colors">
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm">
                      <Briefcase className="w-4 h-4" /> Experience
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Full Stack Developer Intern</h4>
                      <p className="text-muted-foreground text-sm">Organic Vision Media</p>
                      <p className="text-xs text-primary/60 mt-1 font-mono">Since Jan 2026</p>
                      <Badge variant="secondary" className="mt-1 bg-primary/5 text-[10px] h-5">Paid Internship</Badge>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Full Stack & DevOps Engineer</h4>
                      <p className="text-muted-foreground text-sm">Freelance</p>
                      <p className="text-xs text-primary/60 mt-1 font-mono">System Design</p>
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            </div>

            {/* Right Column: Profile Card */}
            <div className="lg:col-span-1">
              <SpotlightCard className="p-8 h-full border-primary/10 bg-card hover:border-primary/30 transition-colors flex flex-col items-center text-center">
                {/* Profile Image Placeholder */}
                <div className="w-48 h-48 rounded-full bg-muted border-4 border-card shadow-2xl mb-6 overflow-hidden relative">
                  <Image
                    src="/profile.jpeg"
                    alt="Mohamed Elsayed"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>



                <h3 className="text-3xl font-serif font-bold mb-1">Mohamed Elsayed</h3>
                <p className="text-muted-foreground mb-2">Developer & Self-Hoster</p>
                <p className="text-sm text-muted-foreground/70 flex items-center justify-center gap-2 mb-6">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  Sharjah, UAE
                </p>

                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {["React", "Nest.js", "PostgreSQL", "Next.js"].map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-primary/5 hover:bg-primary/10 border-none text-muted-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <a href="https://r2.mhd12.dev/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full rounded-full gap-2 shadow-lg shadow-primary/20 h-12 text-base">
                    <ExternalLink className="w-4 h-4" />
                    Visit Resume
                  </Button>
                </a>
              </SpotlightCard>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="container mx-auto px-4 scroll-mt-20">
          {/* ... existing project section header ... */}
          {/* omitting code to keep context valid, actually I should target the My Expertise section specifically which is further down in the file usually, but wait, I inserted About Me BEFORE Projects. 
           My Expertise was AFTER Projects in the original file. Let me check the file content again or assume standard position.
           Actually, I'll search for the "My Expertise" section in the file first to be safe, as I might have shifted line numbers.
        */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-serif font-bold">Featured Projects</h2>
              <p className="text-muted-foreground text-lg">A selection of my recent works and technical experiments.</p>
            </div>
            <Link href="/projects">
              <Button variant="ghost" className="hover:text-primary group">
                View All Projects <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: any) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {projects.length === 0 && (
              <div className="col-span-full">
                <EmptyState
                  title="No projects found"
                  description="The showcase is currently taking a break. Add some projects in the admin panel!"
                />
              </div>
            )}
          </div >
        </section >

        {/* Skills Section */}
        < div className="container mx-auto px-4" >
          <section id="skills" className="pt-20 pb-28 px-4 sm:px-8 bg-primary/5 rounded-[2rem] overflow-visible">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-serif font-bold">My Expertise</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                I've worked with a range of technologies in the web development world, from frontend to backend and everything in between.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-4">
              {[
                { title: "Languages", skills: ["TypeScript", "Python", "SQL", "JavaScript"] },
                { title: "Frontend & Mobile", skills: ["React", "Next.js", "Tailwind CSS", "Redux", "Expo"] },
                { title: "Backend & DB", skills: ["Nest.js", "PostgreSQL", "Prisma", "FastAPI", "Flask", "NextAuth"] },
                { title: "DevOps & Cloud", skills: ["Docker", "Git", "Linux", "NixOS", "AWS", "Proxmox", "Cloudflare R2", "Turnstile", "Vertex API", "OpenAI API"] }
              ].map((group) => (
                <SpotlightCard key={group.title} className="p-6 rounded-2xl bg-card border-primary/10 hover:border-primary/30 transition-colors">
                  <div className="space-y-6">
                    <h3 className="text-xl font-serif font-bold border-l-4 border-primary pl-4">{group.title}</h3>
                    <div className="flex flex-wrap gap-3">
                      {group.skills.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-muted rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all cursor-default">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </section>
        </div >

        {/* Journal Section */}
        < section id="journal" className="container mx-auto px-4 pb-20" >
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-serif font-bold">Latest Articles</h2>
              <p className="text-muted-foreground text-lg">Thoughts on development, design, and technology.</p>
            </div>
            <Link href="/journal">
              <Button variant="ghost" className="hover:text-primary">Read All Articles →</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {posts.map((post: any) => (
              <Link key={post.id} href={`/journal/${post.slug}`} className="group block h-full">
                <SpotlightCard className="h-full border-primary/10 bg-card hover:border-primary/30 shadow-none transition-colors">
                  <article className="space-y-4 p-4 h-full flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary/60">
                      {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                    </span>
                    <h3 className="text-2xl font-serif font-bold transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-3 text-base leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity flex-grow">
                      {post.excerpt}
                    </p>
                    <div className="pt-2">
                      <span className="text-sm font-bold border-b-2 border-primary/20 group-hover:border-primary transition-all pb-1">
                        Read Story
                      </span>
                    </div>
                  </article>
                </SpotlightCard>
              </Link>
            ))}
            {posts.length === 0 && (
              <div className="col-span-3">
                <EmptyState
                  title="No posts yet"
                  description="The journal is currently empty. Check back soon for fresh stories!"
                />
              </div>
            )}
          </div>
        </section >

        {/* Contact Section */}
        < section id="contact" className="relative overflow-hidden py-24 text-center" >
          {/* Grid pattern full width */}
          < div className="absolute inset-0 grid-pattern" />

          {/* Subtle gradient glows on both sides */}
          < div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

          <div className="relative z-10 container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">Get In Touch</h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              I'm currently looking for new opportunities and collaborations. Whether you have a question or just want to say hi, my inbox is always open!
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Button size="lg" asChild className="rounded-full px-12 h-14 text-lg">
                <a href="mailto:mhd12@devlix.org">Send Message</a>
              </Button>
              <div className="flex gap-6 items-center">
                <Link href="https://github.com/mhd12e" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                </Link>
                <Link href="https://www.youtube.com/@mhd12e" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                </Link>
                <Link href="https://www.linkedin.com/in/mhd12/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </section >
      </div >
    </>
  );
}
