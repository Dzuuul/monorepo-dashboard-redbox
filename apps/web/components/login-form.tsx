"use client";

import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import Image from "next/image";
import LoginAnimation from "./animation-login";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { ThemeToggle } from "../components/theme-toggle";
import { usePreventThemeValidation } from "../hooks/use-mobile";
import { useLoginForm } from "../hooks/use-login-form";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    formData,
    errors,
    isSubmitting,
    showPassword,
    handleInputChange,
    handleSubmit,
    togglePasswordVisibility,
  } = useLoginForm();

  // Mencegah validasi yang terpicu saat perubahan theme
  usePreventThemeValidation();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-start mb-6">
              <ThemeToggle />
              <div className="flex-1"></div>
            </div>
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <Image
                    src={"/logo.webp"}
                    width={150}
                    height={150}
                    alt="Logo Redbox"
                  />
                  <h1 className="text-2xl font-bold pt-5">Kokokrunch</h1>
                  <p className="text-muted-foreground text-balance">
                    Dashboard Admin
                  </p>
                </div>
                <div className="grid gap-3">
                  <Input
                    id="username"
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    required
                    startAdornment={
                      <User className="h-4 w-4 text-muted-foreground" />
                    }
                    className={errors.username ? "border-destructive" : ""}
                  />
                  {errors.username && (
                    <p className="text-sm text-destructive">
                      {errors.username}
                    </p>
                  )}
                </div>
                <div className="grid gap-3">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    required
                    startAdornment={
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    }
                    endAdornment={
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    }
                    className={errors.password ? "border-destructive" : ""}
                  />
                  {errors.password && (
                    <p className="text-sm text-destructive">
                      {errors.password}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full mt-5"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "LOGGING IN..." : "LOGIN"}
                </Button>
              </div>
            </form>
          </div>
          <div className="bg-muted relative hidden md:block">
            <div className="flex flex-col justify-center items-center h-full text-center p-6">
              <LoginAnimation />
              <blockquote className="mt-6 border-l-2 pl-6 italic text-base text-muted-foreground">
                Solusi cerdas untuk manajemen data, pemantauan performa, dan
                pelaporan yang presisi.
              </blockquote>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
