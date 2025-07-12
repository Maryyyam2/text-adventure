import { Story } from '../types';
import '../styles/global.css';

interface StorySelectorProps {
  stories: { [key: string]: Story };
  onSelectStory: (storyKey: string) => void;
}

export default function StorySelector({ stories, onSelectStory }: StorySelectorProps) {
  return (
    <div className="container">
      <div className="header">
        <h1>🏰 Choose Your Adventure</h1>
        <p>Select a story to begin your journey</p>
      </div>
      <div>
        {Object.entries(stories).map(([key, story]) => (
          <div key={key} className="card story-card">
            <h3 className="story-title">{story.name}</h3>
            <p className="story-description">{story.description}</p>
            <button onClick={() => onSelectStory(key)} className="btn btn-primary">
              🚀 Start Adventure
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}