import Link from "next/link";

type ButtonLinkProps = {
  href: string;
  children?: React.ReactNode;
  buttonClassName?: string;
};

export const ButtonLink = ({ href, children = "", buttonClassName }: ButtonLinkProps) => {
  return (
    <Link href={href} className="min-w-fit min-h-fit text-sm text-white rounded-xl ">
      <button className={`py-1 px-4 h-full flex flex-col items-center rounded-2xl bg-emerald-500 hover:bg-emerald-600 duration-300 ${buttonClassName}`}>
        {children}
      </button>
    </Link>
  );
};
