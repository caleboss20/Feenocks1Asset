import {FaFacebook,FaInstagram,FaTiktok,FaTwitter,FaWhatsapp} from "react-icons/fa"
function Footer() {
  return (
    <div>
   <h2 className="p-6 text-white text-xl font-medium">Feenicks1</h2>
   <div className="text-white p-6 bg-blac mt-5 grid grid-cols-2 gap-10 md:flex flex-row ">
    <div className="flex gap-2 text-md flex-1 flex-col bg-viole-600">
     <h2 className="text-lg  mb-3 font-bold text-white">Links</h2> 
     <span>Home</span>
     <span>Stories</span>
     <span>FAQ</span>
      <span>Resources</span>
    </div>
    
    <div className="flex gap-2 text-md flex-1 flex-col bg-re-600">
    <h2 className="text-lg  mb-3 font-bold text-white">Products</h2> 
     <span>Mutual Funds</span>
     <span>Bitsusu</span>
     <span>Investwise</span>
     <span>Real Estate</span>
     <span>Agribusiness</span>
    </div>

     <div className="flex gap-2 text-md flex-1 flex-col bg-viole-600">
     <h2 className="text-lg  mb-3 font-bold text-white">Links</h2> 
     <span>Home</span>
     <span>Stories</span>
     <span>FAQ</span>
      <span>Resources</span>
    </div>

     <div className="flex gap-2 text-md flex-1 flex-col bg-viole-600">
     <h2 className="text-lg  mb-3 font-bold text-white">Legal</h2> 
     <span>Cookie Policy</span>
     <span>Privacy Policy</span>
     <span>Terms of Service</span>
      <span>Law Enforcement</span>
      <span>Compliance</span>
    </div>

    {/**social icons */}
   <div className="flex gap-4 mt-20">
    <FaFacebook className="w-7 h-7"/>
    <FaTwitter className="w-7 h-7"/>
    <FaInstagram className="w-7 h-7"/>
    <FaTiktok className="w-7 h-7"/>
    <FaWhatsapp className="w-7 h-7"/>

   </div>
   </div>

  </div>
  );
}
export default Footer;
