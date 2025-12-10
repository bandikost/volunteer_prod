export default function CardAboutSkeleton() {
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center z-50 py-6">
      <div className="grid mt-20 grid-cols-2 gap-2 w-full max-w-5xl animate-pulse px-9">

        {/* Левый блок */}
        <div className="flex flex-col space-y-4">
          {/* Заголовок + Осталось */}
          <div className="grid grid-cols-2 gap-2 items-center">
            <div className="h-8 bg-gray-300 rounded w-2/4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2"></div>
          </div>

          {/* Изображение */}
          <div className="w-[500px] h-[500px] bg-gray-300 rounded w-full"></div>

          {/* Характеристики */}
          <div className="space-y-2 mt-4">
            <div className="h-6 bg-gray-300 rounded w-1/3"></div>
            <div className="h-20 mt-8 bg-gray-300 rounded w-full"></div>
          </div>

          {/* Описание */}
          <div className="space-y-2 mt-4">
            <div className="h-6 mt-8 bg-gray-300 rounded w-1/3"></div>
            <div className="h-36 mt-8 bg-gray-300 rounded w-full"></div>
          </div>
        </div>

        {/* Правый блок */}
        <div className="flex flex-col items-end space-y-4">
          <div className="h-10 bg-gray-400 rounded w-1/4"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        </div>

      </div>
    </div>
  );
}
