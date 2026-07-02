type Props = {
  title: string;
  value: string;
};

export default function StatCard({ title, value }: Props) {
  return (
    <div className="bg-gray-900 rounded-2xl p-6">
      <h3 className="text-gray-400">{title}</h3>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>
    </div>
  );
}