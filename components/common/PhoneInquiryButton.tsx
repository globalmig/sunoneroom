"use client";

import type { MouseEvent, ReactNode } from "react";

interface PhoneInquiryButtonProps {
  phone: string;
  className?: string;
  children?: ReactNode;
}

export default function PhoneInquiryButton({ phone, className, children }: PhoneInquiryButtonProps) {
  const handleClick = async (event: MouseEvent<HTMLAnchorElement>) => {
    const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!isDesktop) {
      return;
    }

    event.preventDefault();

    try {
      await navigator.clipboard.writeText(phone);
      window.alert(`\uC804\uD654\uBC88\uD638\uAC00 \uBCF5\uC0AC\uB418\uC5C8\uC2B5\uB2C8\uB2E4.\n${phone}`);
    } catch {
      window.alert(`\uC804\uD654\uBC88\uD638\uB97C \uBCF5\uC0AC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.\n\uC544\uB798 \uBC88\uD638\uB85C \uBB38\uC758\uD574 \uC8FC\uC138\uC694.\n${phone}`);
    }
  };

  return (
    <a href={`tel:${phone.replaceAll("-", "")}`} onClick={handleClick} className={className}>
      {children ?? "\uC785\uC2E4 \uBB38\uC758"}
    </a>
  );
}
