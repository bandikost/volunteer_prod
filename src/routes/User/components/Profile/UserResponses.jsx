export default function UserResponses({ volunteer }) {
  if (volunteer >= 1) return null;

  return (
    <div className="w-full mt-20">
      <p className="text-xl">Ваши отклики:</p>
      <ul className="grid grid-cols-2 gap-2 justify-items-center">
        <li className="px-4">1</li>
        <li className="px-4">1</li>
        <li className="px-4">1</li>
        <li className="px-4">1</li>
      </ul>
    </div>
  );
}
