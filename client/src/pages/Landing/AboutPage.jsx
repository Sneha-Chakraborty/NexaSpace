// import PublicLayout from "../../layouts/PublicLayout.jsx";

// const AboutPage = () => (
//   <PublicLayout>
//     <div className="py-10 space-y-4">
//       <h1 className="text-3xl font-semibold">About NexaSpace</h1>
//       <p className="text-nexagrey">
//         NexaSpace is a real-time social platform where you can share posts,
//         stories, and chat with your network. This page is just a placeholder
//         while we build the full experience.
//       </p>
//     </div>
//   </PublicLayout>
// );

// export default AboutPage;



// client/src/pages/Landing/AboutPage.jsx
import PublicLayout from "../../layouts/PublicLayout.jsx";

const AboutPage = () => {
  return (
    <PublicLayout>
      <section className="w-full max-w-3xl mx-auto space-y-4 text-center md:text-left">
        <h1 className="text-3xl font-semibold mb-2">About NexaSpace</h1>
        <p className="text-gray-300 text-sm leading-relaxed">
          NexaSpace is a modern social platform designed for real-time
          connection. Share posts, stories, and conversations with people who
          matter to you. Our goal is to offer a clean, distraction-free
          experience where creators, professionals, and friends can interact
          seamlessly.
        </p>
        <p className="text-gray-400 text-xs leading-relaxed">
          This is the static About page for the first feature. As you continue
          building NexaSpace, you can extend this section with team details,
          roadmap, FAQs, and more.
        </p>
      </section>
    </PublicLayout>
  );
};

export default AboutPage;
