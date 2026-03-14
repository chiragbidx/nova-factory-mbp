import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";
import { getHomeContent } from "@/content/home";

export const LayoutBenefitsSection = () => {
  const { hero } = getHomeContent();
  const cards = hero.featureCards;
  const iconList = ["Blocks", "Sparkle", "BookText", "Share2"];

  return (
    <section id="benefits" className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
        <div>
          <h2 className="text-lg text-primary mb-2 tracking-wider">Why Marketiq</h2>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI-Powered Collaboration for Agencies
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Built for marketing leaders who want to scale agency impact with less manual busywork, real AI support, and total client visibility.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-4 w-full">
          {cards.map(({ title, subtitle, body }, index) => (
            <Card
              key={title}
              className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <Icon
                    name={iconList[index] as keyof typeof icons}
                    size={32}
                    className="mb-6 text-primary"
                  />
                  <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    0{index + 1}
                  </span>
                </div>
                <CardTitle>
                  {title}
                  <span className="ml-2 block text-primary text-base font-normal">{subtitle}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                {body}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};