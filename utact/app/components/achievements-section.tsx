"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Calendar, Trophy, Users } from "lucide-react";
import Image from "next/image";
import { useAdmin } from "../contexts/admin-context";

const achievements = [
  // Awards
  {
    id: "award-1",
    type: "award",
    title: "재정 데이터 분석 미니 프로젝트 (최우수)",
    titleEn: "Excellence Award in Financial Data Analysis Mini Project",
    organization: "한국재정정보원",
    organizationEn: "Korea Public Finance Information Service",
    year: "2024",
    period: "2024.11.27 - 2024.12.06",
    role: "팀장",
    description:
      "개인형 이동장치 교통사고 취약 지역 선정 및 효율적 예산 배분 제안",
    image: "/icons/fis.svg",
    isExcellence: true,
  },
  // Certifications
  {
    id: "cert-1",
    type: "certification",
    title: "SQLD",
    titleEn: "SQL Developer",
    organization: "한국데이터산업진흥원",
    organizationEn: "Korea Data Agency",
    year: "2024",
    month: "12",
    credentialId: "SQLD-055017432",
    status: "Permanent",
    category: "Database",
  },
  {
    id: "cert-2",
    type: "certification",
    title: "ADsP",
    titleEn: "Advanced Data Analytics Semi-Professional",
    organization: "한국데이터산업진흥원",
    organizationEn: "Korea Data Agency",
    year: "2025",
    month: "03",
    credentialId: "ADsP-044016734",
    status: "Permanent",
    category: "Data Analysis",
  },
  {
    id: "cert-3",
    type: "certification",
    title: "정보처리기사",
    titleEn: "Information Processing Engineer",
    organization: "한국산업인력공단",
    organizationEn: "Human Resources Development Service of Korea",
    year: "0000",
    month: "00",
    credentialId: "Not yet issued",
    status: "In Progress",
    category: "IT Certification",
  },
];

const languages = [
  {
    id: "lang-1",
    type: "language",
    title: "TOEIC",
    score: "870",
    level: "Advanced Proficiency",
    year: "2022",
    month: "11",
    organization: "Educational Testing Service",
    status: "Expired",
  },
  {
    id: "lang-2",
    type: "language",
    title: "OPIc",
    score: "IH",
    level: "Intermediate High",
    year: "0000",
    month: "00",
    organization: "American Council on the Teaching of Foreign Languages",
    status: "In Progress",
  },
];

