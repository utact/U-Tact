"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Settings, X } from "lucide-react";
import { useAdmin } from "../contexts/admin-context";

export function AdminLogin() {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { isAdmin, login, logout } = useAdmin();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "1234") {
      login();
      setPassword("");
      setError("");
      setIsOpen(false);
    } else {
      setError("잘못된 비밀번호입니다.");
    }
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError("");
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="sm"
          variant={isAdmin ? "default" : "outline"}
          className="rounded-full w-12 h-12 p-0 shadow-lg"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {/* Login Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-80">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {isAdmin ? "관리자 모드" : "관리자 로그인"}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {isAdmin ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    현재 관리자 상태입니다.
                  </p>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full bg-transparent"
                  >
                    로그아웃
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">비밀번호</label>
                    <input
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      className={`flex h-10 w-full rounded-md border ${
                        error ? "border-red-500" : "border-input"
                      } bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1`}
                      placeholder="관리자 비밀번호를 입력하세요."
                    />
                    {error && (
                      <p className="text-sm text-red-500 mt-1">{error}</p>
                    )}
                  </div>
                  <Button type="submit" className="w-full">
                    로그인
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
