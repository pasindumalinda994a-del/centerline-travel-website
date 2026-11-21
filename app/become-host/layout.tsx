import { HostAuthFooter } from "@/app/become-host/_components/HostAuthFooter";

export default function BecomeHostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-1 flex-col">{children}</div>
      <HostAuthFooter />
    </>
  );
}
