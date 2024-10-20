import './privacy_policy.css'

const PrivacyPolicy = () => {
  return (
    <div id="privacypolicy" className="container">
      <h1 className="text-center mb-5">Privacy Policy</h1>
      <p>
        If you require any more information or have any questions about our
        privacy policy, please feel free to contact us by email at{" "}
        <a href="mailto:admin@ShortnPay">admin@ShortnPay</a>.
      </p>
      <p>
        At ShortnPay, the privacy of our visitors is of extreme importance to
        us. This privacy policy document outlines the types of personal
        information received and collected by ShortnPay and how it is used.
      </p>

      <h2>Log Files</h2>
      <p>
        Like many other Web sites, ShortnPay makes use of log files. The
        information inside the log files includes internet protocol (IP)
        addresses, type of browser, Internet Service Provider (ISP), date/time
        stamp, referring/exit pages, and number of clicks to analyze trends,
        administer the site, track user’s movement around the site, and gather
        demographic information. IP addresses, and other such information are
        not linked to any information that is personally identifiable.
      </p>

      <h2>Cookies and Web Beacons</h2>
      <p>
        ShortnPay does use cookies to store information about visitors
        preferences, record user-specific information on which pages the user
        access or visit, customize Web page content based on visitors browser
        type or other information that the visitor sends via their browser.
      </p>

      <h2>DoubleClick DART Cookie</h2>
      <ul>
        <li>
          Google, as a third party vendor, uses cookies to serve ads on
          ShortnPay.
        </li>
        <li>
          Google's use of the DART cookie enables it to serve ads to users based
          on their visit to ShortnPay and other sites on the Internet.
        </li>
        <li>
          Users may opt out of the use of the DART cookie by visiting the Google
          ad and content network privacy policy at the following URL -{" "}
          <a
            href="http://www.google.com/privacy_ads.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            http://www.google.com/privacy_ads.html
          </a>
          .
        </li>
      </ul>

      <h2>Advertising Partners</h2>
      <p>
        Some of our advertising partners may use cookies and web beacons on our
        site. Our advertising partners include Google Adsense.
      </p>
      <p>
        These third-party ad servers or ad networks use technology to the
        advertisements and links that appear on ShortnPay send directly to your
        browsers. They automatically receive your IP address when this occurs.
        Other technologies (such as cookies, JavaScript, or Web Beacons) may
        also be used by the third-party ad networks to measure the effectiveness
        of their advertisements and/or to personalize the advertising content
        that you see.
      </p>

      <p>
        ShortnPay has no access to or control over these cookies that are used
        by third-party advertisers. You should consult the respective privacy
        policies of these third-party ad servers for more detailed information
        on their practices as well as for instructions about how to opt-out of
        certain practices. ShortnPay's privacy policy does not apply to, and we
        cannot control the activities of, such other advertisers or web sites.
      </p>

      <h2>Disabling Cookies</h2>
      <p>
        If you wish to disable cookies, you may do so through your individual
        browser options. More detailed information about cookie management with
        specific web browsers can be found at the browsers' respective websites.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
