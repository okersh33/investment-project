interface Props {
  page: string;
}
export const Header: React.FC<Props> = ({ page }) => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-900">{page}</h1>
      </div>
    </header>
  );
};
