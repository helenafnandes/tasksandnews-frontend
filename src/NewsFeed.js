import React from "react";
import "./NewsFeed.css";

const NewsFeed = ({ stories }) => {
  return (
    <div className="newsfeed">
      {stories.map((story) =>
        story.url ? (
          <div key={story.id} className="newsfeed-item">
            <a
              href={story.url}
              target="_blank"
              rel="noopener noreferrer"
              className="newsfeed-content"
            >
              <h3>{story.title}</h3>
              <p>{new URL(story.url).hostname}</p>
            </a>
          </div>
        ) : null
      )}
    </div>
  );
};

export default NewsFeed;