export function AchievementsSection() {
  const { isAdmin } = useAdmin();
  const [achievementImages, setAchievementImages] = useState<{
    [key: string]: string;
  }>({});

  const handleImageUpload = (achievementId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setAchievementImages((prev) => ({ ...prev, [achievementId]: result }));
    };
    reader.readAsDataURL(file);
  };

  const awards = achievements.filter((item) => item.type === "award");
  const certifications = achievements.filter(
    (item) => item.type === "certification"
  );

  return (
    <section id="achievements" className="py-24 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 dark:text-shadow-glow">
            My Achievements
          </h2>
        </div>

        <div className="mb-16">
          <div className="space-y-4">
            {awards.map((award) => (
              <div key={award.id} className="relative">
                <Card
                  className={`hover:shadow-lg transition-all duration-300 relative ${
                    award.isExcellence
                      ? "ring-2 ring-slate-300/50 dark:ring-slate-600/50 bg-gradient-to-r from-slate-50/50 to-slate-100/50 dark:from-slate-900/50 dark:to-slate-800/50"
                      : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6 flex-col sm:flex-row">
                      {" "}
                      {/* Added flex-col sm:flex-row */}
                      <div className="flex-shrink-0 mx-auto sm:mx-0">
                        {" "}
                        {/* Added mx-auto sm:mx-0 */}
                        <div className="relative w-16 h-16 overflow-hidden flex items-center justify-center">
                          <Image
                            src={
                              achievementImages[award.id] ||
                              award.image ||
                              "/placeholder.svg"
                            }
                            alt={award.title}
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
                                  if (file) handleImageUpload(award.id, file);
                                }}
                                className="hidden"
                              />
                            </label>
                          )}
                        </div>
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        {" "}
                        {/* Added text-center sm:text-left */}
                        <div className="flex items-start justify-between mb-3 flex-col sm:flex-row">
                          {" "}
                          {/* Added flex-col sm:flex-row */}
                          <div className="w-full sm:w-auto">
                            {" "}
                            {/* Added w-full sm:w-auto */}
                            <h4 className="text-xl font-semibold mb-1">
                              {award.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              {award.titleEn}
                            </p>
                            <p className="text-foreground font-medium">
                              {award.organization}
                            </p>
                          </div>
                          <div className="flex items-center justify-center sm:justify-start gap-4 text-sm text-muted-foreground mt-2 sm:mt-0 w-full sm:w-auto">
                            {" "}
                            {/* Added justify-center sm:justify-start and w-full sm:w-auto */}
                            <div className="flex items-center gap-1">
                              <Trophy className="w-4 h-4 text-amber-500" />
                              <span>{award.year}</span>
                            </div>
                            {award.role && (
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4 text-slate-500" />
                                <span className="font-medium text-foreground">
                                  {award.role}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="mb-2 text-center sm:text-left">
                          {" "}
                          {/* Added text-center sm:text-left */}
                          <span className="text-sm text-muted-foreground">
                            프로젝트 기간: {award.period}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm sm:text-base max-w-prose mx-auto sm:mx-0">
                          {" "}
                          {/* Added text-sm sm:text-base, max-w-prose, mx-auto sm:mx-0 */}
                          {award.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Languages */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Certifications */}
          <div className="bg-muted/20 rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-center mb-6 text-foreground">
              Certifications
            </h3>
            <div className="relative">
              <div className="h-48 overflow-y-auto space-y-4 pr-2">
                {certifications.map((cert) => (
                  <Card
                    key={cert.id}
                    className="hover:shadow-md transition-all duration-300 h-40 flex-shrink-0"
                  >
                    <CardContent className="p-6 h-full flex flex-col justify-between">
                      <div className="mb-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-lg font-semibold text-foreground mb-1">
                              {cert.title}
                            </h4>
                          </div>
                          <Badge
                            variant="secondary"
                            className="text-xs shrink-0 mt-0.5"
                          >
                            {cert.status}
                          </Badge>
                        </div>
                        <p className="text-foreground font-medium text-sm">
                          {cert.organization}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {cert.year}.{cert.month}
                            </span>
                          </div>
                        </div>
                        {cert.credentialId && (
                          <div className="text-xs text-muted-foreground font-mono">
                            ID: {cert.credentialId}
                          </div>
                        )}
                        {cert.description && (
                          <p className="text-xs text-muted-foreground">
                            {cert.description}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-muted/20 to-transparent pointer-events-none rounded-b-lg"></div>
            </div>
          </div>

          {/* Languages */}
          <div className="bg-muted/20 rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-center mb-6 text-foreground">
              Languages
            </h3>
            <div className="relative">
              <div className="h-48 overflow-y-auto space-y-4 pr-2">
                {languages.map((lang) => (
                  <Card
                    key={lang.id}
                    className="hover:shadow-md transition-all duration-300 h-40 flex-shrink-0"
                  >
                    <CardContent className="p-6 h-full flex flex-col justify-between">
                      <div className="mb-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-lg font-semibold text-foreground">
                                {lang.title}
                              </h4>
                              <Badge variant="outline" className="text-xs">
                                {lang.score}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground font-medium mb-1">
                              {lang.level}
                            </p>
                          </div>
                          <Badge
                            variant="secondary"
                            className="text-xs shrink-0 mt-0.5"
                          >
                            {lang.status}
                          </Badge>
                        </div>
                        <p className="text-foreground font-medium text-sm">
                          {lang.organization}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {lang.year}.{lang.month}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-muted/20 to-transparent pointer-events-none rounded-b-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
