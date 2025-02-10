import Footer from "./_components/footer";
import PageChange from "./_components/page-change";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex size-full">
      <div className="flex flex-col flex-1 pt-24">
        <div className="flex-1 px-4 overflow-y-auto">{children}</div>
        <Footer />
      </div>
      <PageChange />
    </div>
  );
}
