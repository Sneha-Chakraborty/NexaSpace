// import PublicLayout from "../../layouts/PublicLayout.jsx";

// const HelpPage = () => (
//   <PublicLayout>
//     <div className="py-10 space-y-4">
//       <h1 className="text-3xl font-semibold">Help</h1>
//       <p className="text-nexagrey">
//         Need assistance? For now, this is a static help page. Later we can add
//         FAQs, contact forms, and support flows.
//       </p>
//     </div>
//   </PublicLayout>
// );

// export default HelpPage;




// client/src/pages/Landing/HelpPage.jsx
import PublicLayout from "../../layouts/PublicLayout.jsx";

const HelpPage = () => {
  return (
    <PublicLayout>
      <section className="w-full max-w-3xl mx-auto space-y-5 text-center md:text-left">
        <h1 className="text-3xl font-semibold mb-2">Help & Support</h1>

        <p className="text-gray-300 text-sm">
          This Help page is a simple static screen for now. As NexaSpace grows,
          you can add FAQs, troubleshooting guides, and contact options here.
        </p>

        <div className="space-y-2 text-xs text-gray-400">
          <p>• Trouble logging in? Make sure your email and password are correct.</p>
          <p>• Forgot your password? Use the “Forgot Password” link on the login page.</p>
          <p>• For any other issues, you can later plug in a support email or contact form.</p>
        </div>
      </section>
    </PublicLayout>
  );
};

export default HelpPage;
