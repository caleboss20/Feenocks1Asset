import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HiChevronDown,
  HiChevronUp,
} from "react-icons/hi";

function PrivacyPolicyAny() {
     const [atBottom, setAtBottom] = useState(false);

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
      <h1 className="text-3xl font-light mb-2">Privacy Policy</h1>
      <p className="text-lg font-medium mt-5 mb-5 text-green-600">
        (Last Updated: December, 2025)
      </p>

      <div>
        Feenicks1 solutions limited (“Feenicks1 ”, “we”, “us” and “our” ) is
        committed to protecting the privacy of personal information (i.e. any
        information relating to an identified or identifiable natural person)
        who accesses the <br />{" "}
        <a href="" className="underline">
          www.theFeenicks1app.com
        </a>{" "}
        website and Feenicks1 mobile software application (collectively, the
        “Site”). Amendments to this Privacy Policy will be posted to the Site
        and will be effective when posted. Your continued use of the services on
        the Site following the posting of any amendment to this Privacy Policy
        shall constitute your acceptance of such amendment.
        <br />
        <br />
        This Privacy Policy shall be read in conjunction with the Data
        Protection Act, 2012 (Act 843) and where there is any inconsistency
        between this Privacy Policy and the Data Protection Act, 2012 (Act 843),
        the Data Protection Act, 2012 (Act 843) shall prevail.
        <br />
        <br />
        <p className="font-medium text-black text-xl leading-normal">
          {" "}
          Consent and Information Collection and Use
        </p>
        <br />
        When you register as a user of our Site, we ask for personal information
        that will be used to activate your account, provide the services on the
        Site to you, communicate with you about the status of your account, and
        for other purposes set out in this Privacy Policy. Your name, address,
        mobile number, email address, mobile money account information, personal
        image files for the purposes of identity verification as required by
        law, and other information about you may be required by us or may be
        disclosed by you during your use of the Site. You may be required to
        enable access to your contact list or phone address book when performing
        certain activities on the Site. E.g. When withdrawing from your
        investment account to pay to a third-party. You will also be required to
        add an email address as a user name and a private password, which will
        become part of your account information.
        <br />
        <br />
        By providing personal information to us and by retaining us to provide
        you with the services on the Site, you voluntarily consent to the
        collection, use, and disclosure of such personal information as
        specified in this Privacy Policy. The legal bases for our processing of
        your personal information is primarily to provide you access to the
        services of the Site and that the processing is carried out in our
        legitimate interests, which are further explained below. Without
        limiting the foregoing, we may on occasion ask you to consent when we
        collect, use, or disclose your personal information in specific
        circumstances.
        <br />
        <br />
        We shall take steps designed to ensure that only our employees and
        agents who need access to your personal information to fulfil their
        employment duties will have access to it. We may use and disclose your
        personal or account information for but not limited to the following
        purposes:
        <br />
        <br />
        <div className="flex flex-col ml-6">
          <li> To provide you with services on the Site</li>
          <br />
          <li>
            {" "}
            To improve the quality of the services of the Site through polls,
            surveys and other similar feedback gathering activities conducted by
            Feenicks1and/or third parties;
          </li>
          <br />
          <li>
            {" "}
            To a third-party for further processing for purposes incidental to
            the use of the Site or the Terms and Conditions;
          </li>
          <br />
          <li>
            To create, manage and control your account information, and to
            verify access rights to the Site;
          </li>
          <br />
          <li>
            To communicate with you (subject to your opt-out rights set forth in
            this Privacy Policy), including without limitation for the purpose
            of providing you with information about the services of the Site, or
            informing you of changes or additions to the services of the Site or
            of the availability of any other services or features we provide;
          </li>{" "}
          <br />
          <li>
            To assess service levels, monitor traffic patterns and gauge
            popularity of different features and options of the Site
          </li>
          <br />
          <li>To enforce this Privacy Policy or our Terms and Conditions;</li>
          <br />
          <li>
            To protect against fraud or error, and to respond to claims of any
            violation of our rights or those of any third parties;
          </li>
          <br />
          <li>To respond to your requests for customer service;</li>
          <br />
          <li>
            {" "}
            To protect the rights, property or personal safety of you, us, our
            users and the public; and
          </li>
          <br />
          <li>
            {" "}
            As required to comply with applicable laws or as authorized by
            applicable laws.
          </li>
        </div>
        <br />
        In order to process payments, we utilize third-party payment gateways
        who will utilize your mobile money account and other payment information
        in accordance with their respective privacy policies. Feenicks1shall not
        be liable to you or any other person for any damages that might result
        from unauthorized use, publication, disclosure, or any other misuse of
        such payment information, including mobile money account information.{" "}
        <br />
        <br />
        Feenicks1 may share your personal information with product
        providers/owners via third-party integrations. We invite you to review
        their applicable data protection policies. <br />
        <br />
        When we disclose your personal information to third parties, we take
        reasonable measures to ensure that the rules set forth in this Privacy
        Policy are complied with and these third parties provide sufficient
        guarantees to implement appropriate technical and organizational
        measures.
        <br />
        <br />
        Your personal information may be stored and processed in any country
        where we have facilities or in which we engage third-party service
        providers. By using the Site, you consent to the transfer of information
        to countries outside your country of residence, which may have different
        data protection rules than in your country. While such information is
        outside of Ghana, it is subject to the laws of the country in which it
        is held and may be subject to disclosure to the governments, courts or
        law enforcement or regulatory agencies of such other country, pursuant
        to the laws of such country. However, our practices regarding your
        personal information will at all times continue to be governed by this
        Privacy Policy and, where applicable, we will comply with the Data
        Protection Act, 2012 (Act 843) requirements providing adequate
        protection for the transfer of personal information from Ghana to third
        countries.
        <br />
        <br />
        We may occasionally communicate with you regarding our products,
        services, news, and events. You have the option to not receive this
        information. We provide an opt-out function within all email
        communications of this nature, or will cease to communicate with you for
        this purpose if you contact us and tell us not to communicate this
        information to you. The only kind of these communications that you may
        not “opt-out” of are those required to communicate announcements related
        to the services of the Site, including information specific to your
        Account, planned services suspensions and outages. We will attempt to
        minimize this type of communication to you.
        <br />
        <br />
        <h2 className="font-medium text-black text-xl leading-normal">
          Age of Consent
        </h2>
        <br />
        We do not knowingly provide the services of the Site to and will not
        knowingly collect the personal information from anyone under the age of
        consent. If you are 18 years or less and not eligible to use the Site,
        your parent or guardian must agree to our Privacy Policy on your behalf.
        If you have any concerns about your child’s personal information,please
        contact us at <br />
        <span className="underline text-green-600">
          customerservice@feenicks1.com.
        </span>{" "}
        <br />
        <br />
        We do not knowingly provide the services of the Site to and will not
        knowingly collect the personal information from anyone under the age of
        consent. If you are 18 years or less and not eligible to use the Site,
        your parent or guardian must agree to our Privacy Policy on your behalf.
        If you have any concerns about your child’s personal information, please
        contact us at <br />
        <span className="underline text-green-600">
          info@theFeenicks1project.com .
        </span>
        <br />
        <br />
        The Site is intended for people over 18 years of age, and no one under
        age 18 may provide any personal information to, on or through the Site.
        We do not knowingly collect personal information from people under 18
        and we will not be held responsible for the use of the Site by a person
        below 18 years. If you are under 18, do not use or provide any
        information to, on or through the Site, make any purchases through the
        Site, use any of the interactive or public comment features, or provide
        any information about yourself to us, including your name, address,
        telephone number or email address. If we learn we have collected or
        received personal information from a person under 18 without
        verification of parental consent, we will delete that information. If
        you believe we might have any information from or about a person under
        18, please contact us at 
        <br />
        <span className="underline text-green-600">
          info@theFeenicks1project.com .
        </span>
        <br />
        <br />
        <h2 className="font-medium text-black text-xl leading-normal">
          Rights to Your Information{" "}
        </h2>
        You have the right to access and edit your information at any time
        through the web interface provided as part of the services of the Site.
        On written request and subject to proof of identity, you may access the
        personal information that we hold, used or communicated and ask that any
        necessary corrections be made, where applicable, as authorized or
        required by law. However, to make sure that the personal information we
        maintain about you is accurate and up to date, please inform us
        immediately of any change in your personal information by mail or
        e-mail. <br />
        <br />
        Under the Data Protection Act, 2012 (Act 843), you may be entitled to
        additional rights, including: (i) the right to withdraw consent to
        processing where consent is the basis of processing; (ii) the right to
        access your personal information and certain other supplementary
        information, once you have provided a proof of identity; (iii) the right
        to object to unlawful data processing, under certain conditions; (iv)
        the right to erasure of personal information about you, under certain
        conditions; (v) the right to demand that we restrict processing of your
        personal information, under certain conditions. if you believe we have
        exceeded the legitimate basis for processing, processing is no longer
        necessary, are processing, or believe your personal information is
        inaccurate; (vi) the right to prevent processing of personal data for
        direct marketing purpose without prior consent from you; (vii) the right
        to object to decisions being taken by automated means which produce
        legal effects concerning you or similarly significantly affect you,
        under certain conditions; (viii) the right to lodge a complaint with
        data protection authorities. If you want to learn more about your rights
        under the Data Protection Act,2012 you can visit {""}
        <span className="text-green-600">
          the Data Protection Agency website.
        </span>
        <br />
        <br />
        <h2 className="font-medium text-black text-xl leading-normal">
          Aggregated Data
        </h2>
        <br />
        We may also use your personal information to generate Aggregated Data
        for internal use and for sharing with others on a selective basis.
        “Aggregated Data” means records which have been stripped of information
        potentially identifying users, and which have been manipulated or
        combined to provide generalized, anonymous information. Your identity
        and personal information will be kept anonymous in Aggregated Data.{" "}
        <br />
        <br />
        <h2 className="font-medium text-black text-xl leading-normal">Links</h2>
        <br />
        The Site may contain links to other sites, and we are not responsible
        for the privacy practices or the content of such sites. We encourage you
        to read the privacy policy of linked sites. Their privacy policies and
        practices may differ from our policies and practices. <br />
        <br />
        <h2 className="font-medium text-black text-xl leading-normal">
          Cookies and Log Files
        </h2>
        <br />
        We use cookies and log files to track user information. Cookies are
        small amounts of data that are transferred to your web browser by a web
        server and are stored on your phone, desktop, or tablet storage. We use
        cookies to track which page variant a visitor has seen, to track if a
        visitor has clicked on a page variant, to monitor traffic patterns, and
        to gauge the popularity of service options. We will use this information
        to deliver relevant content and services to you. <br />
        <br />
        <h2 className="font-medium text-black text-xl leading-normal">
          Change of Ownership or Business Transition
        </h2>
        <br />

        In the event of a change of ownership or other business transition, such
        as a merger, acquisition or sale of our assets, your information may be
        transferred in accordance with applicable privacy laws. You shall be
        notified in the event of any such change. <br /><br />
        
          <h2 className="font-medium text-black text-xl leading-normal">Security and Retention </h2>
         We will
        strive to prevent unauthorized access to your personal information,
        however, no data transmission over the Internet, by wireless device or
        over the air is guaranteed to be 100% secure. We have implemented and
        maintain reasonable security procedures and practices (based on the
        nature of the information we collect) to protect that information from
        unauthorized disclosure. We will continue to enhance security procedures
        as new technologies and procedures become available. <br /><br />
        
         We strongly
        recommend that you do not disclose your password to anyone. <br /><br />
        
         Please
        remember that you control what personal information you provide while
        using the Site. Ultimately, you are responsible for maintaining the
        secrecy of your identification, passwords, and/or any personal
        information in your possession for the use of the Site. Always be
        careful and responsible regarding your personal information. We are not
        responsible for, and cannot control, the use by others of any
        information which you provide to them and you should use caution in
        selecting the personal information you provide to others through the
        Site. Similarly, we cannot assume any responsibility for the content of
        any personal information or other information which you receive from
        other users through the Site, and you release us from any and all
        liability in connection with the contents of any personal information or
        other information which you may receive using the Site. We cannot
        guarantee or assume any responsibility for verifying the accuracy of the
        personal information, or other information provided by any third-party.
        You release us from any and all liability in connection with the use of
        such personal information or other information of others. <br /><br />
        
        We will
        maintain your personal information for as long as they are needed, or as
        required by applicable laws namely the Data Protection Act, 2012 (Act
        843), regulations, or government orders. <br /><br />
        
            <h2 className="font-medium text-black text-xl leading-normal"> Changes to this Policy We may </h2> <br />
        
        update this Privacy Policy from time to time. If we do so, we will send
        an email to users subscribed to the App’s News list or provide a prompt
        in-app. If the change materially affects the treatment of your personal
        data, and we have your email, but you are not subscribed to our news
        list, we will send you an email. (You are responsible for ensuring that
        we have an up-to-date email for this purpose.) Your continued use of the
        Site shall mean you accept any change or update in the Privacy Policy. <br /><br />


        <h2 className="font-medium text-black text-xl leading-normal"> Contact Us </h2> <br />
        
        If you have any questions or comments about this Privacy
        Policy or your personal information, to make an access or correction
        request, to exercise any applicable rights, to make a complaint, or to
        obtain information about our policies and practices with respect to any
        service providers outside Ghana, we can be reached by email at
        {""} <span className="text-green-600">info@theFeenicks1project.com</span>
      </div>

      <button
        onClick={scrollAction}
        className="outline-none fixed bottom-20 right-6 w-12 h-12 rounded-full bg-[#2f5d50] text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition"
      >
        {atBottom ? <HiChevronUp size={22} /> : <HiChevronDown size={22} />}
      </button>

        <Link to="/termsdraft">
         <span
       className="text-green-800 mt-5 underline">Check out our terms and conditions</span>
        </Link>
     

    </div>
  );
}
export default PrivacyPolicyAny;
