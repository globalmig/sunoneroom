"use client";

import type { MouseEvent } from "react";

interface PhoneInquiryButtonProps {
  phone: string;
  className?: string;
}

export default function PhoneInquiryButton({ phone, className }: PhoneInquiryButtonProps) {
  const handleClick = async (event: MouseEvent<HTMLAnchorElement>) => {
    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

    if (isMobile) {
      return;
    }

    event.preventDefault();

    try {
      await navigator.clipboard.writeText(phone);
      window.alert(`PC에서는 전화 앱이 바로 열리지 않을 수 있어요.\n전화번호를 복사했습니다: ${phone}`);
    } catch {
      window.alert(`PC에서는 전화 앱이 바로 열리지 않을 수 있어요.\n아래 번호로 문의해주세요: ${phone}`);
    }
  };

  return (
    <a href={`tel:${phone.replaceAll("-", "")}`} onClick={handleClick} className={className}>
      전화 문의
    </a>
  );
}
