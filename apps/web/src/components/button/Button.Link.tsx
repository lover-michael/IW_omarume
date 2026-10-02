import Link from "next/link";

type ButtonLinkProps = {
  href: string;
  children?: React.ReactNode;
  buttonClassName?: string;
};

export const ButtonLink = ({ href, children = "", buttonClassName }: ButtonLinkProps) => {
  return (
    <Link href={href} className="min-w-fit min-h-fit text-sm text-white rounded-2xl ">
      <button className={`px-2 py-3 flex gap-1 items-center rounded-2xl bg-green-500 hover:bg-green-600 duration-300 ${buttonClassName}`}>{children}</button>
    </Link>
  );
};
