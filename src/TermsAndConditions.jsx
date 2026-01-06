import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  HiArrowUp,
  HiArrowDown,
  HiChevronDown,
  HiChevronUp,
} from "react-icons/hi";
import { FiAlertCircle } from "react-icons/fi";
import { MdErrorOutline } from "react-icons/md";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
function TermsAndConditions() {
  const [atBottom, setAtBottom] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleAccept = () => {
    agreed ? navigate("/profile") : setError(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;
      setAtBottom(scrollTop + windowHeight >= documentHeight - 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollAction = () => {
    if (atBottom) {
      window.scrollTo({ top: 0, behavior:"smooth"});
    } else {
      window.scrollTo({ top: document.body.scrollHeight,behavior:"smooth"});
    }
  };
  return (
    <div className="relative w-full px-6 py-10 max-w-5xl mx-auto text-gray-800 leading-relaxed">
      <h1 className="text-3xl font-light mb-2">Terms & Conditions</h1>
      <p className="text-lg font-medium mt-8 mb-5 text-[#0b3c39]">
        (Last Updated: December, 2025)
      </p>
      {/* CONTENT */}
      <div className="space-y-6 text-[16px]">
        <p className=" leading-loose text-gray-700">
          These terms of use (“Terms and Conditions”), together with The
          Feenicks1 Platform Privacy Policy (“Privacy Policy”), set forth herein
          shall apply to your access and use of all Feenicks1 Platform Services
          that are made available through our websites including but not limited
          to www.theFeenicks1app.com as well as through the Feenicks1 mobile
          application(collectively known as the “Site”).<br></br>
          <br></br>
          References to “you” and “your” are references to the person accessing
          this Application. References to “Spry”, “we”, “us” and “our” are
          references to Feenicks1 solutions Limited.<br></br>
          <br></br>
          The Feenicks1 Platform (“Feenicks1”) is a self-service online digital
          platform that helps users to easily Feenicks1 their financial goals.
          On Feenicks1, users can easily find, interact with and subscribe to
          products of registered financial institutions. Feenicks1 is developed
          and maintained by Feenicks1 solutions Limited, a subsidiary of Petra
          Holdings Limited Company (“Petra”) and is responsible for providing
          engineering and technology services to the general public. These Terms
          and Conditions apply only to your use of the Site, and do not apply to
          your use of any services or products otherwise offered by other
          subsidiaries of Petra Holdings Limited Company and third-party
          entities.. These Terms and Conditions may be updated from time to
          time. By continuing to use or accessing the Site you agree to these
          Terms and Conditions, as updated from time to time.<br></br>
          <br></br>
          To use some of the services on the Site, you may need to provide
          information such as mobile money wallet information or bank account
          information to Feenicks1. For more information, see our Privacy
          Policy.<br></br>
          <br></br>
          1. a) Registration and Account Security: To use the Site you must (i)
          be at least eighteen (18) years of age; (ii) have not previously been
          suspended or removed from the Site and (iii) register for and use the
          services offered by the Site in compliance with any and all applicable
          laws and regulations.<br></br>
          <br></br>
          1. a) Account Registration: To have access to all the features of the
          Site, you shall be required to register for an account. When you
          register for an account, we shall ask you to give us certain
          identifying information about yourself, including but not limited to
          your email address and other contact information, and password
          (“Registration Information”). When registering for and maintaining an
          account, you agree to provide true, accurate, current, and complete
          information about yourself. You also agree not to impersonate anyone,
          misrepresent any affiliation with anyone else, use false information,
          or otherwise conceal your identity from us for any purpose. <br></br>
          <br></br>
          1. b) You Are Responsible for Your Account: You are solely responsible
          for maintaining the confidentiality and security of your password and
          other Registration Information. For your protection and the protection
          of other users, we ask you not to share your password and Registration
          Information with anyone else. If you do share this information with
          anyone, we will consider their activities to have been authorized by
          you. If you have reason to believe or suspect that your account is no
          longer secure, you must immediately notify us.<br></br>
          <br></br>
          c) We will not be liable to indemnify you for acts of fraud caused by
          your negligence. All action initiated from your account shall be
          deemed to be authorized by you, and we will not be responsible for
          damages caused by such action.<br></br>
          <br></br>
          2) Alerts, Notifications and Service Communications: By registering
          for an account, you automatically sign up for various types of alerts
          via e-mail and mobile notification. We never include your password in
          these communications, but we may include Registration Information
          about your account. Anyone with access to your e-mail or mobile device
          will be able to view these alerts so it is your duty to protect all
          alerts and communications from us.<br></br>
          <br></br>
          3) Requirements for Certain Services – Your use of the Site
          constitutes your acknowledgment and acceptance of the following
          specific requirements for the use of Feenicks1.<br></br>
          <br></br>
          1. a) Collections and Disbursement: Feenicks1 Collections and
          Disbursements (“Collections” and “Disbursement”) is a service operated
          and powered by a third-party payment aggregator or bank and allows you
          to transfer money from one or more of your own bank accounts and/or
          mobile money wallet to facilitate your use of Third-Party Services.
          Collections may take some time to be processed and reflected in your
          Third-Party Service account. You are solely responsible for ensuring
          there are sufficient funds in your bank account or mobile money wallet
          at the time of transfer and, if not, you accept responsibility and
          liability for any insufficient fund fees that your bank may charge as
          a result of this.<br></br>
          <br></br>
          1. b) Forums: We may offer features on the Site that allow users to
          share content, comments, and opinions on financial topics with other
          users in the community forum, as well as other user discussion forum
          platforms (collectively, the “Forum”). Your use of the Forum is
          governed by these Terms of Use. <br></br>
          <br></br>2 .i. Forum content are the opinions of independent users not
          affiliated with us or Feenicks1. We do not guarantee the accuracy,
          integrity or quality of the opinions and advice posted on the Forum.
          Your use of any user content provided in the Forum is at your own
          risk.<br></br>
          <br></br>
          3. We may, but are not required to, monitor Forum content, and we
          reserve the right to edit, correct or delete any Forum content for any
          reason at our sole discretion.<br></br>
          <br></br>
          iii. You hereby grant to us a royalty-free, perpetual, irrevocable,
          non-exclusive right and license to use, reproduce, modify, translate,
          transmit and distribute any content, information or material you
          submit or post to the Forum, in any medium now in existence or
          hereafter developed, for any purpose, including commercial uses.
          <br></br>
          <br></br>
          1. We may terminate a user’s access or ability to use the Forum,
          immediately, without notice, and at our sole discretion.<br></br>
          <br></br>
          4) Third Party Products and Services The Site may allow you to access,
          use or interact with third party websites, apps, content and other
          products and services through our platform (
          <strong className="text-gray-600">“Third-Party Services“</strong>).
          Please note that when you access and/or use Third-Party Services, your
          use thereof will be governed by the third party’s own terms of service
          and privacy policies. We simply provide access to these Third-Party
          Services for convenience purposes only and we do not endorse such
          Third-Party Services and we will not be liable or responsible for any
          of the services offered to you by such third parties. We make no
          representations or warranties regarding the Third-Party Services, and
          you shall use such products, links, websites and the Third-Party
          Services at your sole risk and agree to disclaim us from all risk or
          liability which you may suffer in this regard. <br />
          <br />
          In dealing with Third Parties, you shall note the following: <br />
          <br />
          1. a) Reliance on advice from Third Parties: Some of the services on
          the Site may involve advice from third parties and third-party
          content. You agree that any such advice and content is provided for
          information, education, and entertainment purposes only, and does not
          constitute legal, financial, tax planning, medical, or other advice
          from us. You agree that we are not liable for any advice provided by
          third parties. You agree that you are responsible for your own
          financial research and legal and financial decisions, and that we are
          not responsible or liable for any decisions or actions you take or
          authorize third parties to take on your behalf based on information
          you receive as a user of the Site.
          <br />
          <br />
          2. b) Sharing Information with Third Parties. To use some of the
          services on the Site, you may need to provide information such as
          mobile money wallet information, bank account information, and other
          sensitive financial information which will be used by third parties.
          By using the Site, you agree that we may collect, store, and transfer
          such information on your behalf and at your sole request. More
          information is available in our Privacy Policy. You agree that your
          decision to make available any sensitive or confidential information
          is your sole responsibility and at your sole risk. We have no control
          and make no representations as to the use or disclosure of information
          provided to third parties. You agree that these third-party services
          are not under our control and that we are not responsible for any
          third party’s use of your information.
          <br />
          <br />
          3. c) We Do Not Endorse Third Parties. The Site may contain
          collaborations with third parties. We provide such collaborations as a
          convenience and do not control or endorse these third-party services.
          You acknowledge and agree that we have not reviewed the content,
          advertising, services or other materials that appear on such Third
          party services, and are not liable or responsible for the legality,
          accuracy, or appropriateness of any such content. We shall not be
          responsible or liable, directly, or indirectly, for any damage or loss
          caused or alleged to be caused by or in connection with the use of any
          such third-party services.
          <br />
          <br />
          5) Prohibited Conduct: <br />
          <br />
          The following conduct shall be deemed as prohibited conduct (The list
          below shall not be deemed as exhaustive of conduct deemed as
          prohibited conduct):
          <br />
          <br />
          1. a) Use of the Site for any illegal purpose, or in violation of any
          applicable law;
          <br />
          2. b) Violate or encourage others to violate the rights of third
          parties, including intellectual property rights;
          <br />
          3. c) Post, upload, or distribute any content that is unlawful,
          defamatory, libellous, inaccurate, or that a reasonable person could
          deem to be objectionable, profane, indecent, pornographic, harassing,
          threatening, hateful, or otherwise inappropriate;
          <br />
          4. d) Interfere in any way with security-related features of the Site;
          <br />
          5. e) Interfere with the operation or any user’s enjoyment of the
          Site, including but not limited to uploading or otherwise
          disseminating viruses, adware, spyware, worms, or other malicious
          code, making unsolicited offers or advertisements to other users, or
          attempting to collect personal information about users or third
          parties without their consent;
          <br />
          6. f) Perform any fraudulent activity, including impersonating any
          person or entity, claiming false affiliations, accessing the accounts
          of other users without permission, or falsifying your identity or any
          information about you, including age or date of birth; or
          <br />
          7. g) Sell or otherwise transfer the access granted herein.
          <br />
          <br />
          <br />
          6) Indemnification: You agree that you will be personally responsible
          for your use of the Site and you agree to defend, indemnify us, and
          hold us harmless from and against any and all claims, liabilities,
          damages, losses, and expenses (including attorneys’ and accounting
          fees and costs), arising out of or in any way connected with (i) your
          access to, use of, or alleged use of the Site; (ii) your violation of
          the Terms and Conditions herein or any applicable law or regulation;
          (iii) your violation of any third party right, including without
          limitation any intellectual property right, publicity,
          confidentiality, property, or privacy right; or (iv) any disputes or
          issues between you and any third party.
          <br />
          <br />
          <br />
          7) Termination: If you violate these Terms, your permission to use the
          Site will automatically terminate. In addition, we have the sole
          discretion to suspend or terminate your user account and/or suspend or
          terminate some or all your access to the Site at any time, with or
          without notice to you. You may terminate your account at any time by
          deleting your account on the Site or by contacting Customer Service
          through our live chat feature on the Site. After your account is
          terminated, information and content previously provided by you will no
          longer be accessible through your account, but the
          <br />
          <br />
          Site may continue to store such information and content as required by
          any applicable law, and it may also be stored by third parties to whom
          it has been transferred to through your use of the services.
          <br />
          <br />
          <br />
          8) Service Availability: The Site will be available to users 24 hours
          per day and 7 days per week, except for scheduled maintenance and
          upgrades, and excluding API interruptions (the “Service Availability
          SLA”). Where reasonable, we shall provide at least 24 hours’ advance
          notice to you on scheduled maintenance and upgrade exceeding 30
          minutes. 1. a) The Site is considered available in the following
          scenarios:
          <br />
          <br />
          2. i) The Site can process user sign-up, sign-in, profile editing,
          password reset and authentication requests.
          <br />
          <br />
          3. ii) Developers can create, read, write, and delete entries in the
          database.
          <br />
          <br />
          4. b) The Service Availability SLA shall not apply to performance
          issues caused by the following:
          <br />
          <br />
          5. i) Overall internet congestion, slowdown, or availability;
          <br />
          <br />
          6. ii) Unavailability of generic internet services (g. DNS Servers)
          due to virus or hacker attack;
          <br />
          <br />
          <br />
          iii) Force majeure events as described in the Terms and Conditions;
          <br />
          <br />
          1. iv) Actions or inactions of users (unless undertaken at the express
          direction of us) or third parties beyond our control;
          <br />
          <br />
          2. v) A result of user equipment or third-party computer hardware,
          software, or network infrastructure, not within the sole control of
          Feenicks1.
          <br />
          <br />
          <br />
          9) Disclaimers of Warranty: Notwithstanding Section 8 above, the
          services on the Site are provided “as is” and on an “as available”
          basis, without warranty or condition of any kind, either express or
          implied. Although the Site seeks to maintain safe, secure, accurate,
          and well-functioning services, we cannot guarantee the continuous
          operation of, or access to our services, and there may at times be
          inadvertent technical or factual errors or inaccuracies.
          <br />
          <br />
          <br />
          10) Limitations of Liability: In no event will we be liable to you for
          any incidental, special, consequential, direct, indirect, or punitive
          damages, whether based on warranty, contract, tort (including
          negligence), statute, or any other legal theory, whether or not Spry
          has been informed of the possibility of such damage.
          <br />
          <br />
          <br />
          11) General Terms: If any provision in these Terms and Conditions is
          held to be invalid or unenforceable, the remaining unaffected
          provisions shall remain in full force and effect. The failure of a
          party to enforce any right or provision of these Terms and Conditions
          will not be deemed a waiver of such right or provision. You may not
          assign this Terms and Conditions without our prior written consent.
          Any assignment without our consent shall be deemed null and void.
          <br />
          <br />
          We may assign these Terms and Conditions or any rights hereunder
          without your consent. We will however notify you of this. <br />
          <br />
          The relationship of the parties under these Terms and Conditions is
          that of independent contractor relationship and neither party shall
          construe it to imply that either party is the agent, partner or
          employee of the other.
          <br />
          <br />
          We reserve the right to change this Terms and Conditions by posting a
          revised Terms and Conditions and we agree that changes cannot be
          retroactive. We also reserve the right to change or upgrade features
          of the Site without your consent or approval. If you do not agree with
          these changes, you must stop using the Site.
          <br />
          <br />
          12) Do not Rely on This Site for Your Financial Decision: The contents
          on this Site is for convenience and information purposes only. You
          should consult your financial and legal advisors, and independently
          verify all content provided through this Site before you make
          decisions. Nothing on this Site constitutes an offer to sell or buy
          any product. Account information available on this Site is not the
          official record of your account. Nothing on this Site should be
          construed as rendering tax, legal, investment, or accounting advice.
          The posting of any prospectus or any other information on this Site is
          not a recommendation or opinion for you to buy or sell any product or
          participate in any transaction. <br />
          <br />
          13) Force Majeure: We shall not be considered to be in default in the
          performance of our duties hereunder if such performance is prevented
          or delayed by failure to obtain any consent or authorization for any
          purpose contemplated under the Terms or by war, hostilities, coup
          d’états or acts of God or any other cause of any kind whatsoever
          outside our reasonable control as the case may be.
          <br />
          <br />
          We shall promptly resume our obligations under the Terms and
          Conditions after cessation of the events stated above, provided only
          that it is reasonable to resume its obligations.
          <br />
          <br />
          <br />
          14) Dispute Resolution: Any dispute arising out of or in connection
          with this Terms and Conditions including any question regarding its
          existence, validity, termination or interpretation that cannot be
          resolved in good faith by negotiation within 30 days shall be referred
          to and finally resolved by arbitration under the Alternative Dispute
          Resolution Act, 2010 (Act 798).
          <br />
          <br />
          15) Governing Law: These Terms and Conditions shall be governed by and
          construed in accordance with laws of Ghana. Any reference to
          applicable law in these Terms and Conditions shall mean applicable law
          in Ghana.
        </p>
      </div>

      {/* FLOATING SCROLL BUTTON */}
      <button
        onClick={scrollAction}
        className="fixed bottom-40 right-6 w-12 h-12 rounded-full bg-[#0b3c39] text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition"
      >
        {atBottom ? <HiChevronUp size={22} /> : <HiChevronDown size={22} />}
      </button>

      <div className="flex mt-20 gap-3 justify-center items-center">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => {
            setAgreed(e.target.checked);
            if (e.target.checked) setError(false); // remove error once checked
          }}
          className="w-5 h-5 accent-[#0b3c39]"
        />
        <p className=" text-sm text-gray-800">
          I agree to the Feenicks1 Terms & Conditions and {""}
          <Link to="/policy">
          <span className="text-[#0b3c39] underline text-md">Privacy Policy</span>
          </Link>
          
        </p>
      </div>

      {error && (
        <motion.div className="flex mt-10 gap-3 justify-center items-center">
          <MdErrorOutline className="w-6 h-6 text-red-600" />
          <span className="text-red-600 text-sm">
            Please agree to the Terms & Conditions before continuing.
          </span>
        </motion.div>
      )}

      <motion.button
        onClick={handleAccept}
        animate={{
          scale: agreed ? 1.05 : 1,
          opacity: agreed ? 1 : 0.6,
        }}
        transition={{ type: "spring", stiffness: 300 }}
        className={`w-full py-3 bg-[#0b3c39] rounded-lg text-white font-medium mt-10 border-none outline-none ${
          agreed
            ? "bg-[#0b3c39] text-white cursor-pointer"
            : " bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {agreed ? "Accept & Continue" : "Accept"}
      </motion.button>
    </div>
  );
}
export default TermsAndConditions;
