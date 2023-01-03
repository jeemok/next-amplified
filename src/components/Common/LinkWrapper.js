import React from "react";
import Link from "next/link";

export const LinkWrapper = ({ href, children, ...props }) => {
  if (!href) {
    return children;
  }
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
};

export default LinkWrapper;
