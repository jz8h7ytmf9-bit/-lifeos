type Props = {
  title: string;
  value: string;
};

export default function StatCard({ title, value }: Props) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
      <p className="text-gray-400 text-sm">
        {title}
      </p>

      <h2 className="text-4xl font-bold mt-2 text-white">
        {value}
      </h2>
    </div>
  );
}