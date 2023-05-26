import "App.css";
import { defaultAPIErrorHandler } from "api/api";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function PrivacyPolicy() {
  const [policy, setPolicy] = useState()
  const getPolicyList = () => {
    const config = {
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/policy/all",
      headers: {
        // "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        // Authorization: state.adminToken,
      },
      // data: formData,
    };
    axios(config)
      .then((response) => {
        console.log(response.data.data);
        setPolicy(response.data.data);
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };
  useEffect(() => {
    getPolicyList()
  }, [])

  return (
    <>
      <div
        className="container for-container rtl"
        style={{ textAlign: "left" }}
      >
        <h2 className="text-center mt-3 headerTitle">Privacy Policy</h2>

        <div className="for-padding">
          <div
            dangerouslySetInnerHTML={{
              __html:
                policy?.[0]?.content || "",
            }}
          ></div>
        </div>

        {/* <div className="for-padding">
          <p>&nbsp;</p>
          <h2>This is a Demo Privacy Policy</h2>
          <p>
            This policy explains how 6valley website and related applications
            (the “Site”, “we” or “us”) collects, uses, shares and protects the
            personal information that we collect through this site or different
            channels. 6valley has established the site to link up the users who
            need foods or grocery items to be shipped or delivered by the riders
            from the affiliated restaurants or shops to the desired location.
            This policy also applies to any mobile applications that we develop
            for use with our services on the Site, and references to this
            “Site”, “we” or “us” is intended to also include these mobile
            applications. Please read below to learn more about our information
            policies. By using this Site, you agree to these policies.
          </p>
          <h2>How the Information is collected</h2>
          <h3>Information provided by web browser</h3>
          <p>
            You have to provide us with personal information like your name,
            contact no, mailing address and email id, our app will also fetch
            your location information in order to give you the best service.
            Like many other websites, we may record information that your web
            browser routinely shares, such as your browser type, browser
            language, software and hardware attributes, the date and time of
            your visit, the web page from which you came, your Internet Protocol
            address and the geographic location associated with that address,
            the pages on this Site that you visit and the time you spent on
            those pages. This will generally be anonymous data that we collect
            on an aggregate basis.
          </p>
          <h3>Personal Information that you provide</h3>
          <p>
            If you want to use our service, you must create an account on our
            Site. To establish your account, we will ask for personally
            identifiable information that can be used to contact or identify
            you, which may include your name, phone number, and e-mail address.
            We may also collect demographic information about you, such as your
            zip code, and allow you to submit additional information that will
            be part of your profile. Other than basic information that we need
            to establish your account, it will be up to you to decide how much
            information to share as part of your profile. We encourage you to
            think carefully about the information that you share and we
            recommend that you guard your identity and your sensitive
            information. Of course, you can review and revise your profile at
            any time.
          </p>
          <h3>Payment Information</h3>
          <p>
            To make the payment online for availing our services, you have to
            provide the bank account, mobile financial service (MFS), debit
            card, credit card information to the StackFood platform.
          </p>
          <h2>How the Information is collected</h2>
          <h3>Session and Persistent Cookies</h3>
          <p>
            Cookies are small text files that are placed on your computer by
            websites that you visit. They are widely used in order to make
            websites work, or work more efficiently, as well as to provide
            information to the owners of the site. As is commonly done on
            websites, we may use cookies and similar technology to keep track of
            our users and the services they have elected. We use both “session”
            and “persistent” cookies. Session cookies are deleted after you
            leave our website and when you close your browser. We use data
            collected with session cookies to enable certain features on our
            Site, to help us understand how users interact with our Site, and to
            monitor at an aggregate level Site usage and web traffic routing. We
            may allow business partners who provide services to our Site to
            place cookies on your computer that assist us in analyzing usage
            data. We do not allow these business partners to collect your
            personal information from our website except as may be necessary for
            the services that they provide.
          </p>
          <h3>Web Beacons</h3>
          <p>
            We may also use web beacons or similar technology to help us track
            the effectiveness of our communications.
          </p>
          <h3>Advertising Cookies</h3>
          <p>
            We may use third parties, such as Google, to serve ads about our
            website over the internet. These third parties may use cookies to
            identify ads that may be relevant to your interest (for example,
            based on your recent visit to our website), to limit the number of
            times that you see an ad, and to measure the effectiveness of the
            ads.
          </p>
          <h3>Google Analytics</h3>
          <p>
            We may also use Google Analytics or a similar service to gather
            statistical information about the visitors to this Site and how they
            use the Site. This, also, is done on an anonymous basis. We will not
            try to associate anonymous data with your personally identifiable
            data. If you would like to learn more about Google Analytics, please
            click here.
          </p>
        </div> */}
      </div>
    </>
  );
}

export default PrivacyPolicy;
