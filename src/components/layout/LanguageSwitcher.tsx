"use client";

import React from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2 px-2 hover:bg-accent rounded-full transition-all">
          <Languages className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-bold uppercase">{language}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32 rounded-xl p-1 shadow-xl">
        <DropdownMenuItem 
          onClick={() => setLanguage("id")}
          className={`rounded-lg cursor-pointer ${language === "id" ? "bg-primary/10 text-primary font-bold" : ""}`}
        >
          <span className="flex w-full items-center justify-between">
            Bahasa Indonesia 🇮🇩
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage("en")}
          className={`rounded-lg cursor-pointer ${language === "en" ? "bg-primary/10 text-primary font-bold" : ""}`}
        >
          <span className="flex w-full items-center justify-between">
            English 🇺🇸
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
