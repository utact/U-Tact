"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Calendar, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import { useAdmin } from "../contexts/admin-context";

const education = [
  {
    id: "edu-1",
    degree: "Bachelor of Business Administration",
    school: "Chungnam National University",
    location: "Daejeon, Korea",
    period: "2023 - 2025",
    status: "Graduated",
    description: "Grade Point Average 3.84/4.5",
    relevant: [
      "Management Information Systems",
      "Business Analytics",
      "Project Management Principles",
      "Process Optimization",
      "Market Analysis",
      "Strategic Planning",
    ],
    image: "/icons/cnu.svg",
  },
  {
    id: "edu-2",
    degree: "Samsung SW AI Academy For Youth (SSAFY) 14th",
    school: "Samsung Multi Campus",
    location: "Daejeon, Korea",
    period: "2025 - Present",
    status: "In Progress",
    description: "AI & Software Development Track (Java)",
    relevant: [
      "Java & Spring Boot",
      "Database (SQL)",
      "Algorithm (Problem Solving)",
      "Web Development (HTML, CSS, JavaScript, Vue.js)",
      "Git (Version Control)",
    ],
    image: "/icons/ssafy.svg",
  },
];

export function EducationSection() {
  const { isAdmin } = useAdmin();
  const [educationImages, setEducationImages] = useState<{
    [key: string]: string;
  }>({});

  const handleImageUpload = (eduId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setEducationImages((prev) => ({ ...prev, [eduId]: result }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <section id="education" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 dark:text-shadow-glow">
          Education
        </h2>
        <div className="space-y-6">
          {education.map((edu) => (
            <Card
              key={edu.id}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="relative w-16 h-16 overflow-hidden flex items-center justify-center">
                      <Image
                        src={educationImages[edu.id] || edu.image}
                        alt={edu.school}
                        width={64}
                        height={64}
                        className="w-full h-full object-fit"
                      />
                      {isAdmin && (
                        <label className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors">
                          <Upload className="w-3 h-3" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleImageUpload(edu.id, file);
                            }}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-foreground">
                        {edu.degree}
                      </h3>
                      {edu.status === "In Progress" && (
                        <Badge variant="default" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          진행 중
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                      <span className="font-medium text-primary">
                        {edu.school}
                      </span>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {edu.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {edu.period}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {edu.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {edu.relevant.map((course) => (
                        <Badge
                          key={course}
                          variant="outline"
                          className="text-xs"
                        >
                          {course}
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
  );
}
