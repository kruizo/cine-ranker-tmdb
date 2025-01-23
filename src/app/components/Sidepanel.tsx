import React from "react";

interface SidepanelProps {
  children: React.ReactNode;
}
const Sidepanel: React.FC<SidepanelProps> = ({ children }) => {
  return (
    <aside>
      <div className="w-96  hidden xl:block p-3 space-y-10">{children}</div>
    </aside>
  );
};

export default Sidepanel;
