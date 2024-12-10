import chartsGet from "@/action/charts-get";
import { UserChartWrapper } from "@/components/dashboard/user-chart-wrapper";

export default async function ChartPage() {
  const data = await chartsGet();
  if (!data.length)
    return (
      <div className="my-5">
        <h2 className="mt-0">Informações insuficientes</h2>
        <p>Não encontramos informações o suficiente para calcular as estimativas</p>
      </div>
    );
  return (
    <section className="grid gap-4 grid-cols-2">
      <UserChartWrapper data={data} />
    </section>
  );
}
