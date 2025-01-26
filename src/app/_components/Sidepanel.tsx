import React from "react";

interface SidepanelProps {
  children: React.ReactNode;
}
const Sidepanel: React.FC<SidepanelProps> = ({ children }) => {
  return (
    <aside>
      <div className="max-w-96 w-fit  p-3 space-y-10">{children}</div>
    </aside>
  );
};

export default Sidepanel;
