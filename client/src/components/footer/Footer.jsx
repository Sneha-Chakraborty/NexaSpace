// const Footer = () => {
//   return (
//     <footer className="w-full py-4 text-xs text-center text-nexagrey border-t border-white/10 mt-8">
//       <span>2025. NexaSpace Technologies. All Rights Reserved.</span>
//       <span className="ml-2">
//         Made with <span className="text-pink-500">♥</span> by NexaSpace
//       </span>
//     </footer>
//   );
// };

// export default Footer;


// client/src/components/footer/Footer.jsx
const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-between text-[11px] text-gray-400 px-6 py-3 border-t border-white/10 rounded-b-2xl">
      <span>2025. NexaSpace Technologies. All Rights Reserved.</span>

      <span>
        Made with <span className="text-pink-500 mx-1">♥</span> by NexaSpace
      </span>
    </footer>
  );
};

export default Footer;
