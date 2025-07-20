"use client";

import { AnnouncementBar } from "./announcement-bar";
import { useUnsavedRoleChanges } from "../../lib/store/unsaved-role-changes";
import { useAnnouncement } from "../../lib/store/announcement";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function AnnouncementBarWrapper() {
  const unsavedRoleChanges = useUnsavedRoleChanges((s) => s.unsaved);
  const resetUnsavedRoleChanges = useUnsavedRoleChanges((s) => s.reset);

  const announcement = useAnnouncement();

  // Portal mount state
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  // Prioritas: info global > unsaved changes
  let show = false;
  let type: "info" | "warning" = "info";
  let message = "";
  let showActions = false;
  let onApply, onRevert;

  if (announcement.show && announcement.message) {
    show = true;
    type = announcement.type;
    message = announcement.message;
    showActions = !!announcement.showActions;
    onApply = announcement.onApply;
    onRevert = announcement.onRevert;
  } else if (unsavedRoleChanges) {
    show = true;
    type = "warning";
    message = "Ada perubahan role & permission yang belum disimpan.";
    showActions = true;
    onApply = resetUnsavedRoleChanges;
    onRevert = resetUnsavedRoleChanges;
  }

  if (!show) return null;

  return createPortal(
    <AnnouncementBar
      show={show}
      type={type}
      message={message}
      showActions={showActions}
      onApply={onApply}
      onRevert={onRevert}
    />,
    document.getElementById("announcement-root")!
  );
}
