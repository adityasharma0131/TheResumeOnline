import { Breadcrumb } from "../../components";

const PaymentPolicy = () => {
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb />

      <section className="section content-section">
        <div className="container">
          <div className="grid grid-cols-12">
            <div></div>
            <div className="col-span-10">
              <h1 className="title mb-8">Payment Policy</h1>
              <h5 className="title-alt mb-4">Welcome to TheResume</h5>
              <p className="mb-3">
                Thanks for using our platform and trusting us with your career
                goals. This website and platform ("Services") are provided by
                TheResume. ("us", "we", or "our").
              </p>
              <p className="mb-3">
                By using TheResume or accessing any of our Services, you are
                agreeing to the following terms. Please read them carefully and
                contact us if you have any questions.
              </p>

              <hr />

              <h5 className="title-alt mb-4">Accounts </h5>
              <p className="mb-3">
                When you create an account on TheResume, you are fully
                responsible for maintaining its security and any activities that
                occur under your account. Please use a "strong" password (or
                authenticate via a third party) to ensure that your private
                information, your resumes, and billing information are safe.
              </p>
              <p className="mb-3">
                We cannot and will not be liable for any loss or damage arising
                from your failure to comply with the above requirements.
              </p>

              <hr />

              <h5 className="title-alt mb-4">Content</h5>
              <p className="mb-3">
                Content You are solely responsible for all the content you
                create using our Services. We may review content to determine
                whether it violates our policies, and we may remove content in
                those cases. But that does not necessarily mean that we review
                content, so please don't assume that we do.
              </p>

              <hr />

              <h5 className="title-alt mb-4">Subscription fees </h5>
              <p className="mb-3">
                TheResume reserves the right to require payment or subscription
                fees for any of our Services. At the beginning of each billing
                period, you will be automatically charged for the entire period.
              </p>
              <p className="mb-3">
                The prices may be changed at any time, upon thirty (30) days
                prior notice to you, which may be sent by email or posted on the
                website. Your use of the Services following such notification
                constitutes your acceptance of any new or increased charges.
              </p>
              <p className="mb-3">
                Downgrading your plan may cause the loss of access to some
                capabilities of your Account. TheResume does not accept any
                liability for such loss.
              </p>

              <hr />

              <h5 className="title-alt mb-4">
                Cancellation, Refunds, And Guarantees
              </h5>
              <p className="mb-3">
                If you purchase a subscription to one or more of our services,
                you can cancel your subscription at any time by logging into
                your account or contacting us using the contact information
                provided below. Your cancellation will take effect at the end of
                the current paid term. No refunds will be provided for our
                subscription services.
              </p>
              <p className="mb-3">
                In general, and except as specifically noted on a specific site,
                to the extent permitted by law, all purchases of our
                professional resume-writing services are final and no refunds
                will be provided. Some of our services may include a specific
                guarantee - please see our package descriptions to confirm
                whether your package includes any guarantee.
              </p>
              <p className="mb-3">
                If you are dissatisfied with any of our services, please contact
                the support team for the specific brand or email
                <a href="mailto:theresumes.online@gmail.com">
                  theresumes.online@gmail.com
                </a>
                , and we will provide appropriate assistance.
              </p>
            </div>
            <div></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaymentPolicy;
