// import * as React from "react";
// import * as TabsPrimitive from "@radix-ui/react-tabs";

// import { cn } from "@/lib/utils";

// function Tabs({
//   className,
//   ...props
// }: React.ComponentProps<typeof TabsPrimitive.Root>) {
//   return (
//     <TabsPrimitive.Root
//       data-slot="tabs"
//       className={cn("flex flex-col gap-2", className)}
//       {...props}
//     />
//   );
// }

// function TabsList({
//   className,
//   ...props
// }: React.ComponentProps<typeof TabsPrimitive.List>) {
//   return (
//     <TabsPrimitive.List
//       data-slot="tabs-list"
//       className={cn(
//         "bg-muted text-muted-foreground inline-flex h-fit w-fit items-center justify-center rounded-lg p-[3px]",
//         className
//       )}
//       {...props}
//     />
//   );
// }

// function TabsTrigger({
//   className,
//   ...props
// }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
//   return (
//     <TabsPrimitive.Trigger
//       data-slot="tabs-trigger"
//       className={cn(
//         "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
//         className
//       )}
//       {...props}
//     />
//   );
// }

// function TabsContent({
//   className,
//   ...props
// }: React.ComponentProps<typeof TabsPrimitive.Content>) {
//   return (
//     <TabsPrimitive.Content
//       data-slot="tabs-content"
//       className={cn("flex-1 outline-none", className)}
//       {...props}
//     />
//   );
// }

// export { Tabs, TabsList, TabsTrigger, TabsContent };

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  const [activeRect, setActiveRect] = React.useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  // aktualizacja po każdej zmianie aktywnego taba
  React.useEffect(() => {
    if (listRef.current) {
      const active = listRef.current.querySelector<HTMLButtonElement>(
        '[data-state="active"]'
      );
      if (active) {
        const rect = active.getBoundingClientRect();
        const parentRect = listRef.current.getBoundingClientRect();
        setActiveRect({
          left: rect.left - parentRect.left,
          top: rect.top - parentRect.top,
          width: rect.width,
          height: rect.height,
        });
      }
    }
  });

  return (
    <TabsPrimitive.List
      ref={listRef}
      data-slot="tabs-list"
      className={cn(
        "relative flex w-full bg-foreground/5 rounded-4xl p-1 shadow-sm",
        className
      )}
      {...props}
    >
      {activeRect && (
        <motion.div
          layout
          className="absolute rounded-3xl bg-background shadow-sm"
          style={{
            left: activeRect.left,
            top: activeRect.top,
            width: activeRect.width,
            height: activeRect.height,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
        />
      )}
      {children}
    </TabsPrimitive.List>
  );
}

function TabsTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative z-10 flex-1 px-4 py-2 text-md font-medium rounded-2xl transition-colors",
        "data-[state=active]:text-foreground data-[state=inactive]:text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.Trigger>
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
