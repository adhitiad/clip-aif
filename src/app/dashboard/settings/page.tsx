"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileSettings } from "@/components/dashboard/settings/profile-settings";
import { BillingSettings } from "@/components/dashboard/settings/billing-settings";
import { User, CreditCard, Settings, Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function SettingsPage() {
  const { t } = useLanguage();
  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">{t("settings.title")}</h1>
        <p className="text-muted-foreground">{t("settings.desc")}</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10 p-1 w-full md:w-auto h-auto grid grid-cols-2 md:inline-flex">
          <TabsTrigger value="profile" className="flex items-center gap-2 px-6 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all">
            <User className="w-4 h-4" />
            {t("settings.profile")}
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2 px-6 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all">
            <CreditCard className="w-4 h-4" />
            {t("settings.billing")}
          </TabsTrigger>
          <TabsTrigger value="app" className="flex items-center gap-2 px-6 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all opacity-50 cursor-not-allowed">
            <Settings className="w-4 h-4" />
            {t("settings.app")}
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2 px-6 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all opacity-50 cursor-not-allowed">
            <Bell className="w-4 h-4" />
            {t("settings.notifications")}
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="profile" className="animate-in slide-in-from-bottom-2 duration-300">
            <ProfileSettings />
          </TabsContent>
          
          <TabsContent value="billing" className="animate-in slide-in-from-bottom-2 duration-300">
            <BillingSettings />
          </TabsContent>

          <TabsContent value="app">
             <Card className="border-white/10 bg-card/50">
               <CardContent className="pt-6 text-center text-muted-foreground">
                 {t("settings.app")} {t("settings.coming_soon")}
               </CardContent>
             </Card>
          </TabsContent>

          <TabsContent value="notifications">
             <Card className="border-white/10 bg-card/50">
               <CardContent className="pt-6 text-center text-muted-foreground">
                 {t("settings.notifications")} {t("settings.coming_soon")}
               </CardContent>
             </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
