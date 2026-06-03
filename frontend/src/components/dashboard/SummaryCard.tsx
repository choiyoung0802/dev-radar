interface SummaryCardProps {
  title: string;
  value: number;
  description: string;
  icon: string;
}

export default function SummaryCard({
  title,
  value,
  description,
  icon,
}: SummaryCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-xl">{icon}</span>

        <p className="text-sm font-medium text-gray-500">
          {title}
        </p>
      </div>

      <p className="mt-4 text-3xl font-bold text-gray-900">
        {value}
      </p>

      <p className="mt-2 text-sm text-gray-500">
        {description}
      </p>
    </div>
  );
}