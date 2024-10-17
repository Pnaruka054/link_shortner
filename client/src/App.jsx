import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./website/Home_page/home";
import Login from "./website/Login/login";
import Signup from "./website/SignUs/signUs";
import PrivacyPolicy from "./website/Privacy_Policy/privacy_policy";
import TermsOfUse from "./website/Terms_of_Use/terms_of_use";
import DMCA from "./website/DMCA/dmca";
import Faq from "./website/FAQ/faq";
import ContactUs from "./website/ContactUs/contactUs";
import PayoutRates from "./website/PayOut_Rates/payOut_rates";
import Statistics from "./website/Admin_pages/Statistics/Statistics";
import AllLinks from "./website/Admin_pages/All_links/all_links";
import HiddenLinks from "./website/Admin_pages/Hidden_links/hidden_links";
import Withdraw from "./website/Admin_pages/Withdraw/withdraw";
import QuickLink from "./website/Admin_pages/Quick_link/quick_link";
import Referrals from "./website/Admin_pages/Referrals/Referrals";
import Invoices from "./website/Admin_pages/Invoices/Invoices";
import Profile from "./website/Admin_pages/Profile/profile";
import ChangePassword from "./website/Admin_pages/Change_password/change_password";
import ChangeEmail from "./website/Admin_pages/Change_email/change_email";
import Support from "./website/Admin_pages/Support/support";
import Verify from "./website/Verify/verify";
import ForgetPage from "./website/Forget_Password/forget_page/forget_page";
import ResetPage from "./website/Forget_Password/reset_page/reset_page";
import Page_Not_Found from "./website/404_Page/page_Not_Found";
import VerifyChangeEmail from "./website/Admin_pages/Change_email/verify_change_email/verify_change_email";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget_password" element={<ForgetPage />} />
          <Route path="/password_reset_form/:id" element={<ResetPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/ref/:id" element={<Signup referral_status="true" />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/termsofuse" element={<TermsOfUse />} />
          <Route path="/dmca" element={<DMCA />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/payout_rates" element={<PayoutRates />} />
          <Route path="/member/dashboard" element={<Statistics />} />
          <Route path="/member/links" element={<AllLinks />} />
          <Route path="/member/links/hidden" element={<HiddenLinks />} />
          <Route path="/member/withdraws" element={<Withdraw />} />
          <Route path="/member/tools/quick" element={<QuickLink />} />
          <Route path="/member/users/referrals" element={<Referrals />} />
          <Route path="/member/invoices" element={<Invoices />} />
          <Route path="/member/users/profile" element={<Profile />} />
          <Route
            path="/member/users/change_password"
            element={<ChangePassword />}
          />
          <Route path="/member/users/change_email" element={<ChangeEmail />} />
          <Route path="/member/users/verify_change_email" element={<VerifyChangeEmail />} />
          <Route path="/member/forms/support" element={<Support />} />
          <Route path="/*" element={<Page_Not_Found />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
