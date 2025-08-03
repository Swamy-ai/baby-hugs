import React, { useLayoutEffect, useState } from "react";
import "./Title.css"; // assuming you have your font applied there

const Title = () => {
  const [loaded, setLoaded] = useState(false);

  useLayoutEffect(() => {
    // Wait for font to be loaded before showing the logo
    document.fonts.ready.then(() => {
      setLoaded(true);
    });
  }, []);

  if (!loaded) return null; // or a spinner/skeleton if you want

  return (
    <div className="logo">
      <b>B<span>a</span>by<span>h</span>ug<span>S</span></b>
    </div>
  );
};

export default Title;
