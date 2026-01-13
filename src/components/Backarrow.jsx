import { ArrowLeftIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
function BackArrow() {
  return (
    <div className="w-full h-10 ">
      <div className="py-2 px-3 w-10 bg-gray-100 shadow-2xl rounded-full flex justify-center items-center">
        <ChevronLeftIcon className="w-7 h-7 text-black" />
      </div>
    </div>
  );
}
export default BackArrow;
