import SiteLogo from "@components/SiteLogo";

export default function page() {
  return (
    <div className="">
      <div className="h-14 w-full flex items-center px-2">
        <div className="max-w-3xl mx-auto w-full">
          <SiteLogo />
        </div>
      </div>
      <div className="max-w-3xl px-4 mx-auto my-5 space-y-5">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold">Privacy Policy for UniCard</h2>
          <div className="space-y-3 ml-2">
            <p>Effective Date:9/11/2023</p>
            <p>
              This Privacy Policy outlines how "UniCard" collects, uses, and
              protects the personal information of its users. "UniCard" is
              committed to safeguarding your privacy. By using our services, you
              consent to the practices described in this policy.
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">1. Information We Collect</h3>
          <ul className="space-y-3 ml-2 list-disc">
            <li>
              <p>
                <span className="font-semibold">
                  User Profile Information:{" "}
                </span>
                When you log in to "UniCard" using your Google account, we may
                collect your name and profile image to help you identify
                yourself within the app.
              </p>
            </li>
            <li>
              <p>
                <span className="font-semibold">
                  Collection and Term Data:{" "}
                </span>
                We may collect information related to the collections and terms
                you create within the app, including the terms themselves and
                any images you upload. This data is used to provide you with the
                app's flashcard functionality and is potentially shared with
                other users, as described below.
              </p>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">2. Sharing of Information</h3>
          <ul className="ml-2">
            <li className="list-disc">
              <p>
                <span className="font-semibold">User-Generated Content: </span>
                All content created within "My Flashcard" is shared by default
                with other users of the app. Shared content may include terms,
                images, and collection details. By using the app, you
                acknowledge and agree that other users may access and view this
                shared content.
              </p>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">3. Protecting Your Data</h3>
          <p className="ml-2">
            We take measures to protect your data and maintain the security of
            your personal information. However, please be aware that sharing
            content with other users means that it may become publicly
            accessible within the app.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            4. Changes to this Privacy Policy
          </h3>
          <p className="ml-2">
            We may update this Privacy Policy to reflect changes in our
            practices or for other operational, legal, or regulatory reasons. We
            encourage you to review this policy periodically to stay informed
            about how we are protecting your privacy.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">5. Contact Us</h3>
          <p className="ml-2">
            If you have any questions or concerns about this Privacy Policy or
            our practices, please contact us at{" "}
            <a className="text-blue-600" href="mailto:support@my-flashcard.com">
              support@my-flashcard.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
