import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function Button(){
    const start='Get Started';
    return(
      <Link to="/signup">
       <button className="flex justify-center items-center text-lg mt-12 px-20 py-4 bg-blue-700 text-white rounded-sm">
            {`${start}`}
              <span>
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </span>
            </button>
      </Link>
         
    )
}
export default Button;