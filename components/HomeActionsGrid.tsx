"use client";

import React, { useEffect, useState } from "react";
import { ActionItem, content } from "@/data/content";
import { getAllActions } from "@/lib/adminStore";
import ActionCard from "@/components/ActionCard";
import Reveal from "@/components/motion/Reveal";

export default function HomeActionsGrid() {
  const [actions, setActions] = useState<ActionItem[]>(content.actions.slice(0, 3));

  useEffect(() => {
    const sync = () => setActions(getAllActions().slice(0, 3));
    sync();
    window.addEventListener("aus-actions-updated", sync);
    return () => window.removeEventListener("aus-actions-updated", sync);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {actions.map((action, i) => (
        <Reveal key={action.id} delay={i * 120}>
          <ActionCard action={action} featured={action.highlight} />
        </Reveal>
      ))}
    </div>
  );
}
