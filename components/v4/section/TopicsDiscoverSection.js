import Container from "@/components/container";
import TopicIconCard from "@/components/v4/card/TopicIconCard";
import {Robot} from 'phosphor-react'

const TopicsDiscoverSection = ({ topics }) => {
  return (
    <Container maxWidth="max-w-[1320px]">
      <h2 className="text-xl mb-6 font-medium text-gray-900">
        Topics <span className="text-gray-400">to browse</span>
      </h2>
      <div className="grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-6 px-1">
        {topics.map((topic, index) => {
          return (
            <div key={index}>
              <TopicIconCard icon={topic.icon} title={topic.name} topic={topic} />
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default TopicsDiscoverSection;
