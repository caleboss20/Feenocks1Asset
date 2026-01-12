import { ArrowLeftIcon,ChevronLeftIcon } from "@heroicons/react/24/solid";
function BackArrow(){
 return(
    <div className="w-full h-10 ">
        <div className="py-2 px-2 bg-gray-100 shadow-2xl rounded-full flex justify-center items-center">

    <ChevronLeftIcon className="w-6 h-6 " />
        </div>
        
    </div>
 )
}
export default BackArrow;