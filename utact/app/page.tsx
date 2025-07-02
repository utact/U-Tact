"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Upload } from "lucide-react";
import { ThemeToggle } from "./components/theme-toggle";
import { ProfileSection } from "./components/profile-section";
import { EducationSection } from "./components/education-section";
import { MessageBoard } from "./components/message-board";
import { Constellation } from "./components/constellation";
import { AdminLogin } from "./components/admin-login";
import type { Message } from "./types/message";
import { AchievementsSection } from "./components/achievements-section";
import { useAdmin } from "./contexts/admin-context";
import Image from "next/image";

const initialMessages: Message[] = [
  // Initial messages for the message board
  {
    id: "1",
    content: "What a nice slogan!",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    author: "Elon Musk",
    rating: 5,
  },
  {
    id: "2",
    content: "I wanna hire you!",
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
    author: "Sundar Pichai",
    rating: 5,
  },
  {
    id: "3",
    content: "How can I contact you?",
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    author: "Lee Jae-yong",
    rating: 5,
  },
];

export default function Portfolio() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const { isAdmin } = useAdmin();
  const [projectIcons, setProjectIcons] = useState<{ [key: string]: string }>(
    {}
  );

  const strongSkills = ["Java", "Spring Boot", "MySQL", "Docker", "Git"];

  const otherSkills = [
    "Python",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
  ];

  const projects = [
    {
      id: "project-1",
      title: "Where Was I?",
      description:
        "A chrome extension to save your reading position and visualize memory retention through title color changes",
      tech: ["TypeScript", "Chrome Extension API"],
      link: "https://github.com/utact/where-was-i",
      icon: "/icon/where-was-i.png",
    },
    {
      id: "project-2",
      title: "READWE",
      description:
        "A chaotic storytelling playground where everyone builds a story, one sentence at a time",
      tech: ["Java", "Spring Boot"],
      link: "https://github.com/utact/readwe-backend",
      icon: "/placeholder.svg?height=40&width=40&text=READWE",
    },
    {
      id: "project-3",
      title: "U-Tact",
      description:
        "A portfolio website showcasing my skills and projects, built with Next.js and TypeScript",
      tech: ["TypeScript", "Next.js"],
      link: "https://github.com/utact/U-Tact",
      icon: "/placeholder.svg?height=40&width=40&text=U-TACT",
    },
  ];

  const handleAddMessage = (message: Omit<Message, "id" | "timestamp">) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleProjectIconUpload = (projectId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setProjectIcons((prev) => ({ ...prev, [projectId]: result }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-8">
          <div className="font-bold text-xl">UTACT</div>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#about" className="transition-colors hover:text-primary">
              About
            </a>
            <a href="#skills" className="transition-colors hover:text-primary">
              Skills
            </a>
            <a
              href="#education"
              className="transition-colors hover:text-primary"
            >
              Education
            </a>
            <a
              href="#projects"
              className="transition-colors hover:text-primary"
            >
              Projects
            </a>
            <a
              href="#achievements"
              className="transition-colors hover:text-primary"
            >
              Achievements
            </a>
            <a href="#contact" className="transition-colors hover:text-primary">
              Contact
            </a>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <ProfileSection />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 dark:text-shadow-glow">
              Technical Skills
            </h2>
          </div>

          <div className="space-y-8">
            {/* Strong Skills */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-center">Strong</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {strongSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-primary/10 border-2 border-primary/30 rounded-full text-sm font-semibold text-primary hover:bg-primary/20 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Other Skills */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-center">
                Knowledgeable
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {otherSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-muted border rounded-full text-sm font-medium hover:bg-muted/80 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <EducationSection />

      {/* Projects Section */}
      <section id="projects" className="py-24 px-4 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 dark:text-shadow-glow">
              Featured Projects
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              다양한 기술 스택을 활용하여 개발한 프로젝트들을 소개합니다.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full border-2 hover:border-primary/20 overflow-hidden"
              >
                <CardContent className="p-0 flex flex-col h-full">
                  {/* Project Header */}
                  <div className="p-6 pb-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0 border border-primary/10">
                          <Image
                            src={projectIcons[project.id] || project.icon}
                            alt={project.title}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                          {isAdmin && (
                            <label className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors">
                              <Upload className="w-3 h-3" />
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file)
                                    handleProjectIconUpload(project.id, file);
                                }}
                                className="hidden"
                              />
                            </label>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-1">
                            {project.title}
                          </h3>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="px-6 pb-6 flex-1 flex flex-col">
                    <p className="text-muted-foreground mb-6 flex-1 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-xs font-medium"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <AchievementsSection />

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 dark:text-shadow-glow">
              Get In Touch
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              어떤 의견이든 자유롭게 남겨주세요!
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Side - Constellation */}
            <div className="lg:col-span-1 h-[320px]">
              <Constellation height={320} />
            </div>

            {/* Right Side - Message Board */}
            <div className="lg:col-span-2 h-[320px]">
              <MessageBoard
                messages={messages}
                onAddMessage={handleAddMessage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t bg-muted/20">
        <div className="container max-w-6xl mx-auto text-center">
          <div className="text-muted-foreground">
            <p className="text-sm">© 2025 UTACT - Always be tactful</p>
          </div>
        </div>
      </footer>

      {/* Admin Login */}
      <AdminLogin />
    </div>
  );
}
