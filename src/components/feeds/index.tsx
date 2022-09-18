import Feed from "components/feed";
import React from "react";

function ConnectingLine() {
  return (
    <span
      className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
      aria-hidden="true"
    />
  );
}

interface Props {
  activity: any[];
}

export function Feeds({activity}: Props) {
  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {activity.map((activityItem, activityItemIdx) => (
          <li id={activityItem.id.toString()}>
            <div className="relative pb-8">
              {activityItemIdx !== activity.length - 1 ? (
                <ConnectingLine/>
              ) : null}
              <Feed activityItem={activityItem}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Feeds;
