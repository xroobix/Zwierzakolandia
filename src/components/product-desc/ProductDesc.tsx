import { FC } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import parse from 'html-react-parser';
import './productDesc.css';

interface Props {
  data: {
    title: string;
    description: string;
  }[];
}

export const ProductDesc: FC<Props> = ({ data }) => {
  return (
    <Tabs>
      <TabList>
        {data.map((data) => (
          <Tab key={data.title}>
            <div>{data.title}</div>
          </Tab>
        ))}
      </TabList>

      {data.map((data) => (
        <TabPanel key={data.description}>
          <div className="react-tabs__description">
            {parse(data.description)}
          </div>
        </TabPanel>
      ))}
    </Tabs>
  );
};
