import React, {ReactElement, useState} from "react";
import {ITabListProps, ITabProps} from "@components/ui/tablist/types";
import TabItem from "@components/ui/tablist/tabItem";
import {sanitizeForId} from "@/common/utils/stringUtils";

const TabList: React.FC<ITabListProps> = ({ activeTabIndex = 0, children, className, activeTabClasses }: ITabListProps) => {
    const [activeTab, setActiveTab] = useState(activeTabIndex);
    const handleTabClick = (index: number) => {
      setActiveTab(index)
    }

  const tabs = React.Children.toArray(children).filter(
    (child): child is ReactElement<ITabProps> =>
      React.isValidElement(child) && child.type === TabItem
  );

  return (
    <div className="tabs">
      <nav className="tab-list-wrapper">
        <ul className={`tab-list ${className}`} role="tablist" aria-orientation="vertical">
          {tabs.map((tab, index) => (
            <li key={`tab-${index}`}>
              <button
                key={`tab-btn-${index}`}
                role="tab"
                id={`tab-${sanitizeForId(tab.props.label)}`}
                aria-controls={`panel-${sanitizeForId(tab.props.label)}`}
                aria-selected={activeTab === index}
                onClick={() => handleTabClick(index)}
                className={`tab-btn ${
                  activeTab === index && activeTabClasses
                }`}
              >{tab.props.label}</button>
            </li>
          ))}
        </ul>
      </nav>
      {tabs[activeTab]}
    </div>
  );
}

export default TabList;
