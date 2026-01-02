import BackArrow from "./components/Backarrow";
import { Link } from "react-router-dom";

function Transactions({transactions}){
 return(
    <div className="w-full">
     <div className="p-6 flex gap-15">
        <Link to="/dashboard">
        <div><BackArrow /></div>
        </Link>
        
        
        <h2 className="font-medium text-xl">Transaction History</h2>
     </div>

     <div className="flex gap-5 justify-center">
        <button className="py-3 px-5 border-1 border-gray-500 rounded-lg">All categories</button>
        <button  className="py-3 px-5 border- border-gray-500 rounded-lg">Payment Status</button>
     </div>


 <div className="flex flex-col mt-8 w-full bg-white gap-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex w-full py-4 px-2 bg-gree-200 justify-between"
              >
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50"></div>
                  <div className="flex flex-col gap-1">
                    <h2 className="font-medium text-sm ">{transaction.type}</h2>
                    <span className="text-sm text-black">{transaction.date}</span>
                  </div>
                </div>
                <div className="flex flex-col  px-2">
                  <div className="px-2 mr-4">
                    <span className="text-green-400 font-medium text-sm ">
                      {transaction.valuepercent || "0%"}
                    </span>
                  </div>
                  <h2 className="text-sm font-medium">
                    GH₵ {transaction.amount.toLocaleString()}.00
                  </h2>
                </div>
              </div>
            ))}
          </div>


    </div>
 )
}
export default Transactions;