// 1) Add these imports at the top of ReviewPlaceholder.jsx

import ProvisionalTab from "../components/Review/ProvisionalTab";
import NonProvisionalTab from "../components/Review/NonProvisionalTab";


// 2) In renderActiveTab(), replace your old provisional/non-provisional logic with this:

if (activeTab === TAB_KEYS.PROVISIONAL) {
  return (
    <ProvisionalTab
      onDownload={() => console.log("Download provisional draft")}
    />
  );
}

if (activeTab === TAB_KEYS.NON_PROVISIONAL) {
  return (
    <NonProvisionalTab
      onDownload={() => console.log("Download non-provisional draft")}
    />
  );
}


// 3) Make sure this CSS is imported once in ReviewPlaceholder.jsx or your main CSS:

import "./DraftTabs.css";
