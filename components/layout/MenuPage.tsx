import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface MenuPageProps {
  title: string;
  subtitle: string;
  description: string;
}

export default function MenuPage({ title, subtitle, description }: MenuPageProps) {
  return (
    <div className="min-h-screen bg-[#f4f4f4] text-[#20282d]">
      <Header />

      <main className="mx-auto w-full max-w-[1120px] px-4 pb-24 pt-[120px] lg:px-0">
        <section className="rounded-2xl border border-black/10 bg-white p-8 lg:p-14">
          <p className="text-sm text-[#6a6a6a]">{subtitle}</p>
          <h1 className="mt-3 text-4xl font-extrabold lg:text-5xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#4e4e4e]">{description}</p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

