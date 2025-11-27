import { ArrowRightIcon } from "@heroicons/react/24/outline";

function Button(){
    const start='Get Started';
    return(
          <button className="flex justify-center items-center text-lg mt-12 px-20 py-4 bg-blue-700 text-white rounded-sm">
            {`${start}`}
              <span>
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </span>
            </button>
    )
}
export default Button;