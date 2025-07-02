"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { ProfileUpload } from "./profile-upload";
import { useAdmin } from "../contexts/admin-context";

export function ProfileSection() {
  const [profileImage, setProfileImage] = useState<string>(
    "/placeholder.svg?height=200&width=200"
  );
  const { isAdmin } = useAdmin();

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-3 gap-12 items-stretch">
        {/* Profile Image - Left Side */}
        <div className="lg:col-span-1 flex flex-col justify-center items-center lg:items-start">
          <div className="relative">
            <div className="w-64 h-80 rounded-2xl overflow-hidden border shadow-xl bg-muted">
              <Image
                src={profileImage || "/placeholder.svg"}
                alt="UTACT Profile"
                width={256}
                height={320}
                className="w-full h-full object-cover"
              />
            </div>
            {isAdmin && <ProfileUpload onImageUpload={setProfileImage} />}
          </div>
        </div>

        {/* Profile Info - Right Side */}
        <div className="lg:col-span-2 flex flex-col justify-center space-y-8">
          {/* Name & Title */}
          <div className="space-y-4">
            <div>
              <h1 className="text-5xl font-bold text-foreground mb-2">
                You Seungjun{" "}
                <span className="text-3xl text-muted-foreground font-light">
                  (He/Him)
                </span>
              </h1>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              비즈니스 통찰력으로 가치를 만드는 풀스택 개발자
            </h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed text-lg">
              <p>
                2022년부터 직접 기획 및 운영한 네이버 카페를 9천 명 규모로
                성장시켰습니다. 이 경험을 통해 사용자 니즈 분석과 서비스 성장
                전략 수립에 대한 실질적인 강점을 길렀습니다. 특히, 관리자 시스템
                구축을 통한 자동 운영 체계 마련으로 제 효율적인 시스템 설계
                역량을 증명합니다.
              </p>
              <p>
                현재 SSAFY 14기에서 탄탄한 알고리즘 역량과 실전 개발 경험을
                쌓으며 백엔드부터 프론트엔드까지 아우르는 균형 잡힌 시야를
                확보하고 있습니다. 기술과 비즈니스를 성공적으로 융합하여 문제
                해결에 기여하는 전략적 개발자로 성장하는 것이 제 목표입니다.
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Button
              variant="outline"
              size="lg"
              asChild
              className="bg-transparent"
            >
              <a
                href="https://github.com/utact"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="bg-transparent"
            >
              <a
                href="http://www.linkedin.com/in/utact"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn
              </a>
            </Button>
            <Button size="lg" asChild>
              <a href="mailto:dev.utact@gmail.com">
                <Mail className="w-5 h-5 mr-2" />
                Email Me
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
