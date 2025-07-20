import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "../components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

// Data untuk cards
const cardData = [
  {
    id: 1,
    description: "Total Revenue",
    title: "$1,250.00",
    badge: {
      icon: IconTrendingUp,
      text: "+12.5%",
    },
    footer: {
      title: "Trending up this month",
      subtitle: "Visitors for the last 6 months",
      icon: IconTrendingUp,
    },
  },
  {
    id: 2,
    description: "New Customers",
    title: "1,234",
    badge: {
      icon: IconTrendingDown,
      text: "-20%",
    },
    footer: {
      title: "Down 20% this period",
      subtitle: "Acquisition needs attention",
      icon: IconTrendingDown,
    },
  },
  {
    id: 3,
    description: "Active Accounts",
    title: "45,678",
    badge: {
      icon: IconTrendingUp,
      text: "+12.5%",
    },
    footer: {
      title: "Strong user retention",
      subtitle: "Engagement exceed targets",
      icon: IconTrendingUp,
    },
  },
  {
    id: 4,
    description: "Growth Rate",
    title: "4.5%",
    badge: {
      icon: IconTrendingUp,
      text: "+4.5%",
    },
    footer: {
      title: "Steady performance increase",
      subtitle: "Meets growth projections",
      icon: IconTrendingUp,
    },
  },
];

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {cardData.map((card) => {
        const BadgeIcon = card.badge.icon;
        const FooterIcon = card.footer.icon;

        return (
          <Card key={card.id} className="@container/card">
            <CardHeader>
              <CardDescription>{card.description}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {card.title}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <BadgeIcon />
                  {card.badge.text}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {card.footer.title} <FooterIcon className="size-4" />
              </div>
              <div className="text-muted-foreground">
                {card.footer.subtitle}
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
