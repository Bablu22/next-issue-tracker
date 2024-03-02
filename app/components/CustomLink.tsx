import Link from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  href: string;
}

const CustomLink = ({ href, children }: Props) => {
  return (
    <Link href={href} passHref legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </Link>
  );
};

export default CustomLink;
